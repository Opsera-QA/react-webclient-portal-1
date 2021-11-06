import React from "react";
import PropTypes from "prop-types";
import ThreeLineDataBlockNoFocusBase from "components/common/metrics/data_blocks/base/ThreeLineDataBlockNoFocusBase";

function SdlcSecurityScanDurationDataBlock({ topText, dataBlockValues, goalsData }) {
  
  return (
    <div
      className="metric-box"
      style={{ minHeight: "120px", verticalAlign: "middle", display: "flex", borderWidth: "2px" }}
    >
      <div style={{ margin: "auto" }}>
        <ThreeLineDataBlockNoFocusBase
          topText={topText}
          middleText={
            dataBlockValues[0]?.code_scan_mean
              ? dataBlockValues[0]?.code_scan_mean + " min | " + dataBlockValues[0]?.code_scan_count + " runs"
              : "N/A | 0"
          }
          bottomText={goalsData?.average_security_scan ? "Goal: " + goalsData?.average_security_scan + " min" : ""}
        />
      </div>
    </div>
  );
}

SdlcSecurityScanDurationDataBlock.propTypes = {
  topText: PropTypes.string,
  dataBlockValues: PropTypes.array,
  goalsData: PropTypes.object,
};

export default SdlcSecurityScanDurationDataBlock;
