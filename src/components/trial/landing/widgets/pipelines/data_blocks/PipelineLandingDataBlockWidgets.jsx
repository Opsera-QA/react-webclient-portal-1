import React from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import WidgetDataBlockBaseContainer from "temp-library-components/widgets/data_blocks/WidgetDataBlockBaseContainer";
import PipelineDataBlock from "components/trial/landing/widgets/pipelines/data_blocks/PipelineDataBlock";
import Row from "react-bootstrap/Row";
import useComponentStateReference from "hooks/useComponentStateReference";
import { fontThemeConstants } from "temp-library-components/theme/font.theme.constants";

function PipelineLandingDataBlockWidgets() {
  const {themeConstants} = useComponentStateReference();

  return (
    <Row>
      <Col xs={3}>
        <WidgetDataBlockBaseContainer
          fontFamily={fontThemeConstants.FONT_FAMILIES.INTER}
          fontColor={themeConstants.COLOR_PALETTE.WHITE}
          backgroundColor={themeConstants.COLOR_PALETTE.LIGHT_PURPLE}
        >
          <PipelineDataBlock
            title={"Successful Builds"}
            metric={"25"}
            metricText={"Builds"}
          />
        </WidgetDataBlockBaseContainer>
      </Col>
      <Col xs={3}>
        <WidgetDataBlockBaseContainer
          fontFamily={fontThemeConstants.FONT_FAMILIES.INTER}
          fontColor={themeConstants.COLOR_PALETTE.WHITE}
          backgroundColor={themeConstants.COLOR_PALETTE.LIGHT_GOLD}
        >
          <PipelineDataBlock
            title={"Average Lead Time"}
            metric={"12"}
            metricText={"Days"}
          />
        </WidgetDataBlockBaseContainer>
      </Col>
      <Col xs={3}>
        <WidgetDataBlockBaseContainer
          fontFamily={fontThemeConstants.FONT_FAMILIES.INTER}
          fontColor={themeConstants.COLOR_PALETTE.WHITE}
          backgroundColor={themeConstants.COLOR_PALETTE.LIGHT_SALMON}
        >
          <PipelineDataBlock
            title={"Daily Development"}
            metric={"14"}
          />
        </WidgetDataBlockBaseContainer>
      </Col>
      <Col xs={3}>
        <WidgetDataBlockBaseContainer
          fontFamily={fontThemeConstants.FONT_FAMILIES.INTER}
          fontColor={themeConstants.COLOR_PALETTE.WHITE}
          backgroundColor={themeConstants.COLOR_PALETTE.LIGHT_MINT}
        >
          <PipelineDataBlock
            title={"Failure Rates"}
            metric={"28"}
            metricText={"%"}
          />
        </WidgetDataBlockBaseContainer>
      </Col>
    </Row>
  );
}

PipelineLandingDataBlockWidgets.propTypes = {};

export default PipelineLandingDataBlockWidgets;
