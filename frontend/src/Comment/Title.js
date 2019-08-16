import { h, Component } from "preact";
import { Router, Link } from 'preact-router';

class Title extends Component {
  render(props, state) {
    return (<p>{props.text}</p>);
  }
}

export default Title;
