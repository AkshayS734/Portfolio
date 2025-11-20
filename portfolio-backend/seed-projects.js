const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected for seeding projects'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Project Schema
const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  tech: [{
    type: String,
    required: true
  }],
  links: {
    live: {
      type: String,
      default: "#"
    },
    github: {
      type: String,
      default: "#"
    }
  },
  icon: {
    type: String,
    enum: ['desktop', 'comments', 'chart', 'code', 'mobile', 'database'],
    default: 'desktop'
  },
  featured: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Project = mongoose.model('Project', projectSchema);

// Sample projects to insert
const sampleProjects = [
  {
    title: "E-Commerce Platform",
    description: "A comprehensive online shopping platform with advanced features including product catalog, shopping cart, secure payment processing, user authentication, order tracking, and admin dashboard for inventory management.",
    tech: ["React", "Node.js", "MongoDB", "Stripe", "JWT", "Express"],
    icon: "desktop",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center",
    links: {
      live: "https://ecommerce-demo.example.com",
      github: "https://github.com/yourusername/ecommerce-platform"
    },
    featured: true,
    order: 1
  },
  {
    title: "Real-Time Chat Application",
    description: "A modern messaging platform featuring real-time communication, group chats, file sharing, emoji support, user presence indicators, and push notifications. Built with WebSocket technology for instant messaging.",
    tech: ["Vue.js", "Socket.io", "Express", "MongoDB", "Redis", "JWT"],
    icon: "comments",
    image: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=400&h=250&fit=crop&crop=center",
    links: {
      live: "https://chat-app-demo.example.com",
      github: "https://github.com/yourusername/chat-application"
    },
    featured: true,
    order: 2
  },
  {
    title: "Analytics Dashboard",
    description: "Interactive business intelligence dashboard with real-time data visualization, customizable widgets, advanced filtering, export capabilities, and responsive design. Supports multiple chart types and data sources.",
    tech: ["Angular", "D3.js", "Firebase", "Chart.js", "TypeScript", "RxJS"],
    icon: "chart",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop&crop=center",
    links: {
      live: "https://analytics-dashboard.example.com",
      github: "https://github.com/yourusername/analytics-dashboard"
    },
    featured: true,
    order: 3
  },
];

async function seedProjects() {
  try {
    await Project.deleteMany({});
    console.log('Cleared existing projects');

    // Insert new projects
    const insertedProjects = await Project.insertMany(sampleProjects);
    console.log(`Inserted ${insertedProjects.length} projects:`);
    
    insertedProjects.forEach(project => {
      console.log(`- ${project.title} (${project.featured ? 'Featured' : 'Not Featured'})`);
    });

    console.log('Project database seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding projects:', error);
  } finally {
    mongoose.connection.close();
  }
}

seedProjects();