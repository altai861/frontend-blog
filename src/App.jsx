import './App.css'
import { Routes, Route } from "react-router-dom"
import Layout from './components/Layout'
import Home from './components/Home'
import Login from './components/Login'
import Admin from "./components/Admin"
import RequireAuth from './components/RequireAuth'
import Missing from './components/Missing'
import PersistLogin from './components/PersistLogin'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route exact path="/" element={<Home />} />

        <Route path="login" element={<Login />} />

        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[1984]}/>}>
            <Route path="admin" element={<Admin />} />
          </Route>
        </Route>
        


        {/** 404 routes */}
        <Route path="*" element={<Missing />}/>
        
      </Route>
    </Routes>
  )
}

export default App
