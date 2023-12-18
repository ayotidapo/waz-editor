import React from "react";
import ReactDOM from "react-dom";
import {
  AtomicBlockUtils,
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw
} from "draft-js";
import "draft-js/dist/Draft.css";
// import { stateToMarkdown } from "draft-js-export-markdown";
// import { stateToHTML } from "draft-js-export-html";
import "./index.css";
import Editor from "draft-js-plugins-editor";
import createVideoPlugin from "draft-js-video-plugin";

const raw = {
  entityMap: {
    "0": {
      type: "draft-js-video-plugin-video",
      mutability: "IMMUTABLE",
      data: { src: "https://www.youtube.com/watch?v=7zSMoPflh28" }
    }
  },
  blocks: [
    {
      key: "26hcq",
      text: "This is something worth checking out!",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [
        { offset: 8, length: 9, style: "BOLD" },
        { offset: 33, length: 4, style: "UNDERLINE" }
      ],
      entityRanges: [],
      data: {}
    },
    {
      key: "crd2q",
      text: "",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {}
    },
    {
      key: "6jbi2",
      text: " ",
      type: "atomic",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [{ offset: 0, length: 1, key: 0 }],
      data: {}
    },
    {
      key: "7a65f",
      text: "",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {}
    },
    {
      key: "bnbal",
      text: "How about that?",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [{ offset: 4, length: 5, style: "ITALIC" }],
      entityRanges: [],
      data: {}
    }
  ]
};

const videoPlugin = createVideoPlugin();

const plugins = [videoPlugin];

class MediaEditorExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createWithContent(convertFromRaw(raw)),
      showURLInput: false,
      url: "",
      urlType: ""
    };
    this.focus = () => this.refs.editor.focus();
    // this.logState = () => {
    //   const content = this.state.editorState.getCurrentContent();
    //   console.log(content);
    //   console.log({ raw: convertToRaw(content) });
    //   console.log(JSON.stringify(convertToRaw(content)));
    //   // console.log(stateToMarkdown(content));
    //  // console.log(stateToHTML(content));
    // };
    this.onChange = editorState => this.setState({ editorState });
    this.onURLChange = e => this.setState({ urlValue: e.target.value });
    this.addAudio = this._addAudio.bind(this);
    this.addImage = this._addImage.bind(this);
    this.addVideo = this._addVideo.bind(this);
    this.confirmMedia = this._confirmMedia.bind(this);
    this.handleKeyCommand = this._handleKeyCommand.bind(this);
    this.onURLInputKeyDown = this._onURLInputKeyDown.bind(this);
  }
  _handleKeyCommand(command) {
    const { editorState } = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }
  _confirmMedia(e) {
    e.preventDefault();
    const { editorState, urlValue, urlType } = this.state;

    return this.onChange(videoPlugin.addVideo(editorState, { src: urlValue }));

    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      urlType,
      "IMMUTABLE",
      { src: urlValue }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity
    });
    this.setState(
      {
        editorState: AtomicBlockUtils.insertAtomicBlock(
          newEditorState,
          entityKey,
          " "
        ),
        showURLInput: false,
        urlValue: ""
      },
      () => {
        setTimeout(() => this.focus(), 0);
      }
    );
  }
  _onURLInputKeyDown(e) {
    if (e.which === 13) {
      this._confirmMedia(e);
    }
  }
  _promptForMedia(type) {
    const { editorState } = this.state;
    this.setState(
      {
        showURLInput: true,
        urlValue: "",
        urlType: type
      },
      () => {
        setTimeout(() => this.refs.url.focus(), 0);
      }
    );
  }
  _addAudio() {
    this._promptForMedia("audio");
  }
  _addImage() {
    this._promptForMedia("image");
  }
  _addVideo() {
    this._promptForMedia("video");
  }
  render() {
    let urlInput;
    if (this.state.showURLInput) {
      urlInput = (
        <div style={styles.urlInputContainer}>
          <input
            onChange={this.onURLChange}
            ref="url"
            style={styles.urlInput}
            type="text"
            value={this.state.urlValue}
            onKeyDown={this.onURLInputKeyDown}
          />
          <button onMouseDown={this.confirmMedia}>Confirm</button>
        </div>
      );
    }
    return (
      <div style={styles.root}>
        <div style={{ marginBottom: 10 }}>
          Use the buttons to add audio, image, or video.
        </div>
        <div style={{ marginBottom: 10 }}>
          Here are some local examples that can be entered as a URL:
          <ul>
            <li>media.mp3</li>
            <li>media.png</li>
            <li>media.mp4</li>
          </ul>
        </div>
        <div style={styles.buttons}>
          <button onMouseDown={this.addAudio} style={{ marginRight: 10 }}>
            Add Audio
          </button>
          <button onMouseDown={this.addImage} style={{ marginRight: 10 }}>
            Add Image
          </button>
          <button onMouseDown={this.addVideo} style={{ marginRight: 10 }}>
            Add Video
          </button>
        </div>
        {urlInput}
        <div style={styles.editor} onClick={this.focus}>
          <Editor
            plugins={plugins}
            editorState={this.state.editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange}
            ref="editor"
          />
        </div>
        <input
          onClick={this.logState}
          style={styles.button}
          type="button"
          value="Log State"
        />
      </div>
    );
  }
}
function mediaBlockRenderer(block) {
  if (block.getType() === "atomic") {
    return {
      component: Media,
      editable: false
    };
  }
  return null;
}
const Audio = props => {
  return <audio controls src={props.src} style={styles.media} />;
};
const Image = props => {
  return <img src={props.src} style={styles.media} />;
};
const Video = props => {
  return <video controls src={props.src} style={styles.media} />;
};
const Media = props => {
  const entity = props.contentState.getEntity(props.block.getEntityAt(0));
  const { src } = entity.getData();
  const type = entity.getType();
  let media;
  if (type === "audio") {
    media = <Audio src={src} />;
  } else if (type === "image") {
    media = <Image src={src} />;
  } else if (type === "video") {
    media = <Video src={src} />;
  }
  return media;
};
const styles = {
  root: {
    fontFamily: "'Georgia', serif",
    padding: 20,
    width: 600
  },
  buttons: {
    marginBottom: 10
  },
  urlInputContainer: {
    marginBottom: 10
  },
  urlInput: {
    fontFamily: "'Georgia', serif",
    marginRight: 10,
    padding: 3
  },
  editor: {
    border: "1px solid #ccc",
    cursor: "text",
    minHeight: 80,
    padding: 10
  },
  button: {
    marginTop: 10,
    textAlign: "center"
  },
  media: {
    width: "100%"
  }
};
ReactDOM.render(<MediaEditorExample />, document.getElementById("root"));
