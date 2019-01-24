import React from "react"
import { Text, View } from "react-native"
import align from "./align"
import InlineElement from "./inlineElement"
export { default as InlineElement } from "./inlineElement"

export const measureContainer = children =>
  <View style={{ flex: 0, alignItems: 'flex-start', justifyContent: 'flex-start' }}>
    {children}
  </View>

export const measureText = (text) => {
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
  return {
    elements: els,
    results: Promise.all(promises)
  } 
}

export const measureInline = (elements) => {
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
  return {
    elements: els,
    results: Promise.all(promises)
  }
}

export function measureElements(childElements) {
  const children = Array.isArray(childElements) ? childElements : [childElements]
  const inlines = children
    .filter(el => el.type === InlineElement)
  const textEls = children
    .filter(el => typeof el.props.children === "string")
  
  const splitEls = textEls.reduce((acc, el) => {
    return acc.concat(el.props.children.split(/\s/).concat([' ']).map(word => {
      return <Text style={el.props.style}>{word}</Text>
    }))
  }, [])

  const { elements: wordElements, results: wordsResults } = measureText(splitEls)
  const { elements: inlineElements, results: inlineSizesResults } = measureInline(
    inlines.map(el => el.props.children({}))
  )

  const results = new Promise(async resolve => {
    const [words, inlineSizes] = await Promise.all([wordsResults, inlineSizesResults])
    return resolve({
      words,
      inlines,
      inlineSizes
    })
  })

  return {
    elements: wordElements.concat(inlineElements),
    results
  }
}

export const layoutText = (width, {inlines, words, inlineSizes}) => {
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
      const nodes = align(lines, paragraph, inlineElements, 'left', width, tolerance);
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
    const height = paragraph[0].height * lines
    return [result, height]
  }
}