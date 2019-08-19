import { h, Component } from "preact";

class Home extends Component {

  render() {
    return (
      <div id="home">
        <p id="title">延々と表示されるクソコメをジャッジしていこう</p>
        <div id="links">
          <a href="/judge">ジャッジする</a>
          <a href="/comments/new">作成する</a>
        </div>
      </div>
    );
  }
}

export default Home;