const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require('./routes/blogRoutes'); 
const { result } = require("lodash");
const { render } = require("ejs");

// express app
const app = express();

// connect to mongodb
const dbURI = "mongodb+srv://novissart:test1234@ecemgo.giys3gr.mongodb.net/node-crash?retryWrites=true&w=majority";
mongoose.set("strictQuery", false);
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// register view engine
app.set("view engine", "ejs");
// app.set('views', 'myviews'); // 'views' is default. When the name of the 'views' folder is changed, this function is needed use. Otherwise, there is no need to be used.


// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));

// routes 
app.get("/", (req, res) => {
  res.redirect('/blogs');
});
  
app.get("/about", (req, res) => {
  res.render("about", { title: "About" }); // using with 'ejs' package
});

// blog routes
app.use('/blogs', blogRoutes);

// 404 page - this function should be at the end of the code to avoid unnecessarily showing 404 page by skipping other pages!
app.use((req, res) => {
  res.status(404).render("404", { title: "404" }); // using with 'ejs' package
});
