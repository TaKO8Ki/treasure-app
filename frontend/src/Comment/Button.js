import { h, Component } from "preact";
import { Router, Link } from 'preact-router';
import firebase from '../firebase';
import axios from 'axios';    
const API_ENDPOINT = process.env.BACKEND_API_BASE;

class Button extends Component {
  constructor(props) {
    super();
    this.state.id = props.id 
    this.state.point = props.point
    this.state.buttonName = props.buttonName
    this.token = ''
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit() {
    if (this.token === '') {
      this.token = await firebase.auth().currentUser.getIdToken();
    }
    let id = this.state.id;
    let text = '';
    let reference_url = '';
    let point = 2;
    console.log(this.token)
    console.log(JSON.stringify({ text, reference_url, point }))
    console.log("hoge")
    return fetch(`${API_ENDPOINT}/comments/${id}`, {
      method: 'POST',
      cache: 'no-cache',
      redirect: 'follow',
      referrer: 'no-referrer',
      headers: {
        'X-HTTP-Method-Override': 'PUT',
        'Authorization': `Bearer ${this.token}`,
      },
      body: JSON.stringify({ text, reference_url, point })
    }).then(v => v)
        
  }

  render(props, state) {
    return <button onClick={this.handleSubmit}>{state.buttonName}</button>
  }
}

export default Button;
