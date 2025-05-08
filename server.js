// server/server.js

const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/send-form', async (req, res) => {
  const { message, email, wantsResume, address } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your.email@gmail.com',
      pass: 'your-app-password' // Use App Password if using Gmail with 2FA
    }
  });

  const mailOptions = {
    from: 'your.email@gmail.com',
    to: 'your.email@gmail.com',
    subject: 'New Comment from Website',
    text: `
      Message: ${message}
      Email: ${email}
      Wants Physical Resume: ${wantsResume ? 'Yes' : 'No'}
      Address: ${address || 'N/A'}
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
