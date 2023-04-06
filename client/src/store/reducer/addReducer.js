export const initialState = {
  data: {},
  loading: true,
};

//teache login reducer

export function TeamAddReducer(state = initialState, action) {
  switch (action.type) {
    case "TEAM_ADD":
      return { data: action.payload, loading: false };
    default:
      return state;
  }
}

export function GetTeamByIdReducer(state=initialState,action){
  switch(action.type){
      case "GET_TEAM_BY_ID":
          return {data:action.payload,loading:false};
      default:
          return state;
  }
}

export function AddTeamMemberReducer(state=initialState,action){
  switch(action.type){
      case "ADD_MEMBER":
          return {data:action.payload,loading:false};
      default:
          return state;
  }
}

export function AddFlagReducer(state=initialState,action){
  switch(action.type){
      case "ADD_FLAG":
          return {data:action.payload,loading:false};
      default:
          return state;
  }
}

