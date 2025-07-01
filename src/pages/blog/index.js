import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Mock blog post data - in a real app you might fetch this from an API or CMS
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
          {blogPosts.map((post) => (
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
              <div className="mt-4">
                <Link 
                  href={`/blog/${post.slug}`}
                  className="text-purple-600 hover:text-purple-800 font-medium inline-flex items-center gap-1 group"
                >
                  Read more <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </Link>
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
