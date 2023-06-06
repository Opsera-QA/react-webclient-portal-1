import React from "react";
import { Col } from "react-bootstrap";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";
import PropTypes from "prop-types";
import TwoLineScoreDataBlock from "components/common/metrics/score/TwoLineScoreDataBlock";
import { faInfoCircle } from "@fortawesome/pro-light-svg-icons";

const TotalUniqueTasks = ({score, colSize}) => {
  return (
    <Col md={colSize || 4} className={"mb-3"}>
      <DataBlockBoxContainer showBorder={true}>
        <div className={"p-2"}>
          <TwoLineScoreDataBlock
            score={score}
            subtitle={"Total Unique Tasks"}
            icon={faInfoCircle}
            iconOverlayTitle={""}
            iconOverlayBody={"The total number of unique task executed"}
          />
        </div>
      </DataBlockBoxContainer>
    </Col>
  );
};

TotalUniqueTasks.propTypes = {
  score: PropTypes.string,
  colSize: PropTypes.number,
};

export default TotalUniqueTasks;
