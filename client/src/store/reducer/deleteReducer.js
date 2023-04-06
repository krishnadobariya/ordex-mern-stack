export const initialState = {
    data: {},
    loading: true,
}

//delete assignment data  

export function deleteTeamReducer(state = initialState, action) {
    switch (action.type) {
        case "TEAM_DELETE":
            return { data: action.payload, loading: false };
        default:
            return state
    }
}

export function MemberDeleteReducer(state = initialState, action) {
    switch (action.type) {
        case "MEMBER_DELETE":
            return { data: action.payload, loading: false };
        default:
            return state
    }
}