const http = require('http');
const express = require('express');
const app = express();
const Joi = require('joi');
const morgan = require('morgan');
const poruka = require('./middleware/poruka');

console.log(process.env.NODE_ENV)
console.log(app.get('env'))

app.use(morgan('tiny'));
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({extended: true}));
/* app.use(express.static('public')); */
app.use(poruka);

const users = [
    {id: 1, username: 'Belanovic'},
    {id: 2, username: 'Petrovic'},
    {id: 3, username: 'Markovic'}
]

app.get('/', (req,res) => {
    res.send('Odgovor iz expressss-a');
})
app.get('/api', (req,res) => { 
    res.send('api Odgovor iz express-a');
})
app.get('/user/:username', (req,res) => {
    const user_found = users.find((c) => c.username === req.params.username);
    if(!user_found) res.status(404).send("User not found");
    if(user_found) res.json(user_found.id);
})

const schema = Joi.object({
    username: Joi.string().min(3).max(20).required(),
    id: Joi.number()
})

app.post('/users', (req,res) => {
    const validation_result = schema.validate(req.body);
    if(validation_result.error) {
        res.status(400).send(validation_result.error.details[0].message);
        return
    }
    console.log(validation_result);
    const new_user = {
        id: users.length + 1,
        username: req.body.username
    }
    users.push(new_user);
    res.send(`Registrovani ste kao novi korisnik ${new_user.username} sa ID ${new_user.id}`);
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
