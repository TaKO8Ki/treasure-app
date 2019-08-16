import { h, Component } from "preact";
import { Router, Link } from 'preact-router';
import Title from "./Title";
import Point from "./Point";

class Detail extends Component {
  constructor(props) {
    super();
    this.state.id = props.id
    this.state.article = ""
  }

  componentDidMount() {
    fetch('http://localhost:1991/comments/' + this.state.id)
    .then(function(res) {
      res.json()
      .then(t => {
        this.setState({article: t})
      })
    }.bind(this))
  }

  render(props, state) {
    return (
      <div>
        <Title text={state.article['text']} />
        <Point point={state.article['point']} />
      </div>
    )
  }
}

export default Detail;
