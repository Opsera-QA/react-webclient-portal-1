import React from "react";
import { Col } from "react-bootstrap";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";
import PropTypes from "prop-types";
import TwoLineScoreDataBlock from "components/common/metrics/score/TwoLineScoreDataBlock";
import { getTimeDisplay } from "components/insights/charts/github_actions/github_actions-utility";
import { faInfoCircle } from "@fortawesome/pro-light-svg-icons";

const AverageExecutionTimeTwoBlock = ({ score }) => {
  return (
    <Col md={4} className="mb-3">
      <DataBlockBoxContainer showBorder={true}>
        <div className={"p-2"}>
          <TwoLineScoreDataBlock
            score={getTimeDisplay(score)}
            subtitle={"Average Execution Time (sec)"}
            icon={faInfoCircle}
            iconOverlayTitle={""}
            iconOverlayBody={"The average exexution time"}
          />
        </div>
      </DataBlockBoxContainer>
    </Col>
  );
};

AverageExecutionTimeTwoBlock.propTypes = {
  score: PropTypes.string,
};

export default AverageExecutionTimeTwoBlock;
