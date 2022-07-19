import React from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import MetricDataBlockBaseContainer from "temp-library-components/metrics/data_blocks/MetricDataBlockBaseContainer";
import PipelineDataBlock from "components/free_trial/pipelines/data_blocks/PipelineDataBlock";
import Row from "react-bootstrap/Row";
import { THEME_COLORS, THEME_FONTS } from "components/free_trial/pipelines/PipelinesLanding";

function PipelineLandingDataBlockMetrics() {
  return (
    <Row>
      <Col xs={3}>
        <MetricDataBlockBaseContainer
          fontFamily={THEME_FONTS.INTER}
          fontColor={THEME_COLORS.WHITE}
          backgroundColor={THEME_COLORS.LIGHT_PURPLE}
        >
          <PipelineDataBlock
            title={"Successful Builds"}
            metric={"25"}
            metricText={"Builds"}
          />
        </MetricDataBlockBaseContainer>
      </Col>
      <Col xs={3}>
        <MetricDataBlockBaseContainer
          fontFamily={THEME_FONTS.INTER}
          fontColor={THEME_COLORS.WHITE}
          backgroundColor={THEME_COLORS.LIGHT_GOLD}
        >
          <PipelineDataBlock
            title={"Average Lead Time"}
            metric={"12"}
            metricText={"Days"}
          />
        </MetricDataBlockBaseContainer>
      </Col>
      <Col xs={3}>
        <MetricDataBlockBaseContainer
          fontFamily={THEME_FONTS.INTER}
          fontColor={THEME_COLORS.WHITE}
          backgroundColor={THEME_COLORS.LIGHT_SALMON}
        >
          <PipelineDataBlock
            title={"Daily Development"}
            metric={"14"}
          />
        </MetricDataBlockBaseContainer>
      </Col>
      <Col xs={3}>
        <MetricDataBlockBaseContainer
          fontFamily={THEME_FONTS.INTER}
          fontColor={THEME_COLORS.WHITE}
          backgroundColor={THEME_COLORS.LIGHT_MINT}
        >
          <PipelineDataBlock
            title={"Failure Rates"}
            metric={"28"}
            metricText={"%"}
          />
        </MetricDataBlockBaseContainer>
      </Col>
    </Row>
  );
}

PipelineLandingDataBlockMetrics.propTypes = {};

export default PipelineLandingDataBlockMetrics;
