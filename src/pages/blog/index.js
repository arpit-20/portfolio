import Link from "next/link";
import { useRouter } from "next/router";
import { Geist, Geist_Mono } from "next/font/google";
import { useState, useEffect } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Default blog post data that will be merged with user-created posts
const blogPosts = [
  {
    id: 1,
    title: "Shock Mechanica: Full Stack Application Documentation",
    excerpt: "Complete documentation of my shocker repair and parts ordering application built with React, Node.js, Express, and MongoDB.",
    date: "June 2, 2025",
    slug: "shock-mechanica-documentation",
    featured: true
  },
  {
    id: 2,
    title: "Getting Started with Next.js",
    excerpt: "Learn the basics of Next.js and how to create your first app.",
    date: "May 28, 2025",
    slug: "getting-started-with-nextjs"
  },
  {
    id: 3,
    title: "Docker Journey with React Counter App",
    excerpt: "My experience containerizing a React application with Docker, including best practices and deployment workflows.",
    date: "June 1, 2025",
    slug: "docker-journey-react-counter-app",
    featured: true
  },
  {
    id: 4,
    title: "Building a Portfolio with Next.js",
    excerpt: "A guide to creating an impressive developer portfolio using Next.js.",
    date: "May 25, 2025",
    slug: "building-portfolio-with-nextjs"
  },
  {
    id: 4,
    title: "Mastering CSS Grid and Flexbox",
    excerpt: "Deep dive into modern CSS layout techniques for responsive designs.",
    date: "May 20, 2025",
    slug: "mastering-css-grid-flexbox"
  }
];

export default function Blog() {
  const [allPosts, setAllPosts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // Get user created posts from localStorage
    let userPosts = [];
    try {
      const savedPosts = localStorage.getItem('blogPosts');
      if (savedPosts) {
        userPosts = JSON.parse(savedPosts);
      }
    } catch (error) {
      console.error('Error loading blog posts from localStorage:', error);
    }

    // Combine default posts with user posts, giving user posts higher IDs
    // and avoiding duplicate slugs
    const highestId = blogPosts.reduce((max, post) => Math.max(max, post.id), 0);
    const formattedUserPosts = userPosts.map((post, index) => ({
      ...post,
      id: highestId + index + 1,
      isUserCreated: true // Mark user-created posts
    }));

    // Merge and sort by date (newest first)
    const merged = [...blogPosts, ...formattedUserPosts].sort((a, b) => 
      new Date(b.date) - new Date(a.date)
    );
    
    setAllPosts(merged);
  }, []);
  
  const handleDelete = (postId) => {
    // Confirm before deleting
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    
    try {
      // Get current posts from localStorage
      const savedPosts = localStorage.getItem('blogPosts');
      if (savedPosts) {
        // Parse saved posts
        const userPosts = JSON.parse(savedPosts);
        
        // Find the post to delete by matching its properties with allPosts
        const postToDelete = allPosts.find(post => post.id === postId);
        
        if (postToDelete && postToDelete.isUserCreated) {
          // Filter out posts with matching title and date (unique identifiers)
          const updatedPosts = userPosts.filter(post => 
            post.title !== postToDelete.title || 
            post.date !== postToDelete.date
          );
          
          // Save updated posts to localStorage
          localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
          
          // Update UI by filtering out the deleted post
          setAllPosts(prev => prev.filter(post => post.id !== postId));
        } else {
          alert('You can only delete posts you created.');
        }
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post.');
    }
  };
  
  const handleEdit = (post) => {
    if (post.isUserCreated) {
      // Navigate to edit page with post data
      router.push(`/blog/create?edit=${post.id}&slug=${post.slug}`);
    } else {
      alert('You can only edit posts you created.');
    }
  };

  return (
    <div className={`${geistSans.className} ${geistMono.className} min-h-screen p-8 sm:p-16 max-w-6xl mx-auto bg-gradient-to-b from-purple-50/70 to-pink-50/60 bg-purple-25/10`}>
      <header className="mb-4 py-2 px-6 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl shadow-lg text-white flex flex-wrap items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-0">Blog</h1>
          <p className="text-sm text-purple-100">Thoughts, ideas, and tutorials</p>
        </div>
        <div className="flex items-center gap-4">
          <Link 
            href="/blog/create" 
            className="bg-white text-purple-600 hover:bg-purple-100 px-4 py-2 rounded-lg font-medium shadow-md transition-all duration-300 hover:-translate-y-1 flex items-center gap-1"
          >
            <span className="text-lg">+</span> Create Blog
          </Link>
          <Link href="/" className="text-white hover:text-purple-200 font-medium flex items-center gap-1 w-fit group text-xl">
            <span className="group-hover:-translate-x-1 transition-transform duration-300">←</span> Back to Home
          </Link>
        </div>
      </header>

      <main>
        <div className="space-y-10">
          {allPosts.map((post) => (
            <article key={post.id} className={`border ${post.featured ? 'border-purple-400 bg-gradient-to-br from-white to-purple-50' : 'border-purple-200 bg-white'} rounded-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative`}>
              {post.featured && (
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                  Featured
                </div>
              )}
              <h2 className="text-2xl font-bold mb-2">
                <Link href={`/blog/${post.slug}`} className="hover:text-purple-600 transition-colors">
                  {post.title}
                </Link>
              </h2>
              <p className="text-gray-500 text-sm mb-4">{post.date}</p>
              <p className="text-gray-700">{post.excerpt}</p>
              <div className="mt-4 flex justify-between items-center">
                <Link 
                  href={`/blog/${post.slug}`}
                  className="text-purple-600 hover:text-purple-800 font-medium inline-flex items-center gap-1 group"
                >
                  Read more <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </Link>
                
                <div className="flex gap-3">
                  <button 
                    onClick={() => handleEdit(post)}
                    className={`transition-colors p-1 rounded-full ${post.isUserCreated ? 'text-indigo-500 hover:text-indigo-700 hover:bg-indigo-50' : 'text-gray-300 cursor-not-allowed'}`}
                    title={post.isUserCreated ? "Edit post" : "Cannot edit default posts"}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                  </button>
                  <button 
                    onClick={() => handleDelete(post.id)}
                    className={`transition-colors p-1 rounded-full ${post.isUserCreated ? 'text-red-500 hover:text-red-700 hover:bg-red-50' : 'text-gray-300 cursor-not-allowed'}`}
                    title={post.isUserCreated ? "Delete post" : "Cannot delete default posts"}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>

      <footer className="mt-16 pt-8 border-t border-purple-200 text-center text-purple-600 bg-gradient-to-r from-purple-50 to-indigo-50 py-6 rounded-xl">
        <p>© {new Date().getFullYear()} My Portfolio Blog</p>
      </footer>
    </div>
  );
}
