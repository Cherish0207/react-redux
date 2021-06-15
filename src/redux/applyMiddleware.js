import compose from "./compose";
function applyMiddleware(...middlewares) {
  return function (createStore) {
    return function (reducer, preloadedState) {
      let store = createStore(reducer, preloadedState);
      let dispatch;
      let middlewareAPI = {
        getState: store.getState,
        dispatch: (action) => dispatch(action),
      };
      let chain = middlewares.map((middleware) => middleware(middlewareAPI));
      dispatch = compose(...chain)(store.dispatch);
      return {
        ...store,
        dispatch,
      };
    };
  };
}
/**
let dispatch;
let middlewareAPI = {
    dispatch:(action)=>dispatch(action)
}
dispatch = (action)=>{console.log('action',action);}
middlewareAPI.dispatch({type:'ADD'});

let a;
let b=a;
a = 1;
console.log(b); 
 */
export default applyMiddleware;
