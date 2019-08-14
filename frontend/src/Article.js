import { h, Component } from "preact";

class Article extends Component {
  constructor() {
    super();
    this.state.articles = 1
  }

  setArticles() {
    
  }

  componentDidMount() {
    fetch('http://localhost:1991/articles')
    .then(function(res) {
      res.text()
      .then(t => {
        this.setState({
          articles: t
        })
      })
    })
    // this.setArticles.bind(this)
  }

  render(props, state) {
    return (<div>{state.articles.map(v => v.id).join('')}</div>)
  }
}

export default Article;
