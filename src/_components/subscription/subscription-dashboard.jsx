import { useState, useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';

import axios from 'axios';
import { useSubscription } from '../contexts/subscription-context';

const SubscriptionDashboard = () => {
  const { getToken } = useAuth();
  const { subscription, usageStats, cancelSubscription } = useSubscription();
  const [stats, setStats] = useState(null);
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = await getToken();
      
      const [statsRes, billsRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API}/api/subscriptions/stats`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get(`${import.meta.env.VITE_API}/api/subscriptions/bills`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      setStats(statsRes.data);
      setBills(billsRes.data.bills);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelSubscription = async () => {
    if (window.confirm('Are you sure you want to cancel your subscription?')) {
      const result = await cancelSubscription();
      if (result.success) {
        alert('Subscription cancelled successfully');
      } else {
        alert(result.error);
      }
    }
  };

  const getPlanName = (planType) => {
    switch (planType) {
      case 'MONTHLY': return 'Monthly Plan';
      case 'ANNUAL': return 'Annual Plan';
      case 'CUSTOM': return 'Custom Plan';
      default: return planType;
    }
  };

  const getPlanPrice = (planType) => {
    switch (planType) {
      case 'MONTHLY': return '₹100/month';
      case 'ANNUAL': return '₹500/year';
      case 'CUSTOM': return '₹1/bill';
      default: return 'N/A';
    }
  };

  const getStatusBadge = (status) => {
    const colors = {
      ACTIVE: 'bg-green-100 text-green-800',
      EXPIRED: 'bg-red-100 text-red-800',
      CANCELLED: 'bg-gray-100 text-gray-800',
      SUSPENDED: 'bg-yellow-100 text-yellow-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">Loading...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Subscription Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your subscription and view usage statistics
          </p>
        </div>

        {/* Current Subscription */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Current Plan
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Plan Type</span>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {getPlanName(subscription.planType)}
                  </p>
                </div>
                
                <div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Price</span>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {getPlanPrice(subscription.planType)}
                  </p>
                </div>

                <div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Status</span>
                  <div className="mt-1">
                    <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusBadge(subscription.status)}`}>
                      {subscription.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Start Date</span>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {new Date(subscription.startDate).toLocaleDateString()}
                  </p>
                </div>

                {subscription.endDate && (
                  <div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">End Date</span>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {new Date(subscription.endDate).toLocaleDateString()}
                    </p>
                  </div>
                )}

                {subscription.nextBillingDate && (
                  <div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Next Billing</span>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {new Date(subscription.nextBillingDate).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {subscription.status === 'ACTIVE' && (
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={handleCancelSubscription}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Cancel Subscription
              </button>
            </div>
          )}
        </div>

        {/* Usage Stats - Custom Plan Only */}
        {subscription.planType === 'CUSTOM' && usageStats && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Current Month Usage
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <div className="text-sm text-blue-600 dark:text-blue-400 mb-1">
                  Bills Generated
                </div>
                <div className="text-3xl font-bold text-blue-700 dark:text-blue-300">
                  {usageStats.currentMonthBills}
                </div>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                <div className="text-sm text-green-600 dark:text-green-400 mb-1">
                  Current Cost
                </div>
                <div className="text-3xl font-bold text-green-700 dark:text-green-300">
                  ₹{usageStats.currentMonthCost}
                </div>
              </div>

              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                <div className="text-sm text-purple-600 dark:text-purple-400 mb-1">
                  Rate per Bill
                </div>
                <div className="text-3xl font-bold text-purple-700 dark:text-purple-300">
                  ₹{usageStats.billRate}
                </div>
              </div>
            </div>

            <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                <strong>Note:</strong> You will be billed on the 11th of next month for {usageStats.currentMonthBills} bills = ₹{usageStats.currentMonthCost}
              </p>
            </div>
          </div>
        )}

        {/* Overall Statistics */}
        {stats && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Overall Statistics
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-700 dark:text-gray-300">All Time</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      Total Bills
                    </div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stats.allTime.totalBills}
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      Total Spent
                    </div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      ₹{stats.allTime.totalSpent.toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-gray-700 dark:text-gray-300">Current Month</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      Bills Generated
                    </div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stats.currentMonth.billsGenerated}
                    </div>
                  </div>
                  {subscription.planType === 'CUSTOM' && (
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        Estimated Cost
                      </div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        ₹{stats.currentMonth.estimatedCost}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Monthly Usage Chart - Custom Plan */}
            {subscription.planType === 'CUSTOM' && stats.monthlyUsage && stats.monthlyUsage.length > 0 && (
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-4">
                  Last 6 Months Usage
                </h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-300">Month</th>
                        <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-300">Bills Generated</th>
                        <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-300">Cost</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.monthlyUsage.map((item, index) => (
                        <tr key={index} className="border-t border-gray-200 dark:border-gray-700">
                          <td className="px-4 py-2 text-gray-900 dark:text-white">
                            {new Date(item.year, item.month - 1).toLocaleString('default', { month: 'short', year: 'numeric' })}
                          </td>
                          <td className="px-4 py-2 text-gray-900 dark:text-white">
                            {item.billsGenerated}
                          </td>
                          <td className="px-4 py-2 text-gray-900 dark:text-white">
                            ₹{item.cost}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Billing History */}
        {bills.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Billing History
            </h2>
            
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-300">Bill Number</th>
                    <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-300">Plan</th>
                    <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-300">Period</th>
                    <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-300">Amount</th>
                    <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-300">Status</th>
                    <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-300">Due Date</th>
                  </tr>
                </thead>
                <tbody>
                  {bills.map((bill) => (
                    <tr key={bill.id} className="border-t border-gray-200 dark:border-gray-700">
                      <td className="px-4 py-2 text-gray-900 dark:text-white font-medium">
                        {bill.billNumber}
                      </td>
                      <td className="px-4 py-2 text-gray-900 dark:text-white">
                        {getPlanName(bill.planType)}
                        {bill.billsCount && ` (${bill.billsCount} bills)`}
                      </td>
                      <td className="px-4 py-2 text-gray-900 dark:text-white">
                        {new Date(bill.billingYear, bill.billingMonth - 1).toLocaleString('default', { month: 'short', year: 'numeric' })}
                      </td>
                      <td className="px-4 py-2 text-gray-900 dark:text-white font-semibold">
                        ₹{bill.amount}
                      </td>
                      <td className="px-4 py-2">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          bill.status === 'PAID' 
                            ? 'bg-green-100 text-green-800' 
                            : bill.status === 'OVERDUE'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {bill.status}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-gray-900 dark:text-white">
                        {new Date(bill.dueDate).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubscriptionDashboard;