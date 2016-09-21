import React, { Component,PropTypes } from 'react';
import ReactDom from 'react-dom';
import { connect } from 'react-redux';
import { addTodo, toggleTodo, setVisibilityFilter, VisibilityFilters } from './actions';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import Footer from './components/Footer';

class App extends Component {
    render(){
        const { dispatch,visibleTodos,visibilityFilter } = this.props;
        return (
            <div>
                <AddTodo onAddClick={ text =>
                    {console.log('0');
                    dispatch(addTodo(text))}
                } />
                <TodoList todos={visibleTodos} onTodoClick={index =>
                    dispatch(toggleTodo(index))
                } />
                <Footer filter={visibilityFilter} onFilterChange={ filter =>
                    dispatch(setVisibilityFilter(filter))
                } />
            </div>
        )
    }
}

App.propTypes = {
  visibleTodos : PropTypes.arrayOf(PropTypes.shape({
      text : PropTypes.string.isRequired,
      completed : PropTypes.bool.isRequired
  })),
    visibilityFilter : PropTypes.oneOf([
        'SHOW_ALL',
        'SHOW_COMPLETED',
        'SHOW_ACTIVE'
    ]).isRequired
};

function selectTodos(todos,filter){
    switch (filter){
        case VisibilityFilters.SHOW_ALL:
            return todos;
        case VisibilityFilters.SHOW_COMPLETED:
            return todos.filter(todo => todo.completed);
        case VisibilityFilters.SHOW_ACTIVE:
            return todos.filter(todo => !todo.completed);
    }
}

function select(state){
    return {
        visibleTodos:selectTodos(state.todos,state.visibilityFilter),
        visibilityFilter:state.visibilityFilter
    }
}

export default connect(select)(App);