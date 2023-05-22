import React from "react";
import PropTypes from "prop-types";
import {hasStringValue} from "components/common/helpers/string-helpers";
import VanityTwoLineDataBlockBase from "temp-library-components/metric/data_block/VanityTwoLineDataBlockBase";
import {faSparkles} from "@fortawesome/pro-thin-svg-icons";

export default function OrchestrationNoRunsDataBlock({ width, className, type }) {
  if (hasStringValue(type) !== true) {
    return null;
  }

  return (
    <VanityTwoLineDataBlockBase
      width={width}
      className={className}
      focusText={`New ${type}`}
      label={`Click View ${type} below to get started!`}
      icon={faSparkles}
    />
  );
}

OrchestrationNoRunsDataBlock.propTypes = {
  type: PropTypes.string,
  width: PropTypes.string,
  className: PropTypes.string,
};
