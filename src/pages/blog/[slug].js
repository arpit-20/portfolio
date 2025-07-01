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
    id: 0,
    title: "Shock Mechanica: Full Stack Application Documentation",
    content: `
      <p>Shock Mechanica is a comprehensive full-stack application designed for motorcycle suspension service shops and customers. It streamlines the process of shocker repair servicing and ordering parts, providing an intuitive interface for both service providers and end users.</p>
      
      <h2>Project Overview</h2>
      <p>Shock Mechanica addresses the gap in specialized software for suspension repair shops by offering a complete digital solution that includes:</p>
      <ul>
        <li>Customer-facing portal for service requests and part orders</li>
        <li>Shop management system for technicians and service managers</li>
        <li>Inventory management for suspension parts</li>
        <li>Service history tracking and maintenance reminders</li>
        <li>Integrated payment processing</li>
      </ul>
      
      <h2>Technical Architecture</h2>
      <p>The application follows a modern, scalable architecture:</p>
      
      <h3>Frontend (React.js)</h3>
      <p>The frontend is built using React.js with the following key technologies:</p>
      <ul>
        <li><strong>React Router</strong> - For client-side routing and navigation</li>
        <li><strong>Redux Toolkit</strong> - For state management across the application</li>
        <li><strong>Material UI</strong> - For responsive, accessible UI components</li>
        <li><strong>Formik & Yup</strong> - For form handling and validation</li>
        <li><strong>React Query</strong> - For data fetching and caching</li>
      </ul>
      
      <p>The frontend implements a responsive design that works seamlessly across desktop, tablet, and mobile devices.</p>
      
      <h3>Backend (Node.js & Express.js)</h3>
      <p>The server-side implementation uses Node.js with Express to provide a robust API:</p>
      <ul>
        <li><strong>RESTful API</strong> - For client-server communication</li>
        <li><strong>JWT Authentication</strong> - For secure user sessions and role-based access</li>
        <li><strong>Middleware</strong> - For request validation, error handling, and logging</li>
        <li><strong>File Upload</strong> - For handling customer-uploaded images of parts and motorcycles</li>
      </ul>
      
      <pre><code>// Example API route for service requests
router.post('/service-requests', authMiddleware, async (req, res) => {
  try {
    const { motorcycleId, serviceType, description, preferredDate } = req.body;
    const userId = req.user.id;
    
    const serviceRequest = await ServiceRequest.create({
      userId,
      motorcycleId,
      serviceType,
      description,
      preferredDate,
      status: 'pending'
    });
    
    res.status(201).json({ success: true, data: serviceRequest });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});</code></pre>
      
      <h3>Database (MongoDB)</h3>
      <p>The application uses MongoDB as the primary database:</p>
      <ul>
        <li><strong>Mongoose ODM</strong> - For schema validation and data modeling</li>
        <li><strong>Indexing</strong> - For optimized query performance</li>
        <li><strong>Aggregation Pipeline</strong> - For complex data operations and reporting</li>
      </ul>
      
      <p>Key data models include:</p>
      <pre><code>// User model schema
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['customer', 'technician', 'admin'], default: 'customer' },
  contact: { type: String },
  address: { type: String },
  createdAt: { type: Date, default: Date.now }
});

// Motorcycle model schema
const MotorcycleSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  make: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  vinNumber: { type: String, unique: true },
  photos: [{ type: String }]
});</code></pre>
      
      <h2>Key Features & Implementation</h2>
      
      <h3>User Authentication & Authorization</h3>
      <p>The system implements a robust authentication system with role-based access control:</p>
      <ul>
        <li>JWT-based authentication with refresh tokens</li>
        <li>Password encryption using bcrypt</li>
        <li>Role-based access control (Customer, Technician, Admin)</li>
        <li>Password reset functionality via email</li>
      </ul>
      
      <h3>Service Booking System</h3>
      <p>Customers can book service appointments through an intuitive interface:</p>
      <ul>
        <li>Calendar-based appointment selection</li>
        <li>Service type categorization</li>
        <li>Detailed description fields with image upload</li>
        <li>Automated confirmation emails</li>
      </ul>
      
      <h3>Parts Ordering System</h3>
      <p>The application includes a comprehensive parts catalog and ordering system:</p>
      <ul>
        <li>Categorized parts browsing with search and filters</li>
        <li>Part compatibility checking with user's registered motorcycles</li>
        <li>Shopping cart functionality</li>
        <li>Order tracking and history</li>
      </ul>
      
      <h3>Technician Dashboard</h3>
      <p>Service technicians have access to a specialized dashboard:</p>
      <ul>
        <li>Daily work queue with prioritization</li>
        <li>Service history for each motorcycle</li>
        <li>Parts usage tracking and inventory requests</li>
        <li>Time tracking for services performed</li>
      </ul>
      
      <h3>Admin Portal</h3>
      <p>Shop administrators can manage the entire operation:</p>
      <ul>
        <li>Business analytics and reporting</li>
        <li>Staff management and scheduling</li>
        <li>Inventory control and ordering</li>
        <li>Customer relationship management</li>
      </ul>
      
      <h2>Deployment & DevOps</h2>
      <p>The application is deployed with a focus on reliability and performance:</p>
      <ul>
        <li><strong>Frontend:</strong> Netlify with CI/CD pipeline from GitHub</li>
        <li><strong>Backend:</strong> Containerized with Docker and deployed on AWS</li>
        <li><strong>Database:</strong> MongoDB Atlas for managed database service</li>
        <li><strong>Monitoring:</strong> Application insights with Sentry for error tracking</li>
      </ul>
      
      <h2>Future Enhancements</h2>
      <p>Planned features for future versions include:</p>
      <ul>
        <li>Mobile app using React Native</li>
        <li>Integration with supplier APIs for real-time parts availability</li>
        <li>Machine learning for predictive maintenance recommendations</li>
        <li>Customer loyalty program and referral system</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Shock Mechanica represents a comprehensive solution for motorcycle suspension service businesses, combining modern frontend technologies with a robust backend architecture. The application streamlines operations, improves customer experience, and provides valuable business insights for shop owners.</p>
    `,
    date: "June 2, 2025",
    slug: "shock-mechanica-documentation",
    featured: true
  },

  {
    id: 1,
    title: "Getting Started with Next.js",
    content: `
      <p>Next.js is a React framework that enables functionality such as server-side rendering and generating static websites. It's a production-ready framework that allows you to create full-stack web applications by extending the latest React features.</p>
      
      <h2>Why Next.js?</h2>
      <p>Next.js provides a solution to many common challenges in React development:</p>
      <ul>
        <li>Server-side rendering</li>
        <li>Static site generation</li>
        <li>File-based routing</li>
        <li>API routes</li>
        <li>Built-in CSS and Sass support</li>
        <li>Fast refresh</li>
      </ul>
      
      <h2>Getting Started</h2>
      <p>To create a new Next.js app, run:</p>
      <pre><code>npx create-next-app@latest my-app</code></pre>
      
      <p>After the installation is complete, follow the instructions to start the development server:</p>
      <pre><code>cd my-app
npm run dev</code></pre>
    `,
    date: "May 28, 2025",
    slug: "getting-started-with-nextjs"
  },
  {
    id: 2,
    title: "Docker Journey with React Counter App",
    content: `
      <h1>Docker Journey with React Counter App</h1>

      <h2>Project Overview</h2>
      <p>This blog documents my experience building and deploying a React Counter App using Docker. I'll share the steps, challenges, and learnings from containerizing this application.</p>

      <h2>Table of Contents</h2>
      <ul>
        <li><a href="#project-structure">Project Structure</a></li>
        <li><a href="#setting-up-docker">Setting Up Docker</a></li>
        <li><a href="#building-docker-images">Building Docker Images</a></li>
        <li><a href="#running-docker-containers">Running Docker Containers</a></li>
        <li><a href="#docker-compose-workflow">Docker Compose Workflow</a></li>
        <li><a href="#production-deployment">Production Deployment</a></li>
        <li><a href="#tips-and-tricks">Tips and Tricks</a></li>
        <li><a href="#troubleshooting">Troubleshooting</a></li>
      </ul>

      <h2 id="project-structure">Project Structure</h2>
      <p><em>[Document the structure of your React project here]</em></p>

      <h2 id="setting-up-docker">Setting Up Docker</h2>

      <h3>Docker Installation</h3>
      <p>I started by installing Docker on my development machine.</p>

      <p>For Mac:</p>
      <pre><code>brew install docker</code></pre>

      <p>For Windows:</p>
      <ul>
        <li>Downloaded Docker Desktop from <a href="https://www.docker.com/products/docker-desktop">Docker's official website</a></li>
      </ul>

      <h3>Creating a Dockerfile</h3>
      <p>I created a basic Dockerfile for my React application:</p>

      <pre><code># Build stage
FROM node:14-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]</code></pre>

      <p>This two-stage build process:</p>
      <ol>
        <li>First builds the React app using Node</li>
        <li>Then copies the built files to an Nginx container for serving</li>
      </ol>

      <h3>Creating .dockerignore</h3>
      <p>To keep my Docker images slim, I added the following to my .dockerignore file:</p>

      <pre><code>node_modules
npm-debug.log
build
.git
.github
*.md
.gitignore</code></pre>

      <h2 id="building-docker-images">Building Docker Images</h2>

      <p>I build my Docker image using:</p>

      <pre><code>docker build -t react-counter-app .</code></pre>

      <p>This creates an image tagged as 'react-counter-app'.</p>

      <p>To list all my images:</p>
      <pre><code>docker images</code></pre>

      <h2 id="running-docker-containers">Running Docker Containers</h2>

      <h3>Development Mode</h3>

      <p>For local development with hot reloading:</p>

      <pre><code>docker run -p 3000:3000 -v $(pwd):/app react-counter-app-dev</code></pre>

      <h3>Production Mode</h3>

      <p>To run the production build:</p>

      <pre><code>docker run -p 8080:80 react-counter-app</code></pre>

      <p>The application is then accessible at http://localhost:8080</p>

      <h2 id="docker-compose-workflow">Docker Compose Workflow</h2>

      <p>For managing multiple containers, I use Docker Compose:</p>

      <pre><code>version: '3'
services:
  react-app:
    build:
      context: .
    ports:
      - "8080:80"
    # Add any additional services like an API backend here</code></pre>

      <p>Commands I use regularly:</p>
      <pre><code># Start containers
docker-compose up

# Start in detached mode
docker-compose up -d

# Stop containers
docker-compose down

# Rebuild images
docker-compose up --build</code></pre>

      <h2 id="production-deployment">Production Deployment</h2>
      <p><em>[Document your production deployment process here]</em></p>

      <h2 id="tips-and-tricks">Tips and Tricks</h2>
      <p><em>[Document useful Docker tips you've learned along the way]</em></p>

      <h2 id="troubleshooting">Troubleshooting</h2>
      <p><em>[Document common issues and their solutions]</em></p>

      <hr>

      <p><em>This blog is a living document that I'll update as I learn more about Docker and how to optimize my React application deployment.</em></p>
    `,
    date: "June 1, 2025",
    slug: "docker-journey-react-counter-app"
  },
  {
    id: 3,
    title: "Building a Portfolio with Next.js",
    content: `
      <p>A well-designed portfolio is essential for developers to showcase their work and skills to potential employers or clients. Next.js offers an excellent framework for building fast, SEO-friendly portfolio websites.</p>
      
      <h2>Key Features of a Developer Portfolio</h2>
      <ul>
        <li>About section</li>
        <li>Project showcases</li>
        <li>Skills and technologies</li>
        <li>Contact information</li>
        <li>Blog (optional but valuable)</li>
      </ul>
      
      <h2>Implementation Tips</h2>
      <p>Use Next.js Image component for optimized images:</p>
      <pre><code>import Image from 'next/image'

// Later in your JSX
&lt;Image 
  src="/project-screenshot.jpg" 
  alt="Project Screenshot" 
  width={800} 
  height={600}
  priority
/&gt;</code></pre>
      
      <p>The combination of static generation and client-side data fetching makes Next.js perfect for portfolio sites.</p>
    `,
    date: "May 25, 2025",
    slug: "building-portfolio-with-nextjs"
  },
  {
    id: 3,
    title: "Mastering CSS Grid and Flexbox",
    content: `
      <p>Modern CSS layout techniques like Grid and Flexbox have revolutionized web layout design, making complex layouts more intuitive and responsive designs easier to implement.</p>
      
      <h2>CSS Grid</h2>
      <p>CSS Grid is perfect for two-dimensional layouts (rows and columns):</p>
      <pre><code>.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}</code></pre>
      
      <h2>Flexbox</h2>
      <p>Flexbox excels at one-dimensional layouts:</p>
      <pre><code>.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.item {
  flex: 0 0 calc(33.333% - 20px);
  margin-bottom: 20px;
}</code></pre>
      
      <h2>When to Use Each</h2>
      <ul>
        <li>Use Grid for overall page layout</li>
        <li>Use Flexbox for component layout</li>
        <li>Combine both for maximum flexibility</li>
      </ul>
    `,
    date: "May 20, 2025",
    slug: "mastering-css-grid-flexbox"
  }
];

