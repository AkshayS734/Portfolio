const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected for seeding skills'))
  .catch((err) => console.error('MongoDB connection error:', err));

const skillSchema = new mongoose.Schema({
  category: {
    type: String,
    enum: ['frontend', 'backend', 'ios', 'other'],
    required: true
  },
  label: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    default: 0
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

const Skill = mongoose.model('Skill', skillSchema);

const sampleSkills = [
  // Frontend
  { category: 'frontend', label: 'React / React Native', value: 95, order: 1 },
  { category: 'frontend', label: 'JavaScript / TypeScript', value: 90, order: 2 },
  { category: 'frontend', label: 'HTML5 / CSS3', value: 95, order: 3 },
  { category: 'frontend', label: 'Vue / Angular', value: 85, order: 4 },
  { category: 'frontend', label: 'Tailwind / SASS', value: 90, order: 5 },

  // Backend
  { category: 'backend', label: 'Node.js / Express', value: 90, order: 1 },
  { category: 'backend', label: 'MongoDB / Mongoose', value: 85, order: 2 },
  { category: 'backend', label: 'SQL / PostgreSQL', value: 80, order: 3 },
  { category: 'backend', label: 'GraphQL', value: 75, order: 4 },
  { category: 'backend', label: 'RESTful APIs', value: 95, order: 5 },

  // Other (tools/misc)
  { category: 'other', label: 'Git & Version Control', value: 90, order: 1 },
  { category: 'other', label: 'UI/UX Design', value: 80, order: 2 },
  { category: 'other', label: 'Agile Methodology', value: 85, order: 3 },
  { category: 'other', label: 'Project Management', value: 75, order: 4 },
  
  // iOS / Mobile
  { category: 'ios', label: 'Swift', value: 90, order: 1 },
  { category: 'ios', label: 'SwiftUI', value: 88, order: 2 },
  { category: 'ios', label: 'iOS SDK / UIKit', value: 85, order: 3 },
  { category: 'ios', label: 'Core Data / Persistence', value: 80, order: 4 },
  { category: 'ios', label: 'Combine / Async', value: 78, order: 5 },
];

async function seedSkills() {
  try {
    await Skill.deleteMany({});
    console.log('Cleared existing skills');

    const inserted = await Skill.insertMany(sampleSkills);
    console.log(`Inserted ${inserted.length} skills`);
    inserted.forEach(s => console.log(`- ${s.category}: ${s.label}`));

    console.log('Skill seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding skills:', error);
  } finally {
    mongoose.connection.close();
  }
}

seedSkills();
