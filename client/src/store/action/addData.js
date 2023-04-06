import { Baseurl } from "../../BaseUrl";
import axios from "axios";

export function TeamAdd(data) {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${Baseurl}/admin/team/insert`, data);
      var return_response = {
        type: "TEAM_ADD",
        payload: response,
      };
      dispatch(return_response);
    } catch (error) {
      var return_response = {
        type: "TEAM_ADD",
        payload: error,
      };
      dispatch(return_response);
    }
  };
}

export function AddTeamMember(data) {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${Baseurl}/admin/member/insert`,
        data,
        {
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      );
      var return_response = {
        type: "ADD_MEMBER",
        payload: response,
      };
      dispatch(return_response);
    } catch (error) {
      var return_response = {
        type: "ADD_MEMBER",
        payload: error,
      };
      dispatch(return_response);
    }
  };
}

// add flag

export function AddFlag(id, data) {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${Baseurl}/admin/member/insert/countryflag/${id}`,
        { image: data },
        {
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      );

      var return_response = {
        type: "ADD_FLAG",
        payload: response,
      };
      dispatch(return_response);
    } catch (error) {

      var return_response = {
        type: "ADD_FLAG",
        payload: error,
      };
      dispatch(return_response);
    }
  };
}


