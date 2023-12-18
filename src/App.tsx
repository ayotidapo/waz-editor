import axios from 'axios'
import React, { useState } from 'react';
import { convertToRaw,EditorState,AtomicBlockUtils} from 'draft-js';
import { Editor  } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Modal from './components/Modal'
import EmbedImage from './components/EmbedImage';
import DropDownBtn from './components/DropdownBtn';
import EmbedSocial from './components/EmbedSocial';
import EmbedVideo from './components/EmbedVideo';
import './app.css';


const App:React.FC = () => {
  const [view,setView]=useState<string>('')
  const [file,setFile]=useState<File| null>(null)
  const [previewImg,setPreviewImg]=useState<string | ArrayBuffer | null | undefined>('')
  const [editorState, setEditorState]=useState(EditorState.createEmpty())
  const [loading,setLoading]=useState<boolean>(false)

  const toggleModal=(view:string)=>{
    setView(view)
  }

  async function previewImgFn(file:any) {
     const reader = new FileReader();   
     reader.readAsDataURL(file);
     reader.onload = (readerEvent) => {
      setPreviewImg(readerEvent.target?.result);
    };    
    setFile(file)   
  }

  const uploadImage =async ()=>{
    try{
        setLoading(true)
        const data = new FormData(); // eslint-disable-line no-undef
        data.append("file", file as Blob);
        data.append('upload_preset', 'iikmkha3');

        const response = await axios.post(`https://api.cloudinary.com/v1_1/oladapo/upload`, data);
        setView('');
        setPreviewImg('')
        console.log({response})
        const newEditorState=insertImage(editorState,response?.data?.url);
        setEditorState(newEditorState)
        setLoading(false)
      }catch{
        setLoading(false)
      }   
  }

  const insertImage = (editorState:any,url:any) => {
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      'IMAGE',
      'IMMUTABLE',
      { src: url,height:'200px',width:'200px' },
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(
      editorState,
      { currentContent: contentStateWithEntity },
    );

    return AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' ');
  };

  return (
    <main className="app">
      <Modal open={view !== ''} toggleModal={toggleModal}>
       {loading && <span className='mock_loader'>embeding...</span>}
        {view === 'embedImage' && <EmbedImage toggleModal={toggleModal} previewImgFn={previewImgFn}  embedImage={uploadImage} previewImg={previewImg}/> }    
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
                onEditorStateChange={editorState => {
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




