const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected for seeding tags'))
  .catch((err) => console.error('MongoDB connection error:', err));

const tagSchema = new mongoose.Schema({
  category: {
    type: String,
    enum: ['frontend', 'backend', 'ios', 'other'],
    required: true
  },
  tags: [{ type: String }],
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

const Tag = mongoose.model('Tag', tagSchema);

const sampleTags = [
  {
    category: 'frontend',
    tags: ['Redux', 'Next.js', 'Webpack', 'Jest', 'Responsive Design'],
    order: 1
  },
  {
    category: 'backend',
    tags: ['Firebase', 'AWS', 'Docker', 'CI/CD', 'Microservices'],
    order: 1
  },
  {
    category: 'ios',
    tags: ['CocoaPods', 'Swift Package Manager', 'TestFlight', 'Instruments', 'App Store Connect'],
    order: 1
  },
  {
    category: 'other',
    tags: ['Figma', 'JIRA', 'Notion'],
    order: 1
  }
];

async function seedTags() {
  try {
    await Tag.deleteMany({});
    console.log('Cleared existing tags');

    const inserted = await Tag.insertMany(sampleTags);
    console.log(`Inserted ${inserted.length} tag documents`);
    inserted.forEach(s => console.log(`- ${s.category}: ${s.tags.length} tags`));

    console.log('Tag seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding tags:', error);
  } finally {
    mongoose.connection.close();
  }
}

seedTags();
