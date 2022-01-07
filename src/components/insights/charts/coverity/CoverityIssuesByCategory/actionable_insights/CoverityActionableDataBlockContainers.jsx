import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TwoLineScoreDataBlock from "components/common/metrics/score/TwoLineScoreDataBlock";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";
import {
  faCheckCircle,
  faExclamationTriangle,
  faFolders,
  faLockOpenAlt,
  faShieldCheck, faSirenOn, faExclamation, faLockAlt, faLock,
} from "@fortawesome/pro-light-svg-icons";

function CoverityActionableDataBlockContainers({ data , level }) {
  let className = `p-2 dark-gray-text-primary`;

  const getColor = (metric) => {
    if (metric > 0) {
      return "danger-red";
    }
    return "green";
  };

  const getIcon = (level) => {
    if (level == "Low") {
      return faExclamation;
    }
    if (level == "Medium") {
      return faExclamationTriangle;
    }
    if (level == "High") {
      return faSirenOn;
    }
  };

  const securityIcon = (metric) => {
    if (metric > 0) {
      return faLockOpenAlt;
    }
    return faLock;
  };

  return (
    <div>
      <Row className="justify-content-sm-center px-2">
        <Col xl={2} lg={2} sm={4} className={"my-3"}>
          <DataBlockBoxContainer showBorder={true} >
            <TwoLineScoreDataBlock
              className={`p-2 ${getColor(data?.totalIssues)}`}
              score={data.totalIssues}
              icon={getIcon(level)}
              subtitle={"Total Issues"} />
          </DataBlockBoxContainer>
        </Col>
        <Col xl={2} lg={2} sm={4} className={"my-3"}>
          <DataBlockBoxContainer showBorder={true}>
            <TwoLineScoreDataBlock
              className={className}
              score={data.totalProjects}
              icon = {faFolders}
              subtitle={"Total Projects"}
            />
          </DataBlockBoxContainer>
        </Col>
        <Col xl={2} lg={2} sm={4} className={"my-3"}>
          <DataBlockBoxContainer showBorder={true}>
            <TwoLineScoreDataBlock
              className={className}
              score={data.totalScans}
              icon = {faCheckCircle}
              subtitle={"Total Scans"}
            />
          </DataBlockBoxContainer>
        </Col>
        <Col xl={2} lg={2} sm={4} className={"my-3"}>
          <DataBlockBoxContainer showBorder={true}>
            <TwoLineScoreDataBlock
              className={`p-2 ${getColor(data?.totalQuality)}`}
              score={data.totalQuality}
              icon = {faShieldCheck}
              subtitle={"Total Quality Issues"} />
          </DataBlockBoxContainer>
        </Col>
        <Col xl={2} lg={2} sm={4} className={"my-3"}>
          <DataBlockBoxContainer showBorder={true}>
            <TwoLineScoreDataBlock
              className={`p-2 ${getColor(data?.totalSecurity)}`}
              score={data.totalSecurity}
              icon = {securityIcon(data?.totalSecurity)}
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
  level: PropTypes.string,
};

export default CoverityActionableDataBlockContainers;