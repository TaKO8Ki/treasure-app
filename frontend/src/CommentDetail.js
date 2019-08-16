import { h, Component } from "preact";

class CommentDetail extends Component {
  constructor(props) {
    super();
    this.state.id = props.id
    this.state.article = ""
  }

  commentDetail() {
    fetch('http://localhost:1991/comments/' + this.state.id)
    .then(function(res) {
      res.json()
      .then(t => {
        console.log(t)
        this.setState({article: t})
      })
    }.bind(this))
  }

  componentDidMount() {
    this.commentDetail()
  }

  render(props, state) {
    return (
      <p>
        {state.article['text']}、{state.article['reference_url']}、{state.article['point']}
      </p>
    )
  }
}

export default CommentDetail;
