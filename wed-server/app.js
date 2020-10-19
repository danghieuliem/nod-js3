const { query } = require("express");
const express = require("express");
var path = require("path");
const app = express();
const port = 3000;

const renderPage = (path, content) => {
    const navBar = renderNavBar(path);
    //const pageContent
};

app.get("/intro/:id", (req, res) => {
    res.send({
        url: req.originalUrl,
        params: req.params,
        body: req.body,
        query: req.query,
        cookies: req.cookies,
        headers: req.headers,
    });
    res.send();
});
app.get("/", function (req, res) {
    var head = `home`; //${head}
    res.send(
        `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">    <title>Document</title><style>a{padding-left: 10px;        }    </style></head><body>    <div>        <table>            <a href="/home">home</a>            <a href="/explore">explore</a>            <a href="/messages">messages</a>        </table>    </div>    <h1>${head}</h1>    <p>This is page ${head}</p>    <p>This is page ${head}</p>    <p>This is page ${head}</p>    <p>This is page ${head}</p>    <p>This is page ${head}</p>`
    );
});

app.get("/home", function (req, res) {
    var head = `home`; //${head}
    res.send(
        `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">    <title>Document</title><style>a{padding-left: 10px;        }    </style></head><body>    <div>        <table>            <a href="/home">home</a>            <a href="/explore">explore</a>            <a href="/messages">messages</a>        </table>    </div>    <h1>${head}</h1>    <p>This is page ${head}</p>    <p>This is page ${head}</p>    <p>This is page ${head}</p>    <p>This is page ${head}</p>    <p>This is page ${head}</p>`
    );
});

app.get("/explore", function (req, res) {
    var head = `explore`; //${head}
    res.send(
        `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">    <title>Document</title><style>a{padding-left: 10px;        }    </style></head><body>    <div>        <table>            <a href="/home">home</a>            <a href="/explore">explore</a>            <a href="/messages">messages</a>        </table>    </div>    <h1>${head}</h1>    <p>This is page ${head}</p>    <p>This is page ${head}</p>    <p>This is page ${head}</p>    <p>This is page ${head}</p>    <p>This is page ${head}</p>`
    );
});
app.get("/messages", function (req, res) {
    var head = `messages`; //${head}
    res.send(
        `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">    <title>Document</title><style>a{padding-left: 10px;        }    </style></head><body>    <div>        <table>            <a href="/home">home</a>            <a href="/explore">explore</a>            <a href="/messages">messages</a>        </table>    </div>    <h1>${head}</h1>    <p>This is page ${head}</p>    <p>This is page ${head}</p>    <p>This is page ${head}</p>    <p>This is page ${head}</p>    <p>This is page ${head}</p>    <br>    <a href="/messages/13213">men</a>    <br>    <a href="/messages/21654">men 1</a>    <br>    <a href="/messages/33213">men 2</a>    <br>    <a href="/messages/43213">men 3</a></body></html>`
    );
});

app.get("/messages/:id", function (req, res) {
    var head = `messages${res.params.id}`; //${head}
    res.send(
        `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">    <title>Document</title><style>a{padding-left: 10px;        }    </style></head><body>    <div>        <table>            <a href="/home">home</a>            <a href="/explore">explore</a>            <a href="/messages">messages</a>        </table>    </div>    <h1>${head}</h1>    <p>This is page ${head}</p>    <p>This is page ${head}</p>    <p>This is page ${head}</p>    <p>This is page ${head}</p>    <p>This is page ${head}</p>    <br>    <a href="/messages/13213">men</a>    <br>    <a href="/messages/21654">men 1</a>    <br>    <a href="/messages/33213">men 2</a>    <br>    <a href="/messages/43213">men 3</a></body></html>`
    );
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
