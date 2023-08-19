import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const BlogWidget = ({ blog }) => {
  const [title, setTitle] = useState('');
  const [cover, setCover] = useState('');

  const navigate = useNavigate();

  function isImage(url) {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
  }

  useEffect(() => {
    if (blog.title) {
      setTitle(blog.title)
    }
    if (blog.cover && isImage(blog.cover)) {
      setCover(blog.cover)
    }
  }, [])
  return (
    <div className="blog-post-widget" onClick={() => navigate(`/blog/${blog._id}`)}>
      { cover && <img src={cover}/> }
      <h4>{title}</h4>
    </div>
  )
}

export default BlogWidget