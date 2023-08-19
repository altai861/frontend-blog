import React from 'react'
import { useState, useEffect } from 'react'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import { useNavigate, useLocation } from 'react-router-dom'
import BlogWidgetDraft from './BlogWidgetDraft'
import BlogWidgetPost from './BlogWidgetPost'

const Blogs = () => {

    const [blogs, setBlogs] = useState();
    const [drafts, setDrafts] = useState();
    const [publishedBlogs, setPublishedBlogs] = useState();
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

    useEffect(() => {
        if (blogs?.length) {
            setDrafts(blogs.filter(item => !item.published))
            setPublishedBlogs(blogs.filter(item => item.published))
        }
    }, [blogs])

  return (
    <article>
        <h2>
            Blogs List
        </h2>
        <h3>Drafts</h3>

        { drafts?.length
            ? (
                <ul>
                    {drafts.map((blog, i) => <BlogWidgetDraft key={i} blog={blog}/>)}
                </ul>
                
            ) : <p>No Drafts to display</p>
        }
        <h3>Published Posts</h3>

        { publishedBlogs?.length
            ? (
                <ul>
                    {publishedBlogs.map((blog, i) => <BlogWidgetPost key={i} blog={blog}/>)}
                </ul>
                
            ) : <p>No Blog post to display</p>
        }
    </article>
  )
}

export default Blogs