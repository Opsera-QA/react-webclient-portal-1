import React from "react";
import PropTypes from "prop-types";
import {hasStringValue} from "components/common/helpers/string-helpers";
import VanityTwoLineDataBlockBase from "temp-library-components/metric/data_block/VanityTwoLineDataBlockBase";

export default function OrchestrationAverageRunDurationDataBlock({ width, className, averageRunDurationText }) {
  if (hasStringValue(averageRunDurationText) !== true) {
    return null;
  }

  return (
    <VanityTwoLineDataBlockBase
      width={width}
      className={className}
      label={"Average Run Duration"}
      focusText={averageRunDurationText}
    />
  );
}

OrchestrationAverageRunDurationDataBlock.propTypes = {
  averageRunDurationText: PropTypes.string,
  width: PropTypes.string,
  className: PropTypes.string,
};

OrchestrationAverageRunDurationDataBlock.defaultProps = {
  width: "340px",
};
