import React from 'react';
import ReactDOM from 'react-dom';
import Board from './components/Board';
import { Router, Route, hashHistory, Link} from 'react-router';
import './styles/styles.scss';


ReactDOM.render(<Board/>, document.getElementById('react-container'));