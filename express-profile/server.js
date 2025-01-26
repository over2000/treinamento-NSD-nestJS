const express = require('express');
const path = require('path');

const app = express();

// Set up Handlebars view engine
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Route for /me
app.get('/me', (req, res) => {
    res.render('profile', { layout: 'layouts/layout' });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
