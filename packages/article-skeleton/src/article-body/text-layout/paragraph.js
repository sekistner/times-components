import React from "react"
import { Text, View } from "react-native"
import align from "./align"
import InlineElement from "./inlineElement"

export default class Article extends React.Component {
  constructor() {
    super()
    this.state = { result: [], measure: [] }
  }

  async measureText(text) {
    let els = []
    const promises = text.map((text, i) => {
      return new Promise(resolve => {
        els.push(<Text
          key={i}
          onLayout={e => {
            const result = {
              width: e.nativeEvent.layout.width,
              height: e.nativeEvent.layout.height,
              value: text.props.children,
              style: text.props.style
            }
            resolve(result)
          }}>
          {text}
        </Text>)
      })
    })
    this.setState(state => ({
      measure: state.measure.concat(els)
    }))
    const values = await Promise.all(promises)
    return values 
  }

  async measureInline(elements) {
    let els = []
    const promises = elements.map((el, i) => {
      return new Promise(resolve => {
        els.push({
          ...el,
          props: {
            ...el.props,
            onLayout: e => {
              const result = {
                width: e.nativeEvent.layout.width,
                height: e.nativeEvent.layout.height
              }
              resolve(result)
            }
          }
        })
      })
    })
    this.setState(state => ({
      measure: els.concat(state.measure)
    }))
    const values = await Promise.all(promises)
    return values
  }

  async componentDidMount() {
    const children = Array.isArray(this.props.children)
      ? this.props.children : [this.props.children]
    const inlines = children
      .filter(el => el.type === InlineElement)
    const textEls = children
      .filter(el => typeof el.props.children === "string")
    
    const splitEls = textEls.reduce((acc, el) => {
      return acc.concat(el.props.children.split(/\s/).concat([' ']).map(word => {
        return <Text style={el.props.style}>{word}</Text>
      }))
    }, [])

    const [words, inlineSizes] = await Promise.all([
      this.measureText(splitEls),
      this.measureInline(inlines.map(el => el.props.children({})))
    ])

    const inlineElements = []
    for (let i = 0; i < inlines.length; i++) {
      inlineElements.push({
        ...inlines[i].props,
        ...inlineSizes[i]
      })
    }

    let paragraphs = [[]]
    for (let word of words) {
      if (word.value === ' ') {
        paragraphs[paragraphs.length - 1].push(word);
        paragraphs.push([])
      }
      paragraphs[paragraphs.length - 1].push(word)
    }

    let lines = 0
    for (let paragraph of paragraphs) {
      let result = [];
      let tolerance = 1;
      if (paragraph[0].value === " ") {
        paragraph = paragraph.slice(1)
      }
      while (!result.length) {
        const nodes = align(lines, paragraph, inlineElements, 'left', 600, tolerance);
        while (true) {
          const node = nodes.next()
          if (node.done) {
            break
          }
          if (typeof node.value === 'number') {
            lines += node.value + 1
          } else {
            result.push(node.value)
          }
        }
        tolerance++
      }
      await new Promise(resolve => {
        this.setState(state => ({
          result: state.result.concat(result),
          measure: null
        }), resolve)
      });
    }
  }

  render() {
    const nodes = this.state.result.length ?
      this.state.result
      :
      this.state.measure
    return (
      <View style={{ flex: 0, alignItems: 'flex-start', justifyContent: 'flex-start' }}>
        {nodes}
      </View>
    );
  }
}