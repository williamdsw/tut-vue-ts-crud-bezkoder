
import Axios from 'axios';

export default Axios.create({
    baseURL: 'http://localhost:8081/api',
    headers: {
        'Content-type': 'application/json'
    }
});
