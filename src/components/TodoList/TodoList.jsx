import React, { Component } from "react";
import "./TodoList.css";
import "bootstrap/dist/css/bootstrap.css";
import $ from "jquery";
import deleteIcon from "../../images/remove.png";
import todoIcon from "../../images/todo.svg";
import doneIcon from "../../images/done.svg";

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.removeTodo = this.removeTodo.bind(this);
    this.setDone = this.setDone.bind(this);
    this.setTodo = this.setTodo.bind(this);
    this.setStar = this.setStar.bind(this);
  }

  removeTodo(event) {
    let itemNumber = parseInt(event.target.parentElement.getAttribute("data-key"));
    let list = $('ul#todo-list').find(event.target).length ? "todos" : "completed";
    console.log(list);
    this.props.handleRemove(list, itemNumber);
  }

  setDone(event) {
    let itemNumber = parseInt(event.target.parentElement.getAttribute("data-key"));
    this.props.setDone(itemNumber);
  }

  setTodo(event) {
    let itemNumber = parseInt(event.target.parentElement.getAttribute("data-key"));
    // this.removeTodo(event);
    this.props.setTodo(itemNumber);
  }

  setStar(event) {
    let item = event.target;
    let li = event.target.parentElement;
    let ul = event.target.parentElement.parentElement;
    if (item.classList.contains("star-on")) {
      item.classList.remove("star-on");
      $(ul).append(li);
    } else {
      item.classList.add("star-on");
      $(ul).prepend(li);
    }
  }

  render() {
    if (this.props.todos && this.props.todos.length > 0) {
      return (
        <div className="row justify-content-center">
          <div className="col col-md-10">
            <ul id="todo-list">
              {this.props.todos.map((todo, i) => (
                <li data-key={todo.id} key={i}>
                  <span className="star" onClick={this.setStar} />
                  <img className="checked" onClick={this.setDone} src={todoIcon} />
                  {`${todo.title}`}
                  <img src={deleteIcon} className="delete" onClick={this.removeTodo} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    }
    if (this.props.completed && this.props.completed.length > 0) {
      return (
        <div className="row justify-content-center">
          <div className="col col-md-10">
            <ul id="done-list">
              {this.props.completed.map((todo, i) => (
                <li data-key={todo.id} key={i}>
                  <img className="checked" onClick={this.setTodo} src={doneIcon} />
                  {`${todo.title}`}
                  <img src={deleteIcon} className="delete" onClick={this.removeTodo} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    }
    return <div>Waiting for your todos...</div>;
  }
}

export default TodoList;
