// Dependencies
const express = require("express");
const path = require("path");
const webRouter = require('./routes/web');
const apiRouter = require('./routes/api');


// Sets up the Express App
const app = express();

// configuration
const PORT = process.env.PORT || 3000;

// Sets up the middleware to handle data parsing
app.use(webRouter);
app.use(apiRouter);
app.use(express.static("public"));








// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log(`App listening on PORT ${PORT} http://localhost:${PORT}`);
});