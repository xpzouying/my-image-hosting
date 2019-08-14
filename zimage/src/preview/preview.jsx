import React from "react";
import ReactDOM from "react-dom";

class Element {
  constructor(url) {
    this.url = url;

    // TODO(zouying): use momentjs.com
    this.date = now();
  }
}

class PreviewElement extends React.Component {
  render() {
    return (
      <div className="media">
        <div className="media-left">
          <figure className="image is-48x48">
            <img
              src="https://bulma.io/images/placeholders/96x96.png"
              alt="Placeholder image"
            />
          </figure>
        </div>
        <div className="media-content">
          <p className="title is-4">图片信息</p>
          <p className="subtitle is-6">http://haha.ai</p>
        </div>
      </div>
    );
  }
}

class PreviewList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      elements: ["1", "2"]
    };
  }

  appendElement(el) {
    if (this.state.elements.length >= 5) {
      this.state.elements.shift();
    }

    this.state.elements.push(el);
  }

  render() {
    console.log(this.state.elements);

    let history = [];

    this.state.elements.map(() => {
      history.push(<PreviewElement />);
    });

    return (
      <div>
        <h1>history</h1>

        <hr />

        {history}
      </div>
    );
  }
}

ReactDOM.render(<PreviewList />, document.getElementById("history"));
