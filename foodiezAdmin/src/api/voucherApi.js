import axiosClient from './axiosClient';

const voucherApi = {
  getAllVoucher(token) {
    const url = '/vouchers';
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  },
  createVoucher(data, token) {
    const url = '/vouchers';
    return axiosClient.post(url, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  },
  delete(id, token) {
    const url = `/vouchers/${id}`;
    return axiosClient.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  },
  notify(data, token) {
    const url = '/vouchers/notify';
    return axiosClient.post(url, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
};
export default voucherApi;
