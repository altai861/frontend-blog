import React from 'react'
import { useState, useEffect } from 'react'
import BlogWidget from './BlogWidget'
import axios from '../../api/axios'

const Training = () => {

    const [blogs, setBlogs] = useState();
    
    const getBlogs = async () => {
        try {
            const response = await axios.get('/blogsforusers');
            setBlogs(response.data.filter(blog => blog.type === "2"))
            console.log(blogs)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        if (!blogs) {
            getBlogs()
        }
    }, [])

  return (
    <main>
        <h2>Basketball and Training</h2>
        { blogs?.length
            ? (
                <ul>
                    {blogs.map((blog, i) => <BlogWidget key={i} blog={blog}/>)}
                </ul>
                
            ) : <p>No Blog Post to display</p>
        }
    </main>
  )
}

export default Training