/* eslint-disable react/no-unescaped-entities */
'use client';

import { useState } from 'react';

export default function RevenueCalculator() {
  const [traffic, setTraffic] = useState('');
  const [trafficUnit, setTrafficUnit] = useState('K');
  const [orderValue, setOrderValue] = useState('');

  const calculateRevenue = () => {
    const trafficNum = parseFloat(traffic) * (trafficUnit === 'M' ? 1000000 : 1000);
    const orderValueNum = parseFloat(orderValue);

    if (isNaN(trafficNum) || isNaN(orderValueNum)) {
      return 0;
    }

    return trafficNum * orderValueNum;
  };

  return (
    <div className="mb-6 px-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Revenue Calculator</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
            Monthly Traffic
            <span className="ml-1 group relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block w-64 px-4 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg">
                The number of monthly visitors from the target website to the payment platform (such as Stripe/PayPal).(K: thousands, M: millions)
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
              </div>
            </span>
          </label>
          <div className="flex">
            <input
              type="number"
              min="1"
              value={traffic}
              onChange={(e) => setTraffic(e.target.value)}
              className="block w-full rounded-l-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter traffic"
            />
            <select
              value={trafficUnit}
              onChange={(e) => setTrafficUnit(e.target.value)}
              className="rounded-r-md border-l-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm"
            >
              <option value="K">K</option>
              <option value="M">M</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
            Average Order Value
            <span className="ml-1 group relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block w-64 px-4 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg">
                The typical price of the product/service on the pricing page of the target website (you can check the pricelist on the target website)
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
              </div>
            </span>
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="number"
              min="0"
              value={orderValue}
              onChange={(e) => setOrderValue(e.target.value)}
              className="block w-full rounded-md border-gray-300 pl-7 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter value"
            />
          </div>
        </div>
      </div>

      <div className="mt-2 p-2 bg-blue-50 rounded-md">
        <h2 className="text-2x text-blue-700">
          Estimated Monthly Revenue: <span className="font-semibold">${calculateRevenue().toLocaleString()}</span>
        </h2>
      </div>
      <div className="mt-2 text-sm text-gray-600">    
        <p>
          This calculator can help estimate the potential monthly revenue of subscription/payment websites:
        </p>
        <strong>Note:</strong> The actual revenue may have some errors, such as unsuccessful payment or visitor cancellation; this data is for reference only, if you have any questions, please feel free to leave a message to communicate.
        <p>
          Formula: Monthly Payment Page Visitors × Average Order Value
        </p>
      </div>
    </div>
  );
} 