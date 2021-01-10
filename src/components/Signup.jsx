import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { authorized } from '../redux/redux'

class Signup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userName: '',
            password: '',
            email: '',
            message: ''
        }
    }

    userSignup = () => {
        if (this.state.userName.length > 0 && this.state.password.length > 0 && this.state.email.length > 0) {
            axios.post('http://localhost:3003/signup', {
                userName: this.state.userName.toLowerCase(),
                email: this.state.email.toLowerCase(),
                password: this.state.password
            })
                .then(response => {
                    this.setState({
                        message: 'Sign Up Successfull'
                    })
                })
                .catch(error => {
                    this.setState({
                        message: 'Something went wrong'
                    })
                })
            this.setState({
                userName: '',
                email: '',
                password: ''
            })
        }
        else {
            alert("Input can't be blank.. please fill in some value")
        }
    }

    render() {
        return (
            <div className='Signup'>
                <h2>
                    Sign Up
                </h2>
                <br />
                <p>{this.state.message}</p>
                <div>
                    <div>
                        <label>User Name</label>
                    </div>
                    <input type="text" name="userName" placeholder="Enter your User Name" value={this.state.userName} onChange={event => this.setState({ userName: event.target.value })}></input>
                </div>
                <br />
                <div>
                    <div>
                        <label>Email</label>
                    </div>
                    <input type="email" name="email" placeholder="Enter your Email" value={this.state.email} onChange={event => this.setState({ email: event.target.value })}></input>
                </div>
                <br />
                <div>
                    <div>
                        <label>Password</label>
                    </div>
                    <input type="password" name="password" placeholder="Enter your Password" value={this.state.password} onChange={event => this.setState({ password: event.target.value })}></input>
                </div>
                <br />
                <div>
                    <button onClick={() => this.userSignup()}>Sign Up</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthorized: state.isAuthorized
    }
}

const mapDispatchToProps = dispatch => {
    return {
        authorized: auth => dispatch(authorized(auth)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)