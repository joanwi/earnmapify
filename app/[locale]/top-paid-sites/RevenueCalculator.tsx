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
    <div className="mb-8 p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Revenue Calculator</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Traffic
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
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Average Order Value
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

      <div className="mt-6 p-4 bg-blue-50 rounded-md">
        <h2 className="text-2x text-blue-700">
          Estimated Monthly Revenue: <span className="font-semibold">${calculateRevenue().toLocaleString()}</span>
        </h2>
      </div>
      <div className="mt-4 text-sm text-gray-600">
        <p className="mb-2">
        This calculator can help estimate the potential monthly revenue of subscription/payment websites::
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Traffic:</strong> The number of monthly visitors from the target website to the payment platform (such as Stripe/PayPal).(k: thousands, m: millions)</li>
          <li><strong>Average Order Value:</strong> The typical price of the product/service on the pricing page of the target website (you can check the pricelist on the target website)</li>
          <li><strong>Note:</strong> The actual revenue may have some errors, such as unsuccessful payment or visitor cancellation; this data is for reference only, if you have any questions, please feel free to leave a message to communicate</li>  
        </ul>
        <p className="mt-2">
          Formula: Monthly Payment Page Visitors × Average Order Value
        </p>
      </div>
    </div>
  );
} 