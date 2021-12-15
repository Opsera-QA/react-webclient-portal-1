import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TwoLineScoreDataBlock from "components/common/metrics/score/TwoLineScoreDataBlock";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";

function CoverityActionableDataBlockContainers({ data }) {
  let className = `p-2 dark-gray-text-primary`;
  return (
    <div>
      <Row className="justify-content-sm-center px-2">
        <Col xl={2} lg={2} sm={4} className={"my-3"}>
          <DataBlockBoxContainer showBorder={true}>
            <TwoLineScoreDataBlock
              className={className}
              score={data.totalIssues}
              subtitle={"Total Issues"} />
          </DataBlockBoxContainer>
        </Col>
        <Col xl={2} lg={2} sm={4} className={"my-3"}>
          <DataBlockBoxContainer showBorder={true}>
            <TwoLineScoreDataBlock
              className={className}
              score={data.totalProjects}
              subtitle={"Total Projects"}
            />
          </DataBlockBoxContainer>
        </Col>
        <Col xl={2} lg={2} sm={4} className={"my-3"}>
          <DataBlockBoxContainer showBorder={true}>
            <TwoLineScoreDataBlock
              className={className}
              score={data.totalScans}
              subtitle={"Total Scans"}
            />
          </DataBlockBoxContainer>
        </Col>
        <Col xl={2} lg={2} sm={4} className={"my-3"}>
          <DataBlockBoxContainer showBorder={true}>
            <TwoLineScoreDataBlock
              className={className}
              score={data.totalQuality}
              subtitle={"Total Quality Issues"} />
          </DataBlockBoxContainer>
        </Col>
        <Col xl={2} lg={2} sm={4} className={"my-3"}>
          <DataBlockBoxContainer showBorder={true}>
            <TwoLineScoreDataBlock
              className={className}
              score={data.totalSecurity}
              subtitle={"Total Security Issues"}
            />
          </DataBlockBoxContainer>
        </Col>
      </Row>
    </div>
  );
}

CoverityActionableDataBlockContainers.propTypes = {
  data: PropTypes.object,
};

export default CoverityActionableDataBlockContainers;
