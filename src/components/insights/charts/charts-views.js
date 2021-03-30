import {capitalizeFirstLetter} from "components/common/helpers/string-helpers";
import { da } from "date-fns/locale";

export const mainColor = "#5B5851";
export const mainGold = "#F1AD0F";
export const mainPurple = "#494173";
export const accentColor = "#A8D0DB";
export const failColor = "#E57373";
export const warningColor = "#F1AD0F";

export const greyHues = ["#1E1D1B", "#5B5851", "#7A756C", "#B1AeA7", "#E6E5E3", "#F0EFEE", "#F9F9F8"];
export const goldHues = [mainGold, "#F5C453", "#F9DC98", "#FDF3DD"];
export const purpleHues = [mainPurple, "#7368AA", "#ABA4CC", "#E3E1EE"];
// const darkHues = ["#342503", "#4E3805", "#684A06", "#825D08"];

export const standardColors = [mainColor, "#7A756C", "#ABA4CC", accentColor, "#7368AA", "#B1AeA7", "#494173", "#E6E5E3"];
export const gradationalColors = ["#B1AeA7", "#7A756C", mainColor, "#1E1D1B"];
// purpleHues.forEach((_, i) => standardColors.push(greyHues[greyHues.length - i - 2], purpleHues[i + 1]));

export const assignStandardColors = (data, uniColor = false) => {
  if (data) {
    data.forEach((data, i) => {
      data.color = uniColor ? mainColor : standardColors[i];
    });
  }
};

export const assignBooleanColors = data => {
  if (data && data[0] && !("Successful" in data[0])) {
    data.sort((a, b) => a.id > b.id ? 1 : -1); // to display success before fail in legend
  }

  data.forEach(data => {
    if (data.id) {
      data.color = (data.id === "Success" || data.Successful) ? mainColor : failColor;
    } else {
      data.Success_color = mainColor;
      data.Failed_color = failColor;
    }
  });
  return data.color;
};

export const assignIssueColors = data => {
  if (data) {
    data.forEach(data => {
      data.color = (data.id === "Issues Created") ? warningColor : mainColor;
    });
  }
  return data.color;
};

export const assignTaskColors = data => {
  if (data) {
    data.forEach(data => {
      data.Story_color = accentColor;
      data.Task_color = "#7368AA";
      data.Subtask_color = mainColor;
      data.Bug_color = failColor;
    });
  }

  return data;
};

export const assignHealthColors = data => {
  if (data) {
    data.forEach(data => {
      data["To Do_color"] = mainColor;
      data["In Development_color"] = standardColors[1];
      data["In Progress_color"] = standardColors[2];
      data["Peer Review_color"] = standardColors[3];
      data["Testing_color"] = standardColors[4];
      data["Done_color"] = standardColors[5];
      data["For Development_color"] = standardColors[6];
      data["Production Deploy_color"] = standardColors[7];
    });
  }
  
  return data;
};

export const assignSeverityColors = data => {
  if (data) {
    data.forEach(data => {
      data["Critical_color"] = standardColors[0];
      data["Low_color"] = standardColors[1];
      data["Medium_color"] = standardColors[2];
      data["High_color"] = standardColors[3];
      data["Negligible_color"] = standardColors[4];
    });
  }
  
  return data;
};

export const assignStageColors = data => {
  if (data) {
    data.forEach(data => {
      data["Repository Upload_color"] = standardColors[0];
      data["Approval_color"] = standardColors[1];
      data["Unit Testing_color"] = standardColors[2];
      data["Script_color"] = standardColors[3];
      data["Build_color"] = standardColors[4];
    });
  }
  
  return data;
};

export const assignVelocityColors = data => {
  if (data) {
    data.forEach(data => {
      data["Committed_color"] = mainColor;
      data["Completed_color"] = gradationalColors[0];
    });
  }
  
  return data;
};

export const getColor = data => data.color;
export const getColorByData = data => data.data.color;
export const getColorById = data => data.id === "Successful" ? mainColor : failColor;
export const getTaskColor = ({ id, data }) => data[`${id}_color`];

export const shortenLegend = datas => datas.forEach(data => data.id.length > 10 ? data.label = data.id.slice(0, 10) + "..." : data.id);
export const shortenHealthChartLegend = datas => datas.forEach(data => {
  if (data["Production Deployment"]) {
    data["Production Deploy"] = data["Production Deployment"];
  }
  if (data["Selected for Development"]) {
    data["For Development"] = data["Selected for Development"];
  }
});
export const capitalizeLegend = (data, keys) => data.forEach(d => {
  keys.forEach(key => d[capitalizeFirstLetter(key)] = d[key]);
});

export const spaceOutMergeRequestTimeTakenLegend = data => data.forEach(d => d["Merge Request Time Taken"] = d["MergeRequestTimeTaken"]);

const formats = {
  numbers: d => /\d+\.?\d*$/.exec(d),
  wholeNumbers: d => Math.floor(d) === d && d,
  monthDate: "%b %d",
  monthDate2: d => { var date = new Date(d).toDateString(); date = date.split(" "); return date[1]+" "+date[2]; },
  yearMonthDate: d => d.split("T")[0],
  cutoffString: (d) => (typeof d === "string" && d.length > 0 ? d.slice(0, 8) + (d.length > 8 ? "..." : "") : ""),
  values: d => /(?:(?!-).)*/.exec(d)[0],
  subString: d => (typeof d === "string" ? d.substring(0, 6) : ""),
};

export const defaultConfig = (leftAxisTitle="", bottomAxisTitle="",
                              largeLeftSpaceRequired=false, largeBottomSpaceRequired=false,
                              leftLabelFormat="", bottomLabelFormat="", isLegendHidden=false,
                              moreLegendSpace=false) => ({
  margin: { top: 30, right: 20, bottom: largeBottomSpaceRequired ? 60 : 80, 
            left: largeLeftSpaceRequired ? 100 : 60},
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
      "translateY": -25,
      "itemsSpacing": moreLegendSpace ? 17 : 20,
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
    },
    legends: {
      text: {
        fontSize: moreLegendSpace ?"9px" : "10px"
      }
    }
  },
});

export const adjustBarWidth = (data, isVertical=true) => {
  let padding;
  const x = data.length;

  if (isVertical) {
    switch (true) {
      case (x === 1): padding = .85;
                      break;
      case (x === 2): padding = .75;
                      break;
      case (x === 3): padding = .65;
                      break;
      case (x <= 8):  padding = .45;
                      break;
      case (x <= 10): padding = .35;
                       break;
      default: padding = .25;
    }
  } else {
    switch (true) {
      case (x === 1): padding = .5;
                      break;
      case (x === 2): padding = .35;
                      break;
      case (x === 3): padding = .3;
                      break;
      default: padding = .25;
    }
  }

  return { padding };
};