import { createStore } from 'redux'

const ADD_NAME = 'ADD_NAME'
const ADD_EMAIL = 'ADD_EMAIL'
const ADD_PHONE = 'ADD_PHONE'
const ADD_SALARY = 'ADD_SALARY'
const FILTER_SALARY = 'FILTER_SALARY'
const AUTHORIZED = 'AUTHORIZED'

export function addName(name) {
    return {
        type: ADD_NAME,
        payload: name
    }
}

export function addEmail(email) {
    return {
        type: ADD_EMAIL,
        payload: email
    }
}

export function addPhone(phone) {
    return {
        type: ADD_PHONE,
        payload: phone
    }
}

export function addSalary(salary) {
    return {
        type: ADD_SALARY,
        payload: salary
    }
}

export function filterSalary(salary) {
    return {
        type: FILTER_SALARY,
        payload: salary
    }
}

export function authorized(auth) {
    return {
        type: AUTHORIZED,
        payload: auth
    }
}

const initialState = {
    name: '',
    email: '',
    phone: '',
    salary: '',
    filterSalary: '',
    isAuthorized: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTHORIZED:
            return {
                ...state,
                isAuthorized: action.payload
            }
        case ADD_NAME:
            return {
                ...state,
                name: action.payload
            }
        case ADD_EMAIL:
            return {
                ...state,
                email: action.payload
            }
        case ADD_PHONE:
            return {
                ...state,
                phone: action.payload
            }
        case ADD_SALARY:
            return{
                ...state,
                salary: action.payload
            }
        case FILTER_SALARY:
            return{
                ...state,
                filterSalary: action.payload
            }
        default:
            return state
    }
}

export const store = createStore(reducer)