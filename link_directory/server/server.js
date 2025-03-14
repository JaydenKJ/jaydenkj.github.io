const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors'); // Import CORS

const app = express();
const PORT = 3000;

app.use(cors()); // Enable CORS for all routes
app.use(express.static('public'));
app.use(express.json());

// Serve the HTML snippet
app.get('/10th', (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  res.sendFile(path.join(__dirname, 'snippets', '10th.html'));
});

// Save the updated snippet
app.post('/save', (req, res) => {
  const { content } = req.body;
  fs.writeFile(path.join(__dirname, 'snippets', '10th.html'), content, (err) => {
    if (err) {
      console.error('Error saving file:', err);
      return res.status(500).json({ success: false, message: 'Failed to save file' });
    }
    res.json({ success: true, message: 'File saved successfully' });
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
