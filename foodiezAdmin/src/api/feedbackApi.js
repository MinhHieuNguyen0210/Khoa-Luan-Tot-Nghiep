import axiosClient from './axiosClient';

const feedbackApi = {
  getAllFeedback(token) {
    const url = 'https://foody-store-server.herokuapp.com/feedbacks';
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  },
  deleteFeedbackById(token, id) {
    const url = `https://foody-store-server.herokuapp.com/feedbacks/${id}`;
    return axiosClient.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
};
export default feedbackApi;
