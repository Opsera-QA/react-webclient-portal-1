import React from "react";
import PropTypes from "prop-types";
import LegendDataBlockBase from "components/common/metrics/data_blocks/LegendDataBlockBase";

function LegendDataBlock({ firstItem, secondItem, thirdItem}) {
  const getFirstRow = () => {
    if (firstItem) {
      return (
        <div className="">
          {firstItem}
        </div>
      );
    }
  };

  const getSecondRow = () => {
    if (secondItem) {
      return (
        <div className="">
          {secondItem}
        </div>
      );
    }
  };

  const getThirdRow = () => {
    if (thirdItem) {
      return (
        <div className="">
          {thirdItem}
        </div>
      );
    }
  };

  const getLegend = () => {
    return (
      <div>
        {getFirstRow()}
        {getSecondRow()}
        {getThirdRow()}
      </div>
    );
  };


  return (
    <LegendDataBlockBase legend={getLegend()} />
  );
}

LegendDataBlock.propTypes = {
  firstItem: PropTypes.any,
  secondItem: PropTypes.any,
  thirdItem: PropTypes.any,
};

export default LegendDataBlock;