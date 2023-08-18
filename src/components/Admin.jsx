import React from 'react'
import Users from './Users'
import useLogout from '../hooks/useLogout'
import Blogs from './Blogs'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'
import useAxiosPrivate from '../hooks/useAxiosPrivate'

const Admin = () => {

  const navigate = useNavigate();
  const logout = useLogout();
  const axiosPrivate = useAxiosPrivate();

  const newBlogPost = async () => {
    try {
      const response = await axiosPrivate.post('/blogs');
      console.log(response.data);
      const blog_id = response.data?.blog_id;
      navigate(`/new-blog-post/${blog_id}`);
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <main>
      <h2>Admin</h2>
      <button className='add-blog-button' onClick={() => newBlogPost()}>
            <FontAwesomeIcon icon={faPlus} />
      </button>
      <Blogs />
      <button onClick={() => logout()}>Log out</button>
    </main>
  )
}

export default Admin