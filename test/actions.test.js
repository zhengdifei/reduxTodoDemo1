/**
 * Created by Administrator on 2016/9/20 0020.
 */
import expect from 'expect'
import * as actions from '../app/actions'

describe('actions',()=>{
    it('add a todo',() => {
        const text = 'shopping';
        const expectedAction = {
            type : actions.ADD_TODO,
            text
        };
        expect(actions.addTodo(text)).toEqual(expectedAction)
    })
    it('toggle a todo',() => {
        const index = 1;
        const expectedAction = {
            type : actions.TOGGLE_TODO,
            index
        }
        expect(actions.toggleTodo(index)).toEqual(expectedAction);
    })
});