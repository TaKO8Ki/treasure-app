import { h, Component } from "preact";
import { Router, Link } from 'preact-router';
import Title from "./Title";
import Point from "./Point";
import { stat } from "fs";

class Detail extends Component {
  constructor(props) {
    super();
    this.state.id = props.id
    this.state.article = ""
  }

  componentDidMount() {
    if (this.state.id != undefined) {
      fetch('http://localhost:1991/comments/' + this.state.id)
      .then(function(res) {
        res.json()
        .then(t => {
          this.setState({article: t})
        })
      }.bind(this))
    }
  }

  render(props, state) {
    if (state.article != undefined) {
      console.log(state.article)
      return (
        <Title text={state.article['text']} />
      )
    }
  }
}

export default Detail;
