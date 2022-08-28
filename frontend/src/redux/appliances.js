import * as ActionTypes from './ActionTypes';

export const Appliances = (state={
    isLoading:true,
    errmess:null,
    appliances:[]
},action) =>{
    switch(action.type){
        case ActionTypes.ADD_APPLIANCES:
            return {...state, isLoading: false, errmess:null, appliances:action.payload}
        
        case ActionTypes.APPLIANCES_LOADING:
            return {...state,isLoading:true, errmess:null, appliances:[]}    
        
        case ActionTypes.APPLIANCES_FAILED:
            return {...state, isLoading:false, errmess:action.payload, appliances:[]}
        
        default:
            return state;
    }
}