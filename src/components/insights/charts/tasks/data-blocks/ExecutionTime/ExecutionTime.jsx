import React from "react";
import { Col } from "react-bootstrap";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";
import PropTypes from "prop-types";
import TwoLineScoreDataBlock from "components/common/metrics/score/TwoLineScoreDataBlock";
import { getTimeDisplay } from "components/insights/charts/github_actions/github_actions-utility";
import { faInfoCircle } from "@fortawesome/pro-light-svg-icons";

const ExecutionTime = ({ score }) => {
  return (
    <Col md={4} className="mb-3">
      <DataBlockBoxContainer showBorder={true}>
        <div className={"p-2"}>
          <TwoLineScoreDataBlock
            score={getTimeDisplay(score)}
            subtitle={"Execution Time (sec)"}
            icon={faInfoCircle}
            iconOverlayTitle={""}
            iconOverlayBody={"The exexution time"}
          />
        </div>
      </DataBlockBoxContainer>
    </Col>
  );
};

ExecutionTime.propTypes = {
  score: PropTypes.string,
};

export default ExecutionTime;
