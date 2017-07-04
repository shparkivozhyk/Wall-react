import React from 'react';
import Note from './Note';
import AddingForm from './AddingForm';
import $ from "jquery"; 

export default class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            adding: false,
            notes: []
        };
        this.eachNote = this.eachNote.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.onRemove = this.onRemove.bind(this);
        this.onAdd = this.onAdd.bind(this);
    }
    componentDidMount() {
        let that = this;
        $.ajax({url: 'https://wall-react.herokuapp.com/notes',
                method: 'get'})
                .done(function(data){
                    that.setState({notes: data})})
                .catch(console.error)
    }
    onUpdate(id, newText) {
        let note = {note: newText};
        $.ajax({url: 'https://wall-react.herokuapp.com/' + id,
                type: 'PUT',
                dataType: 'json',
                data: note
            })
                .catch(console.error);
        let notes = this.state.notes.map(note => {
            return (note._id !== id) ? note : Object.assign(note, {note: newText})
        });
        this.setState({notes: notes});
    }
    onRemove(id) {
        $.ajax({url: 'https://wall-react.herokuapp.com/' + id,
                type: 'DELETE'
            })
            .catch(console.error)
        let notes = this.state.notes.filter(note => {
            return note._id !== id;
        });
        this.setState({notes: notes});
    }
    onAdd(data) {
        let note = {
            note: data
        };
        $.ajax({url:'https://wall-react.herokuapp.com/notes',
                method: 'post',
                dataType: 'json',
                data: note
            })
            .catch(console.error);
        this.setState({notes: [
            ...this.state.notes,
            note
        ]});
    }
    eachNote(note) {
        return (
            <Note key={note._id}
                    id={note._id}
                    onUpdate={this.onUpdate}
                    onRemove={this.onRemove}>
                {note.note}
            </Note>
        );
    }
    render() {
        return (
            <div className='board'>
                {this.state.notes.map(this.eachNote)}
                <AddingForm onAdd={this.onAdd}/>
            </div>
        );
    }
}