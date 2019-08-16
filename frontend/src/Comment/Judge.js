import { h, Component } from "preact";
import { Router, Link } from 'preact-router';
import Title from "./Title";
import Point from "./Point";

class Random extends Component {
  constructor() {
    super();
    this.state.articles = []
  }

  componentDidMount() {
    fetch('http://localhost:1991/random_comments')
    .then(function(res) {
      res.json()
      .then(t => {
        this.setState({articles: t})
      })
    }.bind(this))
  }

  render(props, state) {
    return (
      <div>
        <nav>
          {state.articles.map(d => {
            return (
              <a href={"http://localhost:1234/" + "comments/" + d['id']}>
                <Title text={d['text']} />
                <Point point={d['point']} />
              </a>
            )
          })}
        </nav>
      </div>
    );
  }
}

export default Random;
