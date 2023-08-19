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
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';

const BlogPost = () => {
    
    const [initialData, setInitialData] = useState();
    const ejInstance = useRef();
    const { blog_id } = useParams();

    const [title, setTitle] = useState();
    const [cover, setCover] = useState();
    const navigate = useNavigate();
  
    const initEditor = () => {
      const editor = new EditorJS({
        holder: 'editorjs',
        onReady: () => {
          ejInstance.current = editor;
        },
        readOnly: true,
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
            const response = await axios.get(`/blogsforusers/${blog_id}`);
            console.log(response.data)
            setTitle(response.data.title)
            setCover(response.data.cover)
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
                    published: publishedORNot
                })
                console.log(response.data)
            } catch (err) {
                console.error(err)
            }
    
          console.log(content);
        }
      }

    const unpublish = async () => {
        if (ejInstance.current) {
            const content = await ejInstance.current.saver.save()
            if (!title || !cover || !isImage(cover)) {
              alert("To unpublish, you need title and cover page");
              return
            }
              try {
                  const response = await axiosPrivate.patch('/blogs', {
                      id: blog_id,
                      content: content,
                      published: false,
                      title: title,
                      cover: cover,
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
      <div className="blog-post-editor">
       <h2>{title}</h2>
       <img src={cover}/>
        <div id="editorjs">
  
        </div>
      </div>
    )
}

export default BlogPost