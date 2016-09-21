import React from 'react'
import { render } from 'react-dom'
import { createStore,applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
import todoApp from './reducers'
import { addTodo, toggleTodo, setVisibilityFilter, VisibilityFilters,userAdd,userDel,userModify,loadUser } from './actions'

//let store = createStore(todoApp);

//第二种方法，整容
/*let next = store.dispatch;
store.dispatch = function dispatchAndLog(action){
    console.log('pre state',store.getState());
    console.log('action',action);
    next(action);
    console.log('next state',store.getState());
}*/

//console.log(store.getState());

// 每次 state 更新时，打印日志
// 注意 subscribe() 返回一个函数用来注销监听器
//let unsubscribe = store.subscribe( () =>
//    console.log("state update")
//);

//let obj1 = [{text:'hello11',completed:false}];
//let obj2 = {text:'hello',completed:false};
//let obj3 = Object.assign([],obj1,obj2);
//console.log(obj3);

//第一种方法，包装
/*function dispatchAndLog(store,action){
    console.log('pre state',store.getState());
    console.log('action',action);
    store.dispatch(action);
    console.log('next state',store.getState());
}*/

//第三种方法,返回函数
/*function logger(store){
    let next = store.dispatch;

    return function(action){
        console.log('pre state',store.getState());
        console.log('action',action);
        let result = next(action);
        console.log('next state',store.getState());
        return result;
    }
}


function applyMiddleware(store,middlewares){
    middlewares = middlewares.slice();
    middlewares.reverse();

    middlewares.forEach(middleware =>{
        store.dispatch = middleware(store)
    })
}

applyMiddleware(store,[logger]);
 */
//第四种方式，没好使
/*function logger(store){
    return function(next){
        return function(action){
            console.log('pre state',store.getState());
            console.log('action',action);
            let result = next(action);
            console.log('next state',store.getState());
            return result;
        }
    }
}*/
//将上述方法进行柯里化
const logger = store => next => action =>{
    console.log('pre state',store.getState());
    console.log('action',action);
    let result = next(action);
    console.log('next state',store.getState());
    return result;
};
//通用获取数据方法
function callAPIMiddleware({dispatch,getState}){
    return function (next){
        return function(action){
            const { types,callAPI,shouldCallAPI=()=>true,payload={} } = action;
            if(!types){
                return next(action);
            }

            if(!Array.isArray(types) || types.length !==3 || !types.every(type => typeof type === 'string')){
                throw new Error('Expected an array of three string types.');
            }

            if(typeof callAPI !== 'function'){
                throw new Error('Exception fetch to be a funciton');
            }

            if(!shouldCallAPI(getState())){
                return;
            }

            const [requestType,successType,failureType] = types;

            dispatch(Object.assign({},payload,{type:requestType}));

            return callAPI().then(
                response => dispatch(Object.assign({},payload,{
                    response : response,
                    type:successType
                })),
                error => dispatch(Object.assign({},payload,{
                    error : error,
                    type : failureType
                }))
            )
        }
    }
}

/*function applyMiddleware(store,middlewares){
    middlewares = middlewares.slice();
    middlewares.reverse();

    let dispatch = store.dispatch;
    middlewares.forEach(middleware =>{
        dispatch = middleware(store)(dispatch)
    })

    return Object.assign({},store,{ dispatch })
}

applyMiddleware(store,[logger]);*/
//第五种方式
let createStoreWithMiddleware = applyMiddleware(logger,callAPIMiddleware)(createStore);
let store = createStoreWithMiddleware(todoApp);

let action = addTodo('add zdf');

store.dispatch(action);
//dispatchAndLog(store,action);

//store.dispatch(addTodo('Learn about actions'));
//store.dispatch(addTodo('Learn about reducers'));
//store.dispatch(addTodo('Learn about store'));
let action2 = toggleTodo(0);

store.dispatch(action2);
//dispatchAndLog(store,action2);

//store.dispatch(toggleTodo(1));
//store.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_COMPLETED));

//unsubscribe();

/*render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('content')
);*/

console.log(userAdd('zheng',34));
console.log(userDel(34));
console.log(userModify('zheng',34));

console.log(store.dispatch(loadUser('zdf')));