import { h, Component } from "preact";
import Router from 'preact-router';
import Judge from './Comment/Judge';
import Form from './Form';
import Detail from './Comment/Detail';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state.text = ''
    this.state.reference_url = ''
    this.token = '';
  }

  render() {
    return (
      <div id="header">
        <a href="/">クソコメジャッジ（仮称）</a>
        <a class="create-button" href="/comments/new">作成する</a>
      </div>
    )
  }
  
}

export default Header;

