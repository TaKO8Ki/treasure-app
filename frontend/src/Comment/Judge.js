import { h, Component } from "preact";
import { Router, Link } from 'preact-router';
import Title from "./Title";
import Point from "./Point";
import Button from "./Button";
import Detail from "./Detail";
import Image from "./Image";
import Load from "../Load";

class Judge extends Component {
  constructor(props) {
    super(props);
    this.state.loading = true
    this.state.articles = []
    this.state.pageStatus = true
    this.changePageStatus = this.changePageStatus.bind(this)
    this.selectedCommentId = ""
  }

  changePageStatus(id) {
    this.setState({
      pageStatus: false,
      selectedCommentId: id
    })
  }

  setTest() {
    this.setState({
      pageStatus: true
    })
    window.location.reload(false);
  }

  componentWillMount() {
    fetch('http://localhost:1991/random_comments')
    .then(function(res) {
      res.json()
      .then(t => {
        this.setState({articles: t})
        setTimeout(
          function () {
            this.setState({loading: false})
          }.bind(this),
          "1500"
        )
      })
    }.bind(this))
  }
  
  render(props, state) {
    if (state.loading) {
      return (
        <div id="judge">
          <p id="title">クソコメ探索中...</p>
          <Load />
        </div>
      )
    } else if (state.articles[0] != undefined && state.pageStatus) {
      return (
        <div id="judge">
          <p id="title">ジャッジする</p>
          <p class="content question">
            どっちの方がクソコメですか？
          </p>
          <p class="content">
            <Title text={state.articles[0]['text']} />
          </p>
          <div id="button">
            <Button id={state.articles[0]['id']} point={state.articles[0]['point']} buttonName="上に投稿する" changePageStatus={this.changePageStatus} />
            <Button id={state.articles[1]['id']} point={state.articles[1]['point']} buttonName="下に投稿する" changePageStatus={this.changePageStatus}　/>
          </div>
          <p class="content">
            <Title text={state.articles[1]['text']} />
          </p>
        </div>
      );
    } else {
      return (
        <div id="judge" class="slide">
          <Image id={state.selectedCommentId} />
          <p class="content"><Detail id={state.selectedCommentId} /></p>
          <div id="button">
            <a href="/judge" onClick={this.setTest.bind(this)}>ジャッジし直す</a>
          </div>
        </div>
      )
    }
  }
}

export default Judge;
