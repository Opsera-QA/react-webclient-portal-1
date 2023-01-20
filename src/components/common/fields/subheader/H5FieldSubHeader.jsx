import React from "react";
import PropTypes from "prop-types";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import { hasStringValue } from "components/common/helpers/string-helpers";
import IconBase from "components/common/icons/IconBase";

function H5FieldSubHeader(
  {
    subheaderText,
    tooltipText,
    className,
    icon,
  }) {
  if (hasStringValue(subheaderText) !== true) {
    return null;
  }

  return (
    <TooltipWrapper innerText={tooltipText}>
      <div>
        <h5 className={className}>
          <IconBase
            icon={icon}
            className={"mr-2"}
          />
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
  icon: PropTypes.object,
};

H5FieldSubHeader.defaultProps = {
  className: "mb-2 text-color",
};

export default H5FieldSubHeader;