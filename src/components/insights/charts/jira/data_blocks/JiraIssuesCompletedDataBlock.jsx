import React from "react";
import PropTypes from "prop-types";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";
import ThreeLineScoreDataBlock from "components/common/metrics/score/ThreeLineScoreDataBlock";

function JiraIssuesCompletedDataBlock({ data, previousData, getIcon, getIconColor }) {
  return (    
    <DataBlockBoxContainer showBorder={true}>
      <ThreeLineScoreDataBlock
        className={`${getIconColor(data, previousData)}`}
        score={data}
        topText={"Issues Completed"}
        bottomText={"Previous Issues: " + previousData}
        icon={getIcon(data, previousData)}
      />
    </DataBlockBoxContainer>
  );
}

JiraIssuesCompletedDataBlock.propTypes = {
  data: PropTypes.number,
  previousData: PropTypes.number,
  getIcon: PropTypes.func,
  getIconColor: PropTypes.func
};

export default JiraIssuesCompletedDataBlock;
