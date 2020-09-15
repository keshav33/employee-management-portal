const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const cors = require('cors')

mongoose.connect('mongodb://localhost/assignment_db', { useNewUrlParser: true });
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
    Value.find({}, (err, result) => {
        console.log(result)
        res.json(result)
    })
})

app.post('/list-of-value-delete', (req, res) => {
    let _id = req.body._id
    Value.deleteOne({ _id: _id }, (err, result) => {
        res.json(result)
    })
})

app.post('/list-of-value-edit', (req, res) => {
    let _id = req.body._id
    let name = req.body.name
    let email = req.body.email
    let phone = req.body.phone
    let salary = req.body.salary

    Value.findOne({ _id }, (err, result)=>{
        value = result
        if(name !== ''){
            value.name = name
        }
        if(email !== ''){
            value.email = email
        }
        if(phone !== ''){
            value.phone = phone
        }
        if(salary !== ''){
            value.salary = salary
        }
        Value.findByIdAndUpdate({_id},value, (err, result)=>{
            res.json(result)
        })
    })
})

app.listen(3003, () => {
    console.log(`this application started at port 3003`);
})