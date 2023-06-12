import React from "react";
import { Col } from "react-bootstrap";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";
import PropTypes from "prop-types";
import ThreeLineScoreDataBlock from "../../../../../common/metrics/score/ThreeLineScoreDataBlock";
import { getTimeDisplay } from "components/insights/charts/github_actions/github_actions-utility";
import { getIconColor, getIcon, getDescription } from "../utils";

const AverageExecutionTimeThreeBlock = ({ score, prevScore, trend, dataPoint }) => {
  return (
    <Col md={4} className="mb-3">
      <DataBlockBoxContainer showBorder={true}>
        <div className={"p-2"}>
          <ThreeLineScoreDataBlock
            className={getIconColor(trend)}
            score={getTimeDisplay(score)}
            bottomText={
              "Previous: " + getTimeDisplay(prevScore)
            }
            topText={"Average Execution Time By Count (sec)"}
            icon={getIcon(trend)}
            iconOverlayBody={getDescription(
              trend,
            )}
            dataPoint={dataPoint}
          />
        </div>
      </DataBlockBoxContainer>
    </Col>
  );
};

AverageExecutionTimeThreeBlock.propTypes = {
  trend: PropTypes.string,
  score: PropTypes.string,
  prevScore: PropTypes.string,
  dataPoint: PropTypes.object,
};

export default AverageExecutionTimeThreeBlock;
