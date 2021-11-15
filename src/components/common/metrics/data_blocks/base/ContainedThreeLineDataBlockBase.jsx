import React from "react";
import PropTypes from "prop-types";
import DataBlockContainer from "components/common/metrics/data_blocks/horizontal/DataBlockContainer";

function ContainedThreeLineDataBlockBase({ middleText, bottomText, titleText, className}) {
  const getMiddleText = () => {
    if (middleText) {
      return (
        <div>
          {middleText}
        </div>
      );
    }
  };

  const getSubtitle = () => {
    if (bottomText) {
      return (
        <div>
          {bottomText}
        </div>
      );
    }
  };

  return (
    <div className={className}>
      <div className={"text-center h-100 font-inter-light-300"}>
        <DataBlockContainer title={titleText}>
          <div className="my-auto dark-gray-text-primary">
            {getMiddleText()}
          </div>
          <div className="mt-auto light-gray-text-secondary">
            {getSubtitle()}
          </div>
        </DataBlockContainer>
      </div>
    </div>
  );
}

ContainedThreeLineDataBlockBase.propTypes = {
  titleText: PropTypes.any,
  middleText: PropTypes.any,
  bottomText: PropTypes.any,
  className: PropTypes.string
};

export default ContainedThreeLineDataBlockBase;