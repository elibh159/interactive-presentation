import { Dispatch } from "redux";
import { slideCreateSlice } from "./slideCreateSlice";
import { getAxiosClient } from "../../../helper/api";
import { SlideCreateInput } from "../../../Interfaces/slideInterface";
import { LOGIN_CODE } from '../../../constants';

export const { request, error, success, reset } = slideCreateSlice.actions;
export const createSlide =
  (values: SlideCreateInput) => async (dispatch: Dispatch) => {
    try {
      dispatch(request());
      const axiosClient = getAxiosClient();
      
      const response = await axiosClient.post('slides/'+LOGIN_CODE, values);
      const data = response.data.data;
      dispatch(success(data));
    } catch (e: any) {
      const errMsg =
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message;
      const errStatus =
        e.response && e.response.data.message ? e.response.status : 500;
      return dispatch(error({ status: errStatus, message: errMsg }));
    }
  };
