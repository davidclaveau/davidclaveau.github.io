import React, { useState, useEffect } from 'react';
import Radar from 'react-d3-radar';
import * as d3 from 'd3'
import useWindowDimensions from '../helpers/userWindowDimensions';
import { select } from 'd3';


export default function RadarGraph(props) {
  const tmpStyle = {
    display: "flex"
  }

  const [tracksNames, setTracksNames] = useState();
  const [tracksAnalysis, setTracksAnalysis] = useState();
  const [audioFeatures, setAudioFeatures] = useState();
  const [sets, setSets] = useState();

  const transformData = function (values) {
    let result = [];
    values &&
    values.forEach((value) => {
        let set = {};
        set['key'] = value.id;
        set['values'] = {
          danceability: value.danceability,
          energy: value.energy,
          speechiness: value.speechiness,
          acousticness: value.acousticness,
          instrumentalness: value.instrumentalness,
          liveness: value.liveness,
          valence: value.valence,
        };
        result.push(set);
      });
    return result;
  };

  useEffect(() => {
    setAudioFeatures([
      { key: 'danceability', label: 'Danceability' },
      { key: 'energy', label: 'Energy' },
      { key: 'speechiness', label: 'Speechiness' },
      { key: 'acousticness', label: 'Acousticness' },
      { key: 'instrumentalness', label: 'Instrumentalness' },
      { key: 'liveness', label: 'Liveness' },
      { key: 'valence', label: 'Valence' },
    ]);

    setTracksNames(props.dataGraphFirst.top10Tracks);
    setTracksAnalysis(props.dataGraphSecond.tracksAnalysis);
    setSets(transformData(tracksAnalysis));

  }, [props.dataGraphFirst.top10Tracks, props.dataGraphSecond.tracksAnalysis, tracksAnalysis])

  const { height, width } = useWindowDimensions();

  const topTracks = d3.select('#top-tracks')

  topTracks.selectAll('li')
      .data(tracksNames)
      .enter()
      .append('li')
      .text((d) => {
        return d.name
      })
      .on("mouseover", function(event, d) {
        for (const element of tracksAnalysis) {
          if (element.id === d.id) {
            select(this)
              .style("background-color", "#f3f3f3")

            setSets([
              {
                key: element.id,
                values: {
                  danceability: element.danceability,
                  energy: element.energy,
                  speechiness: element.speechiness,
                  acousticness: element.acousticness,
                  instrumentalness: element.instrumentalness,
                  liveness: element.liveness,
                  valence: element.valence,
                }
              }
            ])
          }
        }
      })
      .on("mouseout", (event, d) => {
        setSets(transformData(tracksAnalysis))
        topTracks.selectAll("li")
              .style("background-color", "white")
      })


  const createRadar = () => {
    return (
      <Radar
        width={width / 2}
        height={height / 2}
        padding={50}
        domainMax={1}
        highlighted={null}
        data={{
          variables: audioFeatures,
          sets: sets,
        }}
      />
    );
  };

  return (
    <div id="#radar" style={tmpStyle}>
      {tracksNames && tracksAnalysis && createRadar()}
      <div className="d-flex flex-column p-2 m-2">
        <span className="d-flex bg-primary text-white">
          Top 10 Tracks
        </span>
        <ul id="top-tracks">
        </ul>
      </div>
    </div>
  );
}
