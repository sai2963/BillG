import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import axios from 'axios';

const SubscriptionContext = createContext();

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error('useSubscription must be used within SubscriptionProvider');
  }
  return context;
};

export const SubscriptionProvider = ({ children }) => {
  const { getToken, isSignedIn } = useAuth();
  const [subscription, setSubscription] = useState(null);
  const [usageStats, setUsageStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSubscription = async () => {
    if (!isSignedIn) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const token = await getToken();
      const response = await axios.get(
        `${import.meta.env.VITE_API}/api/subscriptions/current`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setSubscription(response.data.subscription);
      setUsageStats(response.data.usageStats);
    } catch (err) {
      console.error('Error fetching subscription:', err);
      setError(err.response?.data?.message || 'Failed to fetch subscription');
      
      // If no subscription found, set subscription to null
      if (err.response?.status === 404) {
        setSubscription(null);
      }
    } finally {
      setLoading(false);
    }
  };

  const createSubscription = async (planType) => {
  try {
    const token = await getToken();
    
    if (!token) {
      return {
        success: false,
        error: 'Authentication token not found. Please login again.'
      };
    }
    
    console.log('Creating subscription with planType:', planType);
    
    const response = await axios.post(
      `${import.meta.env.VITE_API}/api/subscriptions`,
      { planType },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    setSubscription(response.data.subscription);
    return { success: true, data: response.data };
  } catch (err) {
    console.error('Error creating subscription:', err);
    console.error('Error response:', err.response?.data);
    
    return {
      success: false,
      error: err.response?.data?.message || err.message || 'Failed to create subscription'
    };
  }
};
  const cancelSubscription = async () => {
    try {
      const token = await getToken();
      await axios.post(
        `${import.meta.env.VITE_API}/api/subscriptions/cancel`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setSubscription(null);
      return { success: true };
    } catch (err) {
      console.error('Error cancelling subscription:', err);
      return {
        success: false,
        error: err.response?.data?.message || 'Failed to cancel subscription'
      };
    }
  };

  const hasActiveSubscription = () => {
    return subscription && subscription.status === 'ACTIVE';
  };

  const isSubscriptionExpired = () => {
    if (!subscription) return true;
    if (!subscription.endDate) return false; // Custom plan has no expiry
    return new Date() > new Date(subscription.endDate);
  };

  useEffect(() => {
    if (isSignedIn) {
      fetchSubscription();
    } else {
      setSubscription(null);
      setLoading(false);
    }
  }, [isSignedIn]);

  const value = {
    subscription,
    usageStats,
    loading,
    error,
    fetchSubscription,
    createSubscription,
    cancelSubscription,
    hasActiveSubscription,
    isSubscriptionExpired
  };

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
};