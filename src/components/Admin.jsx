import React from 'react'
import Users from './Users'
import useLogout from '../hooks/useLogout'

const Admin = () => {

  const logout = useLogout();

  return (
    <div>
      <h2>Admin</h2>
      <Users />
      <button onClick={() => logout()}>Log out</button>
    </div>
  )
}

export default Admin