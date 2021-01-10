import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { authorized } from '../redux/redux'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userName: '',
            password: '',
            message: ''
        }
    }

    userLogin = () => {
        if (this.state.userName.length > 0 && this.state.password.length > 0) {
            axios.post('http://localhost:3003/login', {
                userName: this.state.userName.toLowerCase(),
                password: this.state.password
            }).then(res=> {
                console.log(res)
                if(res.data.authorized){
                    this.props.authorized(true)
                    this.setState({
                        message: 'Login Successful'
                    })
                }
                else{
                    this.props.authorized(false)
                    this.setState({
                        message: 'Please enter valid cred!'
                    })
                }
            }).catch((err)=>{
                this.props.authorized(false)
                this.setState({
                    message: 'Something went wrong'
                })
            })
            this.setState({
                userName: '',
                password: ''
            })
        }
        else {
            alert("Input can't be blank.. please fill in some value")
        }
    }

    render() {
        return (
            <div className='Login'>
                <h2>
                    Login
                </h2>
                <br />
                <p style={{color:'red'}}>{this.state.message}</p>
                <div>
                    <div>
                        <label>User Name</label>
                    </div>
                    <input type="text" name="userName" placeholder="Enter your User Name" value={this.state.userName} onChange={event => this.setState({ userName: event.target.value })}></input>
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
                    <button onClick={() => this.userLogin()}>Login</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login)