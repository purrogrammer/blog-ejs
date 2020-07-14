//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet just.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper..";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. .";
let posts = [];

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res) {
  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts
    });
}); 

app.post("/", function(req, res){
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
  const requestedTitle = req.params.postName;
  posts.forEach(function(post){
    const storedTitle = post.Title;
    if (storedTitle === requestedTitle){
      console.log("Matchfound");
    }
  });
});


app.listen(3000, function() {
  console.log("Server running on port 3000, bitchez!!");
});
