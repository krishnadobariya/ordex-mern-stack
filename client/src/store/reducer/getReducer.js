export const initialState = {
    data: {},
    loading: true,
}

// get course data by teacher uni code

export function GetAllTeamReducer(state = initialState, action) {
    switch (action.type) {
        case "GET_TEAM":
            return { data: action.payload, loading: false };
        default:
            return state;
    }
}

//get team by its id

export function GetTeamByIdReducer(state=initialState,action){
    switch(action.type){
        case "GET_TEAM_BY_ID":
            return {data:action.payload,
                loading:false};
        default:
            return state;
    }
}


//MEMBER BY ID

export function memberGetByIdReducer(state=initialState,action){
    switch(action.type){
        case "MEMBER_GET_ID":
            return {data:action.payload,
                loading:false};
        default:
            return state;
    }
}
export function GetTeambyMemberReducer(state=initialState,action){
    switch(action.type){
        case "GET_MEMBER_BY_TEAM":
            return {
                data:action.payload,
                loading:false};
        default:
            return state;
    }
}

// put

export function TeamUpadteReducer(state=initialState,action){
    switch(action.type){
        case "TEAM_UPADTE":
            return{data:action.payload,loading:false};
        default:
            return state;
    }
}

// MEMBER UPADTE
export function UpdatememberReducer(state=initialState,action){
    switch(action.type){
        case "UPADTE_MEMBER":
            return {data:action.payload,loading:false};
        default:
            return state;
    }
  }