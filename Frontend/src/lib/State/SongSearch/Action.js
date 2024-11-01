import axios from "axios";
import { FETCH_SONGS_ERROR, FETCH_SONGS_REQUEST, FETCH_SONGS_SUCCESS } from "./ActionTypes";
import { baseUrl } from "@/Config/Api";

export const getSongsFromQuery = (query) => async (dispatch) => {
  dispatch({
    type: FETCH_SONGS_REQUEST,
  });

  try {
    const response=await axios.get(`${baseUrl}/search/songs/${query}`);
    // console.log(response.data);
    dispatch({type:FETCH_SONGS_SUCCESS,payload:response.data});
    return response.data
  } catch (error) {
    console.log(error);
    dispatch({type:FETCH_SONGS_ERROR,payload:error.message});
  }
};

