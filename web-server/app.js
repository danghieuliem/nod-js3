const { query } = require("express");
const express = require("express");
const { get } = require("http");
const app = express();
const port = 3001;

const narItems = [
    {
        path: "/home",
        title: "Home"
    },
    {
        path: "/explore",
        title: "Explore"
    },
    {
        path: "/messages",
        title: "Messages"
    }
];

const renderNavBar = (path, narItems) => {
    let menu = '<ul>';

    narItems.forEach(element => {
        if (element.path === path) {
            menu += `<i><b>${element.title}</b></i>`;
        }
        else {
            menu += `<a href = "${element.path}" style = "text-decoration: none;color: green">${element.title}</a>`;
        }
        menu += `</br>`;
    });

    menu += '</ul>';
    return menu;
}

const renderPage = (path, content, _narItems = narItems) => {
    const narBar = renderNavBar(path, _narItems);
    const header = `<h1 style = "color: red">${content}</h1>`;
    const body = `<p>${content}</p>`;

    return `${narBar}${header}${body}`;
};

app.get("/home", (req, res) => {
    res.send(renderPage("/home", "Home Pase"));
});

app.get("/explore", (req, res) => {
    res.send(renderPage("/explore", "Explore Pase"));
});

app.get("/messages", (req, res) => {
    const header = renderPage("/messages", "Messages Pase");
    const messages = [
        {
            path: `/messages/FX27FD4T8402511637512192`,
            title: `user 1`
        },
        {
            path: `/messages/WF94GSJK2835385761660928`,
            title: `user 2`
        },
        {
            path: `/messages/JGO000002955415874699264`,
            title: `user 3`
        }
    ];
    const user = renderNavBar(req.path, messages);


    res.send(`${header}${user}`);
});

app.get("/messages/:userid", (req, res) => {
    const header = renderPage("/messages", "Messages Pase");
    const messages = [
        {
            path: `/messages/FX27FD4T8402511637512192`,
            title: `user 1`
        },
        {
            path: `/messages/WF94GSJK2835385761660928`,
            title: `user 2`
        },
        {
            path: `/messages/JGO000002955415874699264`,
            title: `user 3`
        }
    ];
    const user = renderPage(req.path, req.params.userid, messages);


    res.send(`${header}${user}`);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});