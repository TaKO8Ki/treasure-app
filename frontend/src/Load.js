import { h, Component } from "preact";

class Load extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div class="wrapper">
        <div class="balls-guruguru">
          <span class="ball ball-1"></span>
          <span class="ball ball-2"></span>
          <span class="ball ball-3"></span>
          <span class="ball ball-4"></span>
          <span class="ball ball-5"></span>
          <span class="ball ball-6"></span>
          <span class="ball ball-7"></span>
          <span class="ball ball-8"></span>
        </div>
      </div>
    );
  }
}

export default Load;

