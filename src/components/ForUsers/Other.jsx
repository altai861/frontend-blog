import React from 'react'
import { useState, useEffect } from 'react'
import useTypeBlogs from '../../hooks/useTypeBlogs'
import BlogWidget from './BlogWidget'

const Other = () => {

    const [blogs, setBlogs] = useState();
    const getBlogs = useTypeBlogs("7")

    useEffect(() => {
        if (!blogs) {
            const type_blogs = getBlogs();
            setBlogs(type_blogs);
        }
    }, [])

  return (
    <div>Other
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

export default Other