import React , {Component} from 'react';
import {connect} from 'react-redux';
import {addTodo} from './store/actions/action';
import 'bootstrap/dist/css/bootstrap.css';
import {Button, Form, FormGroup, Label, Input, Modal, ModalHeader} from 'reactstrap'


class InputForm extends Component {
    constructor(props){
        super(props)
        this.state={
            todo: '',
            modal: false
        }
    }
todo(e){
    this.setState({
        todo: e.target.value
    });
};

submitTodo(ev){
    ev.preventDefault()
    if(this.state.todo === '')
{
    this.setState({
        modal: true
    })
    return false
} 
else

this.props.addTodo(this.state)
    this.setState({
        todo: ''
    });
}

    render(){
        return(
           <div>
           {
            (this.state.modal) ?
                <Modal isOpen={this.state.modal} className={this.props.className}>
                    <ModalHeader >Please Input Some Task</ModalHeader>
                        <Button color="success" onClick={() => {
                            this.setState({
                                modal: false
                            })
                        }}>Dismiss</Button>
                </Modal> : ''
        }
            <Form className='input' onSubmit= {this.submitTodo.bind(this)}  >
            <FormGroup>
              <Label for="add-todo" hidden>Add Todo</Label>
              <Input value={this.state.todo} maxLength='50' style={{height: '60px'}} type="text" onChange = {this.todo.bind(this)} placeholder="Add Task" />
            </FormGroup>
            {' '}
            
            <Button color='success' className='mr-3'>Submit</Button>
          </Form>
           </div>
        )
    }
}
function mapDispatchToprops(dispatch){
    return ({
       addTodo: (todo)=>{
           dispatch(addTodo(todo));
       }
    })
}

export default connect (null,mapDispatchToprops)(InputForm)