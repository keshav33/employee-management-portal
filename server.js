const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const cors = require('cors')

mongoose.connect('mongodb://localhost/assignment_db', {useNewUrlParser: true});
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors())

const valueSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: Number
    },
    salary: {
        type: Number
    }
})

const Value = mongoose.model('Value', valueSchema)

app.post('/add-value', (req, res) => {

    const value = new Value({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        salary: req.body.salary
    })
    console.log(value)
    value.save()
    res.json(value)
})

app.get('/list-of-values', (req, res) => {
    Value.find({}, (err,result)=>{
        console.log(result)
        res.json(result)
    })
})

app.listen(3003, () => {
    console.log(`this application started at port 3003`);
})