const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected for seeding'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Experience Schema
const experienceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  period: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['Full-time', 'Part-time', 'Contract', 'Internship', 'Freelance']
  },
  description: {
    type: String,
    required: true
  },
  tech: [{
    type: String
  }],
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

const Experience = mongoose.model('Experience', experienceSchema);

// Sample experiences to insert
const sampleExperiences = [
  {
    title: "Senior Full Stack Developer",
    company: "TechCorp Solutions",
    period: "2022 - Present",
    type: "Full-time",
    description: "Led the development of scalable web applications using modern technologies. Implemented microservices architecture and improved system performance by 40%. Mentored junior developers and collaborated with cross-functional teams.",
    tech: ["React", "Node.js", "TypeScript", "MongoDB", "Docker", "AWS"],
    order: 1
  },
  {
    title: "Frontend Developer",
    company: "InnovateTech Inc.",
    period: "2020 - 2022",
    type: "Full-time",
    description: "Developed responsive web applications and implemented modern UI/UX designs. Collaborated with design teams to create pixel-perfect interfaces and optimized applications for maximum speed and scalability.",
    tech: ["Vue.js", "JavaScript", "SASS", "Webpack", "Firebase"],
    order: 2
  },
  {
    title: "Junior Web Developer",
    company: "StartupXYZ",
    period: "2019 - 2020",
    type: "Full-time",
    description: "Built and maintained company websites and web applications. Gained experience in full-stack development and learned industry best practices for code quality and team collaboration.",
    tech: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    order: 3
  },
  {
    title: "Web Development Intern",
    company: "Digital Agency Pro",
    period: "2018 - 2019",
    type: "Internship",
    description: "Assisted in developing client websites and learned modern web development practices. Contributed to multiple projects and gained hands-on experience with various web technologies.",
    tech: ["HTML", "CSS", "JavaScript", "Bootstrap", "jQuery"],
    order: 4
  }
];

async function seedExperiences() {
  try {
    // Clear existing experiences
    await Experience.deleteMany({});
    console.log('Cleared existing experiences');

    // Insert new experiences
    const insertedExperiences = await Experience.insertMany(sampleExperiences);
    console.log(`Inserted ${insertedExperiences.length} experiences:`);
    
    insertedExperiences.forEach(exp => {
      console.log(`- ${exp.title} at ${exp.company}`);
    });

    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding experiences:', error);
  } finally {
    mongoose.connection.close();
  }
}

seedExperiences();