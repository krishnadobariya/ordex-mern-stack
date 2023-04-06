import { Baseurl } from "../../BaseUrl";
import axios from "axios";

//course list by teacher uni code

export function GetAllTeam() {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${Baseurl}/admin/team/viewall`);
      var return_response = {
        type: "GET_TEAM",
        payload: response,
      };
      dispatch(return_response);
    } catch (error) {

      var return_response = {
        type: "GET_TEAM",
        payload: error,
      };
      dispatch(return_response);
    }
  };
}

//get team by id
export function GetTeamById(id) {
    return async (dispatch) => {
      try {
        const response = await axios.get(`${Baseurl}/admin/team/view/${id}`);
        var return_response = {
          type: "GET_TEAM_BY_ID",
          payload: response,
        };
        dispatch(return_response);
      } catch (error) {
  
        var return_response = {
          type: "GET_TEAM_BY_ID",
          payload: error,
        };
        dispatch(return_response);
      }
    };
  }


  //get team by id
export function GetTeambyMember(id) {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${Baseurl}/admin/member/viewbyteam/${id}`);
      var return_response = {
        type: "GET_MEMBER_BY_TEAM",
        payload: response,
      };
      dispatch(return_response);
    } catch (error) {


      var return_response = {
        type: "GET_MEMBER_BY_TEAM",
        payload: error,
      };
      dispatch(return_response);
    }
  };
}

export function memberGetById(id) {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${Baseurl}/admin/member/view/${id}`);
     
      var return_response = {
        type: "MEMBER_GET_ID",
        payload: response,
      };
      dispatch(return_response);
    } catch (error) {

      var return_response = {
        type: "MEMBER_GET_ID",
        payload: error,
      };
      dispatch(return_response);
    }
  };
}


  //update team by id

  export function TeamUpadte(id,data) {
    return async (dispatch) => {
      try {
        const response = await axios.put(`${Baseurl}/admin/team/update/${id}`, data);

        window.location = "/"
        var return_response = {
          type: "TEAM_UPADTE",
          payload: response,
        };
        dispatch(return_response);
      } catch (error) {
  
        var return_response = {
          type: "TEAM_UPADTE",
          payload: error,
        };
        dispatch(return_response);
      }
    };
  }


  // MEMBER UPDATE
  export function Updatemember(id, data) {
    return async (dispatch) => {
      try {
        const response = await axios.put(
          `${Baseurl}/admin/member/update/${id}`,
          { image: data },
          {
            headers: {
              "content-type": "multipart/form-data",
            },
          }
        );
        var return_response = {
          type: "UPADTE_MEMBER",
          payload: response,
        };
        dispatch(return_response);
      } catch (error) {
        var return_response = {
          type: "UPADTE_MEMBER",
          payload: error,
        };
        dispatch(return_response);
      }
    };
  }