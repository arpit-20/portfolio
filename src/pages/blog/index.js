import Link from "next/link";
import { useRouter } from "next/router";
import { Geist, Geist_Mono } from "next/font/google";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Blog() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { user, isAdmin, getAuthHeader } = useAuth();

  useEffect(() => {
    // Create a variable to track if component is mounted
    let isMounted = true;
    // Create controller for potential abort
    const controller = new AbortController();
    
    // Check if we have cached data in sessionStorage
    const cachedData = sessionStorage.getItem('blogPosts');
    const cachedTimestamp = sessionStorage.getItem('blogPostsTimestamp');
    const now = new Date().getTime();
    const cacheExpiry = 60000; // 1 minute cache expiry
    
    // Fetch blog posts from API
    const fetchBlogPosts = async () => {
      // If we have valid cached data, use it first
      if (cachedData && cachedTimestamp && (now - parseInt(cachedTimestamp)) < cacheExpiry) {
        const data = JSON.parse(cachedData);
        setBlogPosts(data);
        setFilteredPosts(data);
        setLoading(false);
        return; // Exit early, we'll still fetch fresh data below
      }
      
      try {
        setLoading(true);
        const res = await fetch('/api/blog', { signal: controller.signal });
        const { success, data, error } = await res.json();
        
        if (!success) {
          throw new Error(error || 'Failed to fetch blog posts');
        }
        
        // Only update state if component is still mounted
        if (isMounted) {
          setBlogPosts(data || []);
          setFilteredPosts(data || []);
          
          // Cache the data in sessionStorage
          sessionStorage.setItem('blogPosts', JSON.stringify(data || []));
          sessionStorage.setItem('blogPostsTimestamp', now.toString());
        }
      } catch (err) {
        if (err.name !== 'AbortError' && isMounted) {
          console.error('Error fetching blog posts:', err);
          setError('Failed to load blog posts. Please try again later.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    
    fetchBlogPosts();
    
    // Cleanup function to prevent state updates if component unmounts
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  useEffect(() => {
    // Filter posts based on search term
    if (searchTerm.trim() === "") {
      setFilteredPosts(blogPosts);
    } else {
      const filtered = blogPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPosts(filtered);
    }
  }, [searchTerm, blogPosts]);

  const featuredPosts = filteredPosts.filter((post) => post.featured);
  const regularPosts = filteredPosts.filter((post) => !post.featured);
  
  // Handle delete blog post
  const handleDelete = async (slug, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      try {
        setIsDeleting(true);
        const res = await fetch(`/api/blog/${slug}`, {
          method: 'DELETE',
          headers: {
            ...getAuthHeader(),
            'Content-Type': 'application/json'
          }
        });
        
        const { success, error } = await res.json();
        
        if (!success) {
          throw new Error(error || 'Failed to delete blog post');
        }
        
        // Update the UI by removing the deleted post
        setBlogPosts(prevPosts => prevPosts.filter(post => post.slug !== slug));
        setFilteredPosts(prevPosts => prevPosts.filter(post => post.slug !== slug));
        alert('Blog post deleted successfully');
      } catch (err) {
        console.error('Error deleting blog post:', err);
        alert('Failed to delete blog post. Please try again later.');
      } finally {
        setIsDeleting(false);
      }
    }
  };
  

  return (
    <div className={`${geistSans.className} ${geistMono.className} min-h-screen p-8 sm:p-16 max-w-8xl mx-auto bg-gradient-to-b from-purple-50/70 to-pink-50/60 bg-purple-25/10`}>
      <header className="mb-12">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Blog</h1>
          <Link href="/" className="text-purple-600 hover:text-purple-800 font-medium flex items-center gap-1 w-fit group transition-all">
            <span className="group-hover:-translate-x-1 transition-transform duration-300">←</span> Back to Home
          </Link>
        </div>
        <p className="text-gray-600 mt-2 mb-6">Thoughts, stories, and ideas.</p>
        
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSearchBar(!showSearchBar)}
              className="text-purple-700 hover:text-purple-900 focus:outline-none"
            >
              {showSearchBar ? "✕ Close" : "🔍 Search"}
            </button>
            {showSearchBar && (
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                autoFocus
              />
            )}
          </div>
          
          {isAdmin() && (
            <Link href="/blog/create" className="px-5 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg text-white font-medium shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex items-center gap-2">
              <span>✏️</span>
              <span>Create Blog</span>
            </Link>
          )}
        </div>
      </header>
      
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 mb-8 rounded-lg">
          {error}
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-2xl text-gray-600 mb-4">No blog posts found</h2>
          {searchTerm ? (
            <p className="text-gray-500">Try a different search term or create a new post.</p>
          ) : (
            <p className="text-gray-500">Start by creating your first blog post!</p>
          )}
        </div>
      ) : (
        <>
          {featuredPosts.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-purple-800">Featured Posts</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {featuredPosts.map((post) => (
                  <article
                    key={post._id || post.id}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 text-gray-800">
                        <Link href={`/blog/${post.slug}`} className="hover:text-purple-600 transition-colors">
                          {post.title}
                        </Link>
                      </h3>
                      <p className="text-gray-600 mb-4">{post.excerpt}</p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">{post.date instanceof Date ? post.date.toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'}) : new Date(post.date).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})}</span>
                        <div className="flex items-center gap-3">
                          {isAdmin() && (
                            <>
                              <Link href={`/blog/create?edit=true&slug=${post.slug}`} className="text-blue-600 hover:text-blue-800 font-medium p-1 rounded-full hover:bg-blue-50 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-edit">
                                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                </svg>
                              </Link>
                              <button 
                                onClick={() => handleDelete(post.slug, post.title)}
                                className="text-red-600 hover:text-red-800 font-medium p-1 rounded-full hover:bg-red-50 transition-colors"
                                disabled={isDeleting}
                                aria-label="Delete blog post"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-trash-2">
                                  <polyline points="3 6 5 6 21 6"></polyline>
                                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                  <line x1="10" y1="11" x2="10" y2="17"></line>
                                  <line x1="14" y1="11" x2="14" y2="17"></line>
                                </svg>
                              </button>
                            </>
                          )}
                          <Link href={`/blog/${post.slug}`} className="text-purple-600 hover:text-purple-800 font-medium">
                            Read More →
                          </Link>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          {regularPosts.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-6 text-purple-800">All Posts</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {regularPosts.map((post) => (
                  <article
                    key={post._id || post.id}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="p-5">
                      <h3 className="text-lg font-bold mb-2 text-gray-800">
                        <Link href={`/blog/${post.slug}`} className="hover:text-purple-600 transition-colors">
                          {post.title}
                        </Link>
                      </h3>
                      <p className="text-gray-600 mb-3 text-sm line-clamp-2">{post.excerpt}</p>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500">{post.date instanceof Date ? post.date.toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'}) : new Date(post.date).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})}</span>
                        <div className="flex items-center gap-2">
                          {isAdmin() && (
                            <>
                              <Link href={`/blog/create?edit=true&slug=${post.slug}`} className="text-blue-600 hover:text-blue-800 font-medium p-1 rounded-full hover:bg-blue-50 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-edit">
                                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                </svg>
                              </Link>
                              <button 
                                onClick={() => handleDelete(post.slug, post.title)}
                                className="text-red-600 hover:text-red-800 font-medium p-1 rounded-full hover:bg-red-50 transition-colors"
                                disabled={isDeleting}
                                aria-label="Delete blog post"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-trash-2">
                                  <polyline points="3 6 5 6 21 6"></polyline>
                                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                  <line x1="10" y1="11" x2="10" y2="17"></line>
                                  <line x1="14" y1="11" x2="14" y2="17"></line>
                                </svg>
                              </button>
                            </>
                          )}
                          <Link href={`/blog/${post.slug}`} className="text-purple-600 hover:text-purple-800 font-medium">
                            Read More →
                          </Link>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}
        </>
      )}
      
      <footer className="mt-16 pt-8 border-t border-purple-200 text-center text-purple-600">
        <p>© {new Date().getFullYear()} My Portfolio Blog</p>
      </footer>
    </div>
  );
}