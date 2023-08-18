import React from 'react'
import { useState, useEffect } from 'react'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import { useNavigate, useLocation } from 'react-router-dom'

const Blogs = () => {

    const [blogs, setBlogs] = useState();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let isMounted = true
        const controller = new AbortController()

        const getBlogs = async () => {
            try {   
                const response = await axiosPrivate.get("/blogs", {
                    signal: controller.signal
                })
                console.log(response.data)
                isMounted && setBlogs(response.data)
            } catch (err) {
                console.error(err)
                navigate('/login', { state: { from: location }, replace: true })
            }
        }

        getBlogs();

        return () => {
            isMounted = false;
        }

    }, [])

  return (
    <article>
        <h2>
            Blogs List
        </h2>
        { blogs?.length
            ? (
                <ul>
                    {blogs.map((blog, i) => <li key={i}>{blog.title}</li>)}
                </ul>
                
            ) : <p>No blogs to display</p>
        }
    </article>
  )
}

export default Blogs