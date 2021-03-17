import axios from 'axios'
import { Component } from 'react'


const TRANSCRIBE_REST_API_URL = 'http://localhost:8080/speech/transcribe';
const SEARCH_REST_API_URL = 'http://localhost:8080/speech/search';


class SpeechTranscribeService extends Component{


  constructor(){
     super();
     this.result = '';
  }

    // componentDidMount(searchRecord){
    //   this.getSearchTranscription(searchRecord);
    // }

    getTranscription(){
        return axios.get(TRANSCRIBE_REST_API_URL);
    }
    getSearchTranscription(searchRecord){
        // return axios.post(SEARCH_REST_API_URL,formData);

          var audioFile = new File([searchRecord.blob], "myaudio.webm", {type: searchRecord.options.mimeType});
          const formData = new FormData();
          formData.append('sourceFile', audioFile);
          axios({
            method : 'post',
            url : SEARCH_REST_API_URL,
            data : formData,
            headers : {
                  'Content-Type': 'multipart/form-data'
            }
          }).then((res)=>{
            console.log(res);
            this.result = res.data;
            // this.setState({
            //   transcripts: res.data
            // });
          }).catch((err) => {
            throw err});
    }

    render() {
        return (
          <ul>
            <li>{this.result}</li>
          </ul>
        )
      }
}

export default new SpeechTranscribeService();
