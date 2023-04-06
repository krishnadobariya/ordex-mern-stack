import { Baseurl } from "../../BaseUrl";
import axios from 'axios'

//delete assignment darta 

export function deleteTeam(id) {
    return async (dispatch) => {
        try {
            const response = await axios.delete(`${Baseurl}/admin/team/delete/${id}`)
            var return_response = {
                type: "TEAM_DELETE",
                payload: response
            }
            dispatch(return_response);
        } catch (error) {
            var return_response = {
                type: "TEAM_DELETE",
                payload: error
            }
        }
    }
}

// memeber delete


export function MemberDelete(id) {
    return async (dispatch) => {
        try {
            const response = await axios.delete(`${Baseurl}/admin/member/delete/${id}`)
            var return_response = {
                type: "MEMBER_DELETE",
                payload: response
            }
            dispatch(return_response);
        } catch (error) {
            var return_response = {
                type: "MEMBER_DELETE",
                payload: error
            }
        }
    }
}