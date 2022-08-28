import * as ActionTypes from './ActionTypes';

export const Electronics = (state={
    isLoading:true,
    errmess:null,
    electronics:[]
},action) =>{
    switch(action.type){
        case ActionTypes.ADD_ElECTRONICS:
            return {...state, isLoading: false, errmess:null, electronics:action.payload}
        
        case ActionTypes.ElECTRONICS_LOADING:
            return {...state,isLoading:true, errmess:null, electronics:[]}    
        
        case ActionTypes.ElECTRONICS_FAILED:
            return {...state, isLoading:false, errmess:action.payload, electronics:[]}
        
        default:
            return state;
    }
}