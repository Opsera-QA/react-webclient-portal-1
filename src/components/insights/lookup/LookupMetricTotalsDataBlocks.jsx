import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "react-bootstrap";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";
import TwoLineScoreDataBlock from "components/common/metrics/score/TwoLineScoreDataBlock";
import { faBug } from "@fortawesome/pro-light-svg-icons";
import FilterContainer from "components/common/table/FilterContainer";

const LookupMetricTotalsDataBlocks = (
  {
    metrics,
    componentName,
  }) => {
  if (metrics == null) {
    return null;
  }

  const getDataBlocks = () => {
    return (
      <div className={"m-3"}>
        <Row>
          <Col sm={4}>
            <DataBlockBoxContainer showBorder={true}>
              <TwoLineScoreDataBlock
                className={"p-2"}
                score={metrics?.deploy_count}
                subtitle={"Deploy Count"}
              />
            </DataBlockBoxContainer>
          </Col>
          <Col sm={4}>
            <DataBlockBoxContainer showBorder={true}>
              <TwoLineScoreDataBlock
                className={"p-2"}
                score={metrics?.validations_passed}
                subtitle={"Validations Passed"}
              />
            </DataBlockBoxContainer>
          </Col>
          <Col sm={4}>
            <DataBlockBoxContainer showBorder={true}>
              <TwoLineScoreDataBlock
                className={"p-2"}
                score={metrics?.validations_failed}
                subtitle={"Validations Failed"}
              />
            </DataBlockBoxContainer>
          </Col>
          <Col xs={12} className={"my-2"} />
          <Col sm={4}>
            <DataBlockBoxContainer showBorder={true}>
              <TwoLineScoreDataBlock
                className={"p-2"}
                score={metrics?.unit_tests_passed}
                subtitle={"Unit Tests Passed"}
              />
            </DataBlockBoxContainer>
          </Col>
          <Col sm={4}>
            <DataBlockBoxContainer showBorder={true}>
              <TwoLineScoreDataBlock
                className={"p-2"}
                score={metrics?.unit_tests_failed}
                subtitle={"Unit Tests Failed"}
              />
            </DataBlockBoxContainer>
          </Col>
          <Col sm={4}>
            <DataBlockBoxContainer showBorder={true}>
              <TwoLineScoreDataBlock
                className={"p-2"}
                score={metrics?.pipelines}
                subtitle={"Pipelines"}
              />
            </DataBlockBoxContainer>
          </Col>
        </Row>
      </div>
    );
  };

  return (
    <FilterContainer
      showBorder={false}
      body={getDataBlocks()}
      titleIcon={faBug}
      title={`${componentName}: Totals`}
    />
  );
};

LookupMetricTotalsDataBlocks.propTypes = {
  metrics: PropTypes.object,
  componentName: PropTypes.string,
};

export default LookupMetricTotalsDataBlocks;
