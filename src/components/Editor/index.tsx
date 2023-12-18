import { convertToRaw} from 'draft-js';

import { Editor, EditorState  } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

interface Props{
    editorState: EditorState,
    setEditorState: React.Dispatch<React.SetStateAction<EditorState>>
}

const DraftEditor:React.FC<Props> = (props) => {

    const {editorState, setEditorState} = props

  return (
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
  )
}

export default DraftEditor