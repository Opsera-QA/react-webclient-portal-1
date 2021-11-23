import React from "react";
import { statusColors } from "components/insights/charts/charts-views";

export const isEmptyCustom = (val) => {
  if (val == undefined) return true;
  if (val == null) return true;
  if (typeof val !== "number") return true;
  return false;
};

export const getMiddleText = (meanData, countData) => {
  if (!isEmptyCustom(meanData) && !isEmptyCustom(countData)) {
    return (
      <div>
        {meanData} min <br></br> {countData} runs
      </div>
    );
  }
  if (!isEmptyCustom(meanData)) {
    return `${meanData} min | 0`;
  }
  return "No runs";
};

export const getMiddleStyle = (meanData, goalsData) => {
  if (isEmptyCustom(meanData)) {
    return;
  }
  const goalsDataValue = !isEmptyCustom(goalsData) ? goalsData : 0;
  if (goalsDataValue > meanData) {
    return { color: statusColors.success };
  }
  if (goalsDataValue < meanData) {
    return { color: statusColors.danger };
  }
  if (goalsDataValue == meanData) {
    return { color: statusColors.warning };
  }
};
