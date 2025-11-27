const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server is running!');
});

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

const messageSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: String,
  date: {
    type: Date,
    default: Date.now
  }
});

const Message = mongoose.model('Message', messageSchema);

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
  image: {
    type: String,
    default: "https://via.placeholder.com/400x250/6366f1/ffffff?text=Project+Image"
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

// Skill Schema
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

// Tag Schema (for tag lists under skill categories)
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

// Project API endpoints
// GET all projects
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find({ isActive: true, featured: true }).sort({ order: -1, createdAt: -1 });
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// Skill API endpoints
// GET all skills
app.get('/api/skills', async (req, res) => {
  try {
    const skills = await Skill.find({ isActive: true }).sort({ order: -1, createdAt: -1 });
    res.json(skills);
  } catch (error) {
    console.error('Error fetching skills:', error);
    res.status(500).json({ error: 'Failed to fetch skills' });
  }
});

// POST new skill
app.post('/api/skills', async (req, res) => {
  try {
    const skill = new Skill(req.body);
    await skill.save();
    res.status(201).json(skill);
  } catch (error) {
    console.error('Error creating skill:', error);
    res.status(400).json({ error: 'Failed to create skill' });
  }
});

// Tag API endpoints
// GET all tags
app.get('/api/tags', async (req, res) => {
  try {
    const tags = await Tag.find({ isActive: true }).sort({ order: -1, createdAt: -1 });
    res.json(tags);
  } catch (error) {
    console.error('Error fetching tags:', error);
    res.status(500).json({ error: 'Failed to fetch tags' });
  }
});

// GET tags for a specific category
app.get('/api/tags/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const tagDoc = await Tag.findOne({ category, isActive: true });
    if (!tagDoc) return res.status(404).json({ error: 'Tags not found' });
    res.json(tagDoc);
  } catch (error) {
    console.error('Error fetching tags for category:', error);
    res.status(500).json({ error: 'Failed to fetch tags' });
  }
});

// POST new tag document
app.post('/api/tags', async (req, res) => {
  try {
    const tag = new Tag(req.body);
    await tag.save();
    res.status(201).json(tag);
  } catch (error) {
    console.error('Error creating tag document:', error);
    res.status(400).json({ error: 'Failed to create tags' });
  }
});

// POST new project
app.post('/api/projects', async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(400).json({ error: 'Failed to create project' });
  }
});

// PUT update project
app.put('/api/projects/:id', async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(400).json({ error: 'Failed to update project' });
  }
});

// DELETE project
app.delete('/api/projects/:id', async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id, 
      { isActive: false }, 
      { new: true }
    );
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(400).json({ error: 'Failed to delete project' });
  }
});

// Experience API endpoints
// GET all experiences
app.get('/api/experiences', async (req, res) => {
  try {
    const experiences = await Experience.find({ isActive: true }).sort({ order: -1, createdAt: -1 });
    res.json(experiences);
  } catch (error) {
    console.error('Error fetching experiences:', error);
    res.status(500).json({ error: 'Failed to fetch experiences' });
  }
});

// POST new experience
app.post('/api/experiences', async (req, res) => {
  try {
    const experience = new Experience(req.body);
    await experience.save();
    res.status(201).json(experience);
  } catch (error) {
    console.error('Error creating experience:', error);
    res.status(400).json({ error: 'Failed to create experience' });
  }
});

// PUT update experience
app.put('/api/experiences/:id', async (req, res) => {
  try {
    const experience = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!experience) {
      return res.status(404).json({ error: 'Experience not found' });
    }
    res.json(experience);
  } catch (error) {
    console.error('Error updating experience:', error);
    res.status(400).json({ error: 'Failed to update experience' });
  }
});

// DELETE experience
app.delete('/api/experiences/:id', async (req, res) => {
  try {
    const experience = await Experience.findByIdAndUpdate(
      req.params.id, 
      { isActive: false }, 
      { new: true }
    );
    if (!experience) {
      return res.status(404).json({ error: 'Experience not found' });
    }
    res.json({ message: 'Experience deleted successfully' });
  } catch (error) {
    console.error('Error deleting experience:', error);
    res.status(400).json({ error: 'Failed to delete experience' });
  }
});

app.post('/send', async (req, res) => {
  const { name, email, subject, message } = req.body;
  console.log(req.body);

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    replyTo: email,
    subject: `${subject} (from ${name})`,
    text: `
  New contact form submission
  Name: ${name}
  Email: ${email}
  Subject: ${subject}
  Message:
  ${message}
    `,
    html: `
    <!doctype html>
    <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
    </head>
    <body style="margin:0;padding:0;font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; background:#f2f4f8;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:20px 12px;">
        <tr>
          <td align="center">
            <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;box-shadow:0 6px 18px rgba(20,30,40,0.08);overflow:hidden;">
              <!-- header -->
              <tr>
                <td style="padding:22px 28px 14px;">
                  <div style="display:flex;align-items:center;gap:12px;">
                    <div>
                      <div style="font-size:16px;font-weight:700;color:#0b1b34;">New contact form message</div>
                      <div style="margin-top:3px;font-size:13px;color:#667085;">
                        From <strong>${name || 'Anonymous'}</strong> — <a href="mailto:${email}" style="color:#0b5cff;text-decoration:none;">${email}</a>
                      </div>
                    </div>
                 </div>
                </td>
              </tr>

              <!-- body -->
              <tr>
                <td style="padding:0 28px 22px;">
                  <div style="font-size:14px;color:#10203a;line-height:1.5;">
                    <p style="margin:0 0 12px;"><strong>Subject:</strong> ${subject || '(no subject)'}</p>
                    <div style="background:#f7f9fc;border:1px solid #eef2f7;padding:14px;border-radius:8px;">
                      ${ (message || '').replace(/\n/g, '<br>') }
                    </div>
                  </div>
                </td>
              </tr>

              <!-- footer -->
              <tr>
                <td style="padding:18px 28px;background:#fbfdff;border-top:1px solid #eef2f7;font-size:13px;color:#7b8599;">
                  <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;">
                    <div>This message was sent from your portfolio contact form.</div>
                    <div style="font-size:12px;color:#94a3b8;">${new Date().toLocaleString()}</div>
                  </div>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
    `
  };

  try {
    await transporter.sendMail(mailOptions);

    const newMessage = new Message({ name, email, subject, message });
    const saved = await newMessage.save();
    console.log('Saved to MongoDB:', saved);

    res.status(200).json({ message: 'Message sent and saved successfully!' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to send or save message' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});