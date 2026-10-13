const express = require("express");
const app = express();
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

let id = uuidv4();
console.log(id);

uuidv4();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
const port = 4000; 

let posts = [
  {
    id: uuidv4(),
    username: "avdhesh yadav",
    content: "i love coding",
  },
  {
    id: uuidv4(),
    username: "abhi yadav",
    content: "i love playing ",
  },
  {
    id: uuidv4(),
    username: "mohit yadav",
    content: "i love watching movie",
  },
];

//get route
app.get("/read", (req, res) => {
    // console.log("avdesh yadav")
    res.render("index.ejs",{posts});
}) 

//get route
app.get("/post/new", (req, res) => {
   res.render("form.ejs")
})
// CREATE - POST route
app.post("/post", (req, res) => {
  // console.log(req.body);
  let id = uuidv4();
  let {username, content } = req.body;

  posts.push({
        id,
     username,
    content,
  });
  res.redirect("/read");
}); 



// get element by id 
app.get("/read/:id", (req, res) => {
  let {id} = req.params;
  // console.log(id);
  let post = posts.find((p) => id === p.id);
  // console.log(post);
  res.render("show.ejs",{post})
});  



app.patch("/read/:id", (req, res) => {
  let { id } = req.params;
  let { content } = req.body;

  let post = posts.find((p) => p.id === id);

  if (!post) {
    return res.status(404).send("Post not found");
  }

  post.content = content;

  res.redirect(`/read/${id}`);
});


//edit by id
app.get("/read/:id/edit", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("edit.ejs", {post});
})

//detele post


app.delete("/read/:id", (req, res) => {
  let { id } = req.params;

  posts = posts.filter((p) => p.id !== id);

  res.redirect("/read");
});


app.listen(port, () => {
    // console.log(`server is running on ${port}`);

})