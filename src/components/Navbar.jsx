import React from 'react'
import '../App.css'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
function Navbar() {
    const navStyle = {
        textDecoration: 'none',
        color: 'white'
    }

    const authorized = useSelector(state => state.isAuthorized)
    return (
        <>
            <ul className="nav">
                {!authorized ? (
                    <Link style={navStyle} to='/login'>
                        <li className="nav-item">Login</li>
                    </Link>
                ) : null}
                {!authorized ? (
                    <Link style={navStyle} to='/signup'>
                        <li className="nav-item">Sign Up</li>
                    </Link>
                ) : null}
                {authorized ? (
                    <Link style={navStyle} to='/add-value'>
                        <li className="nav-item">Add Value</li>
                    </Link>
                ) : null}
                {authorized ? (
                    <Link style={navStyle} to='/show-value'>
                        <li className="nav-item">Recently Added</li>
                    </Link>
                ) : null}
                {authorized ? (
                    <Link style={navStyle} to='/list-of-values'>
                        <li className="nav-item">List Of Values</li>
                    </Link>
                ) : null}
                {authorized ? (
                    <Link style={navStyle} to='/logout'>
                        <li className="nav-item">Log Out</li>
                    </Link>
                ) : null}
            </ul>
        </>
    )
}

export default Navbar