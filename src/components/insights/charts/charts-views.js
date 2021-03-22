export const greyHues = ["#1E1D1B", "#5B5851", "#7A756C", "#B1AeA7", "#E6E5E3", "#F0EFEE", "#F9F9F8"];
export const goldHues = ["#F1AD0F", "#F5C453", "#F9DC98", "#FDF3DD"];
export const purpleHues = ["#494173", "#7368AA", "#ABA4CC", "#E3E1EE"];
// const darkHues = ["#342503", "#4E3805", "#684A06", "#825D08"];

export const standardColors = ["#5B5851", "#7A756C", "#ABA4CC", "#B1AeA7", "#7368AA", "#A8D0DB", "#494173"];
// purpleHues.forEach((_, i) => standardColors.push(greyHues[greyHues.length - i - 2], purpleHues[i + 1]));

const failColor = "#E57373";
const mainColor = "#5B5851";
export const mainGold = goldHues[0];
export const mainPurple = purpleHues[0];

export const assignStandardColors = (data, uniColor = false) => {
  if (data) {
    data.forEach((data, i) => {
      data.color = uniColor ? mainColor : standardColors[i];
    });
  }
};

export const assignMonochromaticColors = (data) => {
  if (data) {
    data.forEach((data, i) => {
      data.color = greyHues[i];
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
    data.Story_color = standardColors[3];
    data.Task_color = "#ABA4CC"; // or #A8D0DB
    data.Subtask_color = standardColors[1];
    data.Bug_color = failColor;
  });
  
  return data;
};

export const assignHealthColors = data => {
  data.forEach(data => {
    data["To Do_color"] = standardColors[0];
    data["In Development_color"] = standardColors[1];
    data["In Progress_color"] = standardColors[2];
    data["Peer Review_color"] = standardColors[3];
    data["Testing_color"] = standardColors[4];
    data["Done_color"] = standardColors[5];
  });
  
  return data;
};

export const assignSeverityColors = data => {
  data.forEach(data => {
    data["Critical_color"] = standardColors[0];
    data["Low_color"] = standardColors[1];
    data["Medium_color"] = standardColors[2];
    data["High_color"] = standardColors[3];
    data["Negligible_color"] = standardColors[4];
  });
  
  return data;
};

export const assignStageColors = data => {
  data.forEach(data => {
    data["Repository Upload_color"] = standardColors[0];
    data["Approval_color"] = standardColors[1];
    data["Unit Testing_color"] = standardColors[2];
    data["Script_color"] = standardColors[3];
    data["Build_color"] = standardColors[4];
  });
  
  return data;
};

export const getColor = data => data.color;
export const getColorByData = data => data.data.color;
export const getColorById = data => data.id === "Successful" ? mainColor : failColor;
export const getTaskColor = ({ id, data }) => data[`${id}_color`];

export const shortenLegend = datas => datas.forEach(data => data.id.length > 10 ? data.id = data.id.slice(0, 10) + "..." : data.id);

const formats = {
  numbers: d => /\d+\.?\d*$/.exec(d),
  wholeNumbers: d => Math.floor(d) === d && d,
  monthDate: "%b %d",
  monthDate2: d => { var date = new Date(d).toDateString(); date = date.split(" "); return date[1]+" "+date[2]; },
  yearMonthDate: d => d.split("T")[0],
  cutoffString: d => d.slice(0, 8) + (d.length > 8 ? "..." : ""),
  values: d => /(?:(?!-).)*/.exec(d)[0],
  subString: d => (typeof d === "string" ? d.substring(0, 6) : ""),
};

export const defaultConfig = (leftAxisTitle="", bottomAxisTitle="",
                              largeLeftSpaceRequired=false, largeBottomSpaceRequired=false,
                              leftLabelFormat="", bottomLabelFormat="", isLegendHidden=false) => ({
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
    "legendPosition": "middle",
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
      "itemOpacity": isLegendHidden ? 0 : 1,
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
});