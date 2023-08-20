import { useState, useEffect } from "react";
import axios from "../api/axios";

const useTypeBlogs = async (type) => {

    const [blogs, setBlogs] = useState();

    const getBlogs = async () => {
        try {
            const response = await axios.get('/blogsforusers');
            setBlogs(response.data)
        } catch (error) {
            console.error(error)
        }
        const blogs_of_type = blogs.filter(blog => blog.type === type);
        return blogs_of_type
    }

    return getBlogs;
}

export default useTypeBlogs