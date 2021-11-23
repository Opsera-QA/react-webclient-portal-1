import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TwoLineScoreDataBlock from "components/common/metrics/score/TwoLineScoreDataBlock";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";
import { getTimeDisplay } from "components/insights/charts/sdlc/sdlc-duration-by-stage-utility";
function SalesforceDurationByStageOverviewDataBlockContainer({ data }) {
  let className = `p-2 dark-gray-text-primary`;
  return (
    <Row className="px-2">
      <Col lg={4} md={6} className={"my-3"}>
        <DataBlockBoxContainer showBorder={true}>
          <TwoLineScoreDataBlock className={className} score={data.total_success} subtitle={"Successful"} />
        </DataBlockBoxContainer>
      </Col>
      <Col lg={4} md={6} className={"my-3"}>
        <DataBlockBoxContainer showBorder={true}>
          <TwoLineScoreDataBlock
            className={className}
            score={getTimeDisplay(data.total_duration)}
            subtitle={"Total Duration"}
          />
        </DataBlockBoxContainer>{" "}
      </Col>
      <Col lg={4} md={6} className={"my-3"}>
        <DataBlockBoxContainer showBorder={true}>
          <TwoLineScoreDataBlock
            className={className}
            score={getTimeDisplay(data.total_time_to_resolve)}
            subtitle={"Total Time to Resolve"}
          />
        </DataBlockBoxContainer>{" "}
      </Col>
      <Col lg={4} md={6} className={"my-3"}>
        <DataBlockBoxContainer showBorder={true}>
          <TwoLineScoreDataBlock className={className} score={data.total_failed} subtitle={"Failed"} />
        </DataBlockBoxContainer>
      </Col>
      <Col lg={4} md={6} className={"my-3"}>
        <DataBlockBoxContainer showBorder={true}>
          <TwoLineScoreDataBlock
            className={className}
            score={getTimeDisplay(data.mean_duration)}
            subtitle={"Average Duration"}
          />
        </DataBlockBoxContainer>{" "}
      </Col>
      <Col lg={4} md={6} className={"my-3"}>
        <DataBlockBoxContainer showBorder={true}>
          <TwoLineScoreDataBlock
            className={className}
            score={getTimeDisplay(data.mean_time_to_resolve)}
            subtitle={"Average Time to Resolve"}
          />
        </DataBlockBoxContainer>{" "}
      </Col>
    </Row>
  );
}

SalesforceDurationByStageOverviewDataBlockContainer.propTypes = {
  data: PropTypes.object,
};

export default SalesforceDurationByStageOverviewDataBlockContainer;
