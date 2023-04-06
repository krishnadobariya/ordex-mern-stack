import { combineReducers } from "redux";
import { TeamAddReducer,
  AddTeamMemberReducer ,
  AddFlagReducer} from "./reducer/addReducer";
import {
  GetAllTeamReducer,
  GetTeamByIdReducer,
  TeamUpadteReducer,
  GetTeambyMemberReducer,
  memberGetByIdReducer,
  UpdatememberReducer
} from "./reducer/getReducer";

import {deleteTeamReducer,
  MemberDeleteReducer} from "../store/reducer/deleteReducer"

const rootReducer = combineReducers({
  // ADD
  TeamAdd: TeamAddReducer,
  AddTeamMember:AddTeamMemberReducer,
  AddFlag:AddFlagReducer,

  // GET
  GetAllTeam: GetAllTeamReducer,
  GetTeamById: GetTeamByIdReducer,
  GetTeambyMember: GetTeambyMemberReducer,
  memberGetById: memberGetByIdReducer,
  // put
  TeamUpadte:TeamUpadteReducer,
  Updatemember:UpdatememberReducer,

  // delete
  deleteTeam:deleteTeamReducer,
  MemberDelete:MemberDeleteReducer,

});

export default rootReducer;
