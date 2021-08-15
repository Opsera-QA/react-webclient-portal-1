import React from "react";
import PropTypes from "prop-types";

function HorizontalThreeDataBlockContainer({topDataBlock, middleDataBlock, bottomDataBlock, className}) {
  return (
    <div className={className}>
      <div>
        {topDataBlock}
      </div>
      <div>
        {middleDataBlock}
      </div>
      <div>
        {bottomDataBlock}
      </div>
    </div>
  );
}

HorizontalThreeDataBlockContainer.propTypes = {
  topDataBlock: PropTypes.any,
  middleDataBlock: PropTypes.any,
  bottomDataBlock: PropTypes.any,
  className: PropTypes.string,
};

export default HorizontalThreeDataBlockContainer;