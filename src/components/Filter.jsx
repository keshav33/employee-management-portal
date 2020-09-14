import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {filterSalary} from '../redux/redux'

import '../App.css'

function Filter(props){
    const [salary, setSalary] = useState('')
    const dispatch = useDispatch()
    // const fSalary = useSelector( state => state.filterSalary )

    function reset(){
        setSalary('')
        dispatch(filterSalary(''))
    }

    function search(event){
        dispatch(filterSalary(salary))
    }

    return(
        <div className='filter-box'>
        <label>Salary Filter</label>
        <br />
        <br />
        <label>Select Salary:</label>
        <br />
        <label>10000 to 100000:</label>
        <br />
        <input type="range" id="salary" name="salary" min="10000" max="100000" step="5000" className='slider' onChange={event => setSalary(event.target.value) }></input>
        <br />
        {salary}
        <br />
        <button className='search' onClick={()=>search()}>Search</button>
        <button className='reset' onClick={()=>reset()}>Reset</button>
    </div>
    )
}

export default Filter