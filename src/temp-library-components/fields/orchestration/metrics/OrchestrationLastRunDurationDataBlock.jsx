import React from "react";
import PropTypes from "prop-types";
import {hasStringValue} from "components/common/helpers/string-helpers";
import VanityTwoLineDataBlockBase from "temp-library-components/metric/data_block/VanityTwoLineDataBlockBase";

export default function OrchestrationLastRunDurationDataBlock({ width, className, lastRunDurationText }) {
  if (hasStringValue(lastRunDurationText) !== true) {
    return null;
  }

  return (
    <VanityTwoLineDataBlockBase
      width={width}
      className={className}
      label={"Last Run Duration"}
      focusText={lastRunDurationText}
    />
  );
}

OrchestrationLastRunDurationDataBlock.propTypes = {
  lastRunDurationText: PropTypes.string,
  width: PropTypes.string,
  className: PropTypes.string,
};

OrchestrationLastRunDurationDataBlock.defaultProps = {
  width: "340px",
};
