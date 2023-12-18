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
  const [title, setTitle]=useState<string>('')
  

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
        const newEditorState=insertEmbed(response?.data?.url,'image');
        setEditorState(newEditorState)
        setLoading(false)
      }catch{
        setLoading(false)
      }   
  }
 
  const insertEmbed = (url:any,type:string) => {
    const contentState = editorState.getCurrentContent();
    let contentStateWithEntity;
    console.log(url,type)
    if(type==='image'){
        contentStateWithEntity = contentState.createEntity(
        'IMAGE', 
        'IMMUTABLE',
        { src: url,height:'250px',width:'100%' },
      );
    }else if(type==='video'){
      contentStateWithEntity = contentState.createEntity(
      'youtube', 
      'MUTABLE',
      { src: url,height:'250px',width:'100%' },
    );
    }
     contentStateWithEntity = contentState.createEntity(
      'IMAGE', 
      'IMMUTABLE',
      { src: url,height:'250px',width:'100%' },
    );

    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(
      editorState,
      { currentContent: contentStateWithEntity },
    );

    return AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' ');
  };


  const embedVideo=(urlType:string = 'video',urlValue:string='https://www.youtube.com/watch?v=uJnf0mKswVA')=>{
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      "EMBEDDED_LINK",
      "IMMUTABLE",
      { src: urlValue }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity
    });
    setEditorState(
       AtomicBlockUtils.insertAtomicBlock(
          newEditorState,
          entityKey,
          " "
        ),      
    );
  }

  const isStateEmpty = () => {
    const contentState = editorState.getCurrentContent();
    const text = contentState.getPlainText().trim(); 
    return text === '';
  };

  return (
    <main className="app">
      <Modal open={view !== ''} toggleModal={toggleModal}>
       {loading && <span className='mock_loader'>embeding...</span>}
        {view === 'embedImage' && <EmbedImage toggleModal={toggleModal} previewImgFn={previewImgFn}  embedImage={uploadImage} previewImg={previewImg}/> }    
        {view === 'embedVideo' && <EmbedVideo toggleModal={toggleModal} insertEmbed={embedVideo}/>}
        {view === 'embedSocial' && <EmbedSocial toggleModal={toggleModal}/>}

      </Modal>
      <section className='page-wrapper'>

        <div className='container'>
          <div className='top-div'></div>
        
          <div className='_wysiwyg-div'>  
            <label className='input-wrapper'>
              <input type='text' className='topic-input input-text' 
                onChange={(e)=>setTitle(e.target.value)} 
                value={title}
                placeholder='Add Post title' autoFocus
              />
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
                  options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'link', 'embedded'],
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

              {!isStateEmpty() && 
                <div className='plus-wrapper'>
                  <span className='plus-container'>
                    <DropDownBtn toggleModal={toggleModal}/>
                  </span>
                </div>
              }                             
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




