'use client';

import { useState } from 'react';

export default function ADCalculator() {
  const [clicks, setClicks] = useState('');
  const [clicksUnit, setClicksUnit] = useState('K');
  const [cpm, setCpm] = useState('');
  const [adCount, setAdCount] = useState('1');
  const [pagesPerVisit, setPagesPerVisit] = useState('1.5');

  const calculateRevenue = () => {
    const clicksNum = parseFloat(clicks) * (clicksUnit === 'M' ? 1000000 : 1000);
    const cpmNum = parseFloat(cpm);
    const adCountNum = parseFloat(adCount);
    const pagesPerVisitNum = parseFloat(pagesPerVisit);
    
    if (isNaN(clicksNum) || isNaN(cpmNum) || isNaN(adCountNum) || isNaN(pagesPerVisitNum)) {
      return 0;
    }
    
    // 计算月收入：点击量 * 每千次展示价格 * 广告数量 * 每次访问页面数 / 1000
    return (clicksNum * cpmNum * adCountNum * pagesPerVisitNum) / 1000;
  };

  return (
    <div className="mb-8 p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Monthly Ad Revenue Calculator</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Monthly Visits
          </label>
          <div className="flex">
            <input
              type="number"
              min="1"
              value={clicks}
              onChange={(e) => setClicks(e.target.value)}
              className="block w-full rounded-l-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter visits"
            />
            <select 
              value={clicksUnit}
              onChange={(e) => setClicksUnit(e.target.value)}
              className="rounded-r-md border-l-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm"
            >
              <option value="K">K</option>
              <option value="M">M</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            CPM ($)
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="number"
              min="0"
              step="0.01"
              value={cpm}
              onChange={(e) => setCpm(e.target.value)}
              className="block w-full rounded-md border-gray-300 pl-7 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter CPM"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ads per Page
          </label>
          <input
            type="number"
            min="1"
            value={adCount}
            onChange={(e) => setAdCount(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter ad count"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Pages per Visit
          </label>
          <input
            type="number"
            min="0.01"
            step="0.01"
            value={pagesPerVisit}
            onChange={(e) => setPagesPerVisit(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter pages per visit"
          />
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-md">
        <p className="text-sm text-blue-700">
          Estimated Monthly Ad Revenue: <span className="font-semibold">${calculateRevenue().toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        </p>
      </div>

      <div className="mt-4 text-sm text-gray-600">
        <p className="mb-2">
          This calculator helps estimate potential monthly ad revenue based on:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Monthly Visits:</strong> Total number of page views your site receives per month</li>
          <li><strong>CPM (Cost Per Mille):</strong> Amount advertisers pay per 1,000 impressions</li>
          <li><strong>Ads per Page:</strong> Number of ad units displayed on each page</li>
          <li><strong>Pages per Visit:</strong> Average number of pages a visitor views during each session</li>
        </ul>
        <p className="mt-2">
          Formula: Monthly Visits × CPM × Ads per Page × Pages per Visit ÷ 1000
        </p>
      </div>
    </div>
  );
} 