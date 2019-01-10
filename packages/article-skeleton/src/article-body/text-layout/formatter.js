import { glue, box, penalty, infinity } from "./knuth"

export const defaults = {
  space: {
    width: 3,
    stretch: 6,
    shrink: 9
  }
}

export default (words, options) => {
  const o = {
    space: {
      width: options && options.space.width || 3,
      stretch: options && options.space.stretch || 6,
      shrink: options && options.space.shrink || 9
    }
  }

  return {
    center () {
      const nodes = []

      // Although not specified in the Knuth and Plass whitepaper, this box is necessary
      // to keep the glue from disappearing.
      nodes.push(box(0, ''))
      nodes.push(glue(0, 12, 0))

      for (let i = 0; i < words.length; i++) {
        const word = words[i].length
        nodes.push(box(words[i].width, word))
        if (i === words.length - 1) {
          nodes.push(glue(0, 12, 0))
          nodes.push(penalty(0, -infinity, 0))
        } else {
          nodes.push(glue(0, 12, 0) )
          nodes.push(penalty(0, 0, 0))
          nodes.push(glue(spaceWidth, -24, 0))
          nodes.push(box(0, ''))
          nodes.push(penalty(0, infinity, 0))
          nodes.push(glue(0, 12, 0))
        }
      }
      return nodes
    },
    justify () {
      const nodes = []
      const spaceStretch = (spaceWidth * o.space.width) / o.space.stretch
      const spaceShrink = (spaceWidth * o.space.width) / o.space.shrink

      for (let i = 0; i < words.length; i++) {
        const word = words[i].value
        nodes.push(box(words[i].width, word))
        if (i === words.length - 1) {
          nodes.push(glue(0, infinity, 0))
          nodes.push(penalty(0, -infinity, 1))
        } else {
          nodes.push(glue(spaceWidth, spaceStretch, spaceShrink))
        }
      }
      return nodes
    },
    left () {
      const nodes = []

      let spaces = words
        .map((word, i) => word.value === " " ? [word.width, i] : null)
        .filter(pair => pair !== null)
      for (let i = 0; i < words.length; i++) {
        if (spaces[0][1] < i) {
          spaces.shift()
        }
        const spaceWidth = spaces[0][0]
        const word = words[i].value
        nodes.push(box(words[i].width, i, word))
        if (i === words.length - 1) {
          nodes.push(glue(0, infinity, 0))
          nodes.push(penalty(0, -infinity, 1))
        } else {
          nodes.push(glue(0, 12, 0))
          nodes.push(penalty(0, 0, 0))
          nodes.push(glue(spaceWidth, -12, 0))
        }
      }
      return nodes
    }
  }
}