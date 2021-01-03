import React from 'react'
import '../App.css'
import { Link } from 'react-router-dom'

function Navbar() {
    const navStyle = {
        textDecoration: 'none',
        color: 'white'
    }
    return (
        <>
            <ul className="nav">
                <Link style={navStyle} to='/add-value'>
                    <li className="nav-item">Add Value</li>
                </Link>
                <Link style={navStyle} to='/show-value'>
                    <li className="nav-item">Recently Added</li>
                </Link>
                <Link style={navStyle} to='/list-of-values'>
                    <li className="nav-item">List Of Values</li>
                </Link>
            </ul>
        </>
    )
}

export default Navbar