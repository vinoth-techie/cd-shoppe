import * as ActionTypes from './ActionTypes';

export const Mobiles = (state={
    isLoading:true,
    errmess:null,
    mobiles:[]
},action) =>{
    switch(action.type){
        case ActionTypes.ADD_MOBILES:
            return {...state, isLoading: false, errmess:null, mobiles:action.payload}
        
        case ActionTypes.MOBILES_LOADING:
            return {...state,isLoading:true, errmess:null, mobiles:[]}    
        
        case ActionTypes.MOBILES_FAILED:
            return {...state, isLoading:false, errmess:action.payload, mobiles:[]}
        
        default:
            return state;
    }
}