import React, { useState } from 'react';

// import { Editor } from "react-draft-wysiwyg";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";


import Modal from './components/Modal'
import Button from './components/Button'
import './app.css';
import EmbedImage from './components/EmbedImage';

function App() {

  const [view,setView]=useState<string>('')
  return (
    <main className="app">
      <Modal open onClose={()=>null}>

        <EmbedImage/>
      </Modal>
      <section className='page-wrapper'>
        <div className='container'>
          <div className='top-div'></div>
        
          <div className='_wysiwyg-div'>  
            <label className='input-wrapper'>
                <input type='text' className='input input-text'/>
                <span className='input-text hide'>Add post title</span>
            </label>
           
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
