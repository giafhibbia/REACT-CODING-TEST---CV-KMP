const APIURL = 'https://pixabay.com/api';
const axios = require('axios');
const querystring = require('querystring');
const APIKEY = '16188183-3932bcd86a57e7257fdbeac23';
export const getPhotos = (page = 1) => axios.get(`${APIURL}/?key=${APIKEY}&page=${page}`);
export const searchPhotos = (data) => {
    data['key'] = APIKEY;
    return axios.get(`${APIURL}/?${querystring.encode(data)}`);
}
export const searchVideos = (data) => {
    data['key'] = APIKEY;
    return axios.get(`${APIURL}/videos/?${querystring.encode(data)}`);
}