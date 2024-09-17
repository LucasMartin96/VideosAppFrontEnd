import axios from './axios';

export const getVideos = () => axios.get('/videos/');
export const getVideo = (id) => axios.get(`/videos/${id}`);
export const deleteVideo = (id) => axios.delete(`/videos/${id}`);
export const updateVideo = (id, video) => axios.put(`/videos/${id}`, video);
export const addVideo = (video) => axios.post(`/videos`, video);
