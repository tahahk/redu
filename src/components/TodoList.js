import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { todoList, removeTodo, toggleEdit } from './store/actions/action';
import { Button, ListGroup, ListGroupItem, Modal, ModalHeader, ModalFooter , Input} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';

class TodoList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            todos: [],
            flag: false,
            editValue: '',
            indexNo: ''

        }
    }
    componentWillMount() {
        firebase.database().ref('todos/').on('child_added', (snap) => {
            let todos = snap.val();
            todos.id = snap.key
            this.state.todos.push(todos)
            this.setState({
                todos: this.state.todos
            })
            this.props.todoList(this.state.todos)
        })
    }

    removeTodo(todos, key, index) {
        this.props.removeTodo(todos, key, index);
        var cloneTodos = this.state.todos
        cloneTodos = cloneTodos.slice(0, index).concat(cloneTodos.slice(index + 1))
        this.setState({ todos: cloneTodos });
    }
    editTodo(index) {
        this.setState({
            flag: true,
            editValue: this.state.todos[index].todo,
            indexNo: index,
            editObj: this.props.todos[index]
        })
    }

    editFormHandler(ev) {
        this.setState({
            [ev.target.name]: ev.target.value
        })
    }
    toggleChange() {
        let editedTodo = this.state.editObj
        editedTodo.todo = this.state.editValue;
        this.props.toggleEdit(this.state.editObj, this.state.indexNo);
        this.setState({
            editObj: {},
            indexNo: "",
            inputValue: "",
            flag: false,
        })
    }



    render() {
        return (
            <div>
                {
                    (this.state.flag) ?
                        <Modal isOpen={this.state.flag} className={this.props.className}>
                            <ModalHeader >Edit Task</ModalHeader>
                            <Input maxLength='50' type='text' value={this.state.editValue} className='modal-input' onChange={this.editFormHandler.bind(this)} name='editValue' />
                            <ModalFooter>
                                <Button color="primary" onClick={this.toggleChange.bind(this)} disabled = {!this.state.editValue}>Save</Button>{' '}
                                <Button color="danger" onClick={() => {
                                    this.setState({
                                        flag: false
                                    })
                                }}>Cancel</Button>
                            </ModalFooter>
                        </Modal> : ''
                }


                {
                    (this.props.todos) ?
                        <ListGroup>
                            {this.props.todos.map((item, ind) => {
                                return (
                                    <ListGroupItem key={ind} className="mb-2 middle">
                                        <span className="float-left" >{item.todo}</span>
                                        <Button outline size="lg" className="ml-3 btn btn-primary text-dark float-right" color="danger" onClick={this.removeTodo.bind(this, this.props.todos, item.id, ind)} >Delete</Button>
                                        <Button outline size="lg" className="btn btn-primary float-right" color="warning" onClick={this.editTodo.bind(this, ind)} xs="6" sm="4" >Edit</Button>
                                    </ListGroupItem>
                                )
                            })
                            }
                        </ListGroup> : <div>loading....</div>
                }
            </div>
        );

    }
}

function mapStateToProps(state) {
    return ({
        todos: state.root.todos
    })
}

function mapDispatchToprops(dispatch) {


    return ({

        todoList: (cloneTodosArray) => { dispatch(todoList(cloneTodosArray)) },
        removeTodo: (todos, todoKey, index) => { dispatch(removeTodo(todos, todoKey, index)) },
        toggleEdit: (todoObj, ind) => { dispatch(toggleEdit(todoObj, ind)) }

    })
}
export default connect(mapStateToProps, mapDispatchToprops)(TodoList)