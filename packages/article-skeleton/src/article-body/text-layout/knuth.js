import * as List from "./linkedlist"
import Node from "./node"

const defaults = () => ({
  demerits: {
    line: 10,
    flagged: 100,
    fitness: 3000
  },
  tolerance: 2
})

export const infinity = 10000

export const glue = (width, stretch, shrink) => ({
  type: 'glue',
  width: width,
  stretch: stretch,
  shrink: shrink
})

export const box = (width, index, value) => ({
  type: 'box',
  width: width,
  value: value,
  index: index
})

export const penalty = (width, penalty, flagged) => ({
  type: 'penalty',
  width: width,
  penalty: penalty,
  flagged: flagged
})

export default (nodes, lines, settings = defaults()) => {
  const options = defaults();
  if (settings.demerits) {
    if (settings.demerits.line) {
      options.demerits.line = settings.demerits.line
    }
    if (settings.demerits.flagged) {
      options.demerits.flagged = settings.demerits.flagged
    }
    if (settings.demerits.fitness) {
      options.demerits.fitness = settings.demerits.fitness
    }
  }
  if (settings.tolerance) {
    options.tolerance = settings.tolerance
  }

  const activeNodes = new List.LinkedList();
  const sum = {
    width: 0,
    stretch: 0,
    shrink: 0
  }
  const lineLengths = lines
  const breaks = []
  let tmp = {
    data: {
      demerits: Infinity
    }
  }

  const breakpoint = (position, demerits, ratio, line, fitnessClass, totals, previous) => ({
    position,
    demerits,
    ratio,
    line,
    fitnessClass,
    totals: totals || {
      width: 0,
      stretch: 0,
      shrink: 0
    },
    previous
  })

  const computeCost = (end, active, currentLine) => {
    let width = sum.width - active.totals.width
    let stretch = 0
    let shrink = 0
    let lineLength = currentLine < lineLengths.length
      ? lineLengths[currentLine - 1]
      : lineLengths[lineLengths.length - 1]

    if (nodes[end].type === "penalty") {
      width += nodes[end].width
    }

    if (width < lineLength) {
      stretch = sum.stretch - active.totals.stretch

      if (stretch > 0) {
        return (lineLength - width) / stretch
      } else {
        return infinity
      }
    } else if (width > lineLength) {
      shrink = sum.shrink - active.totals.shrink

      if (shrink > 0) {
        return (lineLength - width) / shrink
      } else {
        return infinity
      }
    } else {
      return 0
    }
  }

  const computeSum = (breakPointIndex) => {
    const result = {
      width: sum.width,
      stretch: sum.stretch,
      shrink: sum.shrink
    }
    let i = 0

    for (i = breakPointIndex; i < nodes.length; i += 1) {
      if (nodes[i].type === "glue") {
        result.width += nodes[i].width
        result.stretch += nodes[i].stretch
        result.shrink += nodes[i].shrink
      } else if (
        nodes[i].type === "box"
        || (nodes[i].type === 'penalty' && nodes[i].penalty === -infinity
          && i > breakPointIndex)) {
        break
      }
    }
    return result
  }

  const mainLoop = (node, index, nodes) => {
    let active = List.first(activeNodes)
    let next = null
    let ratio = 0
    let demerits = 0
    let candidates = []
    let badness
    let currentLine = 0
    let tmpSum
    let currentClass = 0
    let fitnessClass
    let candidate
    let newNode

    while (active !== null) {
      candidates = [
        { demerits: Infinity },
        { demerits: Infinity },
        { demerits: Infinity },
        { demerits: Infinity }
      ]

      while (active !== null) {
        next = active.next
        currentLine = active.data.line + 1
        ratio = computeCost(index, active.data, currentLine)

        if (ratio < -1 || (node.type === "penalty" && node.penalty === -infinity)) {
          List.remove(activeNodes, active)
        }

        if (-1 <= ratio && ratio <= options.tolerance) {
          badness = 100 * Math.pow(Math.abs(ratio), 3)

          if (node.type === "penalty" && node.penalty >= 0) {
            demerits =
              Math.pow(options.demerits.line + badness, 2) +
              Math.pow(node.penalty, 2)
          } else if (node.type === "penalty" && node.penalty !== -infinity) {
            demerits =
              Math.pow(options.demerits.line + badness, 2) -
              Math.pow(node.penalty, 2)
          } else {
            demerits = Math.pow(options.demerits.line + badness, 2)
          }

          if (node.type === "penalty" && nodes[active.data.position].type === "penalty") {
            demerits += options.demerits.flagged * node.flagged * nodes[active.data.position].flagged
          }

          if (ratio < -0.5) {
            currentClass = 0
          } else if (ratio <= 0.5) {
            currentClass = 1
          } else if (ratio <= 1) {
            currentClass = 2
          } else {
            currentClass = 3
          }

          if (Math.abs(currentClass - active.data.fitnessClass) > 1) {
            demerits += options.demerits.fitness
          }

          demerits += active.data.demerits

          if (demerits < candidates[currentClass].demerits) {
            candidates[currentClass] = {
              active,
              demerits,
              ratio
            }
          }
        }

        active = next

        if (active !== null && active.data.line >= currentLine) {
          break
        }
      }

      tmpSum = computeSum(index)

      for (fitnessClass = 0; fitnessClass < candidates.length; fitnessClass += 1) {
        candidate = candidates[fitnessClass]

        if (candidate.demerits < Infinity) {
          newNode = new Node(breakpoint(index, candidate.demerits, candidate.ratio,
            candidate.active.data.line + 1, fitnessClass, tmpSum, candidate.active))

          if (active !== null) {
            List.insertBefore(activeNodes, active, newNode)
          } else {
            List.push(activeNodes, newNode)
          }
        }
      }
    }
  }

  List.push(activeNodes, new Node(breakpoint(0, 0, 0, 0, 0, undefined, null)))

  nodes.forEach((node, index, nodes) => {
    if (node.type === 'box') {
      sum.width += node.width
    } else if (node.type === "glue") {
      if (index > 0 && nodes[index - 1].type === "box") {
        mainLoop(node, index, nodes)
      }
      sum.width += node.width
      sum.stretch += node.stretch
      sum.shrink += node.shrink
    } else if (node.type === "penalty" && node.penalty !== infinity) {
      mainLoop(node, index, nodes)
    }
  });

  if (List.size(activeNodes) !== 0) {
    List.forEach(activeNodes, node => {
      if (node.data.demerits < tmp.data.demerits) {
        tmp = node
      }
    })

    while (tmp !== null) {
      breaks.push({
        position: tmp.data.position,
        ratio: tmp.data.ratio
      })
      tmp = tmp.data.previous
    }
    return breaks.reverse()
  }

  return []
}