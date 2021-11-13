import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TwoLineScoreDataBlock from "components/common/metrics/score/TwoLineScoreDataBlock";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";
import { getTimeDisplay } from "components/insights/charts/sonar/sonar_ratings/data_blocks/sonar-ratings-pipeline-utility";
function SdlcDurationByStageOverviewDataBlockContainer({ data }) {
  let className = `p-2 dark-gray-text-primary`;
  return (
    <Row className="px-2">
      <Col xl={2} lg={2} sm={4} className={"my-3"}>
        <DataBlockBoxContainer showBorder={true}>
          <TwoLineScoreDataBlock className={className} score={data.total_success} subtitle={"Successful Builds"} />
        </DataBlockBoxContainer>
      </Col>
      <Col xl={2} lg={2} sm={4} className={"my-3"}>
        <DataBlockBoxContainer showBorder={true}>
          <TwoLineScoreDataBlock className={className} score={data.total_failed} subtitle={"Failed Builds"} />
        </DataBlockBoxContainer>
      </Col>
      <Col xl={2} lg={2} sm={4} className={"my-3"}>
        <DataBlockBoxContainer showBorder={true}>
          <TwoLineScoreDataBlock className={className} score={data.mean_duration} subtitle={"Average Duration (hrs)"} />
        </DataBlockBoxContainer>{" "}
      </Col>
      <Col xl={2} lg={2} sm={4} className={"my-3"}>
        <DataBlockBoxContainer showBorder={true}>
          <TwoLineScoreDataBlock className={className} score={data.total_duration} subtitle={"Total Duration (hrs)"} />
        </DataBlockBoxContainer>{" "}
      </Col>
      <Col xl={2} lg={2} sm={4} className={"my-3"}>
        <DataBlockBoxContainer showBorder={true}>
          <TwoLineScoreDataBlock
            className={className}
            score={data.mean_time_to_resolve}
            subtitle={"Average Time to Resolve (hrs)"}
          />
        </DataBlockBoxContainer>{" "}
      </Col>
      <Col xl={2} lg={2} sm={4} className={"my-3"}>
        <DataBlockBoxContainer showBorder={true}>
          <TwoLineScoreDataBlock
            className={className}
            score={data.total_time_to_resolve}
            subtitle={"Total Time to Resolve (hrs)"}
          />
        </DataBlockBoxContainer>{" "}
      </Col>
    </Row>
  );
}

SdlcDurationByStageOverviewDataBlockContainer.propTypes = {
  data: PropTypes.object,
};

export default SdlcDurationByStageOverviewDataBlockContainer;
