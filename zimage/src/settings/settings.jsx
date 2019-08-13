import React from "react";
import ReactDOM from "react-dom";

class Input extends React.Component {
  render() {
    return (
      <div className="field has-addons">
        <p className="control">
          <a className="button is-static">{this.props.label}</a>
        </p>

        <p className="control">
          <input
            required
            className="input"
            type="text"
            placeholder={this.props.placeholder}
          />
        </p>
      </div>
    );
  }
}

const CosForm = () => {
  return (
    <div className="container">
      <Input label="Region" placeholder="ap-beijing" />
      <Input label="Bucket" placeholder="your bucket" />
      <Input label="secretid" placeholder="COS_SECRETID" />
      <Input label="secretkey" placeholder="COS_SECRETKEY" />

      <p className="control">
        <a className="button is-primary">保存</a>
      </p>
    </div>
  );
};

const settingsElement = (
  <section className="section">
    <div className="container">
      <div className="tabs is-centered is-boxed is-medium">
        <ul>
          <li className="is-active">
            <a>腾讯云</a>
          </li>

          <li>
            <a>阿里云</a>
          </li>

          <li>
            <a>关于</a>
          </li>
        </ul>
      </div>

      <CosForm />
    </div>
  </section>
);

ReactDOM.render(settingsElement, document.getElementById("settings"));
