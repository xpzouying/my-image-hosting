const { ipcRenderer } = require("electron");
import React from "react";
import ReactDOM from "react-dom";

class PreviewElement extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let imageURL = this.props.imagesrc;

    return (
      <div className="media">
        <div className="media-left">
          <figure className="image is-64x64">
            <img src={imageURL} alt="Placeholder image" />
          </figure>
        </div>
        <div className="media-content">
          <p className="title is-4">图片信息</p>
          <p className="subtitle is-6">{this.props.imagesrc}</p>
        </div>
      </div>
    );
  }
}

class PreviewList extends React.Component {
  render() {
    let history = ipcRenderer.sendSync("preview-history");
    console.log("preview list history: ", history);

    let list = [];
    history.map((elem, index) => {
      list.push(<PreviewElement key={index} imagesrc={elem} />);
    });

    return (
      <div>
        <h1>history</h1>

        <hr />

        {list}
      </div>
    );
  }
}

ReactDOM.render(<PreviewList />, document.getElementById("history"));
