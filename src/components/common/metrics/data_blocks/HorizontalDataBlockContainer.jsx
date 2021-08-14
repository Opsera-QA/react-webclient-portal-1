import React from "react";
import PropTypes from "prop-types";
import {Container, Row} from "react-bootstrap";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";

// TODO: Styling is temporary based on SonarRatings until we figure out which direction to go
function HorizontalDataBlockContainer({leftDataBlock, middleDataBlock, rightDataBlock, onClick, tooltipText, title}) {
  return (
    <TooltipWrapper innerText={tooltipText}>
      {title}
      <div className={`${onClick ? "pointer " : ""}new-chart mb-3`} style={{height: "300px"}} onClick={onClick}>
        <Container className={"metric-box"}>
          <Row>
            {leftDataBlock}
            {middleDataBlock}
            {rightDataBlock}
          </Row>
        </Container>
      </div>
    </TooltipWrapper>
  );
}

HorizontalDataBlockContainer.propTypes = {
  leftDataBlock: PropTypes.any,
  middleDataBlock: PropTypes.any,
  rightDataBlock: PropTypes.any,
  onClick: PropTypes.func,
  tooltipText: PropTypes.any,
  title: PropTypes.string,
  height: PropTypes.string,
};

export default HorizontalDataBlockContainer;