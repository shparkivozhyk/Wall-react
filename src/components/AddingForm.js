import React from 'react';
import $ from "jquery"; 

export default class AddingForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            adding: false
        }
        this.renderButton = this.renderButton.bind(this);
        this.renderForm = this.renderForm.bind(this);
        this.onAdd = this.onAdd.bind(this);
        this.openForm = this.openForm.bind(this);
    }
    onAdd(e) {
        e.preventDefault();
        let data = this.refs.newNote.value;
        this.props.onAdd(data);
        this.setState({adding: false});
        this.refs.newNote.value = '';
    }
    openForm() {
        this.setState({adding: true});
    }
    renderButton() {
        return (
            <div className='add-note'>
                <button className='add-button' onClick={this.openForm}>
                    Add new note
                </button>
            </div> 
        );
    }
    renderForm() {
        return (
            <div className='add-note'>
                <form onSubmit={this.onAdd} className='add-form'>
                    <input type='text' ref='newNote'/>
                    <button>Add new note</button>
                </form>
            </div>
        );    
    }
    render(){
        return (
            <div>
                {this.state.adding ? this.renderForm() : this.renderButton()}
            </div>
        );
        
    }
}