const successColor = "#1B9E77";
const failColor = "#E57373";
const mainColor = "#6153A5";

const standardColors = ['#4D4283', '#7F74B9', '#BFB9DC', '#F3B931', '#F7D076', '#FBE8BA'];

export const assignStandardColors = (data, uniColor = false) => {
  data.forEach((data, i) => {
    data.color = uniColor ? mainColor : standardColors[i];
  });
};

export const assignBooleanColors = data => {
  if (!('Successful' in data[0])) {
    data.sort((a, b) => a.id > b.id ? 1 : -1); // to display success before fail in legend
  }
  data.forEach(data => {
    data.color = (data.id === "Success" || data.Successful) ? successColor : failColor;
  });
  return data.color;
};

export const assignTaskColors = data => {
  data.forEach(data => {
    data.Story_color = standardColors[0];
    data.Task_color = standardColors[1];
    data.Subtask_color = standardColors[2];
    data.Bug_color = "#F3B931";
  });
  
  return data;
};

export const getColor = data => data.color;

const formats = {
  // a: d => /(?:(?!-).)*/.exec(d)[0].substring(0, 12),
  wholeNumbers: d => Math.floor(d) === d && d,
  monthDate: "%b %d",
  // d: d => d,
  // e: d => /(?:(?!-).)*/.exec(d)[0].substring(0, 12)
  cutoffString: d => d.slice(0, 8) + (d.length > 8 ? "..." : ""),
  values: d => /(?:(?!-).)*/.exec(d)[0]
};

export const defaultConfig = (leftAxisTitle, bottomAxisTitle,
                              largeLeftSpaceRequired, largeBottomSpaceRequired,
                              leftLabelFormat, bottomLabelFormat) => {

    return ({
      margin: { top: 30, right: 20, bottom: largeBottomSpaceRequired ? 60 : 80, 
                left: largeLeftSpaceRequired ? 100 : 60},
      padding: .25,
      lineWidth: 3.5,
      // xScale: { type: "point" },
      // yScale: { 
      //   min: "auto", 
      //   max: "auto", 
      //   reverse: false
      // },
      pointSize: 8,
      pointBorderWidth: 8,
      pointLabel: "y",
      pointLabelYOffset: -12,
      useMesh: true,
      enableLabel: false,
      animate: true,
      motionStiffness: 90,
      motionDamping: 15,
      axisTop: null,
      axisRight: null,
      axisLeft: {
        "format": formats[leftLabelFormat],
        "orient": "left",
        "tickSize": 5,
        "tickPadding": 5,
        "tickRotation": 0,
        "legend": leftAxisTitle,
        "legendOffset": largeLeftSpaceRequired ? -80 : -40,
        "legendPosition": "middle"
      },
      axisBottom: {
        "format": formats[bottomLabelFormat],
        "orient": "bottom",
        "tickSize": 5,
        "tickPadding": 5,
        "tickRotation": largeBottomSpaceRequired ? 0 : -45,
        "legend": bottomAxisTitle,
        "legendOffset": largeBottomSpaceRequired ? 40 : 60,
        "legendPosition": "middle"
      },
      legends: [
        {
          "anchor": "top-right",
          "direction": "row",
          "justify": false,
          // "translateX": 0,
          "translateX": 30,
          "translateY": -35,
          "itemsSpacing": 5,
          "itemDirection": "left-to-right",
          "itemWidth": 80,
          "itemHeight": 20,
          "itemOpacity": 1,
          "symbolSize": 10,
          "symbolShape": "square",
          "symbolBorderColor": "rgba(0, 0, 0, .5)"
        }
      ],
      theme: {
        axis: {
          ticks: {
            text: {
              fontSize: "10px"
            },
          },
          // legend: {
          //   text: {
              // fill: "#aaaaaa"
            // }
          // }
        }
      },
    })
};