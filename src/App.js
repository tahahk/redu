import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import InputForm from './components/InputTodo';
import TodoList from './components/TodoList';
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React Redux Todo With Firebase</h1>
        </header>
        <p className="App-intro">
        </p>
          <InputForm/>
          <br/>
          <TodoList />
      </div>
    );
  }
}

export default App;
