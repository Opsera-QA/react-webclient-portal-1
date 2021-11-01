import React from "react";
import PropTypes from "prop-types";
import ThreeLineDataBlockNoFocusBase from "components/common/metrics/data_blocks/base/ThreeLineDataBlockNoFocusBase";

function SdlcTestDurationDataBlock({ topText, mean, count, bottomText }) {
  return (
    <div
      className="metric-box"
      style={{ minHeight: "120px", verticalAlign: "middle", display: "flex", borderWidth: "2px" }}
    >
      <div style={{ margin: "auto" }}>
        <ThreeLineDataBlockNoFocusBase
          topText={topText}
          middleText={mean !== null ? `${mean} min | ${count}` : "N/A"}
          bottomText={bottomText}
        />
      </div>
    </div>
  );
}

SdlcTestDurationDataBlock.propTypes = {
  topText: PropTypes.string,
  mean: PropTypes.number,
  count: PropTypes.number,
  bottomText: PropTypes.string,
};

export default SdlcTestDurationDataBlock;
