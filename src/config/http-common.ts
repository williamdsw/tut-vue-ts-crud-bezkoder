
import Axios from 'axios';

export default Axios.create({
    baseURL: 'https://tut-nodejs-bezkoder.herokuapp.com/api',
    headers: {
        'Content-type': 'application/json'
    },
});
