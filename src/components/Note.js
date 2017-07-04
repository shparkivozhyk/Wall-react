import React from 'react';
import Draggable from 'react-draggable';

export default class Note extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false
        };
        this.edit = this.edit.bind(this);
        this.update = this.update.bind(this);
        this.remove = this.remove.bind(this);
    }
    edit() {
        this.setState({editing: true});
    }
    update(newText) {
        this.setState({
            editing: false
        });
        this.props.onUpdate(this.props.id, this.refs.newText.value);
    }
    remove() {
        this.props.onRemove(this.props.id);
    }
    renderNote() {
        return (
            <div className='note'>
                <p>{this.props.children}</p>
                <button className='edit-button note-button'
                        onClick={this.edit}> Edit
                </button>
                <button className='remove-button note-button'
                        onClick={this.remove}>X
                </button>
            </div>
        );
    }
    renderForm() {
        return (
            <div className='note note-form'>
                <textarea className='editing-field'
                            defaultValue={this.props.children}
                            ref='newText'>
                </textarea>
                <button className='update-button note-button'
                        onClick={this.update}> Update
                </button>
            </div>
        );
        }
    render() {
        return (
            <Draggable>
                {this.state.editing ? this.renderForm() : this.renderNote()}
            </Draggable>
        );
    }
}