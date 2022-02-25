import React from "react";
import PropTypes from "prop-types";

function ThreeStackedHorizontalMetricsContainer({topDataBlock, middleDataBlock, bottomDataBlock, className, height}) {
  return (
    <div className={className} style={{height: height}}>
      <div className={"my-3"}>
        {topDataBlock}
      </div>
      <div className={"my-3"}>
        {middleDataBlock}
      </div>
      <div className={"my-3"}>
        {bottomDataBlock}
      </div>
    </div>
  );
}

ThreeStackedHorizontalMetricsContainer.propTypes = {
  topDataBlock: PropTypes.any,
  middleDataBlock: PropTypes.any,
  bottomDataBlock: PropTypes.any,
  className: PropTypes.string,
  height: PropTypes.string,
};

export default ThreeStackedHorizontalMetricsContainer;