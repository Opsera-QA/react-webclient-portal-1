import React from "react";
import PropTypes from "prop-types";

function LegendDataBlockBase({ legend, className}) {
  return (
    <div className={className}>
      <div className={"p-3 text-center my-auto h-100"}>
        <div className="">
          {legend}
        </div>
      </div>
    </div>
  );
}

LegendDataBlockBase.propTypes = {
  legend: PropTypes.any,
  className: PropTypes.string
};

export default LegendDataBlockBase;