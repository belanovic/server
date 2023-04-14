const http = require('http');
const express = require('express');
const app = express();
const user = require('./routes/user');
const add_user = require('./routes/add_user');
const get_all = require('./routes/get_all');
const update_user = require('./routes/update_user');
const morgan = require('morgan');
const poruka = require('./middleware/poruka');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://goranbelanovic:21061986gb@cluster0.le1oivh.mongodb.net')
    .then(() => console.log('App is connected to database'))
    .catch((error) => console.log(error))

/* console.log(process.env.NODE_ENV)
console.log(app.get('env')) */

app.use(morgan('tiny'));
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({extended: true}));
/* app.use(express.static('public')); */
app.use(poruka);
app.use('/user', user);
app.use('/add_user', add_user);
app.use('/get_all', get_all);
app.use('/update_user', update_user);

/* app.post('/users', (req,res) => {
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
}) */

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
