import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import TYPES from '../../config/TYPES';

const BlogWidget = ({ blog }) => {
  const [title, setTitle] = useState('');
  const [cover, setCover] = useState('');
  const [type, setType] = useState('');

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
    if (blog.type) {
      setType(blog.type)
    }
  }, [])
  return (
    <Link className="blog-post-widget" to={`/blog/${blog._id}`}>
      { cover && <img src={cover}/> }
      <div>
        <h4>{title}</h4>
        <p>{TYPES[type]}</p>
      </div>
      
    </Link>
  )
}

export default BlogWidget