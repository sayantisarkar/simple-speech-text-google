import axios from 'axios'

const TRANSCRIBE_REST_API_URL = 'http://localhost:8080/speech/transcribe';
const SEARCH_REST_API_URL = 'http://localhost:8080/speech/search';


class SpeechTranscribeService {



    getTranscription(){
        return axios.get(TRANSCRIBE_REST_API_URL);
    }
    getSearchTranscription(searchRecord){


        var audioFile = new File([searchRecord.blob], "myaudio.webm", {type: searchRecord.options.mimeType});
        const formData = new FormData();
        formData.append('sourceFile', audioFile);
        
        // return axios.post(SEARCH_REST_API_URL,formData);


        axios({
          method : 'post',
          url : SEARCH_REST_API_URL,
          data : formData,
          headers : {
                'Content-Type': 'multipart/form-data'
          }
        }).then((res)=>{
          console.log("Your search transcript is",res);
        }).catch((err) => {
          throw err});
     }
}
export default new SpeechTranscribeService();
