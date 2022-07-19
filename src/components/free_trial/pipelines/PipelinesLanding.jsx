import React from "react";
import PropTypes from "prop-types";
import MetricDataBlockBaseContainer from "temp-library-components/metrics/data_blocks/MetricDataBlockBaseContainer";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import PipelineDataBlock from "components/free_trial/pipelines/data_blocks/PipelineDataBlock";

// TODO: Make a theme constants file
export const THEME_COLORS = {
  LIGHT_PURPLE: "#B9A1F9",
  LIGHT_GOLD: "#E5C27E",
  LIGHT_SALMON: "#FE8C83",
  LIGHT_MINT: "#95D0D5",
  WHITE: "#FFFFFF",
};

export const THEME_FONTS = {
  INTER: "Inter",
};

function PipelinesLanding() {
  return (
    <div className="max-content-width">
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
    </div>
  );
}

PipelinesLanding.propTypes = {
  activeTab: PropTypes.string,
  handleTabClick: PropTypes.func,
};

export default PipelinesLanding;