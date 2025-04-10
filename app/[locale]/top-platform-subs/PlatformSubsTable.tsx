"use client"

import { useState, useEffect } from "react"
import { ArrowDown, ArrowUp, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, ExternalLink } from "lucide-react"
import type { PlatformSubs } from "@/lib/types"
import { useTranslations } from "next-intl";
interface PlatformSubsTableProps {
  initialData: PlatformSubs[]
}

export default function PlatformSubsTable({ initialData }: PlatformSubsTableProps) {  
  const t = useTranslations('platformTable');
  const [platformSubs] = useState<PlatformSubs[]>(initialData)
  const [data, setData] = useState<PlatformSubs[]>([])
  const [platform, setPlatform] = useState<string>("vercel.app")
  const [viewMode, setViewMode] = useState<string>("")
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [filteredData, setFilteredData] = useState<PlatformSubs[]>([])
  const [sortField, setSortField] = useState<string>("clicks")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const itemsPerPage = 20

  // 初始化数据
  useEffect(() => {
    filterData(platform, viewMode)
  }, [platform, viewMode, platformSubs])

  // 更新分页数据
  useEffect(() => {
    const sorted = sortData([...filteredData], sortField, sortDirection)
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    setData(sorted.slice(startIndex, endIndex))
  }, [currentPage, filteredData, sortField, sortDirection])

  // 格式化点击量
  const formatClicks = (clicks: number | string | undefined) => {
    if (clicks === undefined) return "0"
    // 移除所有逗号并转换为数字
    const numClicks = typeof clicks === 'number'
      ? clicks
      : parseInt(String(clicks || '0').replace(/,/g, ''))
    if (numClicks >= 1000000) return (numClicks / 1000000).toFixed(1) + "M"
    if (numClicks >= 1000) return (numClicks / 1000).toFixed(1) + "K"
    return numClicks.toString()
  }

  // 获取进度条宽度百分比
  const getWidthPercentage = (trafficShare: string | undefined) => {
    try {
      if (!trafficShare) return 0;
      const cleanValue = trafficShare.replace(/[^0-9.]/g, '');       // 移除所有非数字和小数点字符

      const value = parseFloat(cleanValue);      // 解析为浮点数
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

  // 数据过滤函数
  const filterData = (selectedPlatform: string, selectedViewMode: string) => {
    let filtered = [...platformSubs].filter((item) => item.platform === selectedPlatform)

    if (selectedViewMode === "trending") {
      filtered = filtered.filter((item) => {
        if (!item.change) return false
        const changeValue = item.change.replace("%", "")
        return !isNaN(Number.parseFloat(changeValue)) && Number.parseFloat(changeValue) > 10
      })
    } else if (selectedViewMode === "new") {
      filtered = filtered.filter((item) => (item.change || '') === "New")
    }

    setFilteredData(filtered)
    setCurrentPage(1)
    setSortField("clicks")
    setSortDirection("desc")

    const sorted = sortData(filtered, "clicks", "desc")
    setData(sorted.slice(0, itemsPerPage))
  }

  // 数据排序函数
  const sortData = (data: PlatformSubs[], field: string, direction: "asc" | "desc") => {
    return [...data].sort((a, b) => {
      let valueA: number, valueB: number

      if (field === "clicks") {
        valueA = typeof a.clicks === 'number'
          ? a.clicks
          : parseInt(String(a.clicks || '0').replace(/,/g, ''))
        valueB = typeof b.clicks === 'number'
          ? b.clicks
          : parseInt(String(b.clicks || '0').replace(/,/g, ''))
      } else if (field === "change") {
        if ((a.change || '') === "New" && (b.change || '') === "New") return 0

        const aIsNew = (a.change || '') === "New"
        const bIsNew = (b.change || '') === "New"
        const aValue = aIsNew ? 0 : Number.parseFloat((a.change || '0').replace("%", ""))
        const bValue = bIsNew ? 0 : Number.parseFloat((b.change || '0').replace("%", ""))

        if (direction === "desc") {
          if (aValue > 0 && bValue <= 0) return -1
          if (aValue <= 0 && bValue > 0) return 1
          if (aIsNew && bValue > 0) return 1
          if (aIsNew && bValue < 0) return -1
          if (bIsNew && aValue > 0) return -1
          if (bIsNew && aValue < 0) return 1
          return bValue - aValue
        } else {
          if (aValue < 0 && bValue >= 0) return -1
          if (aValue >= 0 && bValue < 0) return 1
          if (aIsNew && bValue < 0) return 1
          if (aIsNew && bValue > 0) return -1
          if (bIsNew && aValue < 0) return -1
          if (bIsNew && aValue > 0) return 1
          return aValue - bValue
        }
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
  const formatTrafficShare = (trafficShare: string | undefined) => {
    try {
      if (!trafficShare) return "0.00%";
      
      // 移除所有非数字和小数点字符
      const cleanValue = trafficShare.replace(/[^0-9.]/g, '');
      
      // 解析为浮点数
      const value = parseFloat(cleanValue);
      
      if (isNaN(value)) return "0.00%";
      
      // 保留两位小数并添加百分号
      return value.toFixed(2) + "%";
    } catch (error) {
      console.error("格式化trafficShare时出错:", error);
      return "0.00%";
    }
  }

  // 显示变化数据
  const getChangeDisplay = (change?: string) => {
    if (!change) return "0.00%"
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
    if (sortField !== field) return <ChevronDown className="h-4 w-4 ml-1 opacity-50" />
    return sortDirection === "asc" ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />
  }

  const handleKeywordClick = (keyword: string) => {
    window.open(`https://www.google.com/search?q=${encodeURIComponent(keyword)}`, "_blank")
  }

  return (
    <>
      {/* 平台过滤器 */}
      <div className="mb-2">
        <div className="inline-flex border rounded-md overflow-hidden">
          <button
            className={`px-4 py-2 cursor-pointer hover:bg-blue-100 ${platform === "vercel.app" ? "bg-blue-500 text-white hover:bg-blue-600" : "bg-white"}`}
            onClick={() => {
              setPlatform("vercel.app")
              setViewMode("")
              setSortField("clicks")
              setSortDirection("desc")
            }}
          >
            vercel.app
          </button>
          <button
            className={`px-4 py-2 cursor-pointer hover:bg-blue-100 ${platform === "github.io" ? "bg-blue-500 text-white hover:bg-blue-600" : "bg-white"}`}
            onClick={() => {
              setPlatform("github.io")
              setViewMode("")
              setSortField("clicks")
              setSortDirection("desc")
            }}
          >
            github.io
          </button>
          <button
            className={`px-4 py-2 cursor-pointer hover:bg-blue-100 ${platform === "netlify.app" ? "bg-blue-500 text-white hover:bg-blue-600" : "bg-white"}`}
            onClick={() => {
              setPlatform("netlify.app")
              setViewMode("")
              setSortField("clicks")
              setSortDirection("desc")
            }}
          >
            netlify.app
          </button>
          <button
            className={`px-4 py-2 cursor-pointer hover:bg-blue-100 ${platform === "js.org" ? "bg-blue-500 text-white hover:bg-blue-600" : "bg-white"}`}
            onClick={() => {
              setPlatform("js.org")
              setViewMode("")
              setSortField("clicks")
              setSortDirection("desc")
            }}
          >
            js.org
          </button>
        </div>
      </div>

      {/* 视图模式过滤器 */}
      <div className="flex justify-end mb-2">
        <div className="inline-flex border rounded-md overflow-hidden">
          <button
            className={`px-4 py-2 cursor-pointer hover:bg-blue-100 ${viewMode === "trending" ? "bg-blue-500 text-white hover:bg-blue-600" : "bg-white"}`}
            onClick={() => {
              setViewMode("trending")
              setSortField("clicks")
              setSortDirection("desc")
            }}
            title="Trending"
          >
            {t('trending')}
          </button>
          <button
            className={`px-4 py-2 cursor-pointer hover:bg-blue-100 ${viewMode === "new" ? "bg-blue-500 text-white hover:bg-blue-600" : "bg-white"}`}
            onClick={() => {
              setViewMode("new")
              setSortField("clicks")
              setSortDirection("desc")
            }}
            title="New Clicks"
          >
            {t('newClicks')}
          </button>
        </div>
      </div>

      {/* 数据表格 */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white border table-fixed min-w-[800px]">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="w-1/4 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">URL</th>
              <th className="w-1/4 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort("clicks")}>
                <div className="flex items-center">
                  {t('clicks')}
                  {getSortIcon("clicks")}
                </div>
              </th>
              <th className="w-1/4 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort("change")}>
                <div className="flex items-center">
                  {t('change')}
                  {getSortIcon("change")}
                </div>
              </th>
              <th className="w-1/4 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('topKeyword')}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                  No data found for the selected filters
                </td>
              </tr>
            ) : (
              data.map((site) => (
                <tr key={site._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 truncate">{site.url}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <span className="mr-2 truncate">{formatClicks(site.clicks)}</span>
                      <div className="w-16 bg-gray-200 rounded-full h-2.5 shrink-0">
                        <div
                          className="bg-blue-600 h-2.5 rounded-full"
                          style={{ width: `${getWidthPercentage(site.trafficShare)}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500 ml-1 truncate">
                        {formatTrafficShare(site.trafficShare)}
                        {process.env.NODE_ENV === 'development' && (
                          <span className="text-xs text-red-400 ml-1">{site.trafficShare}</span>
                        )}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">{getChangeDisplay(site.change)}</td>
                  <td className="px-6 py-4 text-sm text-blue-600 hover:text-blue-800 cursor-pointer group">
                    <div className="flex items-center relative" onClick={() => handleKeywordClick(site.topKeyword)} title="Go to Google SERP for this keyword">
                      <span className="truncate">{site.topKeyword}</span>
                      <ExternalLink className="h-4 w-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span className="absolute -top-8 left-0 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                        {t('googleSERP')}
                      </span>
                    </div>
                  </td>
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
    </>
  )
} 