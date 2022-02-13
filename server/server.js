const express = require('express');
const app = express();
const cors = require('cors');
const bcrypt = require('bcrypt');

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.all((req, res, next) => {
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000')
    res.set('Content-Type', 'application/json')
    next()
})

function getRandomString() {
    let resString = '';
    const letters = ['a', 'b', 'c', 'd', 'e', 'f', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const length = Math.floor(10 + Math.random() * 1000);
    for (let i = 0; i < length; i++){
      resString += letters[Math.floor(Math.random() * (letters.length - 1))];
    }
    return resString;
}

let tokens = [];

let users = [
    {
        id: 0,
        login: 'Пупкин',
        age: 16,
        phone: '+7 123 456-78-90',
        email: 'ash@tenflex.com',
        adverts: [
            {
                id: ''
            }
        ]
    }
]

let adverts = [
    {
        id: 1,
        type: 0,
        category: 0,
        date: '2022-02-23',
        descr: 'bla-bla-bla',
        participants: [
            {
                id: ''
            }
        ]
    }
]
let types = ['ФанЛаб1', 'ФанЛаб2', 'ФанЛаб3', 'ФанЛаб4']

let categories = ['Дошкольники 3+', 'Школьники 6-15', 'Взрослые 16+']


let credits = [
    {
        id: 0,
        client_name: 'Alexey',
        amount: 1000,
        credit_term: '2022-12-31'
    }
];
let creditID = 0;

app.post('/registration', (req, res) => {
    const {name, age, phone, email} = req.body;

    if(name && phone && email) {
        let user = users.find((u) => u.name === name && u.phone === phone && u.email === email);
        
        if (user) {
            // console.log(user);
            if(!user.age) { user.age = age }
            const index = users.findIndex(u => u.hash === user.hash);
            users.splice(index, 1, user)
        } else {
            // create new user
            const num = 10 + Math.floor(Math.random() * 10);
            const salt = bcrypt.genSaltSync(num);
            const hash = bcrypt.hashSync(name + phone, salt);
            console.log(salt, hash)
            user = {name, age, phone, email, salt, hash};
            users.push(user)
        }
        const newToken = getRandomString();
        tokens = tokens.filter(t => t.hash !== user.hash);
        tokens.push({ hash: user.hash, token: newToken });
        res.json({users, newToken});              
    } else {
        res.status(401).send()
    }
});

// app.post('/token', (req, res) => {
//     const {login, password} = req.body;
//     const user = users.find((u) => u.login === login);

//     if(user) {
//         const hash = bcrypt.hashSync(password, user.salt);

//         if(hash === user.hash) {
//             const newToken = getRandomString();
//             tokens = tokens.filter(t => t.login !== login);
//             tokens.push({ login: login, token: newToken });
//             // console.log(newToken)
//             res.json({ login: login, token: newToken });        
//         } else {
//             res.status(401).send()
//         }
//     } else {
//         res.status(401).send()
//     }
// })

// app.post('/logout', (req, res) => {
//     const {token} = req.body;
//     if (token) {
//         tokens = tokens.filter(t => t.token !== token)
//         res.send('logout')
//     } else {
//         res.send('login')
//     }
// })

app.get('/', (req, res) => {
    res.status(200).json(adverts)
});

app.post('/credits', (req, res) => {
    const {clientName, amount, creditTerm} = req.body;
    const newCredit = {
        id: ++creditID,
        client_name: clientName,
        amount: amount,
        credit_term: creditTerm
    }

    if (clientName && amount && creditTerm) {
        credits.push(newCredit)
        res.status(200).json(newCredit)
    } else {
        res.status(500).send('wrong credit data')
    }
});

app.delete('/credits/:id', (req, res) => {
    const index = parseInt(req.params.id);
    // console.log(req.params.id, index)
    const item = credits.find(c => c.id === index);
    if (item) {
        credits = credits.filter(c => c.id !== index)
        res.status(200).json(credits)
    } else {
        res.status(500).send(`credit entry id = ${index} not found`)
    }
})

app.listen(3002, () => {
    console.log('events server is loaded')
})