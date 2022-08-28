import * as ActionTypes from './ActionTypes';

export const Groceries = (state={
    isLoading:true,
    errmess:null,
    groceries:[]
},action) =>{
    switch(action.type){
        case ActionTypes.ADD_GROCERIES:
            return {...state, isLoading: false, errmess:null, groceries:action.payload}
        
        case ActionTypes.GROCERIES_LOADING:
            return {...state,isLoading:true, errmess:null, groceries:[]}    
        
        case ActionTypes.GROCERIES_FAILED:
            return {...state, isLoading:false, errmess:action.payload, groceries:[]}
        
        default:
            return state;
    }
}