const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.get('/', (req, res) => {
 res.sendFile(__dirname + '/home.html');
});

app.get('/about', (req, res) => {
  res.sendFile(__dirname + '/about.html');
});
app.get('/contact', (req, res) => {
  res.sendFile(__dirname + '/contact.html');
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});