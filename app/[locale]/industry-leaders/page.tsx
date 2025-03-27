"use client"

import { useState, useEffect } from "react"
import { ArrowDown, ArrowUp, ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from "lucide-react"
import type { IndustryLeader } from "@/lib/types"

export default function Home() {
  const [industryLeaders, setIndustryLeaders] = useState<IndustryLeader[]>([])
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<IndustryLeader[]>([])
  const [industry, setIndustry] = useState<string>("games") // 默认行业为 games
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [filteredData, setFilteredData] = useState<IndustryLeader[]>([])
  const [sortField, setSortField] = useState<string>("trafficShare")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const itemsPerPage = 20

  // 从API获取数据
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/industryleaders')
        if (!response.ok) {
          throw new Error('Failed to fetch data')
        }
        const data = await response.json()

        setIndustryLeaders(data)
      } catch (error) {
        console.error('Error fetching data:', error)
        setIndustryLeaders([])
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  // 根据行业过滤数据
  useEffect(() => {
    filterData(industry)
  }, [industry, industryLeaders])

  // 根据分页和排序更新显示数据
  useEffect(() => {
    const sorted = sortData([...filteredData], sortField, sortDirection)
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    setData(sorted.slice(startIndex, endIndex))
  }, [currentPage, filteredData, sortField, sortDirection])

  // 数据过滤函数
  const filterData = (selectedIndustry: string) => {
    const filtered = [...industryLeaders].filter((item) => item.industry === selectedIndustry)

    setFilteredData(filtered)
    setCurrentPage(1) // 重置到第一页
    setSortField("trafficShare")
    setSortDirection("desc")

    const sorted = sortData(filtered, "trafficShare", "desc")
    setData(sorted.slice(0, itemsPerPage))
  }

  // 格式化流量数据
  const formatTraffic = (traffic: string) => {
    if (!traffic) return "0"
    
    try {
      const numTraffic = parseInt(String(traffic).replace(/,/g, ''))
      if (isNaN(numTraffic)) return "0"
      
      if (numTraffic >= 1000000) return (numTraffic / 1000000).toFixed(1) + "M"
      if (numTraffic >= 1000) return (numTraffic / 1000).toFixed(1) + "K"
      return numTraffic.toString()
    } catch (error) {
      return "0"
    }
  }

  // 数据排序函数
  const sortData = (data: IndustryLeader[], field: string, direction: "asc" | "desc") => {
    return [...data].sort((a, b) => {
      let valueA, valueB

      if (field === "trafficShare" || field === "desktopShare" || field === "mobileShare") {
        valueA = parseFloat(String(a[field]).replace("%", ""))
        valueB = parseFloat(String(b[field]).replace("%", ""))
      } else if (field === "momTrafficChange") {
        const aValue = a.momTrafficChange === "New" ? 100 : parseFloat(a.momTrafficChange.replace("%", ""))
        const bValue = b.momTrafficChange === "New" ? 100 : parseFloat(b.momTrafficChange.replace("%", ""))
        valueA = aValue
        valueB = bValue
      } else if (field === "countryRank") {
        valueA = a.countryRank
        valueB = b.countryRank
      } else if (field === "monthlyVisits" || field === "uniqueVisitors") {
        valueA = parseInt(String(a[field]).replace(/,/g, ''))
        valueB = parseInt(String(b[field]).replace(/,/g, ''))
      } else {
        return 0
      }

      return direction === "asc" ? valueA - valueB : valueB - valueA
    })
  }

  // 处理排序
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("desc")
    }
  }

  // 格式化流量占比
  const formatTrafficShare = (trafficShare: string) => {
    if (!trafficShare) return "0.00%"
    const value = parseFloat(trafficShare.replace("%", ""))
    if (!isNaN(value)) {
      return value.toFixed(2) + "%"
    }
    return trafficShare
  }

  // 显示变化数据
  const getChangeDisplay = (change: string) => {
    if (!change) return "0.00%"
    if (change === "New") {
      return (
        <span className="flex items-center text-green-500">
          <ArrowUp className="h-4 w-4 mr-1" />
          New
        </span>
      )
    }
    const value = parseFloat(change.replace("%", ""))
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
    if (sortField !== field) return <ChevronDown className="h-4 w-4 ml-1 opacity-50" />
    return sortDirection === "asc" ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold mb-2">Industry Leaders</h1>
        <p className="text-gray-600 mb-6">Discover top performing websites in games and tools categories</p>

        {/* 行业过滤器 */}
        <div className="mb-6">
          <div className="inline-flex border rounded-md overflow-hidden">
            <button
              className={`px-4 py-2 cursor-pointer hover:bg-blue-100 ${industry === "games" ? "bg-blue-500 text-white hover:bg-blue-600" : "bg-white"}`}
              onClick={() => {
                setIndustry("games")
                setSortField("trafficShare")
                setSortDirection("desc")
              }}
            >
              Games
            </button>
            <button
              className={`px-4 py-2 cursor-pointer hover:bg-blue-100 ${industry === "tools" ? "bg-blue-500 text-white hover:bg-blue-600" : "bg-white"}`}
              onClick={() => {
                setIndustry("tools")
                setSortField("trafficShare")
                setSortDirection("desc")
              }}
            >
              Tools
            </button>
          </div>
        </div>

        {/* Loading 状态的表格 */}
        <div>
          <table className="w-full bg-white border table-fixed">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="w-2/12 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Domain</th>
                <th className="w-1/12 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center">
                    Traffic Share
                    <ChevronDown className="h-4 w-4 ml-1 opacity-50" />
                  </div>
                </th>
                <th className="w-1/12 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center">
                    MoM Change
                    <ChevronDown className="h-4 w-4 ml-1 opacity-50" />
                  </div>
                </th>
                <th className="w-1/12 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center">
                    Country Rank
                    <ChevronDown className="h-4 w-4 ml-1 opacity-50" />
                  </div>
                </th>
                <th className="w-2/12 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center">
                    Monthly Visits
                    <ChevronDown className="h-4 w-4 ml-1 opacity-50" />
                  </div>
                </th>
                <th className="w-2/12 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center">
                    Unique Visits
                    <ChevronDown className="h-4 w-4 ml-1 opacity-50" />
                  </div>
                </th>
                <th className="w-1/12 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center">
                    Desktop
                    <ChevronDown className="h-4 w-4 ml-1 opacity-50" />
                  </div>
                </th>
                <th className="w-1/12 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center">
                    Mobile
                    <ChevronDown className="h-4 w-4 ml-1 opacity-50" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={8} className="px-6 py-4">
                  <div className="flex justify-center items-center h-32">
                    <div className="text-gray-500">Loading data...</div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-2">Industry Leaders</h1>
      <p className="text-gray-600 mb-6">Discover top performing websites in games and tools categories</p>

      {/* 行业过滤器 */}
      <div className="mb-6">
        <div className="inline-flex border rounded-md overflow-hidden">
          <button
            className={`px-4 py-2 cursor-pointer hover:bg-blue-100 ${industry === "games" ? "bg-blue-500 text-white hover:bg-blue-600" : "bg-white"}`}
            onClick={() => {
              setIndustry("games")
              setSortField("trafficShare")
              setSortDirection("desc")
            }}
          >
            Games
          </button>
          <button
            className={`px-4 py-2 cursor-pointer hover:bg-blue-100 ${industry === "tools" ? "bg-blue-500 text-white hover:bg-blue-600" : "bg-white"}`}
            onClick={() => {
              setIndustry("tools")
              setSortField("trafficShare")
              setSortDirection("desc")
            }}
          >
            Tools
          </button>
        </div>
      </div>

      {/* 数据表格 */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border table-fixed">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="w-2/12 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Domain</th>
              <th className="w-1/12 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort("trafficShare")}>
                <div className="flex items-center">
                  Traffic Share
                  {getSortIcon("trafficShare")}
                </div>
              </th>
              <th className="w-1/12 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort("momTrafficChange")}>
                <div className="flex items-center">
                  MoM Change
                  {getSortIcon("momTrafficChange")}
                </div>
              </th>
              <th className="w-1/12 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort("countryRank")}>
                <div className="flex items-center">
                  Country Rank
                  {getSortIcon("countryRank")}
                </div>
              </th>
              <th className="w-2/12 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort("monthlyVisits")}>
                <div className="flex items-center">
                  Monthly Visits
                  {getSortIcon("monthlyVisits")}
                </div>
              </th>
              <th className="w-2/12 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort("uniqueVisitors")}>
                <div className="flex items-center">
                  Unique Visits
                  {getSortIcon("uniqueVisitors")}
                </div>
              </th>
              <th className="w-1/12 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort("desktopShare")}>
                <div className="flex items-center">
                  Desktop
                  {getSortIcon("desktopShare")}
                </div>
              </th>
              <th className="w-1/12 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort("mobileShare")}>
                <div className="flex items-center">
                  Mobile
                  {getSortIcon("mobileShare")}
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-6 py-4 text-center text-gray-500">
                  No data found for the selected industry
                </td>
              </tr>
            ) : (
              data.map((site) => (
                <tr key={site._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{site.domain}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{formatTrafficShare(site.trafficShare)}</td>
                  <td className="px-6 py-4 text-sm">{getChangeDisplay(site.momTrafficChange)}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">#{site.countryRank}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{formatTraffic(site.monthlyVisits)}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{formatTraffic(site.uniqueVisitors)}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{formatTrafficShare(site.desktopShare)}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{formatTrafficShare(site.mobileShare)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 分页 */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 mt-4">
          <div className="flex flex-1 justify-between sm:hidden">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium ${currentPage === 1 ? "text-gray-300" : "text-gray-700 hover:bg-gray-50"
                }`}
            >
              Previous
            </button>
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium ${currentPage === totalPages ? "text-gray-300" : "text-gray-700 hover:bg-gray-50"
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
                  className={`relative inline-flex items-center rounded-l-md px-2 py-2 ${currentPage === 1 ? "text-gray-300" : "text-gray-400 hover:bg-gray-50"
                    }`}
                >
                  <span className="sr-only">Previous</span>
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>
                {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                  let pageNum
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
                      className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${currentPage === pageNum
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
                  className={`relative inline-flex items-center rounded-r-md px-2 py-2 ${currentPage === totalPages ? "text-gray-300" : "text-gray-400 hover:bg-gray-50"
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
    </div>
  )
}