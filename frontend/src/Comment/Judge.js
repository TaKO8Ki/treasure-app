import { h, Component } from "preact";
import { Router, Link } from 'preact-router';
import Title from "./Title";
import Point from "./Point";
import Button from "./Button";

class Judge extends Component {
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
    if (state.articles[0] != undefined) {
      return (
        <div id="judge">
            <p class="content">
              <Title text={state.articles[0]['text']} />
            </p>
          <div id="button">
            <Button id={state.articles[0]['id']} point={state.articles[0]['point']} buttonName="上に投稿する" />
            <Button id={state.articles[1]['id']} point={state.articles[1]['point']} buttonName="下に投稿する"　/>
          </div>
            <p class="content">
              <Title text={state.articles[1]['text']} />
            </p>
        </div>
      );
    }
  }
}

export default Judge;
