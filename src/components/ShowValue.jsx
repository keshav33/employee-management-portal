import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addName, addEmail, addPhone, addSalary } from '../redux/redux'
import '../App.css'

class ShowValue extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        if (!this.props.isAuthorized) {
            return (
                <>
                    <br />
                    <h1 style={{ textAlign: 'center',  color: 'red' }}>
                        Unauthorized
                </h1>
                </>
            )
        }
        let data = `No Data Found`
        if (this.props.name.length > 0 && this.props.email.length > 0 && this.props.phone.length > 0 && this.props.salary > 0) {
            data = ``
        }
        return (<div className='ShowValue'>
            <br />
            <h2>Show Values</h2>
            <br />
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Salary</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{data}</td>
                    </tr>
                    <tr>
                        <td>{this.props.name}</td>
                        <td>{this.props.email}</td>
                        <td>{this.props.phone}</td>
                        <td>{this.props.salary}</td>
                    </tr>
                </tbody>
            </table>
            {this.props.filterSalary}
        </div>)
    }
}

const mapStateToProps = state => {
    return {
        name: state.name,
        email: state.email,
        phone: state.phone,
        salary: state.salary,
        filterSalary: state.filterSalary,
        isAuthorized: state.isAuthorized
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addName: name => dispatch(addName(name)),
        addEmail: email => dispatch(addEmail(email)),
        addPhone: phone => dispatch(addPhone(phone)),
        addSalary: salary => dispatch(addSalary(salary))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowValue)