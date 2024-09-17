import { createSlice } from '@reduxjs/toolkit';
import api from '../api/axios';

const videoSlice = createSlice({
  name: 'videos',
  initialState: {
    list: [],
    selectedVideo: null
  },
  reducers: {
    setVideos(state, action) {
      state.list = action.payload;
    },
    setSelectedVideo(state, action) {
      state.selectedVideo = action.payload;
    }
  }
});

export const { setVideos, setSelectedVideo } = videoSlice.actions;

export const fetchVideos = () => async (dispatch) => {
  try {
    const response = await api.get('/videos/');
    dispatch(setVideos(response.data));
  } catch (error) {
    console.error('Error fetching videos:', error);
  }
};

export const createVideo = (video) => async () => {
  try {
    await api.post('/videos/', video);
  } catch (error) {
    console.error('Error creating video:', error);
  }
};

export const updateVideo = (videoId, video) => async () => {
  try {
    await api.put(`/videos/${videoId}`, video);
  } catch (error) {
    console.error('Error updating video:', error);
  }
};

export const deleteVideo = (videoId) => async () => {
  try {
    await api.delete(`/videos/${videoId}`);
  } catch (error) {
    console.error('Error deleting video:', error);
  }
};

export default videoSlice.reducer;
