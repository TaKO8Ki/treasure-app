import { h, Component } from "preact";
import firebase from './firebase';
const API_ENDPOINT = process.env.BACKEND_API_BASE;

class Form extends Component {
  constructor(props) {
    super(props);
    this.state.text = ''
    this.token = '';
  }

  async handleSubmit() {
    if (this.token === '') {
      this.token = await firebase.auth().currentUser.getIdToken();
    }
    let text = this.state.text;
    let url = "hgoe";

    return fetch(`${API_ENDPOINT}/comments`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.token}`
      },
      body: JSON.stringify({ text, url })
    }).then(v => v.json())
  }

  handleChange(e) {
    this.setState({text: e.target.value})
  }

  render() {
    return (
      <label>
        Text:
        <input type="text" name="text" value={this.state.value}　onChange={this.handleChange.bind(this)}/>
        <button onClick={this.handleSubmit.bind(this)}>
          send
        </button>
      </label>
    );
  }
}

export default Form;

