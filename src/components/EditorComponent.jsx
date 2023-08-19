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


const DEFAULT_INITIAL_DATA = {
  "time": new Date().getTime(),
  "blocks": [
    {
      "type": "header",
      "data": {
        "text": "This is my awesome editor!",
        "level": 1
      }
    },
  ]
}

const EditorComponent = () => {

    const axiosPrivate = useAxiosPrivate()

  const ejInstance = useRef();
  const { blog_id } = useParams();

  const [title, setTitle] = useState('');
  const [cover, setCover] = useState('')

  const initEditor = () => {
    const editor = new EditorJS({
      holder: 'editorjs',
      onReady: () => {
        ejInstance.current = editor;
      },
      autofocus: true,
      data: DEFAULT_INITIAL_DATA,
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

  const save = async () => {
    if (ejInstance.current) {
      const content = await ejInstance.current.saver.save()
        try {
            const response = await axiosPrivate.patch('/blogs', {
                id: blog_id,
                content: content,
                title, 
                cover
            })
            console.log(response.data)
        } catch (err) {
            console.error(err)
        }

      console.log(content);
    }
  }

  const publish = async () => {
    if (ejInstance.current) {
      const content = await ejInstance.current.saver.save()
      if (!title || !cover) {
        alert("To publish, you need title and cover page");
        return
      }
        try {
            const response = await axiosPrivate.patch('/blogs', {
                id: blog_id,
                content: content,
                published: true,
                title: title,
                cover: cover,
            })
            console.log(response.data)
        } catch (err) {
            console.error(err)
        }

      console.log(content);
    }
  }

  useEffect(() => {
    if (ejInstance.current === null) {
      initEditor();
    }

    return () => {
      ejInstance?.current?.destroy();
      ejInstance.current = null;
    }
  }, [])

  
  return (
    <>
      <input 
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input 
        type="url"
        value={cover}
        onChange={(e) => setCover(e.target.value)}
      />
      
      <div id="editorjs">

      </div>
      <button onClick={save}>
        Save
      </button>
      <button onClick={publish}>
        Publish
      </button>
    </>
  )
};

export default EditorComponent;