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

    return (clicksNum * cpmNum * adCountNum * pagesPerVisitNum) / 1000;
  };

  return (
    <div className="mb-4 px-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Monthly Ad Revenue Calculator</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">  
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Monthly Visits(Unique Visitors)
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
            Pages per Visit(Average)
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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ads per Page(AD units displayed per page)
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
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
            CPM ($)
            <span className="ml-1 group relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block w-64 px-4 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg">
              Here are some rough reference ranges, US: $5 - $10 ; Canada: $4 - $8; UK: $4 - $8; Australia: $4 - $8; Germany: $3 - $7; France: $3 - $6; Japan: $2 - $5; India: $0.5 - $2; Brazil: $0.5 - $2; China: $0.5 - $2.  
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
              step="0.01"
              value={cpm}
              onChange={(e) => setCpm(e.target.value)}
              className="block w-full rounded-md border-gray-300 pl-7 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter CPM"
            />
          </div>
        </div>

      </div>

      <div className="mt-2 p-2 bg-blue-50 rounded-md">
        <h2 className="text-2x text-blue-700">
          Estimated Monthly Ad Revenue: <span className="font-semibold">${calculateRevenue().toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        </h2>
      </div>

      <div className="mt-2 text-sm text-gray-600">
        <p><strong>Note:</strong> Actual CPM based on your website content, audience, and ad types. For accurate data, use Google AdSense reporting tools.</p>
        <p>
          <strong>Formula:</strong> Monthly Visits  × Pages per Visit× Ads per Page × CPM ÷ 1000
        </p>
      </div>
    </div>
  );
} 