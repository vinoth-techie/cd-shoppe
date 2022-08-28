import * as ActionTypes from './ActionTypes';

export const Fashions = (state={
    isLoading:true,
    errmess:null,
    fashions:[]
},action) =>{
    switch(action.type){
        case ActionTypes.ADD_FASHIONS:
            return {...state, isLoading: false, errmess:null, fashions:action.payload} 
            
        case ActionTypes.FASHIONS_LOADING:
            return {...state,isLoading:true, errmess:null, fashions:[]}    
        
        case ActionTypes.FASHIONS_FAILED:
            return {...state, isLoading:false, errmess:action.payload, fashions:[]}
        
        default:
            return state;
    }
}