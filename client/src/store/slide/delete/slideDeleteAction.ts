import { Dispatch } from "redux";
import { slideDeleteSlice } from "./slideDeleteSlice";
import { getAxiosClient } from "../../../helper/api";

export const { request, error, success, reset } = slideDeleteSlice.actions;

export const deleteSlide =
  (slideId: string) => async (dispatch: Dispatch) => {
    try {
      dispatch(request());
      const axiosClient = getAxiosClient();
      const response = await axiosClient.delete(`slides/${slideId}`);
      const payload = response.data;
      dispatch(success(payload));
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
