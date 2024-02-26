const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path')

const myDb = require('./public/database.js');

const utilities = require('./public/utilities.js');

const app = express();

const port = 6789;

// directorul 'views' va conține fișierele .ejs (html + js executat la server)
app.set('view engine', 'ejs');
// suport pentru layout-uri - implicit fișierul care reprezintă template-ul site-ului este views/layout.ejs
app.use(expressLayouts);
// directorul 'public' va conține toate resursele accesibile direct de către client (e.g., fișiere css, javascript, imagini)
app.use(express.static('public'))
// corpul mesajului poate fi interpretat ca json; datele de la formular se găsesc în format json în req.body
app.use(bodyParser.json());
// utilizarea unui algoritm de deep parsing care suportă obiecte în obiecte
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    key: 'user_sid',
    secret: 'secret',
    saveUninitialized: false,
    resave: false
}));


(async function () {
    listaIntrebari = await utilities.readFileAsync("public/intrebari.json");
    users = await utilities.readFileAsync("utilizatori.json");
    produse = await utilities.readFileAsync("public/docs.json");
})();


// la accesarea din browser adresei http://localhost:6789/ se va returna textul 'Hello World'
// proprietățile obiectului Request - req - https://expressjs.com/en/api.html#req
// proprietățile obiectului Response - res - https://expressjs.com/en/api.html#res
//app.get('/', (req, res) => res.send('Hello World'));

/*app.get('/', async (req, res) => {
    res.render('index', );
});*/

app.get('/', async (req, res) => {
    console.log('cookies: ', req.cookies);
    let username = null, role = "";
    if (req.session.user) {
        username = req.session.user.prenume;
        role = req.session.user.role;
    }
    res.clearCookie('utilizator');
   // let produse = await myDb.getItems();
    res.render('index', {user: username, role: role});
    //res.render('index', {user: username, produse: produse, role: role});
});

app.get('/autentificare', (req, res) => {
    if (req.session.user) {   //if logged
        res.redirect("/");
        return;
    }
    let user = req.cookies["autentificare_user"];
    let username = null;
    if (user) {
        username = user["nume"];
    }
    let messageError = false;
    if (typeof req.cookies.messageError != "undefined" && req.cookies.messageError === "yes") {
        messageError = true;
        res.clearCookie("messageError");
    }
    res.render("autentificare", {user: username, messageError: messageError});
});

app.post('/verificare-autentificare', (req, res) => {
    let user = req.body;
    console.log("Verificare user: ", user);
    let username = user.login[0],
        password = user.login[1];
    for (let index in users) {
        if (username === users[index]["utilizator"] && password === users[index]["parola"]) {
            req.session.user = {}
            req.session.user.prenume = users[index]["prenume"];
            req.session.user.nume = users[index]["nume"];
            req.session.user.username = users[index]["utilizator"];
            req.session.user.role = users[index]["role"];
            res.cookie("autentificare_user", {nume: username});
            res.redirect("/");
            return;
        }
    }
});

app.get('/log-out', (req, res) => {
    if (typeof req.session.user != "undefined") {
        console.log("Sesiune utilizator [Log-OUT]: ", req.session.user);
        req.session.user = undefined;
    }
    if (typeof req.session.cart != "undefined") {
        req.session.cart = undefined;
    }
    res.redirect('/');
});
// la accesarea din browser adresei http://localhost:6789/chestionar se va apela funcția specificată
app.get('/chestionar', (req, res) => {
    res.render('chestionar', {intrebari: listaIntrebari});
});


app.post('/rezultat-chestionar', (req, res) => {
    res.render('rezultat-chestionar', {intrebari: listaIntrebari, raspunsuri: JSON.stringify(req.body)});
});

app.post('/rezultat-chestionar', (req, res) => {
	console.log(req.body);
	res.send("formular: " + JSON.stringify(req.body));
});

<<<<<<< HEAD
/*app.get("/creare-bd", async (req, res) => {
    await myDb.createDatabase();
    res.redirect("/");
});

app.get("/inserare-bd", async (req, res) => {
    await myDb.populateDatabase(produse);
    res.redirect("/");
});*/

app.listen(port, () => console.log(`Serverul rulează la adresa http://localhost:6789/`));
=======
app.listen(port, () => console.log(`Serverul rulează la adresa http://localhost:`));

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "student",
  password: ""
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  /*Create a database named "mydb":*/
  con.query("CREATE DATABASE test_1", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
});





//ca sa faci baza de date trebuie numita test_ceva
>>>>>>> 81003137c7af85c7084c4035f1ad490c7e53507c
