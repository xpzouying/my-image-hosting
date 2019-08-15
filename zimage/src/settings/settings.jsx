import React from "react";
import ReactDOM from "react-dom";
const { ipcRenderer } = require("electron");

let config = ipcRenderer.sendSync("init-config-v2");

class Input extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value
    };
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    });

    this.props.onInputChange && this.props.onInputChange(event.target.value);
  }

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
            value={this.state.value}
            onChange={event => {
              this.handleChange(event);
            }}
          />
        </p>
      </div>
    );
  }
}

class CosForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cosConfig: config.cos
    };

    this.submitClick = this.submitClick.bind(this);
    this.onRegionInputChange = this.onRegionInputChange.bind(this);
    this.onBucketInputChange = this.onBucketInputChange.bind(this);
    this.onSecretKeyChange = this.onSecretKeyChange.bind(this);
    this.onSecretIDChange = this.onSecretIDChange.bind(this);
  }

  submitClick() {
    console.log("cos submit click: ", this.state.cosConfig);
    ipcRenderer.sendSync("save-cos-config", this.state.cosConfig);
  }

  onRegionInputChange(value) {
    var cfg = this.state.cosConfig;
    cfg.region = value;
    this.setState({ cosConfig: cfg });
  }

  onBucketInputChange(value) {
    var cfg = this.state.cosConfig;
    cfg.bucket = value;
    this.setState({ cosConfig: cfg });
  }

  onSecretKeyChange(value) {
    var cfg = this.state.cosConfig;
    cfg.secretkey = value;
    this.setState({ cosConfig: cfg });
  }

  onSecretIDChange(value) {
    var cfg = this.state.cosConfig;
    cfg.secretid = value;
    this.setState({ cosConfig: cfg });
  }

  render() {
    var cfg = this.state.cosConfig;
    console.log("render config: ", cfg);
    var region = cfg ? cfg.region : "";
    var bucket = cfg ? cfg.bucket : "";
    var secretid = cfg ? cfg.secretid : "";
    var secretkey = cfg ? cfg.secretkey : "";

    return (
      <div className="container">
        <Input
          label="Region"
          placeholder="ap-beijing"
          value={region}
          onInputChange={this.onRegionInputChange}
        />

        <Input
          label="Bucket"
          placeholder="your bucket"
          value={bucket}
          onInputChange={this.onBucketInputChange}
        />

        <Input
          label="secretid"
          placeholder="COS_SECRETID"
          value={secretid}
          onInputChange={this.onSecretIDChange}
        />

        <Input
          label="secretkey"
          placeholder="COS_SECRETKEY"
          value={secretkey}
          onInputChange={this.onSecretKeyChange}
        />

        <p className="control" onClick={this.submitClick}>
          <a className="button is-primary">保存</a>
        </p>
      </div>
    );
  }
}

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
