import { h, Component } from "preact";
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
  }

  handleToDetailPage () {
    this.props.changePageStatus(this.state.id)
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
    return fetch(`${API_ENDPOINT}/comments/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ text, reference_url, point }),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      }
    }).then(v => v)
        
  }

  render(props, state) {
    return <button onClick={this.handleToDetailPage.bind(this)}>{state.buttonName}</button>
  }
}

export default Button;
