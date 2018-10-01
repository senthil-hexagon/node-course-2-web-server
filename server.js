const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

var app = express();

hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    fs.appendFile("server.log", log + "\n", (err)=>{
        console.log(err);
    })
    console.log(log);
    next();
});

//Call maintenance code middleware here ..without next() call.
// app.use((req, res, next) => {
//     res.render("maintenance.hbs");
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper("getCurrentYear", ()=>{
    return new Date().getFullYear();
});

hbs.registerHelper("screamIt", (text)=>{
    return text.toUpperCase();
});

app.get("/", (req, res)=>{
    res.render("home.hbs", {
        pageTitle: "Home Page ...",
        welcomeMessage: "Welcome to Handlebar/NodeJS !!! ",
        currentYear: new Date().getFullYear(),
    })

});

// app.get("/", (req, res) => {
//     //res.send("<h1>Welcome to Node ..Hello Express !!!</h1>");
//     res.send({
//         name: 'Senthilkumar Prakasam',
//         likes: [
//             'Biking', 'Watching Movies', 'Music'
//         ]
//     });
// });

// app.get("/about", (req, res) => {
//     res.send("About Page !!!!");
// });

app.get("/about", (req, res)=>{
    res.render("about.hbs", {
        pageTitle: "About Page ...",
        currentYear: new Date().getFullYear(),
    });
})

app.get("/bad", (req, res) => {
    res.send({
        errorMessage: 'Unable to fulfill your request!'
    });
});

app.listen(3000, ()=> {
    console.log("Server is up on port 3000!");
});