import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TwoLineScoreDataBlock from "components/common/metrics/score/TwoLineScoreDataBlock";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";
import { getTimeDisplay } from "components/insights/charts/sdlc/sdlc-duration-by-stage-utility";

function CoverityActionableDataBlockContainers({ data }) {
  let className = `p-2 dark-gray-text-primary`;
  return (
    <div>
      <Row className="px-2">
        <Col lg={4} md={6} className={"my-3"}>
          <DataBlockBoxContainer showBorder={true}>
            <TwoLineScoreDataBlock
              className={className}
              score={data.total_success}
              subtitle={"Total Issues"} />
          </DataBlockBoxContainer>
        </Col>
        <Col lg={4} md={6} className={"my-3"}>
          <DataBlockBoxContainer showBorder={true}>
            <TwoLineScoreDataBlock
              className={className}
              score={getTimeDisplay(data.total_duration)}
              subtitle={"Total Projects"}
            />
          </DataBlockBoxContainer>{"Total"}
        </Col>
        <Col lg={4} md={6} className={"my-3"}>
          <DataBlockBoxContainer showBorder={true}>
            <TwoLineScoreDataBlock
              className={className}
              score={getTimeDisplay(data.total_time_to_resolve)}
              subtitle={"Total Scans"}
            />
          </DataBlockBoxContainer>{" "}
        </Col>
        <Col lg={4} md={6} className={"my-3"}>
          <DataBlockBoxContainer showBorder={true}>
            <TwoLineScoreDataBlock
              className={className}
              score={data.total_failed}
              subtitle={"Total Quality Issues"} />
          </DataBlockBoxContainer>
        </Col>
        <Col lg={4} md={6} className={"my-3"}>
          <DataBlockBoxContainer showBorder={true}>
            <TwoLineScoreDataBlock
              className={className}
              score={getTimeDisplay(data.mean_duration)}
              subtitle={"Total Secuity Issues"}
            />
          </DataBlockBoxContainer>{" "}
        </Col>
      </Row>
    </div>
  );
}

CoverityActionableDataBlockContainers.propTypes = {
  data: PropTypes.object,
};

export default CoverityActionableDataBlockContainers;
