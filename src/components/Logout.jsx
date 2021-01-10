import React from 'react'
import {authorized} from '../redux/redux'
import {useDispatch} from 'react-redux'

function Logout() {
    const dispatch = useDispatch()
    dispatch(authorized(false))
    return (
        <div>
            <h1 style={{textAlign: 'center'}}>
                You have successfully logged Out...!
        </h1>
            <h1 style={{textAlign: 'center'}}>
                Thanks for logging in
        </h1>
        </div>
    )
}

export default Logout