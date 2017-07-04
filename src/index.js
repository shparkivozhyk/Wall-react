import React from 'react';
import ReactDOM from 'react-dom';
import Board from './components/Board';
import { Router, Route, hashHistory, Link} from 'react-router';
import './styles/styles.scss';


class Whoops extends React.Component {
    render() {
        return (
            <h1>This page doesn't exist</h1>
        );
    }
}
ReactDOM.render(<Router history={hashHistory}>
                    <div>
                        <Route path="/" component={Board}/>
                        <Route path="*" component={Whoops}/>
                    </div>     
                </Router>, 
                document.getElementById('react-container'));