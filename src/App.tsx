import React, { useState } from 'react';
import {ReactComponent as Plus} from './assets/plus.svg'
import {ReactComponent as Image} from './assets/image.svg'
import {ReactComponent as Camera} from './assets/camera.svg'
import { convertToRaw,EditorState } from 'draft-js';
import { Editor  } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import Modal from './components/Modal'

import './app.css';
import EmbedImage from './components/EmbedImage';
import DropDownBtn from './components/DropdownBtn';
import EmbedSocial from './components/EmbedSocial';
import EmbedVideo from './components/EmbedVideo';



function App() {

  const [view,setView]=useState<string>('')
  const [editorState, setEditoState]=useState(EditorState.createEmpty())
  const toggleModal=(view:string)=>{
       setView(view)
  }
  return (
    <main className="app">
      <Modal open={view !== ''} toggleModal={toggleModal}>

        {view === 'embedImage' && <EmbedImage toggleModal={toggleModal}/>}      
        {view === 'embedVideo' && <EmbedVideo toggleModal={toggleModal}/>}
        {view === 'embedSocial' && <EmbedSocial toggleModal={toggleModal}/>}

      </Modal>
      <section className='page-wrapper'>

        <div className='container'>
          <div className='top-div'></div>
        
          <div className='_wysiwyg-div'>  
            <label className='input-wrapper'>
                <input type='text' className='topic-input input-text' placeholder='Add Post title' autoFocus/>
            </label>
           
            <div className='_editor-container'>
              <Editor   
                editorState={editorState}
                onEditorStateChange={editorState=>{
                  setEditoState(editorState);
                   const contentState = editorState.getCurrentContent();
            console.log(convertToRaw(contentState), 100, contentState);
            
                
                }
                  
                }
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                toolbarClassName="toolbar-class"
                // toolbar={{
                //   options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'link', 'embedded', 'emoji', 'image',],
                //    inline: {
                //     inDropdown: true,
                //     // className: undefined,
                //     // component: undefined,
                //     // dropdownClassName: undefined,
                //      options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace', 'superscript', 'subscript'],
                //     // bold: { icon: bold, className: undefined },
                //     // italic: { icon: italic, className: undefined },
                //     // underline: { icon: underline, className: undefined },
                //     // strikethrough: { icon: strikethrough, className: undefined },
                //     // monospace: { icon: monospace, className: undefined },
                //     // superscript: { icon: superscript, className: undefined },
                //     // subscript: { icon: subscript, className: undefined },
                //   },
                //    blockType: {
                //     inDropdown: true,
                //     options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote', 'Code'],
                //     className: undefined,
                //     component: undefined,
                //     dropdownClassName: undefined,
                //   },
                // }}
              />
               <span className='plus-container'><DropDownBtn toggleModal={toggleModal}/></span>
             </div>
          </div>
          <div className='count-div'>
            0/1000 words
          </div>
        </div>           
      </section>
    </main>
  );
}

export default App;
