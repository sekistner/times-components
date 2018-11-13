import React from "react";
import { View, WebView } from "react-native";

const DATAWRAPPER_URL = "https://datawrapper.dwcdn.net";

class Datawrapper extends React.Component {
  constructor() {
    super();
    this.state = {
      height: 0
    };
    this.onMessage = this.onMessage.bind(this);
    this.onLoadEnd = this.onLoadEnd.bind(this);
  }

  onMessage(e) {
    const { embedId } = this.props;
    const { height } = this.state;

    if (
      (e && e.nativeEvent && e.nativeEvent.data) ||
      e.nativeEvent.data === "0"
    ) {
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
    } else {
      console.error(`Invalid height received ${e.nativeEvent.data}`); // eslint-disable-line no-console
    }
  }

  onLoadEnd() {
    console.log("on load end");
    this.webview.postMessage("thetimes.co.uk", "*");
  }

  render() {
    const { embedId } = this.props;
    const { height } = this.state;
    const uri = `${DATAWRAPPER_URL}/${embedId}`;

    console.log({ uri });
    return (
      <View style={{ height }}>
        <WebView
          onLoadEnd={this.onLoadEnd}
          onMessage={this.onMessage}
          ref={webview => {
            this.webview = webview;
          }}
          source={{
            uri
          }}
          style={{ height }}
        />
      </View>
    );
  }
}

export default Datawrapper;
