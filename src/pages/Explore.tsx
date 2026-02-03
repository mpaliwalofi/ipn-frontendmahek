import { useState, useMemo } from "react";
import { Search } from "lucide-react";

import { DocumentList } from "@/app/components/DocumentList";
import { DocumentViewer } from "@/app/components/DocumentViewer";
import { mockDocuments } from "@/app/data/mockData";
import type { Document } from "@/app/types";

import logo from "@/assets/logo.jpg";

export default function Explore() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedRepository, setSelectedRepository] = useState("all");
  const [sortOrder, setSortOrder] = useState("title");
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);

  // Unique categories
  const categories = useMemo(() => {
    const cats = new Set(mockDocuments.map((doc) => doc.category));
    return ["all", ...Array.from(cats)];
  }, []);

  // Unique repositories
  const repositories = useMemo(() => {
    const repos = new Set(mockDocuments.map((doc) => doc.repository));
    return ["all", ...Array.from(repos)];
  }, []);

  // Filter + sort documents
  const filteredDocuments = useMemo(() => {
    let filtered = mockDocuments.filter((doc) => {
      const matchesSearch =
        searchQuery === "" ||
        doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.fileName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" || doc.category === selectedCategory;

      const matchesRepository =
        selectedRepository === "all" || doc.repository === selectedRepository;

      return matchesSearch && matchesCategory && matchesRepository;
    });

    if (sortOrder === "title") {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOrder === "repo") {
      filtered.sort((a, b) => a.repository.localeCompare(b.repository));
    } else if (sortOrder === "category") {
      filtered.sort((a, b) => a.category.localeCompare(b.category));
    }

    return filtered;
  }, [searchQuery, selectedCategory, selectedRepository, sortOrder]);

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedRepository("all");
    setSortOrder("title");
  };

  return (
    <div className="min-h-screen bg-[#F5F3EE]">
      {/* Header */}
      <header className="bg-gradient-to-br from-[#024639] via-[#025142] to-[#035D4B] px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <img
            src={logo}
            alt="Inspired Pet Nutrition"
            className="h-14 w-auto mb-6"
          />

          <h1 className="text-white text-3xl md:text-4xl font-semibold">
            Documentation Explorer
          </h1>
          <p className="text-white/80 mt-2 max-w-2xl">
            Search, filter, and preview generated documentation across all
            repositories.
          </p>
        </div>
      </header>

      {/* Search & Filters */}
      <section className="bg-white border-b border-[#E8E6E1] sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="search"
              placeholder="Search documentation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#004536]"
            />
          </div>

          <div className="flex gap-3 flex-wrap">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border-2 border-gray-200 rounded-xl"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "all" ? "All categories" : cat}
                </option>
              ))}
            </select>

            <select
              value={selectedRepository}
              onChange={(e) => setSelectedRepository(e.target.value)}
              className="px-4 py-3 border-2 border-gray-200 rounded-xl"
            >
              {repositories.map((repo) => (
                <option key={repo} value={repo}>
                  {repo === "all" ? "All repositories" : repo}
                </option>
              ))}
            </select>

            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="px-4 py-3 border-2 border-gray-200 rounded-xl"
            >
              <option value="title">Alphabetical</option>
              <option value="repo">Repository</option>
              <option value="category">Category</option>
            </select>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="grid grid-cols-1 lg:grid-cols-[420px_1fr] min-h-[calc(100vh-260px)]">
        <DocumentList
          documents={filteredDocuments}
          selectedDocument={selectedDocument}
          onSelectDocument={setSelectedDocument}
          onClearFilters={handleClearFilters}
        />

        <DocumentViewer document={selectedDocument} />
      </main>
    </div>
  );
}
