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

  const ejInstance = useRef();

  const [title, setTitle] = useState('');
  const [cover, setCover] = useState(''); 

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
      <div id="editorjs">

      </div>
      <button onClick={save}>
        Save
      </button>
    </>
  )
};

export default EditorComponent;