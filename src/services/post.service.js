import { storageService } from './async-storage.service.js'
import { profileService } from './profile.service.js'
import { userService } from './user.service.js'
import { utilService } from './util.service.js'

const STORAGE_KEY = 'posts'

export const postService = {
    query,
    save,
    remove,
    getById,
    getDefaultFilter,
    createPost,
    liked,
    addComment,
}

_createPosts()

async function query(pageNumber, pageItemsCount) {
    const loggedinUser = userService.getLoggedinUser()
    if (!loggedinUser) throw 'user error'
    
    let posts = await storageService.query(STORAGE_KEY)
    posts = await posts.filter(post => post.createdBy._id ==  loggedinUser._id)
    posts = await storageService.sort(posts, 'createdAt', 'desc')
    posts = await storageService.paging(posts, pageNumber, pageItemsCount) 
    return posts.pagedEntities

    /*console.log("-----------------------------------------------")
    console.log("pageNumber = " + pageNumber + " , pageItemsCount = " + pageItemsCount)

    let posts = await storageService.query(STORAGE_KEY)
    console.log("-- query --")
    var idsLine = posts.map(post => post._id + "-" + post.text).join(' | ')
    console.log(idsLine)

    posts = posts.filter(post => post.createdBy._id ==  loggedinUser._id)
    console.log("-- filter --")
    var idsLine = posts.map(post => post._id + "-" + post.text).join(' | ')
    console.log(idsLine)

    posts = await storageService.sort(posts, 'createdAt', 'desc')
    console.log("-- sort --")
    var idsLine = posts.map(post => post._id + "-" + post.text).join(' | ')
    console.log(idsLine)

    posts = await storageService.paging(posts, pageNumber, pageItemsCount)   
    console.log("-- paging --")
    var idsLine = posts.pagedEntities.map(post => post._id + "-" + post.text).join(' | ')
    console.log(idsLine)
    
    return posts.pagedEntities*/
}

function getById(id) {
    return storageService.get(STORAGE_KEY, id)
}

function remove(id) {
    return storageService.remove(STORAGE_KEY, id)
}

async function save(postToSave) {
    if (postToSave._id) {
        return await storageService.put(STORAGE_KEY, postToSave)
    } else {
        return await storageService.post(STORAGE_KEY, postToSave)
    }
}

function getDefaultFilter() {
    const loggedinUser = userService.getLoggedinUser()
    if (!loggedinUser) throw 'user error'

    return {
        createdBy: loggedinUser,
    }
}

async function createPost(text, media) {
    const loggedinUser = userService.getLoggedinUser()
    if (!loggedinUser) throw 'user error'

    const post = { 
        createdBy: loggedinUser,
        createdAt: new Date().getTime(),
        media: [{url: media.url, width: media.width, height: media.height, type: _getMediaType(media.url)}], 
        text: text, 
        likes: [], 
        comments: [],
    }
    
    await save(post)
}

async function liked(post) {
    const loggedinUser = userService.getLoggedinUser()
    if (!loggedinUser) throw 'user error'

    const isLiked = post.likes.some(like => like.user._id === loggedinUser._id)

    if (isLiked) {
        post.likes = post.likes.filter(like => like.user._id !== loggedinUser._id)
    } else {
        post.likes.push({user: loggedinUser})
    }
    
    save(post)
}

async function addComment(post, comment) {
    const loggedinUser = userService.getLoggedinUser()
    if (!loggedinUser) throw 'user error'

    post.comments.push({
        createdAt: new Date().getTime(), 
        user: loggedinUser,
        comment
    })

    save(post)
}

function _getMediaType(fullURL) {
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp']
    const videoExtensions = ['mp4', 'webm', 'ogg', 'avi', 'mov']

    const imageURL = fullURL.split('?')[0]
    const extension = imageURL.split('.').pop().toLowerCase()
  
    if (imageExtensions.includes(extension)) {
      return 'image'
    } else if (videoExtensions.includes(extension)) {
      return 'video'
    } else {
      return 'unknown'
    }
  }

