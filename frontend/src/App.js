import { h, Component } from "preact";
import Router from 'preact-router';
import firebase from "./firebase";
import { getPrivateMessage, getPublicMessage } from "./api";
import Judge from "./Comment/Judge";
import Form from "./Form";
import Detail from "./Comment/Detail";

class App extends Component {
  constructor() {
    super();
    this.state.user = null;
    this.state.message = "";
    this.state.errorMessage = "";
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
      } else {
        this.setState({
          user: null
        });
      }
    });
  }

  getPrivateMessage() {
    this.state.user
      .getIdToken()
      .then(token => {
        return getPrivateMessage(token);
      })
      .then(resp => {
        this.setState({
          message: resp.message
        });
      })
      .catch(error => {
        this.setState({
          errorMessage: error.toString()
        });
      });
  }

  render(props, state) {
    if (state.user === null) {
      return <button onClick={firebase.login}>Please login</button>;
    }
    return (
      <div>
        <header>
          <nav>
            <a href="/">Home</a>
            <a href="/judge">ジャッジする</a>
            <a href="/comments/new">作成する</a>
          </nav>
        </header>

        <Router>
          <Judge path="/judge" />
          <Form path="/comments/new" />
          <Detail path="/comments/:id" />
        </Router>

        <div>{state.message}</div>
        <p style="color:red;">{state.errorMessage}</p>
        <button onClick={this.getPrivateMessage.bind(this)}>
          Get Private Message
        </button>
        <button onClick={firebase.logout}>Logout</button>
      </div>
    );
  }
}

export default App;
