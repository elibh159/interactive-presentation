import { Dispatch } from 'redux';
import { slidesSlice } from './slidesSlice';
import { getAxiosClient } from '../../../helper/api';
import { LOGIN_CODE } from '../../../constants';

export const { request, error, success, reset } = slidesSlice.actions;

export const getSlides = () => async (dispatch: Dispatch) => {
  try {
    dispatch(request());
    const axiosClient = getAxiosClient();
    const response = await axiosClient.get('slides/'+LOGIN_CODE);
    const payload = response.data.slides;
    dispatch(success(payload));
  } catch (e: any) {
    const errMsg =
      e.response && e.response.data.message
        ? e.response.data.message
        : e.message;
    const errStatus =
      e.response && e.response.data.message
        ? e.response.status
        : 500;
    return dispatch(error({ status: errStatus, message: errMsg }));
  }
};
