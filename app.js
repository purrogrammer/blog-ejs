//jshint esversion:6

const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const ejsLint = require('ejs-lint');
const Blog = require("./models/blog");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet just.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper..";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien";

const app = express();

// connect to MongoDB
const dbURI = "mongodb+srv://purrogrammer:<ouvrez73>@cluster0.kowlt.mongodb.net/blog-mk?retryWrites=true&w=majority";
mongoose.connect(dbURI)
   .then((result) => app.listen(3000))
   .catch((err) => console.log(err));

// register view engine
app.set('view engine', 'ejs');


//middleware and static files
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(morgan('dev'));

// Mongoose and Mongo sandbox routes

// app.get("/add-blog", (req, res) => {
//   const blog = new Blog({
//     title: 'new blog',
//     snippet: 'about my blog',
//     body: 'more about my blog'
//   });

//   blog.save()
//    then((result) => {
//     res.send(result)
//   })
//   .catch((err) => {
//     console.log(err);
//   });
// });

// app.get('/all-blogs', (req, res) => {
//   Blog.findById('')
//   .then((result) => {
//     res.send(result)
//   })
//   .catch((err) => {
//     console.log(err);
//   });
// });

// app.get('/all-blogs', (req, res) => {
//   Blog.findById('')
//   .then((result) => {
//     res.send(result)
//   })
//   .catch((err) => {
//     console.log(err);
//   });
// });

let posts = [];

app.get("/", (req, res) => {
  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts
    });
}); 

app.post("/", (req, res) => {
  res.redirect("/");
});

app.get("/contact", function(req, res) {
  res.render("contact", {contactInfo: contactContent});
}); 

app.get("/about", function(req, res) {
  res.render("about", {aboutStuff: aboutContent});
});

app.get("/compose", function(req,res){
   res.render("compose");
});

app.post("/compose", function(req, res){
    const post= {
    title: req.body.postTitle,
    content: req.body.postBody
   };
    
   posts.push(post);
   res.redirect("/");
  });

  // for dynamic URL 

app.get("/posts/:postName", function(req, res){
  const requestedTitle = _.lowerCase(req.params.postName);
  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.Title);
    if (storedTitle === requestedTitle){
      res.render("post", {
        title: post.title,
        content: post.content
      });
    }
  });
});


app.listen(3000, function() {
  console.log("Server running on port 3000, bitchez!!");
});
