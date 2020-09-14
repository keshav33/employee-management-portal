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
            searchByName: ''
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

    componentDidMount() {
        this.fetchUser()
    }

    render() {
        let searched
        if(this.state.searchByName !== '' ){
            searched = this.state.data.filter(item => item.name == this.state.searchByName)
        }
        else{
            searched = this.state.data
        }
        if (this.props.filterSalary === '') {
            return (
                <div className="listOfValues">
                    <br />
                    <h2>List Of Values</h2>
                    <br />
                    <input type='text' placeholder='Search By Name' onChange={event=> this.setState({searchByName: event.target.value})}></input>
                    <br />
                    <Filter></Filter>
                    <br />
                    <table className='list-table'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Salary</th>
                            </tr>
                        </thead>
                        <tbody>
                            {searched.map(item => <tr key={item._id}>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.phone}</td>
                                <td>{item.salary}</td>
                            </tr>)}
                        </tbody>
                    </table>
                </div>
            )
        }
        else {
            let filteredData = searched.filter((item)=> item.salary == this.props.filterSalary)
            console.log(filteredData)
            return (
                <div className='listOfValues'>
                    <br />
                    <h2>List Of Values</h2>
                    <br />
                    <input type='text' placeholder='Search By Name' onChange={event=> this.setState({searchByName: event.target.value})}></input>
                    <br />
                    <Filter></Filter>
                    <br />
                    <table className='list-table'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Salary</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map(item => <tr key={item._id}>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.phone}</td>
                                <td>{item.salary}</td>
                            </tr>)}
                        </tbody>
                    </table>
                </div>
            )
        }
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