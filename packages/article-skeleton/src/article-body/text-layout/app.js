import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Paragraph from "./paragraph"
import InlineElement from './inlineElement'

const article = "Patients with injuries that are not life-threatening will have to wait longer in A&E, the head of the NHS indicated today. Simon Stevens, chief executive of NHS England, gave a strong hint that the main target will be relaxed after hospitals failed to hit it for two years. Theresa May refused yesterday to guarantee that a £20 billion NHS budget boost, part of a new ten-year plan for the future of the NHS, would bring down waiting times. Today Mr Stevens suggested that the proposals would effectively end the commitment that all A&E patients should be assessed and either treated or admitted to a bed within four hours. The Times revealed this morning the plans will not demand that hospitals start hitting A&E or routine…"

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Paragraph>
          <InlineElement start={0} align={"left"}>
            {style => <View key="inline1" style={style}>
              <View style={StyleSheet.compose(styles.inline, { marginTop: 0, height: 55 })}></View>
            </View>}
          </InlineElement>
          <InlineElement start={6} align={"left"}>
            {style => <View key="inline2" style={style}>
              <View style={StyleSheet.compose(styles.inline, { width: 200, height: 89, margin: 0, marginRight: 5 })}></View>
            </View>}
          </InlineElement>
          <InlineElement start={14} align={'right'}>
            {style => <View key="inline3" style={style}>
              <View style={StyleSheet.compose(styles.inline, { height: 100 })}></View>
            </View>}
          </InlineElement>
          <Text style={{lineHeight: 30, fontSize: 18}}>{article}</Text>
          <Text style={{lineHeight: 45, fontWeight: '800'}}>test bold text test bold text test bold text</Text>
          <Text style={{lineHeight: 23, fontStyle: 'italic'}}>test italic text test italic text</Text>
        </Paragraph>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  inline: {
    backgroundColor: "gray",
    margin: 5,
    width: 50,
    flex: 0,
    height: 40
  }
});
