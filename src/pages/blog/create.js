import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Geist, Geist_Mono } from "next/font/google";
import { useAuth } from "@/contexts/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function CreateBlog() {
  const router = useRouter();
  const { edit, slug } = router.query;
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    date: new Date().toISOString().split("T")[0],
    slug: "",
    featured: false
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const { getAuthHeader, isAdmin } = useAuth();
  
  // Only fetch data when router is ready and we have query params
  useEffect(() => {
    // Redirect if not admin
    if (!isAdmin()) {
      router.push("/blog");
      return;
    }
    
    // Only proceed if router is ready and we have query params
    if (!router.isReady) return;
    
    if (edit && slug) {
      // We're in edit mode
      setIsEditMode(true);
      setEditId(edit);
      
      // Track if component is mounted
      let isMounted = true;
      const controller = new AbortController();
      
      // Check for cached data first
      const cacheKey = `blogPost_${slug}`;
      const cachedPost = sessionStorage.getItem(cacheKey);
      const cachedTimestamp = sessionStorage.getItem(`${cacheKey}_timestamp`);
      const now = new Date().getTime();
      const cacheExpiry = 60000; // 1 minute cache expiry
      
      // Load existing post data from MongoDB
      const fetchPost = async () => {
        // If we have valid cached data, use it first
        if (cachedPost && cachedTimestamp && (now - parseInt(cachedTimestamp)) < cacheExpiry) {
          const postToEdit = JSON.parse(cachedPost);
          
          if (isMounted) {
            const formattedPost = {
              title: postToEdit.title || '',
              excerpt: postToEdit.excerpt || '',
              content: postToEdit.content || '',
              date: postToEdit.date ? new Date(postToEdit.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
              slug: postToEdit.slug || '',
              featured: postToEdit.featured || false
            };
            
            setFormData(formattedPost);
          }
          return;
        }
        
        try {
          // Add a small delay to prevent race conditions
          await new Promise(resolve => setTimeout(resolve, 100));
          
          const response = await fetch(`/api/blog/${slug}`, {
            signal: controller.signal,
            headers: {
              ...getAuthHeader()
            }
          });
          
          if (!response.ok) {
            throw new Error('Failed to fetch post data');
          }
          
          const { success, data, error } = await response.json();
          
          if (!success) {
            throw new Error(error || 'Failed to load post data');
          }
          
          const postToEdit = data;
          
          if (isMounted) {
            const formattedPost = {
              title: postToEdit.title || '',
              excerpt: postToEdit.excerpt || '',
              content: postToEdit.content || '',
              date: postToEdit.date ? new Date(postToEdit.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
              slug: postToEdit.slug || '',
              featured: postToEdit.featured || false
            };
            
            setFormData(formattedPost);
            
            // Cache the post data
            sessionStorage.setItem(cacheKey, JSON.stringify(postToEdit));
            sessionStorage.setItem(`${cacheKey}_timestamp`, now.toString());
          }
        } catch (error) {
          if (error.name !== 'AbortError' && isMounted) {
            console.error('Error loading post for editing:', error);
            setFormError('Could not load post data for editing.');
          }
        }
      };
      
      fetchPost();
      
      // Clean up function
      return () => {
        isMounted = false;
        controller.abort();
      };
    }
  }, [router.isReady, edit, slug, router, isAdmin, getAuthHeader]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
    
    // Auto-generate slug from title
    if (name === "title") {
      const slug = value
        .toLowerCase()
        .replace(/[^\w\s]/gi, "")
        .replace(/\s+/g, "-");
      
      setFormData(prev => ({ ...prev, slug }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError("");

    try {
      // Format the submission data
      const submissionData = {
        ...formData,
        date: new Date(formData.date) // Send as proper date object
      };
      
      let response;
      
      if (isEditMode) {
        // Update existing post via API
        response = await fetch(`/api/blog/${slug}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            ...getAuthHeader()
          },
          body: JSON.stringify(submissionData),
        });
      } else {
        // Create new post via API
        response = await fetch('/api/blog', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...getAuthHeader()
          },
          body: JSON.stringify(submissionData),
        });
      }

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Error saving blog post');
      }
      
      alert(isEditMode ? "Blog post updated successfully!" : "Blog post created successfully!");
      
      // Redirect to blog index after successful submission
      router.push("/blog");
    } catch (error) {
      setFormError(error.message || "Something went wrong. Please try again.");
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`${geistSans.className} ${geistMono.className} min-h-screen p-8 sm:p-16  mx-auto bg-gradient-to-b from-purple-50/70 to-pink-50/60 bg-purple-25/10`}>
      <header className="mb-8 py-2 px-6 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl shadow-lg text-white flex flex-wrap items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{isEditMode ? "Edit Blog Post" : "Create New Blog Post"}</h1>
        </div>
        <Link href="/blog" className="text-white hover:text-gray-200 font-medium flex items-center gap-1 w-fit group transition-all">
          <span className="group-hover:-translate-x-1 transition-transform duration-300">←</span> Back to Blog
        </Link>
      </header>
      
      {formError && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 mb-6 rounded-lg">
          {formError}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-medium mb-2">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Enter blog title"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="slug" className="block text-gray-700 font-medium mb-2">Slug (URL-friendly identifier)</label>
          <input
            type="text"
            id="slug"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="url-friendly-slug"
          />
          <p className="text-gray-500 text-sm mt-1">Auto-generated from title, but you can edit it.</p>
        </div>
        
        <div className="mb-4">
          <label htmlFor="excerpt" className="block text-gray-700 font-medium mb-2">Excerpt</label>
          <textarea
            id="excerpt"
            name="excerpt"
            value={formData.excerpt}
            onChange={handleChange}
            required
            rows="3"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Brief summary of your blog post"
          ></textarea>
        </div>
        
        <div className="mb-4">
          <label htmlFor="content" className="block text-gray-700 font-medium mb-2">Content</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            rows="10"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Write your blog post content here..."
          ></textarea>
        </div>
        
        <div className="mb-4">
          <label htmlFor="date" className="block text-gray-700 font-medium mb-2">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        
        <div className="mb-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
              className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-gray-700">Featured post</span>
          </label>
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-md hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? 'Saving...' : isEditMode ? 'Update Post' : 'Create Post'}
          </button>
        </div>
      </form>
    </div>
  );
}