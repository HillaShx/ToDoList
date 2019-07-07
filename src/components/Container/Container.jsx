import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./Container.css";
import $ from 'jquery';
import TodoList from "../TodoList/TodoList";
import Logo from "../../images/list.svg";

class Container extends Component {
  constructor(props) {
    super(props);
    this.addTodo = this.addTodo.bind(this);
    this.setDone = this.setDone.bind(this);
    this.setTodo = this.setTodo.bind(this);
    this.createTodo = this.createTodo.bind(this);
    this.enableDisableBtn = this.enableDisableBtn.bind(this);
    this.toggleStar = this.toggleStar.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.state = {
      todos: [],
      completed: [],
      todo: {},
      enumItemsAtCreation: 0
    };
  }

  enableDisableBtn() {
    if ($('#userInput').val() === "" || this.state.todo.length === 0) {
      $('#add-btn').removeClass('butn')
      $('#add-btn').addClass('butn-disabled')
    } else {
      $('#add-btn').removeClass('butn-disabled')
      $('#add-btn').addClass('butn')
    }
  }

  createTodo(e) {
    $('#msg').empty();
    this.enableDisableBtn();
    this.setState({
      todo: {
        id: this.state.enumItemsAtCreation,
        title: e.target.value,
        description: "",
        isStarred: false,
      },
    });
  }

  addTodo() {
    if ($('#userInput').val().length === 0) {
      $('#msg').show()
      $('#msg').text('please type something')
      // setTimeout(()=>{$('#msg').fadeOut()},1000)
    } else {
      $('#userInput').val("");
      this.setState({
        todos: [...this.state.todos, this.state.todo],
        todo: {},
        enumItemsAtCreation: this.state.enumItemsAtCreation + 1
      });
      this.enableDisableBtn();
    }
  }

  removeItem(list, itemIndex) {
    let newState = Object.assign({}, this.state);
    
    newState[list] = newState[list].filter(item => item.id !== itemIndex);
    this.setState(newState);
  }

  toggleStar(list, itemNumber) {
    let newState = Object.assign({}, this.state);
    let item = newState[list].find(x => x.id === itemNumber);
    let itemIndex = newState[list].indexOf(item);
    newState[list][itemIndex].isStarred = !newState[list][itemIndex].isStarred;
    this.setState(newState);
  }

  setDone(itemNumber) {
    let item = this.state.todos.find(x => x.id === itemNumber);
    this.removeItem("todos", itemNumber);
    this.setState({
      completed: [...this.state.completed, item]
      });
  }

  setTodo(itemNumber) {
    let item = this.state.completed.find(x => x.id === itemNumber);
    this.removeItem("completed", itemNumber);
    this.setState({
      todos: [...this.state.todos, item]
    });
  }

  render() {
    return (
      <React.Fragment>
      <div className="row app-title">
          <img id="logo" src={Logo} />
          <p className="headline">Todo List</p>
        </div>
      <div className="container">
        <input id="userInput" className="input" onChange={this.createTodo} type="text" placeholder="Add Your Todo..."/>
        <span id="add-btn" className="butn-disabled no-select" onClick={this.addTodo}>Add Todo</span>
        <div id="msg"></div>
        <div className="row">
          <div className="col col-md-12">
            <h2 className="title todo">Todo List</h2>
            <TodoList className="todo-list" handleStar={this.toggleStar} handleRemove={this.removeItem} setDone={this.setDone} todos={this.state.todos}/>
          </div>
        </div>
        <div className="row">
          <div className="col col-md-12">
            <h2 className="title">Done List</h2>
            <TodoList className="done-list" handleStar={this.toggleStar} handleRemove={this.removeItem} setTodo={this.setTodo} completed={this.state.completed}/>
          </div>
        </div>
      </div>
      </React.Fragment>
    );
  }
}

export default Container;
