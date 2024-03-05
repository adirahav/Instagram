export const utilService = {
    makeId,
    saveToStorage,
    loadFromStorage,
    timeAgo,
    isValidEmail,
    isValidPhoneNumber,
    isValidUsername,
    isValidPassword,
    getPlatform
}

const PLATFORM = {
  MOBILE: "MOBILE",
  DESKTOP: "DESKTOP"
}

const MEDIA_WIDTH = {
  MOBILE: 767,
  DESKTOP: 768
}

function makeId(length = 5) {
    var text = ""
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}

function saveToStorage(key, value) {
    localStorage[key] = JSON.stringify(value)
}

function loadFromStorage(key, defaultValue = null) {
    const value = localStorage[key] || defaultValue
    return JSON.parse(value)
}

function timeAgo(timestamp) {
    const currentTime = Date.now()
    const timeDifference = currentTime - timestamp
  
    const seconds = Math.floor(timeDifference / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)
    const weeks = Math.floor(days / 7)
    
    if (weeks > 0) {
      return `${weeks}w`
    } else if (days > 0) {
      return `${days}d`
    } else if (hours > 0) {
      return `${hours}h`
    } else if (minutes > 0) {
      return `${minutes}m`
    } else {
      return `${seconds}s`
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}

function isValidPhoneNumber(phoneNumber) {return true
    const phoneRegex = /^\d{10}$/ 
    return phoneRegex.test(phoneNumber)
}

function isValidUsername(username) {return true
    const usernameRegex = /^[a-zA-Z0-9](?!.*[._]{2})[a-zA-Z0-9._]{0,28}[a-zA-Z0-9]$/
    return usernameRegex.test(username)
}

function isValidPassword(password) {return true
    const lengthRequirement = password.length >= 6
    const containsLettersNumbersSymbols = /[a-zA-Z]+/.test(password) && /\d+/.test(password) && /\W+/.test(password)
    return lengthRequirement && containsLettersNumbersSymbols
}

function getPlatform() {
  return window.innerWidth <= MEDIA_WIDTH.MOBILE
              ? PLATFORM.MOBILE
              : PLATFORM.DESKTOP
}