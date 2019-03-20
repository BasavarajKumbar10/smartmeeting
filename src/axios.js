import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://smart-meeting.herokuapp.com'
});

instance.defaults.headers.common['token'] = 'erewrewr435fdfe';


export default instance;