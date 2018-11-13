import React from "react";
import styles from "./styles";

const DATAWRAPPER_URL = "https://datawrapper.dwcdn.net";

class Datawrapper extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {
      height: this.props.height,
      uri: null
    };

    this.onMessage = this.onMessage.bind(this);
  }

  onMessage(e) {
    const { embedId } = this.props;
    const { height } = this.state;

    const { data } = e;

    if (typeof data["datawrapper-height"] !== "undefined") {
      Object.keys(data["datawrapper-height"]).forEach(key => {
        if (key === embedId && data["datawrapper-height"][key] !== height) {
          this.setState(() => ({
            height: data["datawrapper-height"][key]
          }));
        }
      });
    }
  }

  componentDidMount() {
    const { embedId } = this.props;

    window.addEventListener("message", this.onMessage);
  }

  render() {
    const { embedId } = this.props;
    const { height } = this.state;
    const uri = `${DATAWRAPPER_URL}/${embedId}`;

    return (
      <div style={{ ...styles.DatawrapperBody, height }}>
        <iframe
          ref={webview => {
            this.webview = webview;
          }}
          src={uri}
          style={{ ...styles.DatawrapperWebView, height }}
        />
      </div>
    );
  }
}

Datawrapper.defaultProps = {
  height: 0
};

export default Datawrapper;
