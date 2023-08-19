import React from 'react'
import { useNavigate } from 'react-router-dom'
import BlogsForUsers from './ForUsers/BlogsForUsers';

const Home = () => {
  const navigate = useNavigate();
  return (
    <main className='homepage'>
        <h1>Home</h1>
        <BlogsForUsers />
    </main>
  )
}

export default Home