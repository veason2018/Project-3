const express = require('express');
const hbs = require('express-hbs');
const bodyParser = require('body-parser');

const app = express();

// Define a route for the login page
app.get('/login', function (req, res) {
    res.render('login'); // Render the login view
});

const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/login");
// Uncommented the UserSchema by - prayasHOD
const UserSchema = new mongoose.Schema({
    fullname: String,
    username: String,
    email: String,
    password: String
});

const UserModel = mongoose.model("User", UserSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.engine('hbs', hbs.express4({
    partialDir: __dirname + '/views/partials',
    defaultLayout: __dirname + '/views/layout/main.hbs'
}));

const port = process.env.PORT || 3000;
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.get('/', function (req, res) {
    res.render('index');
});
app.get('/overview', function (req, res) {
    res.render('content-template', {
        pageTitle: 'Overview',
        pageContent: 'The story follows Monkey D. Luffy, a young and ambitious pirate with the goal of finding the legendary treasure known as "One Piece" and becoming the Pirate King. Luffy gains the ability to stretch his body like rubber after accidentally eating a Devil Fruit, a rare and mysterious fruit that grants unique powers at the cost of the ability to swim. Along his journey, Luffy assembles a diverse and colorful crew of pirates, known as the Straw Hat Pirates, each with their own dreams and ambitions.The world of "One Piece" is vast and consists of numerous islands, seas, and powerful organizations. The Grand Line, a dangerous and unpredictable sea, is central to the story and holds the key to reaching the final destination of the treasure, the elusive Raftel (later revealed to be called Laugh Tale).'
    });
});

app.get('/characters', function (req, res) {
    res.render('content-template', {
        pageTitle: 'Characters',
        pageContent: 'One Piece features a vast array of memorable characters.The characters in "One Piece" are diverse and memorable, ranging from powerful pirates and marines to mystical creatures and revolutionary leaders. Key members of the Straw Hat crew include Roronoa Zoro, Nami, Usopp, Sanji, Tony Tony Chopper, Nico Robin, Franky, Brook, and Jinbe.'
    });
});

app.get('/world', function (req, res) {
    res.render('content-template', {
        pageTitle: 'World',
        pageContent: 'The world of "One Piece" is a vast and imaginative one, filled with diverse islands, seas, and cultures. The central setting is the Grand Line, a dangerous and unpredictable sea that houses powerful pirates, marines, and mysterious islands. The world is divided into four seas, and at the intersection of these seas lies the Grand Line, leading to the ultimate destination of Raftel.'
    });
});

app.get('/story', function (req, res) {
    res.render('content-template', {
        pageTitle: 'Story',
        pageContent: 'One Piece unfolds an epic and adventurous story as Monkey D. Luffy, along with his crew.The story follows Monkey D. Luffy, a young and ambitious pirate with the goal of finding the legendary treasure known as "One Piece" and becoming the Pirate King. Luffy gains the ability to stretch his body like rubber after accidentally eating a Devil Fruit, a rare and mysterious fruit that grants unique powers at the cost of the ability to swim. Along his journey, Luffy assembles a diverse and colorful crew of pirates, known as the Straw Hat Pirates, each with their own dreams and ambitions.The world of "One Piece" is vast and consists of numerous islands, seas, and powerful organizations. The Grand Line, a dangerous and unpredictable sea, is central to the story and holds the key to reaching the final destination of the treasure, the elusive Raftel (later revealed to be called Laugh Tale).'
    });
});
app.post('/', function (req, res) {
    const form = req.body;
    console.log('Form data:', form);

    if (form.selection === 'Login') {
        if (form.useername !== '' && form.password !== '') {
            console.log("Valid credentials. Rendering welcome page.");

            res.render('welcome',{
                username: form.useername
            });
        } else if (form.useername === '' || form.password === '') {
            console.log("Invalid credentials. Please enter both username and password.");
            res.render('index', {
                message: 'Please enter valid user credentials'
            });
        } else if ((form.username === '' && form.password !== '') || (form.username !== '' && form.password === '')) {
            console.log("Invalid credentials. Please enter both username and password.");
            res.render('index', {
                message: 'Please enter valid user credentials'
            });
        }
    } else if (form.selection === 'Create Profile') {
        console.log("Rendering create profile page.");
        res.render('createprofile');
        
    }
});

// chnage in creating profile- prayasHOD
app.post('/createprofile', async function(req, res){
    const { fullname, username, email, password } = req.body;

    const newUser = new UserModel({ fullname, username, email, password });

    try {
        await newUser.save();
        console.log('User created successfully.');
        res.render('index', {
            message: 'Profile created successfully',
        });
    } catch (error) {
        console.error('Error creating user:', error);
        res.render('index', {
            message: 'Error creating user',
        });
    }  
});

// ...



app.listen(port, () => console.log(`Listening on port ${port}!`));
