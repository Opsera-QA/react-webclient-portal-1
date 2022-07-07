import React from "react";
import PropTypes from "prop-types";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";

function H5FieldSubHeader(
  {
    subheaderText,
    tooltipText,
    className,
  }) {
  return (
    <TooltipWrapper innerText={tooltipText}>
      <div>
        <h5 className={className}>
          {subheaderText}
        </h5>
      </div>
    </TooltipWrapper>
  );
}

H5FieldSubHeader.propTypes = {
  subheaderText: PropTypes.string,
  tooltipText: PropTypes.string,
  className: PropTypes.string,
};

H5FieldSubHeader.defaultProps = {
  className: "mb-2 text-color",
};

export default H5FieldSubHeader;