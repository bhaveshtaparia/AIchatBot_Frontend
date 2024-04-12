export const login=(user)=>{
    return {
        type:'LOGIN',
        payload:user
    };
};
export const logout=()=>{
    return {
        type:'LOGOUT',
    };
};


export const signup=(user)=>{
    return {
        type:'SIGNUP',
        payload:user
    }
}