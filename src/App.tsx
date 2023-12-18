import React, { useState } from 'react';
// import {ReactComponent as Plus} from './assets/plus.svg'
// import {ReactComponent as Image} from './assets/image.svg'
// import {ReactComponent as Camera} from './assets/camera.svg'
import { convertToRaw,EditorState,AtomicBlockUtils, ContentBlock, ContentState, } from 'draft-js';
import { Editor  } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import Modal from './components/Modal'

import './app.css';
import EmbedImage from './components/EmbedImage';
import DropDownBtn from './components/DropdownBtn';
import EmbedSocial from './components/EmbedSocial';
import EmbedVideo from './components/EmbedVideo';
import axios from 'axios'



function App() {

  const [view,setView]=useState<string>('')
  const [editorState, setEditorState]=useState(EditorState.createEmpty())
  const toggleModal=(view:string)=>{
       setView(view)
  }


  async function uploadImageCallBack(file:any) {
    const data = new FormData(); // eslint-disable-line no-undef
    data.append("file", file);
    data.append('upload_preset', 'iikmkha3');
    const response = await axios.post(`https://api.cloudinary.com/v1_1/oladapo/upload`, data);
    console.log({response})
    const newEditorState=insertImage(editorState,response?.data?.url);
    setEditorState(newEditorState)
          // const contentState = newEditorState.getCurrentContent();
          //   console.log(convertToRaw(contentState), 'updated', contentState);
   // return response
  }

const insertImage = (editorState:any,url:any) => {
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      'IMAGE',
      'IMMUTABLE',
      { src: url,height:'20px',width:'20px' },
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(
      editorState,
      { currentContent: contentStateWithEntity },
    );

    //  const newEditorState = EditorState.push(
    //   editorState,
    //   contentStateWithEntity,
    //   'insert-fragment'
    // );


    return AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' ');
  };


// const insertImage = (editorState:any, imageUrl:any) => {
//   const contentState = editorState.getCurrentContent();

//   // Create a new entity for the image
//   const contentStateWithEntity = contentState.createEntity(
//     'IMAGE',
//     'IMMUTABLE',
//     { src: imageUrl, height: '20px', width: '20px' }
//   );

//   const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

//   // Create a new ContentBlock for the image
//   const newBlock = contentState.createBlock('atomic', contentStateWithEntity.getLastCreatedEntityKey(), undefined, undefined, undefined, undefined, { src: imageUrl, height: '20px', width: '20px' });

//   // Append the new block to the existing block map
//   const newBlockMap = contentState.getBlockMap().concat([[newBlock.getKey(), newBlock]]);
//   const newContentState = ContentState.createFromBlockArray(newBlockMap.toArray());

//   // Create a new EditorState with the updated ContentState
//   const newEditorState = EditorState.createWithContent(newContentState);

//   return newEditorState;
// };

//  const insertImage = (editorState:any, imageUrl:any) => {
//     const contentState = editorState.getCurrentContent();
//     const contentStateWithEntity = contentState.createEntity(
//       'IMAGE',
//       'IMMUTABLE',
//       { src: imageUrl, height: '20px', width: '20px' },
//     );
//     const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

    
//     const newEditorState = AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, ' ');

//     return EditorState.forceSelection(
//       newEditorState,
//       newEditorState.getCurrentContent().getSelectionAfter()
//     );
//   };
  
  return (
    <main className="app">
      <Modal open={view !== ''} toggleModal={toggleModal}>

        {view === 'embedImage' && <EmbedImage toggleModal={toggleModal} uploadImageFn={uploadImageCallBack}/>}      
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
                  setEditorState(editorState);
                   const contentState = editorState.getCurrentContent();
            console.log(convertToRaw(contentState), 100, contentState);
            
                
                }
                  
                }
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                toolbarClassName="toolbar-class"
                toolbar={{
                  options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'link', 'embedded', 'image',],
                   inline: {
                    inDropdown: true,           
                     options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace', 'superscript', 'subscript'],                
                  },
                   blockType: {
                    inDropdown: true,
                    options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote', 'Code','indent','outdent'],
                    className: undefined,
                    component: undefined,
                    dropdownClassName: undefined,
                  },
                  // image: {
                  //   urlEnabled: false,
                  //   uploadEnabled: true,
                  //   uploadCallback: uploadImageCallBack,
                  //   previewImage: true,
                  //   alt: { present: true, mandatory: false },
                  // }
                }}
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




