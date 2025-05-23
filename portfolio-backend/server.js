const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
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
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; background: #f9f9f9; border-radius: 8px;">
        <h2 style="color: #333;">New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong><br>${message.replace(/\n/g, '<br>')}</p>
        <hr style="margin-top: 20px;" />
        <p style="font-size: 0.9em; color: #999;">This message was sent from your portfolio contact form.</p>
      </div>
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