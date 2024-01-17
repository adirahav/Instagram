import { useState } from 'react'
import { Home } from './pages/Home';
import { Alert } from './cmps/Alert';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (     
    <section className='main-layout'>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search/" element={<Home />} />    {/*to fix: should be popup*/}
            <Route path="/explore/" element={<Home />} />
            <Route path="/reels/" element={<Home />} />
            <Route path="/direct/inbox//" element={<Home />} />
            <Route path="/notifications/" element={<Home />} /> {/*to fix: should be popup*/}
            <Route path="/stories/:username/:storyid/" element={<Home />} />     
            <Route path="/new-story/" element={<Home />} />     {/*to fix: should be popup*/}
            <Route path="/:username/" element={<Home />} />
        </Routes>

        <Alert />
    </section>
);
}

export default App