import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import SonarCodeSmellsDataBlock
  from "components/common/metrics/data_blocks/tools/sonar/code_smells/SonarCodeSmellsDataBlock";
import SonarCriticalItemCountDataBlock
  from "components/common/metrics/data_blocks/tools/sonar/critical/SonarCriticalItemCountDataBlock";
import SonarBlockerCountDataBlock
  from "components/common/metrics/data_blocks/tools/sonar/blocker/SonarBlockerCountDataBlock";
import SonarMinorCountDataBlock
  from "components/common/metrics/data_blocks/tools/sonar/minor/SonarMinorCountDataBlock";
import SonarMajorCountDataBlock
  from "components/common/metrics/data_blocks/tools/sonar/major/SonarMajorCountDataBlock";
import SonarInfoCountDataBlock
  from "components/common/metrics/data_blocks/tools/sonar/info/SonarInfoCountDataBlock";

function SonarRatingsMaintainabilityOverviewDataBlockContainer({sonarMetric}) {
  const getCriticalColor = () => {
    const criticalCount = sonarMetric?.critical;

    if (criticalCount <= 0) {
      return "dark-gray-text-primary";
    }

    return "danger-red";
  };

  const getBlockerColor = () => {
    const blockerCount = sonarMetric?.blocker;

    if (blockerCount <= 0) {
      return "dark-gray-text-primary";
    }

    return "danger-red";
  };

  const getMajorColor = () => {
    const majorCount = sonarMetric?.major;

    if (majorCount <= 0) {
      return "dark-gray-text-primary";
    }

    if (majorCount === 1) {
      return "opsera-yellow";
    }

    return "danger-red";
  };

  const getMinorColor = () => {
    const minorCount = sonarMetric?.minor;

    if (minorCount <= 0) {
      return "dark-gray-text-primary";
    }

    if (minorCount < 10) {
      return "opsera-yellow";
    }

    return "danger-red";
  };

  return (
    <Row className="px-2">
      <Col xl={2} lg={2} sm={4} className={"my-3"}>
        <SonarCodeSmellsDataBlock
          codeSmellCount={sonarMetric?.total}
          className={`p-2 dark-gray-text-primary`}
        />
      </Col>
      <Col xl={2} lg={2} sm={4} className={"my-3"}>
        <SonarCriticalItemCountDataBlock
          criticalCodeSmellCount={sonarMetric?.critical}
          className={`p-2 ${getCriticalColor()}`}
        />
      </Col>
      <Col xl={2} lg={2} sm={4} className={"my-3"}>
        <SonarBlockerCountDataBlock
          blockerCodeSmellCount={sonarMetric?.blocker}
          className={`p-2 ${getBlockerColor()}`}
        />
      </Col>
      <Col xl={2} lg={2} sm={4} className={"my-3"}>
        <SonarMajorCountDataBlock
          majorCodeSmellCount={sonarMetric?.major}
          className={`p-2 ${getMajorColor()}`}
        />
      </Col>
      <Col xl={2} lg={2} sm={4} className={"my-3"}>
        <SonarMinorCountDataBlock
          minorCodeSmellCount={sonarMetric?.minor}
          className={`p-2 ${getMinorColor()}`}
        />
      </Col>
      <Col xl={2} lg={2} sm={4} className={"my-3"}>
        <SonarInfoCountDataBlock
          infoCodeSmellCount={sonarMetric?.info}
          className={`p-2 dark-gray-text-primary`}
        />
      </Col>
    </Row>
  );
}

SonarRatingsMaintainabilityOverviewDataBlockContainer.propTypes = {
  sonarMetric: PropTypes.object,
};

export default SonarRatingsMaintainabilityOverviewDataBlockContainer;
