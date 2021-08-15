import React from "react";
import PropTypes from "prop-types";

function HorizontalThreeDataBlockContainer({topDataBlock, middleDataBlock, bottomDataBlock, className, height}) {
  return (
    <div className={className} style={{height: height}}>
      <div className={"mb-1"}>
        {topDataBlock}
      </div>
      <div className={"mb-1"}>
        {middleDataBlock}
      </div>
      <div className={"mb-1"}>
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
  height: PropTypes.string,
};

HorizontalThreeDataBlockContainer.defaultProps = {
  height: "300px",
};

export default HorizontalThreeDataBlockContainer;