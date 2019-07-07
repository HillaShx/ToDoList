import React, { Component } from "react";
import "./TodoList.css";
import "bootstrap/dist/css/bootstrap.css";
import $ from "jquery";
import deleteIcon from "../../images/remove.png";
import todoIcon from "../../images/unchecked.png";
import editIcon from "../../images/edit.png";
import doneIcon from "../../images/checked.png";

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.removeTodo = this.removeTodo.bind(this);
    this.setDone = this.setDone.bind(this);
    this.setTodo = this.setTodo.bind(this);
    this.setStar = this.setStar.bind(this);
    this.editItem = this.editItem.bind(this);
  }

  removeTodo(e) {
    let itemNumber = parseInt(e.target.parentElement.getAttribute("data-key"));
    let list = $('ul#todo-list').find(e.target).length ? "todos" : "completed";
    this.props.handleRemove(list, itemNumber);
  }

  setDone(e) {
    let itemNumber = parseInt($(e.target).parent().attr("data-key"));
    this.props.setDone(itemNumber);
  }

  setTodo(e) {
    let itemNumber = parseInt($(e.target).parent().attr("data-key"));
    this.props.setTodo(itemNumber);
  }

  setStar(e) {
    let starIcon = e.target;
    let listItem = $(starIcon).parent();
    let list = $('ul#todo-list').find(starIcon).length ? "todos" : "completed";
    let itemNumber = parseInt(listItem.attr("data-key"));
    this.props.handleStar(list, itemNumber);
  }

  editItem(e) {
    // open popup to edit item
  }

  render() {
    if (this.props.todos && this.props.todos.length > 0) {
      return (
        <div className="row">
          <div className="col col-md-10">
            <ul id="todo-list">
              {this.props.todos.map((todo, i) => (
                <li data-key={todo.id} key={i}>
                  <span className={todo.isStarred ? "icon star selected" : "icon star unselected"} onClick={this.setStar} />
                  <img className="icon checked" onClick={this.setDone} src={todoIcon} />
                  <p className="item-title">{`${todo.title}`}</p>
                  <img src={editIcon} className="icon edit" alt="edit icon" onClick={this.editItem}/>
                  <img src={deleteIcon} className="icon remove" alt="remove icon" onClick={this.removeTodo} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    }
    if (this.props.completed && this.props.completed.length > 0) {
      return (
        <div className="row">
          <div className="col col-md-10">
            <ul id="done-list">
              {this.props.completed.map((todo, i) => (
                <li data-key={todo.id} key={i}>
                  <span className={todo.isStarred ? "icon star selected" : "icon star unselected"} onClick={this.setStar} />
                  <img className="icon checked" onClick={this.setTodo} src={doneIcon} />
                  <p className="item-title">{`${todo.title}`}</p>
                  <img src={editIcon} className="icon edit" alt="edit icon" onClick={this.editItem}/>
                  <img src={deleteIcon} className="icon remove" alt="delete icon" onClick={this.removeTodo} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    }
    return <div className="msg-empty">This list is empty</div>;
  }
}

export default TodoList;
