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

const userSchema = new mongoose.Schema({
    userName: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    }
})

const Value = mongoose.model('Value', valueSchema)
const User = mongoose.model('User', userSchema)

app.post('/login', (req, res)=> {
    User.findOne({userName: req.body.userName, password: req.body.password}, (err, result)=>{
        if(err){
            res.status(400).send("Something went wrong")
        }
        if(result){
            res.send({authorized: true})
        }
        else{
            res.send({authorized: false})
        }
    })
})

app.post('/signup', (req, res)=>{
    const user = new User({
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password
    })
    user.save()
    res.json(user)
})

app.post('/add-value', (req, res) => {
    const value = new Value({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        salary: req.body.salary
    })
    value.save()
    res.json(value)
})

app.get('/list-of-values', (req, res) => {
    Value.find({}, (err, result) => {
        if(err){
            res.status(400).send("Something went wrong")
        }
        res.json(result)
    })
})

app.post('/list-of-value-delete', (req, res) => {
    let _id = req.body._id
    Value.deleteOne({ _id: _id }, (err, result) => {
        if(err){
            res.status(400).send("Something went wrong")
        }
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
            if(err){
                res.status(400).send("Something went wrong")
            }
            res.json(result)
        })
    })
})

app.listen(3003, () => {
    console.log(`this application started at port 3003`);
})