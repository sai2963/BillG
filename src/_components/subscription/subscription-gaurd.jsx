import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSubscription } from '../contexts/subscription-context';


const SubscriptionGuard = ({ children }) => {
  const navigate = useNavigate();
  const { subscription, loading, hasActiveSubscription } = useSubscription();

  useEffect(() => {
    if (!loading) {
      if (!subscription) {
        // No subscription found
        navigate('/pricing', {
          state: {
            message: 'Please subscribe to a plan to access this feature'
          }
        });
      } else if (!hasActiveSubscription()) {
        // Subscription expired or suspended
        navigate('/subscription/renew', {
          state: {
            message: 'Your subscription has expired. Please renew to continue.',
            subscription
          }
        });
      }
    }
  }, [subscription, loading, hasActiveSubscription, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">
            Checking subscription status...
          </p>
        </div>
      </div>
    );
  }

  if (!subscription || !hasActiveSubscription()) {
    return null; // Will redirect in useEffect
  }

  return children;
};

export default SubscriptionGuard;