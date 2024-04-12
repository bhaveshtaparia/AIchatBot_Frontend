const initialState={
    isAuthenticated:(JSON.parse(localStorage.getItem('auth')) && JSON.parse(localStorage.getItem('auth')).token)?true:false,
    user:JSON.parse(localStorage.getItem('auth'))?JSON.parse(localStorage.getItem('auth')):null
}
const authReducer=(state=initialState,action)=>{
    switch(action.type){
    case 'LOGIN':
    case 'SIGNUP':
        return{
            ...state,
            isAuthenticated:true,
            user:action.payload
        };
    case 'LOGOUT':
        return {
            ...state,
            isAuthenticated:false,
            user:null

        }    
    default:
        return state
    }


}
export default authReducer;