const greyHues = ["#3D3B36", "#63625E", "#8A8986", "##B1B0AE"];
// const greyHues = ["#5B5851", "#7A756C", "#B1AeA7", "#E6E5E3"];
const purpleHues = ["#494173", "#7368AA", "#ABA4CC", "#E3E1EE"];
const goldHues = ["#F1AD0F", "#F5C453", "#F9DC98", "#FDF3DD"];
const darkHues = ["#342503", "#4E3805", "#684A06", "#825D08"];

const standardColors = [...greyHues.map((_, i) => [greyHues[i], goldHues[i], purpleHues[i], darkHues[i]])];

const failColor = "#E57373";
const mainColor = greyHues[0];

export const assignStandardColors = (data, uniColor = false) => {
  if (data) {
    data.forEach((data, i) => {
      data.color = uniColor ? mainColor : standardColors[i];
    });
  }
};

export const assignBooleanColors = data => {
  if (data && data[0] && !('Successful' in data[0])) {
    data.sort((a, b) => a.id > b.id ? 1 : -1); // to display success before fail in legend
  }
  data.forEach(data => {
    data.color = (data.id === "Success" || data.Successful) ? mainColor : failColor;
  });
  return data.color;
};

export const assignTaskColors = data => {
  data.forEach(data => {
    data.Story_color = mainColor;
    data.Task_color = greyHues[2];
    data.Subtask_color = greyHues[1];
    data.Bug_color = goldHues[0];
  });
  
  return data;
};

export const assignHealthColors = data => {
  data.forEach(data => {
    data["To Do_color"] = mainColor;
    data["In Development_color"] = greyHues[3];
    data["In Progress_color"] = greyHues[2];
    data["Peer Review_color"] = greyHues[1];
    data["Testing_color"] = greyHues[0];
    data["Done_color"] = goldHues[0];
  });
  
  return data;
};

export const assignSeverityColors = data => {
  data.forEach(data => {
    data["Critical_color"] = goldHues[0];
    data["Low_color"] = greyHues[2];
    data["Medium_color"] = greyHues[1];
    data["High_color"] = greyHues[0];
    data["Negligible_color"] = mainColor;
  });
  
  return data;
};

export const getColor = data => data.color;
export const getColorById = data => data.id === "Successful" ? mainColor : failColor;

const formats = {
  wholeNumbers: d => Math.floor(d) === d && d,
  monthDate: "%b %d",
  yearMonthDate: d => d.split("T")[0],
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
          "translateX": 0,
          "translateY": -35,
          "itemsSpacing": 20,
          "itemDirection": "right-to-left",
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
        }
      },
    })
};