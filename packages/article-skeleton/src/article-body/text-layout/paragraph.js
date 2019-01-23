import React from "react"
import { measureElements, measureContainer, layoutText } from "@times-components/utils";

export default class Paragraph extends React.Component {
  constructor() {
    super()
    this.state = { elements: [] }
  }

  async componentDidMount() {
    const { elements, results } = measureElements(this.props.children)
    this.setState({
      elements
    });
    const sizes = await results
    const laidOut = layoutText(600, sizes)
    this.setState({
      elements: laidOut
    })
  }

  render() {
    return measureContainer(this.state.elements)
  }
}