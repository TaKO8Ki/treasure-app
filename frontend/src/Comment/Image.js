import { h, Component } from "preact";
import { Router, Link } from 'preact-router';

class Image extends Component {
  constructor(props) {
    super();
    this.state.id = props.id
    this.state.article = ""
  }

  componentWillMount() {
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
    if (state.article != '') {
      return (
        <p class="image"><img src={"data:image/png;base64," + state.article['img']}/></p>
      )
    }
  }
}

export default Image;
