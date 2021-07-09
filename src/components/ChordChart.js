import React from 'react';
import ChordDiagram from 'react-chord-diagram'
import useWindowDimensions from '../helpers/userWindowDimensions'
import './ChordChart.scss';

export default function Chords(props) {
  const { height, width } = useWindowDimensions();

  const data = [...props.graphData.topArtists]

  // Currently, about 15 songs looks the best for the graph
  const nameOrGenres = [];
  const slicedArray = data.slice(0, 15);
  for (let i = 0; i < 15; i++) {
    nameOrGenres.push(data[i].name, ...data[i].genres)
  }

  // Remove any duplicates from the mega array
  const all = [...new Set(nameOrGenres)]

  const realData = []
  all.forEach((allElement) => {
    const realObj = {
      // source: ""
      // target: []
    }
    // Bowie
    realObj.source = allElement

    const targetArr = []
    slicedArray.forEach((sliceElement) => {
      if (sliceElement.name === allElement) {
        // Push all genres into target
        targetArr.push([...sliceElement.genres])
      } else {
        // Name doesn't match, look through all genres for match
        sliceElement.genres.forEach((genreElement) => {
          // One of the artist's genres matches, push it to target
          if (genreElement === allElement) {
            targetArr.push(sliceElement.name)
          }
        })
      }
      realObj.target = targetArr;
    })
    realData.push(realObj)
  })

  // Create an array of arrays where the axes correspond to their target
  // finalArray length will be the same length of each inner array's length
  const finalArray = []
  for (const axis of realData) {
    const eachMatch = [];

    all.forEach((element) => {
      if (axis.target.find((relation) => relation === element)) {
        eachMatch.push(1)
      } else {
        eachMatch.push(0)
      }
    })
    finalArray.push(eachMatch)
  }

  // Making random colors
  const random = () => {
    return "rgb(" + (Math.floor(Math.random() * 100) + 75) + "," + (Math.floor(Math.random()*100) + 155) + "," + (Math.floor(Math.random() * 100) + 75) + ")"
  }

  const colors = [];
  all.forEach(() => colors.push(random()))

  const tmpStyle = {
    display: 'flex',
    justifyContent: "center",
    alignContent: "center",
    width: "100%"
  };


  return (
    <div style={tmpStyle}>
      <ChordDiagram
      matrix={finalArray}
      componentId={1}
      groupLabels={all}
      labelColors={colors}
      groupColors={colors}
      padAngle={.04}
      height={height + 50}
      width={width}
      outerRadius={250}
      innerRadius={225}
      strokeWidth={1.5}
      persistHoverOnClick={true}
      disableHover={false}
      style={{
        backgroundColor: "#292929",
        font: '14px cambria',
        wordWrap: "break-word"
      }}
    />
    </div>
  );
}
