import React from 'react'
import { useState, useEffect } from 'react'
import useTypeBlogs from '../../hooks/useTypeBlogs'
import BlogWidget from './BlogWidget'

const Art = () => {

    const [blogs, setBlogs] = useState();
    const getBlogs = useTypeBlogs();

    useEffect(() => {
        if (!blogs) {
            setBlogs(getBlogs);
        }
    }, [])

  return (
    <div>Art
        { blogs?.length
            ? (
                <ul>
                    {blogs.map((blog, i) => <BlogWidget key={i} blog={blog}/>)}
                </ul>
                
            ) : <p>No Blog Post to display</p>
        }
    </div>
  )
}

export default Art