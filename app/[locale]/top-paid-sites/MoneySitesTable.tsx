"use client"

import { useState, useEffect } from "react"
import { ArrowDown, ArrowUp, ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from "lucide-react"
import type { MoneyMakingSite } from "@/lib/types"

interface MoneySitesTableProps {
  initialData: MoneyMakingSite[]
}

export default function MoneySitesTable({ initialData }: MoneySitesTableProps) {
  const [moneyMakingSites] = useState<MoneyMakingSite[]>(initialData)
  const [data, setData] = useState<MoneyMakingSite[]>([])
  const [platform, setPlatform] = useState<string>("Stripe")
  const [viewMode, setViewMode] = useState<string>("")
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [filteredData, setFilteredData] = useState<MoneyMakingSite[]>([])
  const [sortField, setSortField] = useState<string>("traffic")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const itemsPerPage = 20

  useEffect(() => {
    // Filter data based on selected platform and view mode
    filterData(platform, viewMode)
  }, [platform, viewMode, moneyMakingSites])

  useEffect(() => {
    // Sort and update displayed data based on current page and sort settings
    const sorted = sortData([...filteredData], sortField, sortDirection)
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    setData(sorted.slice(startIndex, endIndex))
  }, [currentPage, filteredData, sortField, sortDirection])

  const filterData = (selectedPlatform: string, selectedViewMode: string) => {
    let filtered = [...moneyMakingSites].filter((item) => item.platform === selectedPlatform)

    if (selectedViewMode === "newly") {
      filtered = filtered.filter((item) => item.change === "New")
    } else if (selectedViewMode === "trending") {
      filtered = filtered.filter((item) => {
        const changeValue = item.change.replace("%", "")
        return !isNaN(Number.parseFloat(changeValue)) && Number.parseFloat(changeValue) > 10
      })
    }

    setFilteredData(filtered)
    setCurrentPage(1) // Reset to first page when filter changes

    // Always reset to traffic sorting in descending order
    setSortField("traffic")
    setSortDirection("desc")

    // Apply sorting
    const sorted = sortData(filtered, "traffic", "desc")
    setData(sorted.slice(0, itemsPerPage))
  }

  const sortData = (data: MoneyMakingSite[], field: string, direction: "asc" | "desc") => {
    return [...data].sort((a, b) => {
      let valueA, valueB

      if (field === "traffic") {
        valueA = Number.parseFloat(a.traffic)
        valueB = Number.parseFloat(b.traffic)
      } else if (field === "change") {
        // Special handling for "New" and percentage values
        if (a.change === "New" && b.change === "New") {
          return 0 // Both are "New", keep original order
        }

        // Extract numeric values for non-"New" items
        const aIsNew = a.change === "New"
        const bIsNew = b.change === "New"
        const aValue = aIsNew ? 0 : Number.parseFloat(a.change.replace("%", ""))
        const bValue = bIsNew ? 0 : Number.parseFloat(b.change.replace("%", ""))

        // Handle positive, negative, and "New" values
        if (direction === "desc") {
          // For descending order: positive values, then "New", then negative values
          if (aValue > 0 && bValue <= 0) return -1
          if (aValue <= 0 && bValue > 0) return 1
          if (aIsNew && bValue > 0) return 1 // "New" comes after positive
          if (aIsNew && bValue < 0) return -1 // "New" comes before negative
          if (bIsNew && aValue > 0) return -1 // "New" comes after positive
          if (bIsNew && aValue < 0) return 1 // "New" comes before negative
          return bValue - aValue // Normal numeric comparison
        } else {
          // For ascending order: negative values, then "New", then positive values
          if (aValue < 0 && bValue >= 0) return -1
          if (aValue >= 0 && bValue < 0) return 1
          if (aIsNew && bValue < 0) return 1 // "New" comes after negative
          if (aIsNew && bValue > 0) return -1 // "New" comes before positive
          if (bIsNew && aValue < 0) return -1 // "New" comes after negative
          if (bIsNew && aValue > 0) return 1 // "New" comes before positive
          return aValue - bValue // Normal numeric comparison
        }
      } else {
        return 0
      }

      if (direction === "asc") {
        return valueA - valueB
      } else {
        return valueB - valueA
      }
    })
  }

  const handleSort = (field: string) => {
    if (sortField === field) {
      // Toggle direction if clicking the same field
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      // Set new field and default to descending
      setSortField(field)
      setSortDirection("desc")
    }
  }

  const formatTraffic = (traffic: string) => {
    const value = Number.parseFloat(traffic)
    if (value >= 1000000) {
      return (value / 1000000).toFixed(1) + "M"
    } else if (value >= 1000) {
      return (value / 1000).toFixed(1) + "K"
    }
    return traffic
  }

  const formatTrafficShare = (trafficShare: string) => {
    const value = Number.parseFloat(trafficShare.replace("%", ""))
    if (!isNaN(value)) {
      return value.toFixed(2) + "%"
    }
    return trafficShare
  }

  const getTrafficShareWidth = (trafficShare: string) => {
    try {
      if (!trafficShare) return 0;
      
      // 移除所有非数字和小数点字符
      const cleanValue = trafficShare.replace(/[^0-9.]/g, '');
      
      // 解析为浮点数
      const value = parseFloat(cleanValue);
      
      // 数值检查
      if (isNaN(value)) {
        console.error('无法解析trafficShare值:', trafficShare);
        return 0;
      }
      
      // 确保至少有0.5%的宽度，最大100%
      return Math.max(0.5, Math.min(value, 100));
    } catch (error) {
      console.error('处理trafficShare时出错:', error);
      return 0;
    }
  }

  const getChangeDisplay = (change: string) => {
    if (change === "New") {
      return (
        <span className="flex items-center text-green-500">
          <ArrowUp className="h-4 w-4 mr-1" />
          New
        </span>
      )
    }

    const value = Number.parseFloat(change.replace("%", ""))
    if (isNaN(value)) return change

    const formattedValue = value.toFixed(2)

    if (value > 0) {
      return (
        <span className="flex items-center text-green-500">
          <ArrowUp className="h-4 w-4 mr-1" />
          {formattedValue}%
        </span>
      )
    } else if (value < 0) {
      return (
        <span className="flex items-center text-red-500">
          <ArrowDown className="h-4 w-4 mr-1" />
          {Math.abs(value).toFixed(2)}%
        </span>
      )
    }
    return formattedValue + "%"
  }

  const totalPages = Math.ceil(filteredData.length / itemsPerPage)

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return
    setCurrentPage(page)
  }

  const getSortIcon = (field: string) => {
    if (sortField !== field) {
      return <ChevronDown className="h-4 w-4 ml-1 opacity-50" />
    }
    return sortDirection === "asc" ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />
  }

  return (
    <>
      {/* Platform Filter */}
      <div className="mb-6">
        <div className="inline-flex border rounded-md overflow-hidden">
          <button
            className={`px-4 py-2 ${platform === "Stripe" ? "bg-blue-500 text-white" : "bg-white"}`}
            onClick={() => {
              setPlatform("Stripe")
              setViewMode("")
              setSortField("traffic")
              setSortDirection("desc")
            }}
          >
            Stripe
          </button>
          <button
            className={`px-4 py-2 ${platform === "PayPal" ? "bg-blue-500 text-white" : "bg-white"}`}
            onClick={() => {
              setPlatform("PayPal")
              setViewMode("")
              setSortField("traffic")
              setSortDirection("desc")
            }}
          >
            PayPal
          </button>
        </div>
      </div>

      {/* View Mode Filter */}
      <div className="flex justify-end mb-6">
        <div className="inline-flex border rounded-md overflow-hidden">
          <button
            className={`px-4 py-2 ${viewMode === "newly" ? "bg-blue-500 text-white" : "bg-white"}`}
            onClick={() => {
              setViewMode("newly")
              setSortField("traffic")
              setSortDirection("desc")
            }}
          >
            Newly Discovered
          </button>
          <button
            className={`px-4 py-2 ${viewMode === "trending" ? "bg-blue-500 text-white" : "bg-white"}`}
            onClick={() => {
              setViewMode("trending")
              setSortField("traffic")
              setSortDirection("desc")
            }}
          >
            Trending Websites
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border table-fixed">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th 
                scope="col" 
                className="px-6 py-3.5 text-left text-sm font-semibold text-gray-900 sm:pl-0 cursor-pointer"
                style={{ width: '200px' }}
                onClick={() => handleSort('domain')}
              >
                <div className="flex items-center">
                  Domain
                </div>
              </th>
              <th 
                scope="col" 
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer"
                style={{ width: '150px' }}
                onClick={() => handleSort('industry')}
              >
                <div className="flex items-center">
                  Industry
                </div>
              </th>
              <th 
                scope="col" 
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer"
                style={{ width: '100px' }}
                onClick={() => handleSort('globalRank')}
              >
                <div className="flex items-center">
                  Global Rank
                </div>
              </th>
              <th 
                scope="col" 
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer"
                style={{ width: '250px' }}
                onClick={() => handleSort('trafficShare')}
              >
                <div className="flex items-center">
                  Traffic Share
                  {getSortIcon('trafficShare')}
                </div>
              </th>
              <th 
                scope="col" 
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer"
                style={{ width: '100px' }}
                onClick={() => handleSort('change')}
              >
                <div className="flex items-center">
                  Change
                  {getSortIcon('change')}
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-4 text-center text-sm text-gray-500">
                  No data found
                </td>
              </tr>
            ) : (
              data.map((site) => (
                <tr key={site._id}>
                  <td 
                    className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0 truncate" 
                    style={{ width: '200px' }}
                  >
                    {site.domain}
                  </td>
                  <td 
                    className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 truncate" 
                    style={{ width: '150px' }}
                  >
                    {site.industry || '-'}
                  </td>
                  <td 
                    className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 truncate" 
                    style={{ width: '100px' }}
                  >
                    {site.globalRank ? `#${site.globalRank}` : '-'}
                  </td>
                  <td 
                    className="whitespace-nowrap px-3 py-4 text-sm text-gray-500" 
                    style={{ width: '250px' }}
                  >
                    <div className="flex items-center">
                      <span className="mr-2 truncate">{formatTraffic(site.traffic)}</span>
                      <div className="w-16 bg-gray-200 rounded-full h-2.5 shrink-0">
                        <div 
                          className="bg-blue-600 h-2.5 rounded-full" 
                          style={{ width: `${getTrafficShareWidth(site.trafficShare)}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500 ml-1 truncate">
                        {formatTrafficShare(site.trafficShare)}
                      </span>
                    </div>
                  </td>
                  <td 
                    className="whitespace-nowrap px-3 py-4 text-sm truncate" 
                    style={{ width: '100px' }}
                  >
                    {getChangeDisplay(site.change)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 mt-4">
          <div className="flex flex-1 justify-between sm:hidden">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium ${
                currentPage === 1 ? "text-gray-300" : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              Previous
            </button>
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium ${
                currentPage === totalPages ? "text-gray-300" : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{" "}
                <span className="font-medium">{Math.min(currentPage * itemsPerPage, filteredData.length)}</span> of{" "}
                <span className="font-medium">{filteredData.length}</span> results
              </p>
            </div>
            <div>
              <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center rounded-l-md px-2 py-2 ${
                    currentPage === 1 ? "text-gray-300" : "text-gray-400 hover:bg-gray-50"
                  }`}
                >
                  <span className="sr-only">Previous</span>
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>

                {/* Page numbers */}
                {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                  let pageNum

                  // Logic to show appropriate page numbers
                  if (totalPages <= 5) {
                    pageNum = i + 1
                  } else if (currentPage <= 3) {
                    pageNum = i + 1
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i
                  } else {
                    pageNum = currentPage - 2 + i
                  }

                  return (
                    <button
                      key={i}
                      onClick={() => goToPage(pageNum)}
                      className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                        currentPage === pageNum
                          ? "z-10 bg-blue-500 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                          : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"
                      }`}
                    >
                      {pageNum}
                    </button>
                  )
                })}

                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`relative inline-flex items-center rounded-r-md px-2 py-2 ${
                    currentPage === totalPages ? "text-gray-300" : "text-gray-400 hover:bg-gray-50"
                  }`}
                >
                  <span className="sr-only">Next</span>
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  )
} 