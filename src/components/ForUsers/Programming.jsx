import React from 'react'
import { useState, useEffect } from 'react'
import BlogWidget from './BlogWidget'
import axios from '../../api/axios'

const Programming = () => {

    const [blogs, setBlogs] = useState();
    
    const getBlogs = async () => {
        try {
            const response = await axios.get('/blogsforusers');
            setBlogs(response.data.filter(blog => blog.type === "1"))
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        if (!blogs) {
            getBlogs()
        }
        console.log(blogs)
    }, [])

  return (
    <main>
        <h2>Programming</h2>
        { blogs?.length
            ? (
                <ul className='blog-ul'>
                    {blogs.map((blog, i) => <BlogWidget key={i} blog={blog}/>)}
                </ul>
                
            ) : <p>No Programmin Blog Post to display</p>
        }
    </main>
  )
}

export default Programming