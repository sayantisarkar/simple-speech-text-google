import React, { Component } from 'react'
import './App.css';
import { ReactMic }  from 'react-mic'
import SpeechTranscribeService from './SpeechTranscribeService.js'
import CloudDownloadIcon    from '@material-ui/icons/CloudDownload'


class App extends Component {


    constructor(props) {
      super(props);
      this.state = {
        downloadLinkURL: null,
        //blobURL: null,
        isRecording: false
      }
    }

    startRecording = () => {
      this.setState({ isRecording: true });
    }

    stopRecording = () => {
      this.setState({ isRecording: false });
    }

    onSave= (blobObject) => {
      console.log("I m here");
      this.setState({ downloadLinkURL: blobObject.blobURL })
      //SpeechTranscribeService.getSearchTranscription(blobObject);
      //this.setState({ downloadLinkURL: blobObject.blobURL })
    }

    onData(recordedBlob) {
      console.log('chunk of real-time data is: ', recordedBlob);
    }

    onStop(blobObject) {
      console.log('recordedBlob is: ', blobObject);
      //this.setState({ blobURL: blobObject.blobURL });
      SpeechTranscribeService.getSearchTranscription(blobObject);
    }

  render() {
      const {
        isRecording,
      //  blobURL,
        downloadLinkURL
     } = this.state

  return (
    <div>
     <ReactMic
       //record={this.state.record}
       className="sound-wave"
       record={isRecording}
       onStop={this.onStop}
       onSave={this.onSave}
       onData={this.onData}
       visualSetting="sinewave"
       strokeColor="#000000"
       backgroundColor="#FF4081" />
     <button onClick={this.startRecording} type="button">Start</button>
     <button onClick={this.stopRecording} type="button">Stop</button>

     <div className="column download">
       <a
         href={downloadLinkURL}
         download="recording.webm"
       >
         <CloudDownloadIcon />
       </a>
     </div>
   </div>
  )
 }
}
export default App
