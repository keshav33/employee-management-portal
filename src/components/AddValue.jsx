import React, { Component } from 'react'
import {connect} from 'react-redux'
import {addName, addEmail, addPhone, addSalary} from '../redux/redux'
import '../App.css'
import axios from 'axios'

class AddValue extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            phone: '',
            salary: ''
        }
    }

    addValue = ()=>{
        if(this.state.name.length>0 && this.state.email.length>0 && this.state.phone.length>0 && this.state.salary.length>0){
            console.log(this.state.name, this.state.email, this.state.phone, this.state.salary)
            this.props.addName(this.state.name)
            this.props.addEmail(this.state.email)
            this.props.addPhone(this.state.phone)
            this.props.addSalary(this.state.salary)
            axios.post('http://localhost:3003/add-value', {
                name: this.state.name,
                email: this.state.email,
                phone: this.state.phone,
                salary: this.state.salary
            })
                .then(response => {
                    console.log(response.data)
                })
                .catch(error => {
                    console.log(error)
                })
        }
        else{
            alert("Input can't be blank.. please fill in some value")
        }
        this.setState({
            name: '',
            email: '',
            phone: '',
            salary: ''
        })
    }

    render() {
        return (
            <div className='AddValue'>
            <h2>
                Add Value
            </h2>
            <br/>
                    <div>
                        <div>
                            <label>Name</label>
                        </div>
                        <input type="text" name="name" placeholder="Enter your name" value={this.state.name} onChange={event => this.setState({ name: event.target.value })}></input>
                    </div>
                    <br />
                    <div>
                        <div>
                            <label>Email</label>
                        </div>
                        <input type="email" name="email" placeholder="Enter your email" value={this.state.email} onChange={event => this.setState({ email: event.target.value })}></input>
                    </div>
                    <br />
                    <div>
                        <div>
                            <label>Phone Number</label>
                        </div>
                        <input type='number' name="phone" placeholder="Enter phone number" value={this.state.phone} onChange={event => this.setState({ phone: event.target.value })}></input>
                    </div>
                    <br />
                    <div>
                        <div>
                            <label>Salary</label>
                        </div>
                        <input type='number' name="salary" placeholder="Enter your salary" value={this.state.salary} onChange={event => this.setState({ salary: event.target.value })}></input>
                    </div>
                    <br />
                    <div>
                        <button onClick={()=>this.addValue()}>Add Value</button>
                    </div>
            </div>
        )
    }
}

const mapStateToProps = state =>{
    return{
        name: state.name,
        email: state.email,
        phone: state.phone,
        salary: state.salary
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        addName: name => dispatch(addName(name)),
        addEmail: email => dispatch(addEmail(email)),
        addPhone: phone => dispatch(addPhone(phone)),
        addSalary: salary => dispatch(addSalary(salary))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AddValue)