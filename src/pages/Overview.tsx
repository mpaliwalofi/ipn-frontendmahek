import { useState, useEffect } from "react";
import { Search, ChevronRight, ChevronDown, Code, FolderOpen, Database, FileText, Package, Menu, X, Filter, Clock } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { Badge } from "@/app/components/ui/badge";
import logo from "@/assets/logo.jpg"
import pawPrint from "@/assets/dogpaw.png";


export default function Overview() {
  const [selectedCategory, setSelectedCategory] = useState("entities");
  const [selectedRepository, setSelectedRepository] = useState("api");
  const [selectedSort, setSelectedSort] = useState("alphabetical");
  const [activeTab, setActiveTab] = useState("all");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024); // lg breakpoint
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const [expandedSections, setExpandedSections] = useState({
    frontend: true,
    backend: true,
    database: true,
    utils: false,
  });

  const [expandedItems, setExpandedItems] = useState({
    components: true,
    pages: false,
    hooks: false,
    api: true,
    database: false,
    models: true,
  });

  // Mock search results data
  const allFiles = [
    { name: "Button.tsx", category: "Components", section: "Frontend", path: "src/components" },
    { name: "Card.tsx", category: "Components", section: "Frontend", path: "src/components" },
    { name: "Modal.tsx", category: "Components", section: "Frontend", path: "src/components" },
    { name: "Input.tsx", category: "Components", section: "Frontend", path: "src/components" },
    { name: "HomePage.tsx", category: "Pages", section: "Frontend", path: "src/pages" },
    { name: "Dashboard.tsx", category: "Pages", section: "Frontend", path: "src/pages" },
    { name: "useAuth.ts", category: "Hooks", section: "Frontend", path: "src/hooks" },
    { name: "AuthController.ts", category: "API", section: "Backend", path: "src/api" },
    { name: "UserController.ts", category: "API", section: "Backend", path: "src/api" },
    { name: "User.ts", category: "Models", section: "Backend", path: "src/models" },
    { name: "Product.ts", category: "Models", section: "Backend", path: "src/models" },
    { name: "logger.ts", category: "Utilities", section: "Utilities", path: "src/utils" },
    { name: "validator.ts", category: "Utilities", section: "Utilities", path: "src/utils" },
  ];

  const filteredFiles = searchQuery.trim() 
    ? allFiles.filter(file => 
        file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        file.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        file.section.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const toggleItem = (item: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [item]: !prev[item]
    }));
  };

  const expandAll = () => {
    setExpandedSections({
      frontend: true,
      backend: true,
      database: true,
      utils: true,
    });
    setExpandedItems({
      components: true,
      pages: true,
      hooks: true,
      api: true,
      database: true,
      models: true,
    });
  };

  const collapseAll = () => {
    setExpandedSections({
      frontend: false,
      backend: false,
      database: false,
      utils: false,
    });
    setExpandedItems({
      components: false,
      pages: false,
      hooks: false,
      api: false,
      database: false,
      models: false,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50/20 to-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#024639] via-[#025a49] to-[#024639] shadow-lg px-4 sm:px-6 py-3 flex items-center justify-between sticky top-0 z-50 backdrop-blur-sm">
        <div className="flex items-center gap-4 sm:gap-8">
          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="lg:hidden text-white"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <AnimatePresence mode="wait">
              {sidebarOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-5 h-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-5 h-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
          
          {/* Logo */}
          <motion.div 
            className="flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img 
              src={logo} 
              alt="Inspired Pet Nutrition Logo" 
              className="h-10 sm:h-12 drop-shadow-md"
            />
          </motion.div>
          
          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-4 sm:gap-6">
            <motion.button 
              whileHover={{ y: -2 }}
              className="text-white/70 hover:text-white text-sm transition-all duration-200 relative group"
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white/70 group-hover:w-full transition-all duration-200"></span>
            </motion.button>
            <motion.button 
              whileHover={{ y: -2 }}
              className="text-white hover:text-white text-sm transition-all duration-200 relative group"
            >
              Overview
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-white"></span>
            </motion.button>
            <motion.button 
              whileHover={{ y: -2 }}
              className="text-white/70 hover:text-white text-sm transition-all duration-200 relative group"
            >
              Explorer
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white/70 group-hover:w-full transition-all duration-200"></span>
            </motion.button>
          </nav>
        </div>

        {/* Search */}
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 text-white/90 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-all duration-200"
        >
          <Search className="w-4 h-4" />
          <span className="hidden sm:inline text-sm">Search</span>
        </motion.button>
      </header>

      {/* Main Content */}
      <div className="flex relative">
        {/* Overlay for mobile */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 lg:hidden"
            />
          )}
        </AnimatePresence>

        {/* Left Sidebar */}
        <motion.aside 
          initial={false}
          animate={{ x: isLargeScreen ? 0 : (sidebarOpen ? 0 : -320) }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className={`
            fixed lg:sticky top-0 left-0 z-40 
            w-80 bg-white/95 backdrop-blur-md border-r border-gray-200 shadow-xl
            min-h-[calc(100vh-60px)] lg:min-h-[calc(100vh-60px)]
          `}
        >
          <div className="p-6 space-y-6">
            {/* Search Input */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-3"
            >
              <h2 className="text-lg font-semibold text-gray-800">Search documentation</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search by title, summary..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 bg-gray-50 border-gray-200 focus:border-[#024639] focus:ring-[#024639] transition-all duration-200 text-gray-700 placeholder:text-gray-400"
                />
              </div>
            </motion.div>

            {/* Search Section - ALWAYS VISIBLE */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.125 }}
              className="space-y-3"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold text-gray-800">Search</h3>
                {searchQuery.trim() && (
                  <Badge className="bg-[#024639] text-white hover:bg-[#024639]">
                    {filteredFiles.length}
                  </Badge>
                )}
              </div>
              
              <div className="bg-white rounded-lg border border-gray-200 min-h-[120px] max-h-[280px] overflow-y-auto">
                {searchQuery.trim() ? (
                  filteredFiles.length > 0 ? (
                    <div className="divide-y divide-gray-100">
                      {filteredFiles.map((file, index) => (
                        <motion.div
                          key={`${file.name}-${index}`}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          whileHover={{ backgroundColor: "rgba(2, 70, 57, 0.05)" }}
                          className="flex items-start gap-3 p-3 cursor-pointer transition-all duration-200"
                        >
                          <FileText className="w-4 h-4 text-[#024639] flex-shrink-0 mt-0.5" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-xs border-[#024639]/30 text-[#024639] bg-[#024639]/5">
                                {file.section}
                              </Badge>
                              <span className="text-xs text-gray-500 truncate">{file.path}</span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 px-4">
                      <Search className="w-10 h-10 text-gray-300 mb-3" />
                      <p className="text-sm text-gray-600 font-medium">No results found</p>
                      <p className="text-xs text-gray-400 mt-1">Try a different search term</p>
                    </div>
                  )
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 px-4">
                    <Search className="w-10 h-10 text-gray-300 mb-3" />
                    <p className="text-sm text-gray-500">Start typing to search</p>
                    <p className="text-xs text-gray-400 mt-1">Files, sections, and more</p>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Category */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="space-y-3"
            >
              <h3 className="text-base font-semibold text-gray-800">Category</h3>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="bg-gray-50 border-gray-200 hover:border-[#024639] transition-colors duration-200 text-gray-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="commands">Commands</SelectItem>
                  <SelectItem value="components">Components</SelectItem>
                  <SelectItem value="controllers">Controllers</SelectItem>
                  <SelectItem value="entities">Entities</SelectItem>
                  <SelectItem value="events">Events</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                  <SelectItem value="plugins">Plugins</SelectItem>
                  <SelectItem value="repositories">Repositories</SelectItem>
                  <SelectItem value="services">Services</SelectItem>
                  <SelectItem value="src">Src</SelectItem>
                  <SelectItem value="templates">Templates</SelectItem>
                  <SelectItem value="tests">Tests</SelectItem>
                  <SelectItem value="translations">Translations</SelectItem>
                </SelectContent>
              </Select>
            </motion.div>

            {/* Repository */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-3"
            >
              <h3 className="text-base font-semibold text-gray-800">Repository</h3>
              <Select value={selectedRepository} onValueChange={setSelectedRepository}>
                <SelectTrigger className="bg-gray-50 border-gray-200 hover:border-[#024639] transition-colors duration-200 text-gray-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="api">Api</SelectItem>
                  <SelectItem value="frontend">Frontend</SelectItem>
                  <SelectItem value="backend">Backend</SelectItem>
                  <SelectItem value="shared">Shared</SelectItem>
                </SelectContent>
              </Select>
            </motion.div>

            {/* Sort */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="space-y-3"
            >
              <h3 className="text-base font-semibold text-gray-800">Sort</h3>
              <Select value={selectedSort} onValueChange={setSelectedSort}>
                <SelectTrigger className="bg-gray-50 border-gray-200 hover:border-[#024639] transition-colors duration-200 text-gray-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="alphabetical">Alphabetical</SelectItem>
                  <SelectItem value="date">Date Modified</SelectItem>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="size">Size</SelectItem>
                </SelectContent>
              </Select>
            </motion.div>

            {/* Buttons */}
            <motion.div 
              className="flex gap-3 pt-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Button 
                onClick={expandAll} 
                className="flex-1 bg-[#024639] hover:bg-[#013329] text-white shadow-sm hover:shadow-md transition-all duration-200"
              >
                Expand All
              </Button>
              <Button 
                onClick={collapseAll} 
                variant="secondary" 
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white shadow-sm hover:shadow-md transition-all duration-200"
              >
                Collapse
              </Button>
            </motion.div>
          </div>
        </motion.aside>

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 relative">
          {/* Paw Print Watermarks */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Large center paw */}
            <img 
              src={pawPrint} 
              alt="" 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-auto opacity-[0.06] select-none"
            />
            
            {/* Top area paws */}
            <img 
              src={pawPrint} 
              alt="" 
              className="absolute top-[8%] right-[15%] w-20 h-auto opacity-[0.05] select-none rotate-12"
            />
            <img 
              src={pawPrint} 
              alt="" 
              className="absolute top-[12%] left-[20%] w-16 h-auto opacity-[0.04] select-none -rotate-[15deg]"
            />
            <img 
              src={pawPrint} 
              alt="" 
              className="absolute top-[5%] left-[45%] w-14 h-auto opacity-[0.04] select-none rotate-[25deg]"
            />
            
            {/* Upper-middle area paws */}
            <img 
              src={pawPrint} 
              alt="" 
              className="absolute top-[25%] right-[8%] w-18 h-auto opacity-[0.05] select-none -rotate-[20deg]"
            />
            <img 
              src={pawPrint} 
              alt="" 
              className="absolute top-[30%] left-[10%] w-22 h-auto opacity-[0.045] select-none rotate-[18deg]"
            />
            <img 
              src={pawPrint} 
              alt="" 
              className="absolute top-[22%] right-[35%] w-12 h-auto opacity-[0.04] select-none -rotate-[8deg]"
            />
            
            {/* Middle area paws */}
            <img 
              src={pawPrint} 
              alt="" 
              className="absolute top-[45%] left-[8%] w-16 h-auto opacity-[0.04] select-none rotate-[30deg]"
            />
            <img 
              src={pawPrint} 
              alt="" 
              className="absolute top-[50%] right-[12%] w-20 h-auto opacity-[0.05] select-none -rotate-[15deg]"
            />
            <img 
              src={pawPrint} 
              alt="" 
              className="absolute top-[42%] left-[25%] w-14 h-auto opacity-[0.04] select-none rotate-[22deg]"
            />
            
            {/* Lower-middle area paws */}
            <img 
              src={pawPrint} 
              alt="" 
              className="absolute top-[65%] right-[25%] w-18 h-auto opacity-[0.05] select-none rotate-[12deg]"
            />
            <img 
              src={pawPrint} 
              alt="" 
              className="absolute top-[68%] left-[15%] w-16 h-auto opacity-[0.04] select-none -rotate-[25deg]"
            />
            <img 
              src={pawPrint} 
              alt="" 
              className="absolute top-[62%] right-[8%] w-14 h-auto opacity-[0.045] select-none rotate-[18deg]"
            />
            
            {/* Bottom area paws */}
            <img 
              src={pawPrint} 
              alt="" 
              className="absolute bottom-[15%] left-[12%] w-20 h-auto opacity-[0.05] select-none -rotate-[18deg]"
            />
            <img 
              src={pawPrint} 
              alt="" 
              className="absolute bottom-[12%] right-[20%] w-18 h-auto opacity-[0.05] select-none rotate-[15deg]"
            />
            <img 
              src={pawPrint} 
              alt="" 
              className="absolute bottom-[8%] left-[35%] w-16 h-auto opacity-[0.04] select-none -rotate-[12deg]"
            />
            <img 
              src={pawPrint} 
              alt="" 
              className="absolute bottom-[20%] right-[40%] w-14 h-auto opacity-[0.04] select-none rotate-[28deg]"
            />
            
            {/* Corner accent paws */}
            <img 
              src={pawPrint} 
              alt="" 
              className="absolute top-[18%] right-[5%] w-12 h-auto opacity-[0.035] select-none rotate-[35deg]"
            />
            <img 
              src={pawPrint} 
              alt="" 
              className="absolute bottom-[25%] left-[5%] w-12 h-auto opacity-[0.035] select-none -rotate-[32deg]"
            />
          </div>
          
          <div className="max-w-5xl relative z-10">
            {/* Header */}
            <motion.div 
              className="flex flex-col sm:flex-row items-start justify-between mb-6 gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div>
                <h1 className="text-xl sm:text-2xl text-gray-900 mb-1 font-semibold">Documentation results</h1>
                <p className="text-sm text-gray-500 flex items-center gap-2">
                  <Badge variant="secondary" className="bg-[#024639] text-white hover:bg-[#024639]">48</Badge>
                  matching documents
                </p>
              </div>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-sm text-[#024639] hover:text-[#013329] hover:underline font-medium flex items-center gap-1"
              >
                Clear filters
              </motion.button>
            </motion.div>

            {/* Tabs */}
            <motion.div 
              className="flex gap-4 sm:gap-6 border-b border-gray-200 mb-6 overflow-x-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <motion.button
                whileHover={{ y: -2 }}
                onClick={() => setActiveTab("all")}
                className={`pb-2 text-sm whitespace-nowrap transition-all duration-200 ${
                  activeTab === "all"
                    ? "text-[#024639] border-b-2 border-[#024639] font-medium"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                All
              </motion.button>
              <motion.button
                whileHover={{ y: -2 }}
                onClick={() => setActiveTab("frontend")}
                className={`pb-2 text-sm flex items-center gap-2 whitespace-nowrap transition-all duration-200 ${
                  activeTab === "frontend"
                    ? "text-[#024639] border-b-2 border-[#024639] font-medium"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Code className="w-4 h-4" />
                Frontend
              </motion.button>
              <motion.button
                whileHover={{ y: -2 }}
                onClick={() => setActiveTab("backend")}
                className={`pb-2 text-sm flex items-center gap-2 whitespace-nowrap transition-all duration-200 ${
                  activeTab === "backend"
                    ? "text-[#024639] border-b-2 border-[#024639] font-medium"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Database className="w-4 h-4" />
                Backend
              </motion.button>
            </motion.div>

            {/* Documentation Sections */}
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {/* Frontend Section */}
              <motion.div 
                className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.button
                  whileHover={{ x: 5 }}
                  onClick={() => toggleSection("frontend")}
                  className="flex items-center gap-3 text-lg mb-4 text-[#024639] hover:text-[#013329] font-semibold transition-colors duration-200 w-full"
                >
                  <motion.div
                    animate={{ rotate: expandedSections.frontend ? 0 : -90 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.div>
                  <div className="flex items-center gap-3 flex-1">
                    <div className="p-2 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg">
                      <Code className="w-5 h-5 text-purple-600" />
                    </div>
                    <span>Frontend</span>
                    <Badge variant="secondary" className="bg-purple-100 text-purple-700 hover:bg-purple-100">25</Badge>
                  </div>
                </motion.button>

                <AnimatePresence>
                  {expandedSections.frontend && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="ml-7 space-y-4 pt-2">
                        {/* Components */}
                        <div className="bg-gradient-to-br from-gray-50 to-white p-4 rounded-lg border border-gray-100">
                          <motion.button
                            whileHover={{ x: 3 }}
                            onClick={() => toggleItem("components")}
                            className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 mb-3 font-medium transition-colors duration-200"
                          >
                            <motion.div
                              animate={{ rotate: expandedItems.components ? 0 : -90 }}
                              transition={{ duration: 0.2 }}
                            >
                              <ChevronDown className="w-4 h-4" />
                            </motion.div>
                            <FolderOpen className="w-4 h-4 text-blue-500" />
                            <span>Components</span>
                            <Badge variant="outline" className="text-xs border-blue-200 text-blue-700">12</Badge>
                          </motion.button>
                          
                          <AnimatePresence>
                            {expandedItems.components && (
                              <motion.div 
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="ml-6 space-y-1 overflow-hidden"
                              >
                                {["Button.tsx", "Card.tsx", "Modal.tsx", "Input.tsx", "Select.tsx", "Table.tsx"].map((file, index) => (
                                  <motion.div
                                    key={file}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    whileHover={{ x: 5, backgroundColor: "rgba(2, 70, 57, 0.05)" }}
                                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#024639] cursor-pointer py-2 px-3 rounded-md transition-all duration-200"
                                  >
                                    <FileText className="w-3.5 h-3.5 text-gray-400" />
                                    <span>{file}</span>
                                  </motion.div>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        {/* Pages */}
                        <div className="bg-gradient-to-br from-gray-50 to-white p-4 rounded-lg border border-gray-100">
                          <motion.button
                            whileHover={{ x: 3 }}
                            onClick={() => toggleItem("pages")}
                            className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 mb-3 font-medium transition-colors duration-200"
                          >
                            <motion.div
                              animate={{ rotate: expandedItems.pages ? 0 : -90 }}
                              transition={{ duration: 0.2 }}
                            >
                              <ChevronDown className="w-4 h-4" />
                            </motion.div>
                            <FolderOpen className="w-4 h-4 text-blue-500" />
                            <span>Pages</span>
                            <Badge variant="outline" className="text-xs border-blue-200 text-blue-700">8</Badge>
                          </motion.button>

                          <AnimatePresence>
                            {expandedItems.pages && (
                              <motion.div 
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="ml-6 space-y-1 overflow-hidden"
                              >
                                {["HomePage.tsx", "Dashboard.tsx", "Profile.tsx", "Settings.tsx"].map((file, index) => (
                                  <motion.div
                                    key={file}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    whileHover={{ x: 5, backgroundColor: "rgba(2, 70, 57, 0.05)" }}
                                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#024639] cursor-pointer py-2 px-3 rounded-md transition-all duration-200"
                                  >
                                    <FileText className="w-3.5 h-3.5 text-gray-400" />
                                    <span>{file}</span>
                                  </motion.div>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        {/* Hooks */}
                        <div className="bg-gradient-to-br from-gray-50 to-white p-4 rounded-lg border border-gray-100">
                          <motion.button
                            whileHover={{ x: 3 }}
                            onClick={() => toggleItem("hooks")}
                            className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 mb-3 font-medium transition-colors duration-200"
                          >
                            <motion.div
                              animate={{ rotate: expandedItems.hooks ? 0 : -90 }}
                              transition={{ duration: 0.2 }}
                            >
                              <ChevronDown className="w-4 h-4" />
                            </motion.div>
                            <FolderOpen className="w-4 h-4 text-blue-500" />
                            <span>Hooks</span>
                            <Badge variant="outline" className="text-xs border-blue-200 text-blue-700">5</Badge>
                          </motion.button>

                          <AnimatePresence>
                            {expandedItems.hooks && (
                              <motion.div 
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="ml-6 space-y-1 overflow-hidden"
                              >
                                {["useAuth.ts", "useFetch.ts", "useLocalStorage.ts"].map((file, index) => (
                                  <motion.div
                                    key={file}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    whileHover={{ x: 5, backgroundColor: "rgba(2, 70, 57, 0.05)" }}
                                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#024639] cursor-pointer py-2 px-3 rounded-md transition-all duration-200"
                                  >
                                    <FileText className="w-3.5 h-3.5 text-gray-400" />
                                    <span>{file}</span>
                                  </motion.div>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Backend Section */}
              <motion.div 
                className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.button
                  whileHover={{ x: 5 }}
                  onClick={() => toggleSection("backend")}
                  className="flex items-center gap-3 text-lg mb-4 text-[#024639] hover:text-[#013329] font-semibold transition-colors duration-200 w-full"
                >
                  <motion.div
                    animate={{ rotate: expandedSections.backend ? 0 : -90 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.div>
                  <div className="flex items-center gap-3 flex-1">
                    <div className="p-2 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg">
                      <Database className="w-5 h-5 text-blue-600" />
                    </div>
                    <span>Backend</span>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-100">23</Badge>
                  </div>
                </motion.button>

                <AnimatePresence>
                  {expandedSections.backend && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="ml-7 space-y-4 pt-2">
                        {/* API */}
                        <div className="bg-gradient-to-br from-gray-50 to-white p-4 rounded-lg border border-gray-100">
                          <motion.button
                            whileHover={{ x: 3 }}
                            onClick={() => toggleItem("api")}
                            className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 mb-3 font-medium transition-colors duration-200"
                          >
                            <motion.div
                              animate={{ rotate: expandedItems.api ? 0 : -90 }}
                              transition={{ duration: 0.2 }}
                            >
                              <ChevronDown className="w-4 h-4" />
                            </motion.div>
                            <FolderOpen className="w-4 h-4 text-blue-500" />
                            <span>Api</span>
                            <Badge variant="outline" className="text-xs border-blue-200 text-blue-700">15</Badge>
                          </motion.button>

                          <AnimatePresence>
                            {expandedItems.api && (
                              <motion.div 
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="ml-6 space-y-1 overflow-hidden"
                              >
                                {["AuthController.ts", "UserController.ts", "ProductController.ts", "OrderController.ts", "PaymentController.ts"].map((file, index) => (
                                  <motion.div
                                    key={file}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    whileHover={{ x: 5, backgroundColor: "rgba(2, 70, 57, 0.05)" }}
                                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#024639] cursor-pointer py-2 px-3 rounded-md transition-all duration-200"
                                  >
                                    <FileText className="w-3.5 h-3.5 text-gray-400" />
                                    <span>{file}</span>
                                  </motion.div>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        {/* Models */}
                        <div className="bg-gradient-to-br from-gray-50 to-white p-4 rounded-lg border border-gray-100">
                          <motion.button
                            whileHover={{ x: 3 }}
                            onClick={() => toggleItem("models")}
                            className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 mb-3 font-medium transition-colors duration-200"
                          >
                            <motion.div
                              animate={{ rotate: expandedItems.models ? 0 : -90 }}
                              transition={{ duration: 0.2 }}
                            >
                              <ChevronDown className="w-4 h-4" />
                            </motion.div>
                            <FolderOpen className="w-4 h-4 text-blue-500" />
                            <span>Models</span>
                            <Badge variant="outline" className="text-xs border-blue-200 text-blue-700">10</Badge>
                          </motion.button>

                          <AnimatePresence>
                            {expandedItems.models && (
                              <motion.div 
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="ml-6 space-y-1 overflow-hidden"
                              >
                                {["User.ts", "Product.ts", "Order.ts", "Payment.ts"].map((file, index) => (
                                  <motion.div
                                    key={file}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    whileHover={{ x: 5, backgroundColor: "rgba(2, 70, 57, 0.05)" }}
                                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#024639] cursor-pointer py-2 px-3 rounded-md transition-all duration-200"
                                  >
                                    <FileText className="w-3.5 h-3.5 text-gray-400" />
                                    <span>{file}</span>
                                  </motion.div>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        {/* Database */}
                        <div className="bg-gradient-to-br from-gray-50 to-white p-4 rounded-lg border border-gray-100">
                          <motion.button
                            whileHover={{ x: 3 }}
                            onClick={() => toggleItem("database")}
                            className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 mb-3 font-medium transition-colors duration-200"
                          >
                            <motion.div
                              animate={{ rotate: expandedItems.database ? 0 : -90 }}
                              transition={{ duration: 0.2 }}
                            >
                              <ChevronDown className="w-4 h-4" />
                            </motion.div>
                            <FolderOpen className="w-4 h-4 text-blue-500" />
                            <span>Database</span>
                            <Badge variant="outline" className="text-xs border-blue-200 text-blue-700">6</Badge>
                          </motion.button>

                          <AnimatePresence>
                            {expandedItems.database && (
                              <motion.div 
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="ml-6 space-y-1 overflow-hidden"
                              >
                                {["schema.sql", "migrations.ts", "seeds.ts"].map((file, index) => (
                                  <motion.div
                                    key={file}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    whileHover={{ x: 5, backgroundColor: "rgba(2, 70, 57, 0.05)" }}
                                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#024639] cursor-pointer py-2 px-3 rounded-md transition-all duration-200"
                                  >
                                    <FileText className="w-3.5 h-3.5 text-gray-400" />
                                    <span>{file}</span>
                                  </motion.div>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Utilities Section */}
              <motion.div 
                className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.button
                  whileHover={{ x: 5 }}
                  onClick={() => toggleSection("database")}
                  className="flex items-center gap-3 text-lg mb-4 text-[#024639] hover:text-[#013329] font-semibold transition-colors duration-200 w-full"
                >
                  <motion.div
                    animate={{ rotate: expandedSections.database ? 0 : -90 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.div>
                  <div className="flex items-center gap-3 flex-1">
                    <div className="p-2 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg">
                      <Package className="w-5 h-5 text-gray-600" />
                    </div>
                    <span>Utilities</span>
                    <Badge variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-gray-100">3</Badge>
                  </div>
                </motion.button>

                <AnimatePresence>
                  {expandedSections.database && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="ml-7 space-y-1 pt-2">
                        {["logger.ts", "validator.ts", "formatter.ts"].map((file, index) => (
                          <motion.div
                            key={file}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ x: 5, backgroundColor: "rgba(2, 70, 57, 0.05)" }}
                            className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#024639] cursor-pointer py-2 px-3 rounded-md transition-all duration-200"
                          >
                            <FileText className="w-3.5 h-3.5 text-gray-400" />
                            <span>{file}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}