import React, { useRef, useEffect, useState } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Table from '@editorjs/table';
import Embed from '@editorjs/embed';
import SimpleImage from '@editorjs/simple-image';
import List from '@editorjs/list';
import Quote from "@editorjs/quote"
import Checklist from '@editorjs/checklist';
import Delimiter from '@editorjs/delimiter';
import CodeTool from '@editorjs/code';
import Marker from '@editorjs/marker';
import InlineCode from '@editorjs/inline-code';
import { useParams } from 'react-router-dom';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useNavigate } from 'react-router-dom';

const BlogPost = () => {
    const axiosPrivate = useAxiosPrivate()
    const [initialData, setInitialData] = useState();
    const ejInstance = useRef();
    const { blog_id } = useParams();

    const navigate = useNavigate();

    const [title, setTitle] = useState('');
  const [cover, setCover] = useState('')
  const [type, setType] = useState('');

  const [publishedORNot, setPublishedOrNot] = useState();
  
    const initEditor = () => {
      const editor = new EditorJS({
        holder: 'editorjs',
        onReady: () => {
          ejInstance.current = editor;
        },
        autofocus: true,
        data: initialData,
        tools: {
          header: {
            class: Header,
            inlineToolbar: true
          },
          table: {
            class: Table,
            inlineToolbar: true
          },
          embed: {
            class: Embed,
            inlineToolbar: true,
          },
          image: {
            class: SimpleImage,
            inlineToolbar: true
          },
          list: {
            class: List,
            inlineToolbar: true
          },
          quote: {
            class: Quote,
            inlineToolbar: true,
          },
          checklist: {
            class: Checklist,
            inlineToolbar: true,
          },
          delimiter: {
            class: Delimiter,
            inlineToolbar: true,
          },
          codetool: {
            class: CodeTool,
            inlineToolbar: true,
          },
          marker: {
            class: Marker,
            inlineToolbar: true,
          },
          inlinecode: {
            class: InlineCode,
            inlineToolbar: true,
          },
        }
      })
    }

    const getInitialData = async () => {
        try {
            const response = await axiosPrivate.get(`/blogs/${blog_id}`);
            console.log(response.data)
            
            setTitle(response.data.title)
            setCover(response.data.cover)
            setPublishedOrNot(response.data.published)
            setType(response.data.type)
            setInitialData(response.data.content)
        } catch (err) {
            console.error(err)
        }
    }

    function isImage(url) {
        return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
      }
  
    const save = async () => {
        if (ejInstance.current) {
          const content = await ejInstance.current.saver.save()
          if (!title || !cover || !isImage(cover)) {
            alert("To save published post, you need title and cover page");
            return
          }
            try {
                const response = await axiosPrivate.patch('/blogs', {
                    id: blog_id,
                    content: content,
                    title,
                    cover,
                    published: publishedORNot,
                    type,
                })
                console.log(response.data)
                alert('Blog Post Saved')
            } catch (err) {
                console.error(err)
            }
    
          console.log(content);
        }
      }

    const unpublish = async () => {
        if (ejInstance.current) {
            const content = await ejInstance.current.saver.save()
            if (!title || !cover || !isImage(cover || !type)) {
              alert("To unpublish, you need title, cover page and blog type");
              return
            }
              try {
                  const response = await axiosPrivate.patch('/blogs', {
                      id: blog_id,
                      content: content,
                      published: false,
                      title: title,
                      cover: cover,
                      type,
                  })
                  console.log(response.data)
                  navigate('/admin')
              } catch (err) {
                  console.error(err)
              }
      
            console.log(content);
          }
    }

    const deleteBlog = async () => {
        if (ejInstance.current) {
            try {
                const response = await axiosPrivate.delete(`/blogs/${blog_id}`, {
                    id: blog_id,
                })
                console.log(response.data)
                navigate('/admin');
            } catch (err) {
                console.error(err)
            }
        }
      }
  
    useEffect(() => {
      if (ejInstance.current === null) {
        getInitialData();
        
      }
  
      return () => {
        ejInstance?.current?.destroy();
        ejInstance.current = null;
      }
    }, [])

    useEffect(() => {
        if (initialData) {
            initEditor();
        }
    }, [initialData])
  
    
    return (
      <main className="blog-post-editor">
        <label htmlFor="title">Title: </label>
      <input 
        type="text"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label htmlFor="cover">Cover Image: </label>
      <input 
        type="url"
        id="cover"
        value={cover}
        onChange={(e) => setCover(e.target.value)}
      />
      { cover && <img className="cover-image" src={cover}/> }

      <label htmlFor='type-select'>Type of Blog: </label>
      <select id="type-select" value={type || ''} onChange={(e) => setType(e.target.value)}>
      <option value="">Select blog type</option>
        <option value="1">Programming</option>
        <option value="2">Basketball and Training</option>
        <option value="3">Books</option>
        <option value="4">Health and Science</option>
        <option value="5">Movies</option>
        <option value="6">Art and Drawing</option>
        <option value="7">Other</option>
      </select>

        <div id="editorjs">
  
        </div>
        <div className="blog-post-buttons">
            <button onClick={save}>
            Save
            </button>
            <button onClick={unpublish}>
            UnPublish
            </button>
            <button onClick={deleteBlog}>
            Delete
        </button>
        </div>
      </main>
    )
}

export default BlogPost