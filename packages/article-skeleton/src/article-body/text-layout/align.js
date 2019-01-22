import React from 'react'
import { Text } from 'react-native'
import formatter from "./formatter"
import linebreak, { infinity } from "./knuth"

export default function* align(begin, text, inlines, type, lineLength, tolerance, center) {
  const format = formatter(text);
  const nodes = format[type](text);
  let lineLengths = []
  for (let {start, height: inlineHeight, width} of inlines) {
    while (lineLengths.length < start) {
      lineLength.push(lineLength);
    };
    const end = start + Math.floor(inlineHeight / text[0].height)
    while (lineLengths.length <= end) {
      lineLengths.push(lineLength - width)
    }
  }
  lineLengths.push(lineLength)
  lineLengths = lineLengths.slice(begin)
  const breaks = linebreak(nodes, lineLengths, { tolerance: tolerance });
  if (breaks.length !== 0) {
    const lines = []
    let lineStart = 0
    for (let i = 1; i < breaks.length; i += 1) {
      const point = breaks[i].position;
      const r = breaks[i].ratio;
      for (var j = lineStart; j < nodes.length; j += 1) {
        // After a line break, we skip any nodes unless they are boxes or forced breaks.
        if (nodes[j].type === 'box' || (nodes[j].type === 'penalty' && nodes[j].penalty === -infinity)) {
          lineStart = j;
          break;
        }
      }
      lines.push({ ratio: r, nodes: nodes.slice(lineStart, point + 1), position: point });
      lineStart = point;
    }
    let height = text[0].height
    let y = (-height) + (begin * height);
    let lineIndex = 0;
    let textIndex = 0
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      let x = 0;
      let lineLength = lineIndex < lineLengths.length ? lineLengths[lineIndex] : lineLengths[lineLengths.length - 1];
      if (center) {
        x += (maxLength - lineLength) / 2;
      }

      height = (i !== 0 ? lines[i - 1] : line).nodes.reduce((acc, node) => {
        if (node.type === "box" && text[node.index].height > acc) {
          return text[node.index].height
        } else {
          return acc
        }
      }, 0)
      y += height

      let hasInline = false
      for (let i = 0; i < inlines.length; i++) {
        let { start, height: inlineHeight, width, align, children } = inlines[i]
        const end = start + Math.floor(inlineHeight / height)
        if ((lineIndex + begin) >= start && (lineIndex + begin) <= end) {
          hasInline = { start, end, width, align, children }
          break
        }
      }

      if (hasInline && hasInline.align === 'left') {
        if ((lineIndex + begin) === hasInline.start) {
          yield hasInline.children({
            top: y,
            left: x,
            width: hasInline.width,
            position: 'absolute',
            height: ((hasInline.end + 1) - hasInline.start) * height
          })
        }
        x += hasInline.width
      }

      if (hasInline && hasInline.align === 'right') {
        if ((lineIndex + begin) === hasInline.start) {
          yield hasInline.children({
            top: y,
            left: lineLengths[lineIndex],
            width: hasInline.width,
            position: 'absolute',
            height: ((hasInline.end + 1) - hasInline.start) * height
          })
        }
      }

      yield (
        line.nodes.map(node => {
          switch (node.type) {
            case "box":
              if (node.value === ' ') {
                return null
              }
              if (node.value === '\n') {
                return null
              }
              x += node.width
              textIndex++
              return <Text
                key={textIndex - 1}
                style={{
                  ...text[node.index].style,
                  position: 'absolute',
                  width: Math.ceil(node.width) + 1,
                  height: node.height,
                  left: Math.ceil(x - node.width),
                  top: y
                }}
              >{node.value}</Text>
            case "glue":
              x += node.width + line.ratio *
                (line.ratio < 0 ? node.shrink : node.stretch);
            case "penalty":
              return null
          }
        }).filter(el => el !== null))
      lineIndex++
    }
    yield lineIndex
  }
  return [];
}