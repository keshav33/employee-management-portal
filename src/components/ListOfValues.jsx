import React, { Component } from 'react'
import axios from 'axios'
import Filter from './Filter'
import { connect } from 'react-redux'
import { addName, addEmail, addPhone, addSalary } from '../redux/redux'
import '../App.css'

class ListOfValues extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            filteredData: [],
            searchedData: [],
            searchByName: '',
            message: '',
            edit: false,
            editName: '',
            editEmail: '',
            editPhone: '',
            editSalary: ''
        }
    }

    fetchUser = () => {
        axios.get('http://localhost:3003/list-of-values')
            .then(response => {
                console.log(response.data)
                this.setState({
                    data: response.data
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    edit = (_id) => {
        this.setState({
            edit: !this.state.edit
        })
        axios.post('http://localhost:3003/list-of-value-edit', {
            _id: _id,
            name: this.state.editName,
            email: this.state.editEmail,
            phone: this.state.editPhone,
            salary: this.state.editSalary
        })
            .then(response => {
                this.fetchUser()
            })
            .catch(error => {
                this.setState({
                    message: 'Unable to edit'
                })
            })

        this.setState({
            editName: '',
            editEmail: '',
            editPhone: '',
            editSalary: ''
        })
    }

    delete = (_id) => {
        axios.post('http://localhost:3003/list-of-value-delete', { _id: _id })
            .then(response => {
                this.fetchUser()
                this.setState({
                    message: 'Successfully Deleted!'
                })
            })
            .catch(error => {
                this.setState({
                    message: 'Unable to delete'
                })
            })
    }

    componentDidMount() {
        this.fetchUser()
    }

    render() {
        let editHtml
        if (this.state.edit) {
            editHtml = <span>
                <input type='text' placeholder="Edit Name" value={this.state.editName} onChange={event => this.setState({ editName: event.target.value })}></input>
                <input type='email' placeholder="Edit Email" value={this.state.editEmail} onChange={event => this.setState({ editEmail: event.target.value })}></input>
                <input type='number' placeholder="Edit Phone" value={this.state.editPhone} onChange={event => this.setState({ editPhone: event.target.value })}></input>
                <input type='number' placeholder="Salary" value={this.state.editSalary} onChange={event => this.setState({ editSalary: event.target.value })}></input>
            </span>
        }
        else {
            editHtml = ''
        }

        let searched
        if (this.state.searchByName !== '') {
            searched = this.state.data.filter(item => item.name.toLowerCase().includes(this.state.searchByName.toLowerCase()))
        }
        else {
            searched = this.state.data
        }

        let filteredData = searched.filter((item) => item.salary == this.props.filterSalary)

        return (
            <div className='listOfValues'>
                <br />
                <h2>List Of Values</h2>
                <br />
                <input type='text' placeholder='Search By Name' onChange={event => this.setState({ searchByName: event.target.value })}></input>
                <br />
                {this.state.message}
                <br />
                {editHtml}
                <br />
                <Filter></Filter>
                <br />
                <div class="scrollit">
                    <table className='list-table'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Salary</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.filterSalary === '' ? searched.map(
                                item => <tr key={item._id}>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.salary}</td>
                                    <td><button className='edit-button' onClick={() => this.edit(item._id)}>Edit</button></td>
                                    <td><button className='delete-button' onClick={() => this.delete(item._id)}>Delete</button></td>
                                </tr>
                            ) : filteredData.map(
                                item => <tr key={item._id}>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.salary}</td>
                                    <td><button className='edit-button' onClick={() => this.edit(item._id)}>Edit</button></td>
                                    <td><button className='delete-button' onClick={() => this.delete(item._id)}>Delete</button></td>
                                </tr>
                            )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        name: state.name,
        email: state.email,
        phone: state.phone,
        salary: state.salary,
        filterSalary: state.filterSalary
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

export default connect(mapStateToProps, mapDispatchToProps)(ListOfValues)