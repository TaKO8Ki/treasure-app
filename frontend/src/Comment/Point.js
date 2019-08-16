import { h, Component } from "preact";
import { Router, Link } from 'preact-router';

class Point extends Component {
  render(props, state) {
    return (<p>{props.point}</p>);
  }
}

export default Point;
