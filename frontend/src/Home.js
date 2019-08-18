import { h, Component } from "preact";

class Home extends Component {

  render() {
    return (
      <div>
        <a href="/judge">ジャッジする</a>
        <a href="/comments/new">作成する</a>
      </div>
    );
  }
}

export default Home;