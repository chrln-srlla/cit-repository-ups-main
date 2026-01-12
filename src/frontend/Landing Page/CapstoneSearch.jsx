import { useState, useEffect } from 'react'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom'
import V9Gradient from "../../assets/images/V9.svg"
import Artificial from "../../assets/images/artificial.svg"
import Machine from "../../assets/images/machine.svg"
import Security from "../../assets/images/security.svg"
import Information from "../../assets/images/information.svg"
import Database from "../../assets/images/database.svg"
import IOT from "../../assets/images/iot.svg"
import AppDev from "../../assets/images/appdev.svg"
import Networking from "../../assets/images/networking.svg"
import Sparkle from "../../assets/images/sparkle.svg"
import Quote from "../../assets/images/quote.svg"
import Share from "../../assets/images/share.svg"
import Save from "../../assets/images/save.svg"
import { useLocation } from "react-router-dom";







export default function CapstoneSearch() {
    const [searchQuery, setSearchQuery] = useState("")
    const [showResults, setShowResults] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [filterType, setFilterType] = useState("All")
    const [categoryFilter, setCategoryFilter] = useState("Category")
    const [title, setTitle] = useState("Search Results")
    const totalPages = 30
    

    const navigate = useNavigate()
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false)
    const location = useLocation();
    
    const allCards = [
        {
            id: 1,
            title: "AgriLearn: A Web-based Production Planning System for High-Value Crops",
            author: "Alipante et. al.",
            year: 2023,
            category: "Web App",
            filterType: "Recent",
            keywords: ["agrilearn", "agriculture", "farming", "production", "planning", "crops", "web", "system"],
            abstract: "AgriLearn is a web-based production planning system for high-value crops in the Philippines. It helps farmers, students, and enthusiasts with crop selection, planting recommendations, cost estimation, and yield forecasting.",
            tags: ["Web App", "Agriculture", "IoT"]
        },
        {
            id: 2,
            title: "SmartFarm Mobile: IoT-Based Agricultural Monitoring System",
            author: "Santos et. al.",
            year: 2024,
            category: "Mobile App",
            filterType: "Recent",
            keywords: ["smartfarm", "iot", "agricultural", "monitoring", "mobile", "farming", "sensors"],
            abstract: "SmartFarm Mobile is an IoT-based agricultural monitoring system that enables real-time tracking of crop conditions, soil moisture, temperature, and other environmental factors through mobile devices.",
            tags: ["Mobile App", "IoT", "Agriculture"]
        },
        {
            id: 3,
            title: "Network Security Analyzer for Enterprise Systems",
            author: "Garcia et. al.",
            year: 2022,
            category: "Networking",
            filterType: "Popular",
            keywords: ["network", "security", "analyzer", "enterprise", "systems", "cybersecurity"],
            abstract: "A comprehensive network security analyzer designed for enterprise systems to detect vulnerabilities, monitor network traffic, and provide real-time threat analysis and prevention mechanisms.",
            tags: ["Networking", "Security", "Enterprise"]
        },
        {
            id: 4,
            title: "Home Automation System using IoT Sensors",
            author: "Reyes et. al.",
            year: 2023,
            category: "IoT",
            filterType: "Popular",
            keywords: ["home", "automation", "iot", "sensors", "smart", "house"],
            abstract: "An intelligent home automation system that utilizes IoT sensors to control lighting, temperature, security, and other home appliances remotely through a centralized mobile application.",
            tags: ["IoT", "Automation", "Smart Home"]
        }
    ]

    useEffect(() => {
  if (location.state?.openCapstoneId) {
    const card = allCards.find(
      c => c.id === location.state.openCapstoneId
    );

    if (card) {
      setSelectedCard(card);
      setShowResults(true); 
    }
  }
}, [location.state]);

    
    //Category Card
    const categories = [
        {
            id: 1,
            category: "Artificial Intelegence",
            icons: Artificial
            
        },
        {
            id: 2,
            category: "Machine Learning",
            icons: Machine
            
        },
        {
            id: 3,
            category: "Cyber Security",
            icons: Security
            
        },
        {
            id: 4,
            category: "Web App",
            icons: Information
            
        },
         {
            id: 5,
            category: "Database",
            icons: Database
            
        },
         {
            id: 6,
            category: "IOT",
            icons: IOT
            
        },
         {
            id: 7,
            category: "App Dev",
            icons: AppDev
            
        },
         {
            id: 8,
            category: "Networking",
            icons: Networking
            
        },
    ]
    // Filter and search logic
    const getFilteredCards = () => {
        let filtered = [...allCards]

        // Apply filter type
        if (filterType !== "All") {
            filtered = filtered.filter(card => card.filterType === filterType)
        }

        // Apply category filter
        if (categoryFilter !== "Category") {
            filtered = filtered.filter(card => card.category === categoryFilter)
        }

        // Apply search query - search in title, author, category, and keywords
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase().trim()
            filtered = filtered.filter(card => {
                const titleMatch = card.title.toLowerCase().includes(query)
                const authorMatch = card.author.toLowerCase().includes(query)
                const categoryMatch = card.category.toLowerCase().includes(query)
                const keywordMatch = card.keywords.some(keyword => keyword.includes(query))
                
                return titleMatch || authorMatch || categoryMatch || keywordMatch
            })
        }

        return filtered
    }
    
    const filteredCards = getFilteredCards()
    // Only show results when there's a search query (filters refine the search results)
    const hasResults = searchQuery.trim() !== "" && filteredCards.length > 0

    function handleSearch(e) {
        e.preventDefault()
        if (searchQuery.trim()) {
            setIsLoading(true)
            setTimeout(() => {
                setIsLoading(false)
                setShowResults(true)
                setCurrentPage(1)
                setCategoryFilter("Category");
                setTitle("Search Results");
            }, 800)
        }
    }

    function handleInputChange(e) {
        const value = e.target.value
        setSearchQuery(value)
        
        // Don't auto-search, only clear results if empty
        if (value.trim() === "") {
            setShowResults(false)
            setIsLoading(false)
        }
    }

    function handleResultsSearch(e) {
        e.preventDefault()
        if (searchQuery.trim()) {
            setIsLoading(true)
            setTimeout(() => {
                setIsLoading(false)
            }, 800)
        }
    }

    function handleFilterChange(e) {
        setFilterType(e.target.value)
        if (showResults && searchQuery.trim()) {
            setIsLoading(true)
            setTimeout(() => {
                setIsLoading(false)
            }, 300)
        }
    }

    function handleCategoryChange(e) {
        setCategoryFilter(e.target.value)
        if (showResults && searchQuery.trim()) {
            setIsLoading(true)
            setTimeout(() => {
                setIsLoading(false)
            }, 300)
        }
    }
    function handleCategoryCardClick(categoryName) {
        setIsLoading(true)
        setShowResults(true)
        setSearchQuery(categoryName)        // optional: clears search
        setFilterType("All")
        setCategoryFilter(categoryName)
        setCurrentPage(1)
        setTitle(categoryName)

        setTimeout(() => {
            setIsLoading(false)
        }, 500)
    }
    const [selectedCard, setSelectedCard] = useState(null)
    const [generateAI, setGenerateAI] = useState(false);
    const [views, setViews] = useState(0);
    const [isCitationOpen, setIsCitationOpen] = useState(false)
    const [citationStyle, setCitationStyle] = useState("")
    
    
    const handleGenerateAI = async (e) =>{
        e.preventDefault();
        setIsLoading(true)
        await new Promise(resolve => setTimeout(resolve, 1500))
        setIsLoading(false)
        setGenerateAI(true)
        
    }
     const handleShowAbstract = async (e) =>{
        e.preventDefault();
        setIsLoading(true)
        await new Promise(resolve => setTimeout(resolve, 1500))
        setIsLoading(false)
        setGenerateAI(false)
        
    }

    const generateCitation = (style, card) => {
  if (!card) return ""

  switch (style) {
    case "APA":
      return `${card.author} (${card.year}). ${card.title}. IT Capstone Repository.`
    case "MLA":
      return `${card.author}. "${card.title}." IT Capstone Repository, ${card.year}.`
    case "Chicago":
      return `${card.author}. ${card.year}. "${card.title}." IT Capstone Repository.`
    case "Harvard":
      return `${card.author}, ${card.year}. ${card.title}. IT Capstone Repository.`
    case "IEEE":
      return `${card.author}, "${card.title}," IT Capstone Repository, ${card.year}.`
    default:
      return "Select a citation format"
  }
}


    return (
        <div className="min-h-screen bg-white">
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
                    className="flex-1 px-4 py-2 text-gray-700 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer"
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
                      className="flex-1 px-4 py-2 text-white transition-colors bg-purple-600 rounded-lg hover:bg-purple-700 cursor-pointer"
                    >
                      Logout
                    </button>
                </div>
              </div>
              </div>
            )}
              {/* Redirecting */}
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
                         <span className="block text-sm text-gray-500">Redirecting to login page</span>
                       </div>
                     </div>
                   </div>
                 </div>
               )}
                        
            <Navbar logout={()=> setIsLogoutModalOpen(true)} />
            {isLoading ? (
                <section className="relative flex items-center bg-[#F3F3F3] justify-center min-h-screen pt-16 overflow-hidden md:pt-24 animate-fade-in">
                    <div className="absolute inset-0 bg-white" aria-hidden />
                    <div 
                        className="absolute inset-0 opacity-100" 
                        style={{ 
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
                                <span className="block text-2xl font-bold text-transparent bg-linear-to-r from-purple-600 to-indigo-600 bg-clip-text">Loading Capstone Repository...</span>
                                <span className="block text-sm text-gray-500">Please wait while we fetch your results</span>
                            </div>
                        </div>
                    </div>
                </section>
                
            ) : !showResults ? (
                <section className="relative min-h-screen pt-16 overflow-hidden md:pt-24">
                    {/* V9.svg gradient background */}
                    <div className="absolute inset-0 bg-[#F3F3F3]" aria-hidden />
                    
                    <div 
                        className="absolute inset-0 opacity-100 " 
                        style={{ 
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat'
                        }} 
                        aria-hidden 
                    />
                    
                    <div className="relative w-full max-w-6xl p-8 px-6 mx-auto ">
                        {/* Hero Section */}
                        <div className="text-center ">
                            <h1 className="text-4xl tracking-tight text-gray-900 poppins-semibold">
                                Capstone Category
                            </h1>
                            <p className="mt-2 text-gray-600 poppins-regular lg:px-50 md:text-sm">
                               Explore categorized research papers, theses, and studies from the College of Information Technology
                            </p>
                            
                            {/* Search Bar */}
                            <form onSubmit={handleSearch} className="flex justify-center mt-4 animate-fade-in-up">
                                <div className="relative w-full group">
                                    <div className="absolute inset-0 transition-opacity duration-300 rounded-full opacity-0 bg-linear-to-r from-purple-600 to-indigo-600 blur-md group-hover:opacity-20"></div>
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={handleInputChange}
                                        placeholder="Search capstone..."
                                        className="relative w-full py-2 pl-6 text-base text-gray-700 placeholder-gray-400 transition-all duration-300 border-2 border-gray-300 rounded-full shadow-lg bg-white/80 backdrop-blur-sm pr-28 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:shadow-purple-500/20"
                                    />
                                    <div className="absolute flex items-center gap-2 -translate-y-1/2 right-3 top-1/2">
                                        <div className="w-px h-6 bg-linear-to-b from-transparent via-purple-400 to-transparent"></div>
                                        <button type="button" className="p-1.5 hover:bg-purple-50 hover:scale-110 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded-full" aria-label="Voice search">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-purple-600">
                                                <path d="M8.25 4.5a3.75 3.75 0 117.5 0v8.25a3.75 3.75 0 11-7.5 0V4.5z" />
                                                <path d="M6 10.5a.75.75 0 01.75.75v1.5a5.25 5.25 0 1010.5v-1.5a.75.75 0 011.5 0v1.5a6.75 6.75 0 01-13.5 0v-1.5A.75.75 0 016 10.5z" />
                                            </svg>
                                        </button>
                                        <button type="submit" className="p-1.5 hover:bg-purple-50 hover:scale-110 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded-full" aria-label="Search">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-purple-600">
                                                <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="grid w-full grid-cols-4 gap-5 mt-5 animate-fade-in-up">
                            {categories.map((c, id) =>(
                                <div   onClick={() => handleCategoryCardClick(c.category)} key={id} className="flex relative flex-col cursor-pointer hover:border-[#754BA1] hover:border-3 hover:scale-105 hover:shadow-purple-400 transition duration-500 justify-between w-full h-40 px-5 py-3 bg-white border shadow-lg border-[#00000040] rounded-2xl">
                                    <h1 className='text-lg poppins-regular'>{c.category}</h1>
                                    <p className='text-2xl'><i className="fa-solid fa-arrow-right"></i></p>
                                    <img src={c.icons} className='absolute bottom-5 right-3 ' alt="" />
                                </div>
                            ))}

                        </div>
                    </div>
                     <footer className="py-3 mt-auto fixed bottom-0 w-full text-white bg-linear-to-r from-[#CD9EFF] via-[#7A55A3] to-[#4D0699]">
                        <div className="px-6 mx-auto text-center max-w-7xl">
                            <p className="text-sm md:text-base">
                                IT Capstone Repository System © 2025 College of Information Technology - All Rights Reserved.
                            </p>
                        </div>
                    </footer>
                   
                </section>
                
            ) :  (
                <div className="flex flex-col min-h-screen bg-white">
                    <section className="relative flex-1 pt-24 pb-16 md:pt-32 animate-fade-in">
                        {/* V9.svg gradient background */}
                        <div className="absolute inset-0 bg-white" aria-hidden />
                        <div 
                            className="absolute inset-0 opacity-100 bg-[#F3F3F3]" 
                            style={{ 
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat'
                            }} 
                            aria-hidden 
                        />
                    <div className="relative px-6 mx-auto max-w-7xl">
                            {/* Title */}
                            <h2 className="mb-8 text-2xl leading-snug text-gray-900 poppins-semibold md:text-3xl md:leading-tight">{title}</h2>

                            {/* Filters and Search Bar */}
                            <div className="flex flex-col gap-4 mb-8 md:flex-row md:items-center md:justify-between">
                                <div className="flex flex-wrap items-center gap-4">
                                    <select 
                                        value={filterType}
                                        onChange={handleFilterChange}
                                        className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all cursor-pointer"
                                    >
                                        <option value="All">Filter: All</option>
                                        <option value="Recent">Recent</option>
                                        <option value="Popular">Popular</option>
                                    </select>
                                    <select 
                                        value={categoryFilter}
                                        onChange={handleCategoryChange}
                                        className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all cursor-pointer"
                                    >
                                        <option value="Category">Category</option>
                                        <option value="Web App">Web App</option>
                                        <option value="Mobile App">Mobile App</option>
                                        <option value="Networking">Networking</option>
                                        <option value="IoT">IoT</option>
                                    </select>
                                     <select 
                                        value={filterType}
                                        onChange={handleFilterChange}
                                        className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all cursor-pointer"
                                    >
                                        <option value="All">Year</option>
                                        <option value="Recent">Recent</option>
                                        <option value="Popular">Popular</option>
                                    </select>
                            </div>

                                <form onSubmit={handleResultsSearch} className="relative w-full md:max-w-sm group">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={handleInputChange}
                                    placeholder="Search capstone..."
                                        className="w-full rounded-full border border-gray-300 bg-white pl-10 pr-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                                        onKeyDown={(e) => e.key === 'Enter' && handleResultsSearch(e)}
                                />
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="absolute w-5 h-5 text-gray-400 transition-colors -translate-y-1/2 pointer-events-none right-3 top-1/2 group-focus-within:text-purple-600">
                                    <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 104.2 12.06l4.24 4.24a.75.75 0 101.06-1.06l-4.24-4.24A6.75 6.75 0 0010.5 3.75zm-5.25 6.75a5.25 5.25 0 1110.5 0 5.25 5.25 0 01-10.5 0z" clipRule="evenodd" />
                                </svg>
                                </form>
                            </div>

                            {/* Result Cards - List Format */}
                            <div className="mb-10 space-y-4">
                                {isLoading ? (
                                    <div className="flex items-center justify-center py-12 ">
                                        <div className="inline-flex flex-col items-center gap-3">
                                            <svg className="w-8 h-8 text-purple-600 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            <span className="text-sm text-gray-500">Searching...</span>
                                        </div>
                                    </div>
                                ) : hasResults ? (
                                    // Show all matching cards with fade-in animation
                                    filteredCards.map((card, index) => (
                                        <article 
                                            onClick={() => {setSelectedCard(card); setViews(views + 1); setShowResults("Content")}}
                                            key={card.id} 
                                            className="p-6 transition-all duration-300 bg-white shadow-sm cursor-pointer rounded-xl hover:shadow-xl hover:scale-103 animate-fade-in-card"
                                            style={{ animationDelay: `${index * 0.1}s` }}
                                        >
                                            {/* Title */}
                                            <h3 className="mb-3 text-xl text-gray-900 poppins-semibold">{card.title}</h3>
                                            
                                            {/* Authors and Year */}
                                            <p className="mb-4 text-sm text-gray-400">
                                                Authors: {card.author} <br />Year: {card.year}
                                            </p>
                                            
                                            {/* Abstract Section */}
                                            <div className="mb-4 poppins-regular">
                                                <p className="mb-2 font-semibold text-gray-900">Abstract</p>
                                                <p className="text-sm leading-relaxed text-gray-700">
                                                    {card.abstract || "No abstract available for this capstone project."}
                                                </p>
                                            </div>
                                            
                                            {/* Tags */}
                                            <div className="flex flex-wrap gap-2 mb-6">
                                                {card.tags && card.tags.map((tag, tagIndex) => (
                                                    <span 
                                                        key={tagIndex}
                                                        className="inline-block px-3 py-1 text-xs font-semibold text-purple-700 bg-purple-100 rounded-full"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                            
                                            {/* Action Buttons 
                                            <div className="flex items-center justify-end gap-3">
                                                <button className="inline-flex items-center gap-2 rounded-lg bg-linear-to-r from-purple-500 to-indigo-500 px-4 py-2.5 text-sm font-medium text-white hover:from-purple-600 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all shadow-sm">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                                        <path fillRule="evenodd" d="M4.5 3.75a3 3 0 013-3h9a3 3 0 013 3v4.5a.75.75 0 01-1.5 0V3.75a1.5 1.5 0 00-1.5-1.5h-9a1.5 1.5 0 00-1.5 1.5v16.5a1.5 1.5 0 001.5 1.5h9a1.5 1.5 0 001.5-1.5v-4.5a.75.75 0 011.5 0v4.5a3 3 0 01-3 3h-9a3 3 0 01-3-3V3.75z" clipRule="evenodd" />
                                                        <path fillRule="evenodd" d="M15.75 4.5a.75.75 0 01.75.75v3a.75.75 0 01-1.5 0V6.31l-2.47 2.47a.75.75 0 11-1.06-1.06l2.47-2.47H12a.75.75 0 010-1.5h3.75z" clipRule="evenodd" />
                                                    </svg>
                                                    Summarize
                                                </button>
                                                <button className="inline-flex items-center gap-2 rounded-lg bg-purple-700 px-4 py-2.5 text-sm font-medium text-white hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all shadow-sm">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                                        <path fillRule="evenodd" d="M12 2.25a.75.75 0 01.75.75v11.25l8.97-8.97a.75.75 0 111.06 1.06l-9.5 9.5a.75.75 0 01-1.06 0l-9.5-9.5a.75.75 0 111.06-1.06l8.97 8.97V3a.75.75 0 01.75-.75zm6 13.5a.75.75 0 01.75.75v7.5a.75.75 0 01-1.5 0v-7.5a.75.75 0 01.75-.75zM3.75 19.5a.75.75 0 100-1.5H2.25a.75.75 0 100 1.5h1.5zm15 0a.75.75 0 100-1.5h-1.5a.75.75 0 100 1.5h1.5z" clipRule="evenodd" />
                                                    </svg>
                                                    Download
                                                </button>
                                                <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all shadow-sm">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                                    </svg>
                                                    Open
                                                </button>
                                            </div>
                                            */}
                                        </article>
                                    ))
                                ) : (
                                    // No results message
                                    <div className="flex flex-col items-center justify-center py-16">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-16 h-16 mb-4 text-gray-400">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172-1.025 3.072-1.025 4.243 0 1.174 1.025 1.174 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                                        </svg>
                                        <h3 className="mb-2 text-xl font-bold text-gray-900">No Results Found</h3>
                                        <p className="max-w-md text-center text-gray-600">
                                            We couldn't find any capstone projects matching your search. Try adjusting your filters or search query.
                                        </p>
                                    </div>
                                )}
                        </div>

                            {/* Pagination */}
                            <div className="flex items-center justify-center gap-4">
                            <button 
                                type="button" 
                                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                disabled={currentPage === 1}
                                    className={`inline-flex items-center justify-center rounded-lg p-2 text-purple-600 hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all ${
                                    currentPage === 1 
                                            ? 'opacity-50 cursor-not-allowed' 
                                            : 'hover:text-purple-700'
                                }`}
                                aria-label="Previous page"
                            >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                        <path fillRule="evenodd" d="M13.28 5.22a.75.75 0 010 1.06L8.56 11l4.72 4.72a.75.75 0 11-1.06 1.06l-5.25-5.25a.75.75 0 010-1.06l5.25-5.25a.75.75 0 011.06 0z" clipRule="evenodd" />
                                    </svg>
                            </button>
                                <span className="text-sm font-semibold text-gray-700">
                                    <span className="text-purple-600">{currentPage}</span> of {totalPages}
                                </span>
                            <button 
                                type="button" 
                                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                disabled={currentPage === totalPages}
                                    className={`inline-flex items-center justify-center rounded-lg p-2 text-purple-600 hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all ${
                                    currentPage === totalPages 
                                            ? 'opacity-50 cursor-not-allowed' 
                                            : 'hover:text-purple-700'
                                }`}
                                aria-label="Next page"
                            >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                        <path fillRule="evenodd" d="M10.72 5.22a.75.75 0 000 1.06L15.44 11l-4.72 4.72a.75.75 0 101.06 1.06l5.25-5.25a.75.75 0 000-1.06l-5.25-5.25a.75.75 0 00-1.06 0z" clipRule="evenodd" />
                                    </svg>
                            </button>
                        </div>
                    </div>
                </section>
        
                    {/* Footer */}
                    <footer className="py-3 z-20 fixed bottom-0 w-full mt-auto text-white bg-linear-to-r from-[#CD9EFF] via-[#7A55A3] to-[#4D0699]">
                        <div className="px-6 mx-auto text-center max-w-7xl">
                            <p className="text-sm md:text-base">
                                IT Capstone Repository System © 2025 College of Information Technology - All Rights Reserved.
                            </p>
                        </div>
                    </footer>
                </div>
            )}
            {selectedCard && (
                
                 <div
    className="fixed inset-0 z-10 flex flex-col items-center bg-[#F3f3f3] backdrop-blur-sm"
    onClick={() => setSelectedCard(null)}
  >
    {/* Container for modal and breadcrumb */}
    <div className="relative w-full max-w-6xl px-8 mt-28">
      {/* Breadcrumb */}
      <p className="text-sm mb-2 -ml-7 text-gray-600 poppins-regular">
        Repository &gt; {selectedCard.category} &gt; {selectedCard.title}
      </p>

        
    </div>
            <div
            className="relative w-full max-w-6xl p-8 overflow-y-scroll bg-white shadow-2xl h-130 hide-scrollbar rounded-2xl animate-fade-in"
            onClick={(e) => e.stopPropagation()}
            >
                <p className='absolute flex items-baseline gap-2 text-sm bottom-5 right-10 text-[#00000066]'><i class="fa-solid fa-eye"></i>{views}</p>
            {/* Close Button */}
            <button
                onClick={() => setSelectedCard(null)}
                className="absolute text-gray-400 cursor-pointer top-4 right-4 hover:text-gray-600"
            >
                ✕
            </button>

            {/* Title */}
            <h2 className="mb-2 -mt-1 text-2xl text-gray-900 poppins-semibold">
                {selectedCard.title}
            </h2>

            {/* Author & Year */}
            <p className="mb-4 text-sm textins-gray-400 poppins-semibold">
                Authors: <span className='poppins-regular text-md'>{selectedCard.author}</span> <br />
                Year: <span className='poppins-regular text-md'>{selectedCard.year}</span>
            </p>

            {/* Category */}
            <div className="flex flex-wrap gap-2 mt-1 poppins-regular">
                {selectedCard.tags.map((tag, i) => (
                <span
                    key={i}
                    className="px-3 py-1 text-xs font-semibold text-white bg-[#A16FD6] rounded-full"
                >
                    {tag}
                </span>
                ))}
            </div>
            <div className="flex gap-2 mt-3 mb-3 text-sm poppins-regular">
                <div
                onClick={() => setIsCitationOpen(true)}
                className="flex items-center gap-2 pr-2 border-r-2 cursor-pointer hover:text-purple-600"
                >
                <span>Cite</span>
                <img src={Quote} className='w-3' alt="" />
                </div>
                <div className="flex items-center gap-2 pr-2 border-r-2 ">
                    <span>Share</span>
                    <img src={Share} className='w-3' alt="" />
                </div>
                <div className="flex items-center gap-2 ">
                    <span>Bookmark</span>
                    <img src={Save} className='w-3' alt="" />
                </div>
                
            </div>

            {/* ================= CITATION MODAL ================= */}
{isCitationOpen && (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
    onClick={() => setIsCitationOpen(false)}
  >
    <div
      className="w-full max-w-md p-6 bg-white rounded-xl shadow-2xl animate-fade-in"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg poppins-semibold">Citation Style</h2>
        <button
          onClick={() => setIsCitationOpen(false)}
          className="text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
      </div>

      {/* Select */}
      <select
  value={citationStyle}
  onChange={(e) => setCitationStyle(e.target.value)}
  className="w-full px-3 py-2 mb-4 border rounded-lg text-gray-500 focus:ring-2 focus:ring-purple-500"
>
  <option value="" className="text-gray-400">
    APA, MLA, Chicago, Harvard, IEEE
  </option>
  <option value="APA">APA</option>
  <option value="MLA">MLA</option>
  <option value="Chicago">Chicago</option>
  <option value="Harvard">Harvard</option>
  <option value="IEEE">IEEE</option>
</select>

  {/* Citation Output */}
<div className="p-4 text-sm bg-gray-100 border border-gray-300 rounded-lg min-h-[120px] text-gray-700 flex items-center justify-center text-center">
  {citationStyle
    ? generateCitation(citationStyle, selectedCard)
    : (
      <span className="text-gray-400">
        Select a format to view citation
      </span>
    )
  }
</div>

      {/* Copy Button */}
      <button
        onClick={() =>
          navigator.clipboard.writeText(
            generateCitation(citationStyle, selectedCard)
          )
        }
        className="w-full py-2 mt-4 text-white rounded-lg bg-purple-600 hover:bg-purple-700 transition cursor-pointer"
      >
        Copy Citation
      </button>
    </div>
  </div>
)}



            {/* Abstract */}
            {!generateAI? (
                <div className="mt-4 poppins-regular">
                <h3 className="mb-2 mt-5 text-2xl text-gray-900 poppins-medium">ABSTRACT</h3>
                <p className="text-sm leading-relaxed text-justify text-gray-700">Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.
 Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.
Lorem ipsum dolor sit amet consectetur adipiscing elit. 

                </p>
            </div>
            ) :(
            <div className="mt-4 poppins-regular">
                <h3 className="mb-2 text-2xl text-gray-900 poppins-medium">AI Summary</h3>
                <p className="text-sm leading-relaxed text-justify text-gray-700">Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.
 Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.
Lorem ipsum dolor sit amet consectetur adipiscing elit. 

                </p>
            </div>
            )}

           
            {/* Actions */}
            <div className="flex justify-start gap-3 mt-8">
                {generateAI ?(
                    <button onClick={handleShowAbstract} className="flex items-center gap-2 cursor-pointer px-4 py-4 text-sm text-white rounded-full poppins-semibold bg-linear-to-r from-[#AE49D3] via-[#820DAC] to-[#500F68] hover:scale-105 hover:shadow-purple-500 shadow-lg transition duration-500">
                     {isLoading ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="w-5 h-5 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Showing Abstract...
                            </span>
                            ) : (
                            <p className='flex items-center gap-2'>
                                <span>Show Abstract</span> <img src={Sparkle} className='w-5' alt="" />  
                            </p>
                            )}
                </button>
                    
                ) : (
                <button onClick={handleGenerateAI} className="flex items-center gap-2 cursor-pointer px-4 py-4 text-sm text-white rounded-full poppins-semibold bg-linear-to-r from-[#AE49D3] via-[#820DAC] to-[#500F68] hover:scale-105 hover:shadow-purple-500 shadow-lg transition duration-500">
                     {isLoading ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="w-5 h-5 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Generating AI Summary...
                            </span>
                            ) : (
                            <p className='flex items-center gap-2'>
                                <span>Generate AI Summary</span> <img src={Sparkle} className='w-5' alt="" />  
                            </p>
                            )}
                </button>
                )}
              
            </div>
            </div>
            </div>
        )}

        </div>
    )
}