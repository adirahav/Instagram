import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const STORAGE_KEY = 'users'
const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

_createUsers()

export const userService = {
    login,
    signup,
    update,
    getLoggedinUser,
    saveLocalUser,
    getDefaultUser
}

async function login(userCred) {
    let users = await storageService.query(STORAGE_KEY)
    const user = users.find(user => user.username === userCred.username)

    if (user) {
        return saveLocalUser(user)
    }
}

async function signup(userCred) {
    const user = await storageService.post('user', userCred)

    if (user) {
        return saveLocalUser(user)
    }
}

async function update(userToUpdate) {
    let user = await _getById(userToUpdate._id)
    const updatedUser = await storageService.put(STORAGE_KEY, {...user, ...userToUpdate})
    if (getLoggedinUser()._id === updatedUser._id) saveLocalUser(updatedUser)
    return updatedUser
}


function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

function saveLocalUser(user) {
    user = {_id: user._id, username: user.username, fullname: user.fullname, imgURL: user.imgURL }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getDefaultUser() {
    return {
        contact: '',
        fullname: '',
        username: '',
        password: '',
        profilePicture: '',
    }
}

async function _getById(userId) {
    const user = await storageService.get(STORAGE_KEY, userId)
    return user
}

function _createUsers() {
    let users = utilService.loadFromStorage(STORAGE_KEY)
    if (!users || !users.length) {
        users = [
            {_id: 'u101', username: 'adirahav', fullname: 'Adi Rahav', imgURL: 'src/assets/images/avatar-example.jpg'},
            {_id: 'u102', username: 'maayanrahav', fullname: 'Maayan Rahav', imgURL: 'src/assets/images/avatar-example.jpg'},
            {_id: 'u103', username: 'yuval.shvartsman', fullname: 'Yuval Shvartsman', imgURL: 'src/assets/images/avatar-example.jpg'},
            {_id: 'u104', username: 'kathy_mohaban', fullname: 'Kathy Mohaban', imgURL: 'src/assets/images/avatar-example.jpg'},
        ]
        utilService.saveToStorage(STORAGE_KEY, users)
    }
}
