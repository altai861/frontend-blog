import React from 'react'
import { useState, useEffect } from 'react'
import axios from "../../api/axios"
import BlogWidget from "./BlogWidget"

const BlogsForUsers = () => {

    const [blogs, setBlogs] = useState();

    const getBlogs = async () => {
        try {
            const response = await axios.get('/blogsforusers');
            console.log(response.data)
            setBlogs(response.data);
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        if (!blogs) {
            getBlogs();
        }
    }, [])

  return (
    <div>
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

export default BlogsForUsers