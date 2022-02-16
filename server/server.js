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
        name: 'admin',
        age: '',
        phone: '+ 7 123 456-78-90',
        email: 'eshum@gmail.com',
        hash: '$2b$15$lK4mczSLBw3/9h3RQ3ZN2uOYjObu4tXtdoSOy3m8F1iXan6Tu1Doy',
        adverts: []
    }
]

let adverts = [
    // {
    //     id: 1,
    //     type: 0,
    //     category: 0,
    //     date: '2022-02-23',
    //     descr: 'bla-bla-bla',
    //     participants: []
    // }
]

let userID = 0;
let advertID = 0;

app.post('/registration', (req, res) => {
    const {name, age, phone, email} = req.body;

    if( name && phone && email) {
        let user = users.find((u) => u.name === name && u.phone === phone && u.email === email);
        
        if (user) {
            if(!user.age) { user.age = age }
            const index = users.findIndex(u => u.hash === user.hash);
            users.splice(index, 1, user)
        } else {
            // create new user
            const num = 10 + Math.floor(Math.random() * 10);
            const salt = bcrypt.genSaltSync(num);
            const hash = bcrypt.hashSync(name + phone, salt);
            // console.log(salt, hash)
            user = {id: ++userID, adverts: [], name, age, phone, email, salt, hash};
            users.push(user)
        }
        const newToken = getRandomString();
        tokens = tokens.filter(t => t.hash !== user.hash);
        tokens.push({ hash: user.hash, token: newToken });
        res.json({user, newToken});              
    } else {
        res.status(401).send()
    }
});

app.post('/subscribe', (req, res) => {
    const {advertId, token} = req.body;
    const authorized = tokens.find((t) => t.token === token);
    // console.log(authorized, advertId)
    if(authorized && (advertId !== undefined)) {

        const userIndex = users.findIndex(u => u.hash === authorized.hash);
        let user = users[userIndex];
        let advertsList = user.adverts;
        advertsList = advertsList.filter(x => x !== advertId)
        advertsList.push(advertId);
        user.adverts = advertsList
        // console.log(users)

        const advertIndex = adverts.findIndex(a => a.id === advertId);
        let advert = adverts[advertIndex];
        let participantsList = advert.participants;
        participantsList = participantsList.filter(x => x !== user.id)
        participantsList.push(user.id)
        advert.participants = participantsList
        // console.log(adverts)

        res.json({ userId: user.id, advertId: advertId });        

    } else {
        res.status(401).send()
    }
})

app.post('/subscribesuserlist', (req, res) => {
    const {token} = req.body;
    const authorized = tokens.find((t) => t.token === token);
    // console.log(authorized)
    if(authorized) {
        const index = users.findIndex(u => u.hash === authorized.hash);
        let user = users[index];
        let list = user.adverts;
        const advertsList = adverts.filter(a => list.includes(a.id))
        console.log(advertsList)
        res.json(advertsList);        
    } else {
        res.status(401).send()
    }
})

app.get('/', (req, res) => {
    res.status(200).json(adverts)
});

app.delete('/subscribe-remove/:id', (req, res) => {
    const removeId = parseInt(req.params.id);
    // console.log(index)
    const {token} = req.body;
    const authorized = tokens.find((t) => t.token === token);

    if(authorized) {

        const index = users.findIndex(u => u.hash === authorized.hash);
        let user = users[index];
        let list = user.adverts;
        list = list.filter(x => x !== removeId)
        user.adverts = list
        res.status(200).json(list)

    } else {
        res.status(500).send()
    }
})

app.post('/addnewadvert', (req, res) => {
    const {token, pattern} = req.body;
    const authorized = tokens.find((t) => t.token === token);
    console.log(authorized)
    if(authorized) {
        const newAdvert = {
            id: ++advertID,
            ...pattern,
            participants: []
        }
        console.log(newAdvert)
        if(pattern.date && pattern.type && pattern.category){
            adverts.push(newAdvert)
            console.log(adverts)
            res.status(200).json(adverts);        
        } else {
            res.status(500).send()
        }
    } else {
        res.status(401).send()
    }
})

app.listen(3002, () => {
    console.log('events server is loaded')
})