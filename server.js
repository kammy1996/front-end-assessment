const webpack = require("webpack");
const devMiddleware = require("webpack-dev-middleware");
const hotMiddleware = require("webpack-hot-middleware");
const express = require("express");
const webpackConfig = require("./webpack.config.js");

const compiler = webpack(webpackConfig)

const app = express();
const port = 3000;

let articles = [
    {
        id: 0,
        title: "There and Back Again",
        author: "Bilbo Baggins",
        body: "In a hole in the ground there lived a hobbit. Not a nasty, dirty, wet hole, filled with the ends of worms andan oozy smell, nor yet a dry, bare, sandy hole with nothing to sit down on or to eat: it was a hobbit-hole, and that means comfort."
    },
    {
        id: 1,
        title: "Half a Century of Poetry",
        author: "Dandelion",
        body: "This is the body of article 1 in plain text."
    },
    {
        id: 2,
        title: "How to Talk Sass and Force-Influence People",
        author: "Obi-Wan Kenobi",
        body: "This is the body of article 2 in plain text."
    },
    {
        id: 3,
        title: "Half-Lives",
        author: "Luisa Rey",
        body: "This is the body of article 3 in plain text."
    }
];

app.use(devMiddleware(compiler));
app.use(hotMiddleware(compiler));
app.use(express.json());

app.get("/api/articles", (req, res) => res.json({
    articles: articles
}));

app.post("/api/articles", (req, res) => {
    console.log("POST request recieved.\nBody:\n" + JSON.stringify(req.body));

    let newArticle = {
        id: articles.length,
        title: null,
        author: null,
        body: null
    }

    if (req.body.title)
        newArticle.title = req.body.title;

    if (req.body.author)
        newArticle.author = req.body.author;

    if (req.body.body)
        newArticle.body = req.body.body;

    if (newArticle.title || newArticle.author || newArticle.body)
        articles.push(newArticle);

    console.log(req.body);
    return res.status(200).end();
});

app.get("/api/articles/:articleId", (req, res) => {
    for (let a = 0,l = articles.length; a < l; a++) {
        if (articles[a].id == articleId) {
            return res.json(articles[a]).status(200).end();
        }
    }
    
});

app.delete("/api/articles/:articleId", (req, res) => {
    console.log("DELETE request received for Article ID: " + req.params.articleId);

    const articleId = req.params.articleId;

    for (let a = 0,l = articles.length; a < l; a++) {
        if (articles[a].id == articleId) {
            articles.splice(a, 1);
            return res.status(200).end();
        }
    }

    return res.status(404).end();
});

app.put("/api/articles/:articleId", (req, res) => {
    console.log("PUT request recieved to update Article ID: " + req.params.articleId + "\nBody:\n" + JSON.stringify(req.body));

    const articleId = req.params.articleId;

    for (let a = 0,l = articles.length; a < l; a++) {
        if (articles[a].id == articleId) {
            if (req.body.title)
                articles[a].title = req.body.title;

            if (req.body.author)
                articles[a].author = req.body.author;

            if (req.body.body)
                articles[a].body = req.body.body;

                return res.json(articles[a]).status(200).end();
        }
    }

    return res.status(404).end();
});

app.listen(port, () => console.log(`Front End Skills Assessment listening at http://localhost:${port}`));