import Image from "next/image";
import Link from "next/link";
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

export default function Home() {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const { user, login, logout } = useAuth();

  const handleLoginClick = () => {
    setShowLoginForm(!showLoginForm);
  };

  return (
    <div
      className={`${geistSans.className} ${geistMono.className} min-h-screen p-8 pb-20 sm:p-16 font-[family-name:var(--font-geist-sans)] bg-gradient-to-b from-purple-50/70 to-pink-50/60 bg-purple-25/10`}
    >
      <header className="w-full mb-16 sm:mb-24 sticky top-0 z-50">
        <nav className="flex justify-between items-center py-4 px-6 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl shadow-lg max-w-7xl mx-auto backdrop-blur-md bg-opacity-90">
          <div className="font-bold text-2xl text-white flex items-center gap-2">
            <div className="h-8 w-8 bg-white rounded-full flex items-center justify-center text-purple-700 font-bold">A</div>
            <span>My Portfolio !</span>
          </div>
          <div className="flex gap-2 md:gap-6">
            <Link href="/" className="relative group px-3 py-2 text-white text-xl font-medium">
              <span>Home</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full"></span>
            </Link>
            <a href="#about" className="relative group px-3 py-2 text-white text-xl font-medium">
              <span>About</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full"></span>
            </a>
            <Link href="/blog" className="relative group px-3 py-2 text-white text-xl font-medium">
              <span>Blog</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full"></span>
            </Link>
            <a href="#projects" className="relative group px-3 py-2 text-white text-xl font-medium">
              <span>Projects</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full"></span>
            </a>
            <a href="#contact" className="relative group px-3 py-2 text-white text-xl font-medium">
              <span>Contact</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full"></span>
            </a>
            {user ? (
              <div className="flex items-center gap-3">
                <button 
                  onClick={logout} 
                  className="bg-white text-purple-700 hover:bg-gray-100 px-4 py-1 rounded-md transition-colors shadow-md"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button 
                onClick={handleLoginClick} 
                className="bg-white text-purple-700 hover:bg-gray-100 px-4 py-1 rounded-md transition-colors shadow-md"
              >
                Login
              </button>
            )}
          </div>
        </nav>
      </header>

      {/* Login Form Popup */}
      {showLoginForm && !user && (
        <div className="fixed inset-0 backdrop-blur-md bg-purple-600/20 flex items-center justify-center z-50">
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl shadow-2xl p-8 max-w-md w-full mx-4 transform transition-all border border-purple-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-purple-800">Welcome Back</h2>
              <button 
                onClick={() => setShowLoginForm(false)}
                className="text-purple-500 hover:text-purple-700 text-2xl focus:outline-none"
              >
                ×
              </button>
            </div>
            <LoginForm onClose={() => setShowLoginForm(false)} />
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-6">
        {/* Hero Section */}
        <section className="hero-section mb-24 flex flex-col lg:flex-row items-center gap-12 bg-gradient-to-r from-purple-100 to-indigo-100 p-10 rounded-2xl shadow-md">
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-purple-800">Hello, I&apos;m Arpit</h1>
            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto lg:mx-0">
              Full Stack Developer with 6+ years of experience building modern, responsive web applications with Next.js and React.
            </p>
            <div className="flex gap-4 justify-center lg:justify-start">
              <a 
                href="#about" 
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-md transition-colors shadow-md"
              >
                Learn More
              </a>
              <a 
                href="#projects" 
                className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-md transition-colors shadow-md"
              >
                View Projects
              </a>
            </div>
          </div>
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative w-140 h-180 rounded-full overflow-hidden border-4 border-purple-500 shadow-xl">
              <Image 
                src="/image.png" 
                alt="Professional headshot" 
                fill 
                style={{objectFit: "cover"}} 
                priority
              />
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="mb-24 flex flex-col md:flex-row-reverse gap-12 items-center">
          <div className="md:w-1/2 space-y-6 p-8 border border-purple-200 rounded-lg bg-gradient-to-r from-purple-50/70 to-pink-50/60 bg-purple-25/10 shadow-md hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-3xl font-bold text-purple-800">About Me</h2>
            <h3 className="text-3xl font-medium text-gray-700">Full Stack Developer</h3>
            <p className="text-xl text-gray-700">
              I&apos;m a passionate web developer with 6+ years of experience, specializing in creating responsive and user-friendly web applications. My expertise spans both frontend and backend technologies.
            </p>
            <p className="text-xl text-gray-700">
              I enjoy solving complex problems and turning ideas into elegant, efficient code. When I&apos;m not coding, you&apos;ll find me exploring new technologies or contributing to open-source projects.
            </p>
            <div>
              <h4 className="text-xl font-medium mb-4 text-gray-700">Technical Skills</h4>
              <div className="flex gap-2 flex-wrap">
                <span className="bg-purple-200 text-purple-800 px-3 py-1 text-lg rounded-full">React</span>
                <span className="bg-purple-200 text-purple-800 px-3 py-1 text-lg rounded-full">Next.js</span>
                <span className="bg-purple-200 text-purple-800 px-3 py-1 text-lg rounded-full">Node.js</span>
                <span className="bg-purple-200 text-purple-800 px-3 py-1 text-lg rounded-full">TypeScript</span>
                <span className="bg-indigo-200 text-indigo-800 px-3 py-1 text-lg rounded-full">TailwindCSS</span>
                <span className="bg-indigo-200 text-indigo-800 px-3 py-1 text-lg rounded-full">MongoDB</span>
                <span className="bg-indigo-200 text-indigo-800 px-3 py-1 text-lg rounded-full">PostgreSQL</span>
                <span className="bg-indigo-200 text-indigo-800 px-3 py-1 text-lg rounded-full">Docker</span>
                <span className="bg-indigo-200 text-indigo-800 px-3 py-1 text-lg rounded-full">AWS</span>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-140 h-180 rounded-full overflow-hidden border-4 border-purple-500 shadow-xl transform hover:scale-105 transition-transform duration-300">
              <Image src="/image.png" alt="Professional headshot" fill style={{objectFit: "cover"}} priority />
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="mb-24">
          <h2 className="text-3xl font-bold mb-10 text-center text-purple-800">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Project 1 */}
            <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow bg-gradient-to-r from-purple-50/70 to-pink-50/60 bg-purple-25/10">
              <div className="relative h-72 w-full overflow-hidden bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center">
                <div className="text-center px-6 py-4 bg-white/10 backdrop-blur-sm rounded-lg max-w-xs">
                  <h3 className="text-white font-bold text-2xl mb-1">Shock Mechanica</h3>
                  <p className="text-blue-100 text-sm">Shocker repair & parts service</p>
                </div>
              </div>
              <div className="p-8 bg-gradient-to-r from-purple-50/70 to-pink-50/60 bg-purple-25/10 min-h-[220px]">
                <h3 className="font-bold text-xl mb-2">Shock Mechanica</h3>
                <p className="text-gray-700 mb-4">
                  A full-stack application for shocker repair servicing and ordering shocker parts. Features online booking, parts catalog, and order management system.
                </p>
                <div className="flex gap-2 mb-4 flex-wrap">
                  <span className="bg-purple-100 text-purple-800 px-2 py-1 text-sm rounded">React.js</span>
                  <span className="bg-purple-100 text-purple-800 px-2 py-1 text-sm rounded">Node.js</span>
                  <span className="bg-purple-100 text-purple-800 px-2 py-1 text-sm rounded">Express.js</span>
                  <span className="bg-purple-100 text-purple-800 px-2 py-1 text-sm rounded">MongoDB</span>
                </div>
                <a href="https://theshockmechanica.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-purple-600 font-medium hover:text-purple-800 transition-colors">View Project →</a>
              </div>
            </div>
            
            {/* Project 2 - Docker Documentation */}
            <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow bg-gradient-to-r from-purple-50/70 to-pink-50/60 bg-purple-25/10">
              <div className="relative h-72 w-full bg-gradient-to-r from-indigo-500 to-blue-600 flex items-center justify-center">
                <div className="text-center px-6 py-4 bg-white/10 backdrop-blur-sm rounded-lg max-w-xs">
                  <h3 className="text-white font-bold text-2xl mb-1">Docker Journey</h3>
                  <p className="text-blue-100 text-sm">Containerization for web applications</p>
                </div>
              </div>
              <div className="p-8 bg-gradient-to-r from-purple-50/70 to-pink-50/60 bg-purple-25/10 min-h-[220px]">
                <h3 className="font-bold text-xl mb-2">Docker Journey</h3>
                <p className="text-gray-700 mb-4">
                  Comprehensive documentation on containerizing a React application with Docker, including development and production workflows.
                </p>
                <div className="flex gap-2 mb-4 flex-wrap">
                  <span className="bg-purple-100 text-purple-800 px-2 py-1 text-sm rounded">Docker</span>
                  <span className="bg-purple-100 text-purple-800 px-2 py-1 text-sm rounded">Docker Compose</span>
                  <span className="bg-purple-100 text-purple-800 px-2 py-1 text-sm rounded">React</span>
                  <span className="bg-purple-100 text-purple-800 px-2 py-1 text-sm rounded">Nginx</span>
                </div>
                <Link href="/blog/docker-journey-react-counter-app" className="text-purple-600 font-medium hover:text-purple-800 transition-colors">View Documentation →</Link>
              </div>
            </div>
            
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="mb-24 py-12 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-8 shadow-md">
          <h2 className="text-3xl font-bold mb-10 text-center text-purple-800 relative inline-block left-1/2 transform -translate-x-1/2">
            <span className="relative">Get In Touch
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-purple-400 to-indigo-500"></span>
            </span>
          </h2>
          <div className="max-w-xl mx-auto p-8 border border-purple-200 rounded-lg bg-gradient-to-r from-purple-50/70 to-pink-50/60 bg-purple-25/10 shadow-md hover:shadow-xl transition-shadow duration-300">
            <p className="text-center mb-8 text-gray-700 text-lg">
              Have a question or want to work together? Feel free to reach out at <span className="font-medium text-purple-700">arpitghai20@gmail.com</span> or use the buttons below.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a href="mailto:arpitghai20@gmail.com" className="group flex items-center justify-center gap-2 py-4 px-6 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform duration-300">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <span>Contact Me</span>
              </a>
              <a href="https://github.com/arpit-20" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center gap-2 py-4 px-6 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform duration-300">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="max-w-5xl mx-auto w-full pt-8 border-t border-gray-200 text-center text-gray-500 mt-16">
        <p>© {new Date().getFullYear()} My Portfolio. All rights reserved.</p>
      </footer>
    </div>
  );
}

function LoginForm({ onClose }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      await login(username, password);
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to login');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
          {error}
        </div>
      )}
      
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
          Username
        </label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 border border-purple-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/80"
          required
          placeholder="Enter your username"
        />
      </div>
      
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border border-purple-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/80"
          required
          placeholder="Enter your password"
        />
      </div>
      
      <div className="flex items-center justify-end pt-2">
        <button
          type="submit"
          className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-md hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 shadow-md hover:shadow-lg transition-all"
        >
          Login
        </button>
      </div>
      <div className="text-center text-xs text-gray-500 mt-4">
        <p>You can use your email and password to login</p>
      </div>
    </form>
  );
}