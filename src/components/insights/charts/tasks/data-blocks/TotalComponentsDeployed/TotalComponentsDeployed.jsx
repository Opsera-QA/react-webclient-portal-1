import React from "react";
import { Col } from "react-bootstrap";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";
import PropTypes from "prop-types";
import TwoLineScoreDataBlock from "components/common/metrics/score/TwoLineScoreDataBlock";
import { faInfoCircle } from "@fortawesome/pro-light-svg-icons";

const TotalComponentsDeployed = ({score}) => {
  return (
    <Col md={4} className={"mb-3"}>
      <DataBlockBoxContainer showBorder={true}>
        <div className={"p-2"}>
          <TwoLineScoreDataBlock
            score={score}
            subtitle={"Total Components Deployed"}
            icon={faInfoCircle}
            iconOverlayTitle={""}
            iconOverlayBody={"The total number of components deployed"}
          />
        </div>
      </DataBlockBoxContainer>
    </Col>
  );
};

TotalComponentsDeployed.propTypes = {
  score: PropTypes.string,
};

export default TotalComponentsDeployed;
