import React from 'react'
import { useState, useEffect } from 'react'
import useTypeBlogs from '../../hooks/useTypeBlogs'
import BlogWidget from './BlogWidget'

const Programming = () => {

    const [blogs, setBlogs] = useState();
    const getBlogs = useTypeBlogs("1");

    useEffect(() => {
        if (!blogs) {
            setBlogs(getBlogs);
        }
    }, [])

  return (
    <div>Programming
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

export default Programming