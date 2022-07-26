import { Dispatch } from "redux";
import { slideUpdateSlice } from "./slideUpdateSlice";
import { getAxiosClient } from "../../../helper/api";
import { Slide } from "../../../Interfaces/slideInterface";

export const { request, error, success, reset } = slideUpdateSlice.actions;

export const updateSlide =
  (slideId: string) => async (dispatch: Dispatch) => {
    try {
      dispatch(request());
      const axiosClient = getAxiosClient();
      const response = await axiosClient.put(`slides/${slideId}`);
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
