import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Geist, Geist_Mono } from "next/font/google";

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
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    date: new Date().toISOString().split("T")[0],
    slug: "",
    featured: false
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

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
      // In a real app, you'd submit this to an API endpoint
      console.log("Blog post data:", formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to blog index after "submission"
      alert("Blog post created successfully!");
      router.push("/blog");
    } catch (error) {
      setFormError("Something went wrong. Please try again.");
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`${geistSans.className} ${geistMono.className} min-h-screen p-8 sm:p-16 max-w-6xl mx-auto bg-gradient-to-b from-purple-50/70 to-pink-50/60 bg-purple-25/10`}>
      <header className="mb-8 py-2 px-6 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl shadow-lg text-white flex flex-wrap items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-0">Create New Blog Post</h1>
          <p className="text-sm text-purple-100">Add a new post to your collection</p>
        </div>
        <Link href="/blog" className="text-white hover:text-purple-200 font-medium flex items-center gap-1 group">
          <span className="group-hover:-translate-x-1 transition-transform duration-300">←</span> Back to Blog
        </Link>
      </header>

      <main className="bg-white rounded-xl shadow-lg p-8 mb-10">
        {formError && (
          <div className="bg-red-50 text-red-700 p-4 mb-6 rounded-lg border border-red-200">
            {formError}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="title" className="block text-gray-700 font-medium">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="e.g., Building a Portfolio with Next.js"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="excerpt" className="block text-gray-700 font-medium">
              Excerpt <span className="text-red-500">*</span>
            </label>
            <textarea
              id="excerpt"
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="e.g., A guide to creating an impressive developer portfolio using Next.js."
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="date" className="block text-gray-700 font-medium">
              Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="slug" className="block text-gray-700 font-medium">
              Slug <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="slug"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="e.g., building-portfolio-with-nextjs"
              required
            />
            <p className="text-gray-500 text-sm">
              URL-friendly version of the title (auto-generated, but you can edit it)
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="featured"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
              className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
            />
            <label htmlFor="featured" className="text-gray-700">
              Mark as featured post
            </label>
          </div>

          <div className="pt-4 flex justify-end gap-4">
            <Link 
              href="/blog" 
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg text-white font-medium shadow-md hover:shadow-lg transition-all duration-300 ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:-translate-y-1"
              }`}
            >
              {isSubmitting ? "Creating..." : "Create Post"}
            </button>
          </div>
        </form>
      </main>

      <footer className="pt-8 border-t border-purple-200 text-center text-purple-600 bg-gradient-to-r from-purple-50 to-indigo-50 py-6 rounded-xl">
        <p>© {new Date().getFullYear()} My Portfolio Blog</p>
      </footer>
    </div>
  );
}