export default function BlogPost() {
  const router = useRouter();
  const { slug } = router.query;
  const [post, setPost] = useState(null);
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Only run this effect if we have a slug from the router
    if (!slug) return;
    
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
    
    // Combine default posts with user posts
    const highestId = blogPosts.reduce((max, post) => Math.max(max, post.id), 0);
    const formattedUserPosts = userPosts.map((post, index) => ({
      ...post,
      id: highestId + index + 1
    }));
    
    // Merge all posts
    const allPostsData = [...blogPosts, ...formattedUserPosts];
    setAllPosts(allPostsData);
    
    // Find the current post based on the slug
    const currentPost = allPostsData.find(post => post.slug === slug);
    setPost(currentPost);
    setLoading(false);
  }, [slug]);
  
  // Handle loading state
  if (loading || !post) {
    return (
      <div className={`${geistSans.className} min-h-screen p-8 sm:p-16 max-w-6xl mx-auto bg-gradient-to-b from-purple-100/80 to-pink-50/80 bg-purple-50/20`}>
        <h1 className="text-3xl font-bold mb-6">Loading...</h1>
      </div>
    );
  }
  
  return (
    <div className={`${geistSans.className} ${geistMono.className} min-h-screen p-8 pb-20 sm:p-16 bg-gradient-to-b from-purple-50/70 to-pink-50/60 bg-purple-25/10`}>
      <nav className="mb-5">
        <Link href="/blog" className="text-purple-600 hover:text-purple-800 font-medium flex items-center gap-1 w-fit group text-xl">
          <span className="group-hover:-translate-x-1 transition-transform duration-300">←</span> Back to Blog
        </Link>
      </nav>
      
      <article>
        <header className="mb-8 pb-4 border-b border-purple-200">
          <h1 className="text-4xl font-bold mb-2 text-purple-800">{post.title}</h1>
          <p className="text-indigo-500">{post.date}</p>
        </header>
        
        <div 
          className="prose prose-lg max-w-none prose-headings:text-purple-800 prose-a:text-indigo-600 prose-pre:bg-purple-50 prose-pre:shadow-md prose-pre:rounded-lg prose-strong:text-indigo-700 prose-code:text-purple-700"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      
      <div className="mt-12 pt-8 border-t border-purple-200">
        <h3 className="font-bold text-xl mb-6 text-purple-800 inline-block relative">
          <span className="relative">More Posts
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-purple-400 to-indigo-500"></span>
          </span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {allPosts
            .filter(p => p.slug !== slug)
            .slice(0, 2)
            .map(post => (
              <div key={post.id} className="border border-purple-200 rounded-lg p-5 bg-white shadow-sm hover:shadow-md transition-shadow duration-300 hover:-translate-y-1 transform transition-transform">
                <h4 className="font-bold">
                  <Link href={`/blog/${post.slug}`} className="hover:text-purple-600 transition-colors">
                    {post.title}
                  </Link>
                </h4>
                <p className="text-sm text-indigo-500">{post.date}</p>
              </div>
            ))
          }
        </div>
      </div>
      
      <footer className="mt-16 pt-8 border-t border-purple-200 text-center text-purple-600 bg-gradient-to-r from-purple-50 to-indigo-50 py-6 rounded-xl">
        <p>© {new Date().getFullYear()} My Portfolio Blog</p>
      </footer>
    </div>
  );
}