function _createPosts() {
    let posts = utilService.loadFromStorage(STORAGE_KEY)
    if (!posts || !posts.length) {
        posts = [
            { 
                _id: 's201', 
                createdBy: profileService.tempUsers.find(user => user._id === 'u101'),
                createdAt: new Date().getTime(),
                media: [{url:"src/assets/images/avatar-example.jpg", type: "image"}], 
                text: '@maayanrahav post 201 post 201 post 201 post 201 post 201 post 201 post 201 post 201 #new_post_hashtag', 
                likes: [
                    {user: tempUsers.find(user => user._id === 'u101')}, 
                    {user: tempUsers.find(user => user._id === 'u102')}
                ], 
                comments: [
                    {user: tempUsers.find(user => user._id === 'u101'), comment: "comment 1 comment 1 comment 1 comment 1 "}, 
                    {user: tempUsers.find(user => user._id === 'u102'), comment: "comment 2 comment 2 comment 2 comment 2 comment 2"}
                ]
            },
            { 
                _id: 's202', 
                createdBy: {user: tempUsers.find(user => user._id === 'u102')},
                createdAt: new Date().getTime(),
                media: [{url:"src/assets/images/avatar-example.jpg", type: "image"}], 
                text: '@maayanrahav post 202 post 202 #new_post_hashtag', 
                likes: [
                    {user: tempUsers.find(user => user._id === 'u103')}, 
                    {user: tempUsers.find(user => user._id === 'u104')}
                ], 
                comments: [
                    {createdAt: new Date().getTime(), user: tempUsers.find(user => user._id === 'u103'), comment: "comment 1 comment 1 comment 1 comment 1 "}, 
                    {createdAt: new Date().getTime(), user: tempUsers.find(user => user._id === 'u102'), comment: "comment 2 comment 2 comment 2 comment 2 comment 2"}
                ]
            },
            { 
                _id: 's203', 
                createdBy: tempUsers.find(user => user._id === 'u101'),
                createdAt: new Date().getTime(),
                media: [{url:"https://res.cloudinary.com/dn4zdrszh/video/upload/v1706634835/WhatsApp_Video_2024-01-30_at_18.54.17_8b563579_yvobui.mp4", type: "video"}], 
                text: 'post 203 post 203 post 203 post 203 post 203 post 203 post 203 post 203 post 203 post 203 post 203 post 203 post 203 post 203 post 203 post 203', 
                likes: [
                    {user: tempUsers.find(user => user._id === 'u101')}, 
                    {user: tempUsers.find(user => user._id === 'u102')}
                ], 
                comments: [
                    {createdAt: new Date().getTime(), user: tempUsers.find(user => user._id === 'u101'), comment: "comment 1 comment 1 comment 1 comment 1 "}, 
                    {createdAt: new Date().getTime(), user: tempUsers.find(user => user._id === 'u102'), comment: "comment 2 comment 2 comment 2 comment 2 comment 2"}
                ]
            },
            { 
                _id: 's204', 
                createdBy: tempUsers.find(user => user._id === 'u101'),
                createdAt: new Date().getTime(),
                media: [{url:"https://res.cloudinary.com/dn4zdrszh/video/upload/v1705866539/samples/elephants.mp4", type: "video"}], 
                text: 'post 204 post 204 post 204 post 204 post 204 post 204 post 204 post 204', 
                likes: [
                    {user: tempUsers.find(user => user._id === 'u101')}, 
                ], 
                comments: [
                    {createdAt: new Date().getTime(), user: tempUsers.find(user => user._id === 'u101'), comment: "comment 1 comment 1 comment 1 comment 1 "}, 
                ]
            },
            { 
                _id: 's205', 
                createdBy: tempUsers.find(user => user._id === 'u101'),
                createdAt: new Date().getTime(),
                media: [{url:"https://res.cloudinary.com/dn4zdrszh/video/upload/v1706648652/Videoleap_2023_02_25_14_59_19_669_cisuqb.mp4", type: "video"}], 
                text: 'post 205 post 205 post 205 post 205 post 205 post 205 post 205 post 205', 
                likes: [], 
                comments: []
            },
        ]
        utilService.saveToStorage(STORAGE_KEY, posts)
    }
}
