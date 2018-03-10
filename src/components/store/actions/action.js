import firebase from 'firebase';
var config = {
    apiKey: "AIzaSyDjH9q5VbvvxAFZvvsA61dVAxia0G_66_A",
    authDomain: "reacttodoredux.firebaseapp.com",
    databaseURL: "https://reacttodoredux.firebaseio.com",
    projectId: "reacttodoredux",
    storageBucket: "reacttodoredux.appspot.com",
    messagingSenderId: "1000111927603"
};
firebase.initializeApp(config);
let remaingTodos = []
export function addTodo(todo) {
    firebase.database().ref('/').child('todos/').push(todo)
    return {
        type: 'ADD_TODO', payload: todo
    }
}
export function todoList(todos) {
    return ({ type: 'RENDER_TODOS', payload: todos })
}
export function removeTodo(todos, ky, ind) {
    remaingTodos = todos
    return dispatch => {
        firebase.database().ref('/').child(`todos/${ky}`).remove()
        .then((v) => { 
        remaingTodos = remaingTodos.slice(0, ind).concat(remaingTodos.slice(ind + 1));
        dispatch({ type: 'RENDER_TODOS', payload: remaingTodos })
        });
    }
}
export function toggleEdit(object, indexNo) {
    return dispatch => {
        let key =object.id;
        firebase.database().ref(`todos/${key}`).set(object)
    }
}
