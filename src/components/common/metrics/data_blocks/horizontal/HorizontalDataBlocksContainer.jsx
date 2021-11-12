import React from "react";
import PropTypes from "prop-types";
import {Row} from "react-bootstrap";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";

// TODO: Styling is temporary based on SonarRatings until we figure out which direction to go
function HorizontalDataBlocksContainer({children, onClick, tooltipText, title, className}) {
  return (
    <TooltipWrapper innerText={tooltipText}>
      <div className={className}>
        <div className={`${onClick ? "pointer " : ""}data-block-container m-1`} onClick={onClick}>
          <div className={"data-block-container-title px-2 py-1"}>
            {title}
          </div>
          <Row className={"m-1 py-2"}>
            {children}
          </Row>
        </div>
      </div>
    </TooltipWrapper>
  );
}

HorizontalDataBlocksContainer.propTypes = {
  children: PropTypes.any,
  onClick: PropTypes.func,
  tooltipText: PropTypes.any,
  title: PropTypes.string,
  className: PropTypes.string,
};

export default HorizontalDataBlocksContainer;