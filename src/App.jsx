import { Home } from './pages/Home'
import { Alert } from './cmps/Alert'
import { Routes, Route } from 'react-router-dom'
import { DynamicModal } from './cmps/DynamicModal'
import { PostDetails } from './cmps/PostDetails'
import { Profile } from './pages/Profile'
import { store } from './store/store.js'    
import { Provider, useSelector } from 'react-redux'      
import { Signup } from './cmps/Signup.jsx'
import { Login } from './cmps/Login.jsx'
import { useEffect, useState } from 'react'
import { MenuMoreOptions } from './cmps/MenuMoreOptions.jsx'

function App() {
  const [logging, setLogging] = useState(false)
  const loggedinUser = useSelector(storeState => storeState.userModule.loggedinUser)

  useEffect(() => {
    setLogging(loggedinUser !== null && window.location.hash.includes("/accounts/emailsignup/"))
  }, [loggedinUser])

  const mainClass = `main-layout ${loggedinUser ? '' : 'logout'} ${logging ? 'logging' : ''}` 

  return (   
    <Provider store={store}>      
      <section className={mainClass}>
          <Routes>
              <Route path="/" element={<Home />}>
                  <Route path='/p/:postId' element={<PostDetails />} />
              </Route>
              
              <Route path="/home/" element={<Home />} />
              <Route path="/search/" element={<Home />} />    {/*to fix: should be popup*/}
              <Route path="/explore/" element={<Home />} />
              <Route path="/reels/" element={<Home />} />
              <Route path="/direct/inbox/" element={<Home />} />
              <Route path="/notifications/" element={<Home />} /> {/*to fix: should be popup*/}
              <Route path="/stories/:username/:storyid/" element={<Home />} />     
              <Route path="/new-post/" element={<Home />} />     {/*to fix: should be popup*/}
              <Route path="/:username/" element={<Profile />}>
                  <Route path="/:username/:post-type" element={<Profile />} />
              </Route>
              <Route path="/accounts/emailsignup/" element={<Signup />} />     {}
              <Route path="/accounts/login/" element={<Login />} />     {}
              
          </Routes>

          <Alert />
          <DynamicModal />
          <MenuMoreOptions />
      </section>
    </Provider>
  )
}

export default App