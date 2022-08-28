import { createStore,combineReducers,applyMiddleware } from "redux";
import { Categories } from "./categories";
import { Groceries } from "./groceries";
import { Fashions } from "./fashions";
import { Mobiles } from "./mobiles";
import { Appliances } from "./appliances";
import { Electronics } from "./electronics";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { User } from "./User";
export const ConfigureStore = () =>{
    const store = createStore(
        combineReducers({
            categories : Categories,
            groceries : Groceries,
            mobiles : Mobiles,
            fashions : Fashions,
            appliances : Appliances,
            electronics : Electronics,
            user:User,
        }),
        applyMiddleware(thunk,logger)
    );
    return store;
}