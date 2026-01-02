import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import V9Gradient from "../../assets/images/V9.svg"

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  useEffect(() => {
    // Add shimmer animation styles
    const style = document.createElement('style')
    style.textContent = `
      @keyframes shimmer {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
      }
      .animate-shimmer {
        animation: shimmer 2s infinite;
      }
    `
    document.head.appendChild(style)

    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => {
      clearTimeout(timer)
      document.head.removeChild(style)
    }
  }, [])

  // Sample data
  const summaryCards = [
    { title: "Total Papers", value: "45", description: "3420 searches this month", icon: "document" },
    { title: "Total Views", value: "3874", description: "3420 searches this month", icon: "eye" },
    { title: "Total Search", value: "45", description: "3420 searches this month", icon: "search" },
    { title: "Recently Uploaded", value: "45", description: "3420 searches this month", icon: "user" }
  ]
  
  const getIcon = (iconType) => {
    switch(iconType) {
      case "document":
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        )
      case "eye":
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        )
      case "search":
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        )
      case "user":
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        )
      default:
        return null
    }
  }

  const mostSearched = [
    { name: "Machine Learning", value: 250000 },
    { name: "Artificial Intelligence", value: 8000 },
    { name: "Cyber Security", value: 2500 },
    { name: "Networking", value: 1800 },
    { name: "Information Security", value: 1200 }
  ]
  
  const viewsGrowth = [
    { month: "Jan", value: 8000 },
    { month: "Feb", value: 25000 },
    { month: "Mar", value: 65000 },
    { month: "April", value: 190000 },
    { month: "May", value: 170000 },
    { month: "June", value: 180000 }
  ]

  const mostViewed = [
    { title: "AgriLearn: A web-based Production Planning System for High Value Crops", authors: "Alipante et. al.", views: 1421 }
  ]

  const categories = [
    { name: "Web App", percentage: 33.3, color: "bg-blue-500" },
    { name: "Mobile App", percentage: 22.2, color: "bg-orange-500" },
    { name: "Networking", percentage: 22.2, color: "bg-yellow-400" },
    { name: "IoT", percentage: 22.2, color: "bg-green-500" }
  ]

  // Skeleton Components with smooth shimmer effect
  const SkeletonShimmer = ({ className = "" }) => (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/60 to-transparent"></div>
    </div>
  )

  const SkeletonCard = () => (
    <div className="relative p-6 overflow-hidden bg-white shadow-md rounded-xl">
      <SkeletonShimmer className="absolute inset-0" />
      <div className="relative">
        <div className="flex items-start justify-between mb-6">
          <div className="relative w-24 h-4 overflow-hidden rounded bg-linear-to-r from-gray-200 via-gray-100 to-gray-200">
            <SkeletonShimmer />
          </div>
          <div className="relative w-6 h-6 overflow-hidden rounded bg-linear-to-r from-gray-200 via-gray-100 to-gray-200">
            <SkeletonShimmer />
          </div>
        </div>
        <div className="mb-4">
          <div className="relative w-20 h-10 overflow-hidden rounded bg-linear-to-r from-gray-200 via-gray-100 to-gray-200">
            <SkeletonShimmer />
          </div>
        </div>
        <div className="flex items-end justify-between">
          <div className="relative w-32 h-3 overflow-hidden rounded bg-linear-to-r from-gray-200 via-gray-100 to-gray-200">
            <SkeletonShimmer />
          </div>
          <div className="relative w-5 h-5 overflow-hidden rounded bg-linear-to-r from-gray-200 via-gray-100 to-gray-200">
            <SkeletonShimmer />
          </div>
        </div>
      </div>
    </div>
  )

  const SkeletonChart = () => (
    <div className="relative p-6 overflow-hidden bg-white border border-gray-200 shadow-md rounded-xl">
      <SkeletonShimmer className="absolute inset-0 opacity-20" />
      <div className="relative">
        <div className="flex items-center justify-between mb-6">
          <div className="relative w-32 h-6 overflow-hidden rounded bg-linear-to-r from-gray-200 via-gray-100 to-gray-200">
            <SkeletonShimmer />
          </div>
          <div className="relative h-8 overflow-hidden rounded bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 w-28">
            <SkeletonShimmer />
          </div>
        </div>
        <div className="relative h-64 overflow-hidden rounded bg-linear-to-r from-gray-100 via-gray-50 to-gray-100">
          <SkeletonShimmer />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-48 rounded bg-linear-to-b from-gray-200/50 via-transparent to-transparent"></div>
          </div>
        </div>
      </div>
    </div>
  )

  const SkeletonList = () => (
    <div className="relative p-6 overflow-hidden bg-white border border-gray-200 shadow-md rounded-xl">
      <SkeletonShimmer className="absolute inset-0 opacity-20" />
      <div className="relative">
        <div className="flex items-center justify-between mb-6">
          <div className="relative w-32 h-6 overflow-hidden rounded bg-linear-to-r from-gray-200 via-gray-100 to-gray-200">
            <SkeletonShimmer />
          </div>
          <div className="relative h-8 overflow-hidden rounded bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 w-28">
            <SkeletonShimmer />
          </div>
        </div>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((num) => (
            <div key={num} className="flex items-start gap-4" style={{ animationDelay: `${num * 0.1}s` }}>
              <div className="relative w-10 h-10 overflow-hidden rounded-full bg-linear-to-r from-gray-200 via-gray-100 to-gray-200">
                <SkeletonShimmer />
              </div>
              <div className="flex-1">
                <div className="relative w-full h-4 mb-2 overflow-hidden rounded bg-linear-to-r from-gray-200 via-gray-100 to-gray-200">
                  <SkeletonShimmer />
                </div>
                <div className="relative w-2/3 h-3 overflow-hidden rounded bg-linear-to-r from-gray-200 via-gray-100 to-gray-200">
                  <SkeletonShimmer />
                </div>
              </div>
              <div className="shrink-0">
                <div className="relative w-12 h-4 mb-1 overflow-hidden rounded bg-linear-to-r from-gray-200 via-gray-100 to-gray-200">
                  <SkeletonShimmer />
                </div>
                <div className="relative w-8 h-3 overflow-hidden rounded bg-linear-to-r from-gray-200 via-gray-100 to-gray-200">
                  <SkeletonShimmer />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const SkeletonPieChart = () => (
    <div className="relative p-6 overflow-hidden bg-white border border-gray-200 shadow-md rounded-xl">
      <SkeletonShimmer className="absolute inset-0 opacity-20" />
      <div className="relative">
        <div className="relative w-24 h-6 mb-6 overflow-hidden rounded bg-linear-to-r from-gray-200 via-gray-100 to-gray-200">
          <SkeletonShimmer />
        </div>
        <div className="flex items-center gap-8">
          <div className="relative w-64 h-64 overflow-hidden rounded-full bg-linear-to-br from-gray-100 via-gray-50 to-gray-100">
            <SkeletonShimmer />
            <div className="absolute bg-white rounded-full inset-4"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 rounded-full bg-linear-to-r from-gray-200/30 via-gray-100/30 to-gray-200/30"></div>
            </div>
          </div>
          <div className="space-y-3">
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="flex items-center gap-2" style={{ animationDelay: `${num * 0.1}s` }}>
                <div className="relative w-3 h-3 overflow-hidden rounded-full bg-linear-to-r from-gray-200 via-gray-100 to-gray-200">
                  <SkeletonShimmer />
                </div>
                <div className="relative w-20 h-4 overflow-hidden rounded bg-linear-to-r from-gray-200 via-gray-100 to-gray-200">
                  <SkeletonShimmer />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 flex flex-col items-center w-20 h-screen gap-6 py-6 overflow-hidden bg-purple-900">
        {/* Dashboard Icon */}
        <div className="flex items-center justify-center w-8 h-8 text-white transition-colors rounded-lg cursor-pointer hover:bg-purple-800">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
        </div>

        {/* Document Icon */}
        <div 
          onClick={() => navigate('/admin/capstone-projects')}
          className="flex items-center justify-center w-8 h-8 text-white transition-colors rounded-lg cursor-pointer hover:bg-purple-800"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>

        {/* Users/People Icon */}
        <div 
          onClick={() => navigate('/admin/account-management')}
          className="flex items-center justify-center w-8 h-8 text-white transition-colors rounded-lg cursor-pointer hover:bg-purple-800"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </div>

        {/* User Settings Icon */}
        <div className="relative flex items-center justify-center w-8 h-8 text-white transition-colors rounded-lg cursor-pointer hover:bg-purple-800">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <svg className="absolute bottom-0 right-0 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>

        {/* Logout Icon */}
        <div className="flex items-center justify-center w-8 h-8 mt-auto text-white transition-colors rounded-lg cursor-pointer hover:bg-purple-800" onClick={() => setIsLogoutModalOpen(true)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 ml-20">
        {/* Header */}
        <div className="mb-8">
        <h1 className="text-4xl font-extrabold leading-tight md:text-5xl">
            <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 via-purple-600 to-purple-800">Admin</span>{' '}
            <span className="text-gray-900">Dashboard</span>
          </h1>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
          {isLoading ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : (
            summaryCards.map((card, index) => (
              <div key={index} className="p-6 bg-white shadow-md rounded-xl">
                <div className="flex items-start justify-between mb-6">
                  <p className="text-sm font-medium text-black">{card.title}</p>
                  <div className="text-purple-700">{getIcon(card.icon)}</div>
                </div>
                <div className="mb-4">
                  <p className="text-4xl font-extrabold text-transparent bg-clip-text bg-linear-to-br from-purple-400 via-purple-600 to-purple-800">
                    {card.value}
                  </p>
                </div>
                <div className="flex items-end justify-between">
                  <p className="text-xs text-gray-500">{card.description}</p>
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 gap-6 mb-8 lg:grid-cols-2">
          {/* Most Searched */}
          {isLoading ? (
            <>
              <SkeletonChart />
              <SkeletonChart />
            </>
          ) : (
            <>
          <div className="p-6 bg-white border border-gray-200 shadow-md rounded-xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Most Searched</h2>
              <select className="text-gray-500 text-sm bg-gray-100 border border-gray-300 rounded-lg px-3 py-1.5">
                <option>This month</option>
              </select>
            </div>
            <div className="space-y-5">
              {mostSearched.map((item, index) => {
                // Logarithmic scale calculation
                const logMax = Math.log10(1000000)
                const logValue = Math.log10(item.value)
                const logPercentage = (logValue / logMax) * 100
                const barColor = index % 2 === 0 ? 'bg-purple-800' : 'bg-purple-400'
                
                return (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-32 text-sm text-gray-700 shrink-0">{item.name}</div>
                    <div className="relative flex-1">
                      <div className="w-full h-6 bg-gray-200 rounded">
                        <div 
                          className={`${barColor} h-6 rounded`}
                          style={{ width: `${logPercentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="flex justify-between pt-4 mt-6 text-xs text-gray-500 border-t border-gray-200">
              <span>0</span>
              <span>1,000</span>
              <span>10,000</span>
              <span>100,000</span>
              <span>1,000,000</span>
            </div>
          </div>

          {/* Views Growth */}
          <div className="p-6 bg-white border border-gray-200 shadow-md rounded-xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Views Growth</h2>
              <select className="text-gray-500 text-sm bg-gray-100 border border-gray-300 rounded-lg px-3 py-1.5">
                <option>Monthly</option>
              </select>
            </div>
            <div className="relative h-64">
              <svg className="w-full h-full" viewBox="0 0 500 250" preserveAspectRatio="xMidYMid meet">
                {/* Grid lines */}
                <line x1="40" y1="210" x2="480" y2="210" stroke="#e5e7eb" strokeWidth="1" />
                <line x1="40" y1="160" x2="480" y2="160" stroke="#e5e7eb" strokeWidth="1" />
                <line x1="40" y1="110" x2="480" y2="110" stroke="#e5e7eb" strokeWidth="1" />
                <line x1="40" y1="60" x2="480" y2="60" stroke="#e5e7eb" strokeWidth="1" />
                <line x1="40" y1="10" x2="480" y2="10" stroke="#e5e7eb" strokeWidth="1" />
                
                {/* Y-axis labels */}
                <text x="35" y="215" fill="#6b7280" fontSize="12" textAnchor="end">0</text>
                <text x="35" y="165" fill="#6b7280" fontSize="12" textAnchor="end">50k</text>
                <text x="35" y="115" fill="#6b7280" fontSize="12" textAnchor="end">100k</text>
                <text x="35" y="65" fill="#6b7280" fontSize="12" textAnchor="end">150k</text>
                <text x="35" y="15" fill="#6b7280" fontSize="12" textAnchor="end">200k</text>
                
                {/* Calculate chart points */}
                {(() => {
                  const points = viewsGrowth.map((point, index) => {
                    const x = 40 + (index * 80) + 20
                    const maxValue = 200000
                    const y = 210 - ((point.value / maxValue) * 200)
                    return { x, y, month: point.month }
                  })
                  
                  // Create polyline for the line chart
                  const pathData = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
                  
                  return (
                    <>
                      <path d={pathData} fill="none" stroke="#9333ea" strokeWidth="3" />
                      {points.map((point, index) => (
                        <g key={point.month}>
                          <circle cx={point.x} cy={point.y} r="5" fill="#9333ea" />
                          <text x={point.x} y="230" fill="#6b7280" fontSize="12" textAnchor="middle">{point.month}</text>
                        </g>
                      ))}
                    </>
                  )
                })()}
              </svg>
            </div>
          </div>
            </>
          )}
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Categories */}
          {isLoading ? (
            <>
              <SkeletonPieChart />
              <SkeletonList />
              <SkeletonList />
            </>
          ) : (
            <>
          <div className="p-6 bg-white border border-gray-200 shadow-md rounded-xl">
            <h2 className="mb-6 text-xl font-bold text-gray-900">Categories</h2>
            <div className="flex items-center gap-8">
              <div className="relative w-64 h-64 shrink-0">
                {(() => {
                  const centerX = 150
                  const centerY = 135
                  const radius = 110
                  const depth = 18
                  const ellipseRatio = 0.55
                  
                  const createExplodedSlice = (startAngle, endAngle, offsetX, offsetY, color, label) => {
                    const startRad = (startAngle * Math.PI) / 180
                    const endRad = (endAngle * Math.PI) / 180
                    const midRad = ((startAngle + endAngle) / 2 * Math.PI) / 180
                    
                    const cx = centerX + offsetX
                    const cy = centerY + offsetY
                    
                    // Top ellipse points
                    const x1 = cx + radius * Math.cos(startRad)
                    const y1 = cy + radius * ellipseRatio * Math.sin(startRad)
                    const x2 = cx + radius * Math.cos(endRad)
                    const y2 = cy + radius * ellipseRatio * Math.sin(endRad)
                    
                    // Bottom ellipse points (for depth)
                    const x1Bottom = x1
                    const y1Bottom = y1 + depth
                    const x2Bottom = x2
                    const y2Bottom = y2 + depth
                    
                    const largeArc = (endAngle - startAngle) > 180 ? 1 : 0
                    
                    // Top surface
                    const topPath = `M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius * ellipseRatio} 0 ${largeArc} 1 ${x2} ${y2} Z`
                    
                    // Side surface (for 3D)
                    const sidePath = `M ${x1} ${y1} L ${x1Bottom} ${y1Bottom} A ${radius} ${radius * ellipseRatio} 0 0 1 ${x2Bottom} ${y2Bottom} L ${x2} ${y2} Z`
                    
                    // Text position - better centered
                    const textX = cx + (radius * 0.65) * Math.cos(midRad)
                    const textY = cy + (radius * 0.45) * Math.sin(midRad)
                    
                    return { topPath, sidePath, textX, textY, color, label }
                  }
                  
                  const slices = [
                    createExplodedSlice(-90, 29.88, 0, -25, '#3b82f6', '33.3%'), // Web App - exploded up more
                    createExplodedSlice(29.88, 109.92, 10, 5, '#f97316', '22.2%'), // Mobile App - slight right
                    createExplodedSlice(109.92, 189.84, 0, 10, '#facc15', '22.2%'), // Networking - down
                    createExplodedSlice(189.84, 270, -10, 5, '#22c55e', '22.2%') // IoT - slight left
                  ]
                  
                  return (
                    <svg viewBox="0 0 300 270" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
                      <defs>
                        <linearGradient id="grad-blue" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#60a5fa" />
                          <stop offset="50%" stopColor="#3b82f6" />
                          <stop offset="100%" stopColor="#2563eb" />
                        </linearGradient>
                        <linearGradient id="grad-orange" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#fb923c" />
                          <stop offset="50%" stopColor="#f97316" />
                          <stop offset="100%" stopColor="#ea580c" />
                        </linearGradient>
                        <linearGradient id="grad-yellow" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#fde047" />
                          <stop offset="50%" stopColor="#facc15" />
                          <stop offset="100%" stopColor="#eab308" />
                        </linearGradient>
                        <linearGradient id="grad-green" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#86efac" />
                          <stop offset="50%" stopColor="#22c55e" />
                          <stop offset="100%" stopColor="#16a34a" />
                        </linearGradient>
                        <linearGradient id="grad-blue-side" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.75" />
                          <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.85" />
                        </linearGradient>
                        <linearGradient id="grad-orange-side" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#f97316" stopOpacity="0.75" />
                          <stop offset="100%" stopColor="#c2410c" stopOpacity="0.85" />
                        </linearGradient>
                        <linearGradient id="grad-yellow-side" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#facc15" stopOpacity="0.75" />
                          <stop offset="100%" stopColor="#ca8a04" stopOpacity="0.85" />
                        </linearGradient>
                        <linearGradient id="grad-green-side" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#22c55e" stopOpacity="0.75" />
                          <stop offset="100%" stopColor="#15803d" stopOpacity="0.85" />
                        </linearGradient>
                      </defs>
                      
                      {/* Render sides first for proper layering */}
                      {slices.map((slice, idx) => {
                        const gradientIds = ['grad-blue-side', 'grad-orange-side', 'grad-yellow-side', 'grad-green-side']
                        return (
                          <path
                            key={`side-${idx}`}
                            d={slice.sidePath}
                            fill={`url(#${gradientIds[idx]})`}
                            style={{ filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.2))' }}
                          />
                        )
                      })}
                      
                      {/* Render top surfaces */}
                      {slices.map((slice, idx) => {
                        const gradientIds = ['grad-blue', 'grad-orange', 'grad-yellow', 'grad-green']
                        return (
                          <g key={idx}>
                            <path
                              d={slice.topPath}
                              fill={`url(#${gradientIds[idx]})`}
                              style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.25))' }}
                            />
                            <text
                              x={slice.textX}
                              y={slice.textY}
                              fontSize="14"
                              fill="white"
                              fontWeight="bold"
                              textAnchor="middle"
                              dominantBaseline="middle"
                              style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}
                            >
                              {slice.label}
                            </text>
                          </g>
                        )
                      })}
                    </svg>
                  )
                })()}
              </div>
              <div className="space-y-3">
                {categories.map((cat, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${cat.color}`}></div>
                    <span className="text-sm text-gray-700">{cat.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Most Viewed */}
          <div className="p-6 bg-white border border-gray-200 shadow-md rounded-xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Most Viewed</h2>
              <select className="text-gray-500 text-sm bg-gray-100 border border-gray-300 rounded-lg px-3 py-1.5">
                <option>This month</option>
              </select>
            </div>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((num) => (
                <div key={num} className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-10 h-10 text-lg font-bold text-white bg-purple-700 rounded-full shrink-0">
                    {num}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="mb-1 text-sm font-medium text-gray-900">
                      {mostViewed[0].title}
                    </p>
                    <p className="text-xs text-gray-500">{mostViewed[0].authors}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold text-purple-700">{mostViewed[0].views}</p>
                    <p className="text-xs text-purple-500">Views</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Most Searched */}
          <div className="p-6 bg-white border border-gray-200 shadow-md rounded-xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Most Searched</h2>
              <select className="text-gray-500 text-sm bg-gray-100 border border-gray-300 rounded-lg px-3 py-1.5">
                <option>This month</option>
              </select>
            </div>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((num) => (
                <div key={num} className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-10 h-10 text-lg font-bold text-white bg-purple-700 rounded-full shrink-0">
                    {num}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="mb-1 text-sm font-medium text-gray-900">
                      {mostViewed[0].title}
                    </p>
                    <p className="text-xs text-gray-500">{mostViewed[0].authors}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold text-purple-700">{mostViewed[0].views}</p>
                    <p className="text-xs text-purple-500">Views</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
            </>
          )}
        </div>
      </main>

      {/* Logout Confirmation Modal */}
      {isLogoutModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm"
          onClick={() => setIsLogoutModalOpen(false)}
        >
          <div 
            className="w-full max-w-md p-8 bg-white shadow-2xl rounded-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-center mb-4">
              <div className="flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
            </div>
            <h2 className="mb-2 text-2xl font-bold text-center text-transparent bg-clip-text bg-linear-to-r from-purple-400 via-purple-600 to-purple-800">Confirm Logout</h2>
            <p className="mb-6 text-center text-gray-600">Are you sure you want to logout?</p>
            <div className="flex gap-3">
              <button
                onClick={() => setIsLogoutModalOpen(false)}
                className="flex-1 px-4 py-2 text-gray-700 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
                <button
                  onClick={() => {
                    setIsLoggingOut(true)
                    setIsLogoutModalOpen(false)
                    setTimeout(() => {
                      navigate('/')
                    }, 1500)
                  }}
                  className="flex-1 px-4 py-2 text-white transition-colors bg-purple-600 rounded-lg hover:bg-purple-700"
                >
                  Logout
                </button>
            </div>
          </div>
          </div>
        )}

      {/* Logout Loading Overlay */}
      {isLoggingOut && (
        <div className="fixed inset-0 flex items-center justify-center min-h-screen z-60">
          <div className="absolute inset-0 bg-white" aria-hidden />
          <div 
            className="absolute inset-0 opacity-100" 
            style={{ 
              backgroundImage: `url(${V9Gradient})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }} 
            aria-hidden 
          />
          <div className="relative z-10 text-center">
            <div className="inline-flex flex-col items-center gap-4">
              <div className="relative">
                <svg className="w-12 h-12 text-purple-600 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <div className="absolute inset-0 rounded-full bg-purple-600/20 blur-xl"></div>
              </div>
              <div className="space-y-1">
                <span className="block text-2xl font-bold text-transparent bg-linear-to-r from-purple-600 to-indigo-600 bg-clip-text">Logging out...</span>
                <span className="block text-sm text-gray-500">Redirecting to landing page</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

