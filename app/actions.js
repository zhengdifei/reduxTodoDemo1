/*
* action 类型
 */
export const ADD_TODO = 'ADD_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';

/*
* 其它的常量
 */
export const VisibilityFilters = {
  SHOW_ALL : 'SHOW_ALL',
    SHOW_COMPLETED : 'SHOW_COMPLETED',
    SHOW_ACTIVE : 'SHOW_ACTIVE'
};

/*
* action 创建函数
 */
export function addTodo(text){
    return { type : ADD_TODO,text}
}

export function toggleTodo(index){
    return { type : TOGGLE_TODO,index}
}

export function setVisibilityFilter(filter){
    return { type : SET_VISIBILITY_FILTER,filter}
}
//通用action生成器
function makeActionCreator(type,...argNames){
    return function(...args){
        let action = { type };
        argNames.forEach((arg,index)=> {
            action[argNames[index]] = args[index];
        })
        return action;
    }
}

//用户管理模块
export const USER_ADD = 'USER_ADD';
export const USER_Modify = 'USER_Modify';
export const USER_DEL = 'USER_DEL';

export const userAdd = makeActionCreator(USER_ADD,'name');
export const userModify = makeActionCreator(USER_Modify,'id','name');
export const userDel = makeActionCreator(USER_DEL,'id');

//测试自定义模板中间件
export function loadUser(userId){
    return {
        types : ['LOAD_USER_REQEST','LOAD_USER_SUCCESS','LOAD_USER_FAILTURE'],
        shouldCallAPI : (state) => !state.todos[userId],
        callAPI : ()=> fetch(`userList`),
        payload : { userId }
    }
}