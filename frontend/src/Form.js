import { h, Component } from "preact";
import firebase from './firebase';
const API_ENDPOINT = process.env.BACKEND_API_BASE;

class Form extends Component {
  constructor(props) {
    super(props);
    this.state.text = ''
    this.state.reference_url = ''
    this.token = ''
  }

  async handleSubmit() {
    if (this.token === '') {
      this.token = await firebase.auth().currentUser.getIdToken();
    }
    let text = this.state.text;
    let reference_url = this.state.reference_url;
    this.setState({text: ''});
    this.setState({reference_url: ''});
    console.log(JSON.stringify({ text, reference_url }))

    if (text != '') {
      console.log("hoge")
      return fetch(`${API_ENDPOINT}/comments`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.token}`
        },
        body: JSON.stringify({ text, reference_url })
      }).then(v => v.json())
    }
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  render() {
    return (
      <div class="form">
        <p><textarea type="text" name="text" value={this.state.value}　onChange={this.handleChange.bind(this)} placeholder="text"/></p>
        <p><input type="text" name="reference_url" value={this.state.value}　onChange={this.handleChange.bind(this)} placeholder="url"/></p>
        <button onClick={this.handleSubmit.bind(this)}>クソコメする</button>
      </div>
    );
  }
}

export default Form;

