import './App.css'
import { Routes, Route } from "react-router-dom"
import Layout from './components/Layout'
import Home from './components/Home'
import Login from './components/Login'
import Admin from "./components/Admin"
import RequireAuth from './components/RequireAuth'
import Missing from './components/Missing'
import PersistLogin from './components/PersistLogin'
import Draft from './components/Draft'
import BlogPost from './components/BlogPost'
import BlogPostRead from './components/ForUsers/BlogPostRead'
import EditorComponent from './components/EditorComponent'
import Programming from './components/ForUsers/Programming'
import Training from './components/ForUsers/Training'
import Books from './components/ForUsers/Books'
import Health from './components/ForUsers/Health'
import Movies from './components/ForUsers/Movies'
import Art from './components/ForUsers/Art'
import Other from './components/ForUsers/Other'
import { BrowserRouter } from 'react-router-dom'


function App() {

  return (
    <BrowserRouter>
    
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route exact path="/" element={<Home />} />
        <Route path="programming" element={<Programming />} />
        <Route path="training" element={<Training />} />
        <Route path="books" element={<Books />} />
        <Route path="health" element={<Health />} />
        <Route path="movies" element={<Movies />} />
        <Route path="art" element={<Art />} />
        <Route path="other" element={<Other />} />

        <Route path="login" element={<Login />} />

        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[1984]}/>}>
            <Route path="admin" element={<Admin />} />
            <Route path="new-blog-post/:blog_id" element={<EditorComponent />}/>
            <Route path="draft/:blog_id" element={<Draft />} />
            <Route path="blog-post/:blog_id" element={<BlogPost />} />
          </Route>
        </Route>

        <Route path="blog/:blog_id" element={<BlogPostRead />}/>
      

        {/** 404 routes */}
        <Route path="*" element={<Missing />}/>
        
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
