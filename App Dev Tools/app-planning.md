# TechWind

## Features
1. Post creation: Users should be able to create posts
2. Post viewing: Users should view a post.
3. Edit posts: Users should be able to edit posts.
4. Delete posts: Users should be able to delete posts

## Routes
1. Home: Renders the first page the user will see when he enters the blog.

```js
app.get('/', (req, res) => {
    res.render('index.ejs');
});
```

2. Create post: Renders the page that contains the form the user will use to create a post.

```js
app.get('/create-post', (req, res) => {
    res.render('create-post.ejs');
});
```

3. Save post: The route that will save the information the user intorduced in the create post form. Post will be an object that are gonna be storaged in a variable.

```js
app.use(express.urlencoded({ extended: true }));
const posts = [];

class Post {
    constructor(index, title, content) {
        this.index = index;
        this.title = title;
        this.content = content;
    };
};

const newPost = (title, content) => {
    const postIndex = posts.length - 1;
    const post = new Post(postIndex, title, content);

    posts.push(post);
};

app.post('/save-post', (req, res) => {
    const title = req.body["title"];
    const content = req.body["content"];

    newPost(title, content);

    res.status(201).send('Post creado exitosamente');
});
```

4. View post: The user will be able to see any post using this route. The route is going to send the post basing on the index of the post.

```js
app.get('/post/:index', (req, res) => {
    const postIndex = parseInt(req.params.index);
    const post = posts.find(p => p.id === postIndex);

    if (post) {
        res.render('post.ejs', { 
            title: post["title"],
            content: post["content"]
            });
    } else {
        res.status(404).send('Post no encontrado');
    };
});
```

5. Edit post: Route user will use to edit a post. Route will use the index to identify the post user wants to edit.

```js
app.put('/post/:index', (req, res) => {
    const newTitle = req.body["title"];
    const newContent = req.body["content"];

    const postIndex = parseInt(req.params.index);
    const post = posts.find(p => p.id === postId);

    if (post) {
        post["title"] = newTitle;
        post["content"] = newContent;
        res.render('post.ejs', { 
            title: post["title"],
            content: post["content"]
            });
    } else {
        res.status(404).send('Post no encontrado');
    };
});
```

6. Delete post: Route user will use to delete a post. Route will use the index to identify the post user wants to delete.

```js
app.get('/post/:index', (req, res) => {
    const postIndex = parseInt(req.params.index);
    posts.remove(posts.find(p => p.id === postId));



    if (post) {
        res.status(204).render('index.ejs');
    } else {
        res.status(404).send('Post no encontrado');
    };
});
```