const { ipcRenderer } = require("electron");
import React from "react";
import ReactDOM from "react-dom";
const moment = require("moment");

class PreviewElement extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let elem = this.props.element;
    let date = moment(elem.date).format("LLL");

    return (
      <div className="media">
        <div className="media-left">
          <figure className="image is-96x96">
            <img alt="Placeholder image" src={elem.thumbnail} />
          </figure>
        </div>
        <div className="media-content">
          <p className="subtitle is-6">{elem.url}</p>
          <p className="is-6">{date}</p>
        </div>
      </div>
    );
  }
}

class PreviewList extends React.Component {
  render() {
    let history = ipcRenderer.sendSync("preview-history");

    let list = [];
    history.map((elem, index) => {
      list.push(<PreviewElement key={index} element={elem} />);
    });

    return <div>{list}</div>;
  }
}

ReactDOM.render(<PreviewList />, document.getElementById("history"));
