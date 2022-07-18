import React from "react";
import PropTypes from "prop-types";
import IconBase from "src/components/common/icons/IconBase.jsx";

function MetricDataBlockBaseContainer(
  {
    title,
    id,
    className,
    titleClassName,
    selectOptions,
    selectedOption,
    setDataFunction,
    disabled,
  }) {
  return (
    <div>
      <div className={"d-flex"}>
        <div>
          <span></span>
        </div>
        <div className={"ml-auto"}>
          <IconBase icon={faChartCompass} />
        </div>
      </div>
    </div>
  );
}

MetricDataBlockBaseContainer.propTypes = {
  title: PropTypes.string,
  id: PropTypes.string,
  className: PropTypes.string,
  titleClassName: PropTypes.string,
  selectedOption: PropTypes.string,
  selectOptions: PropTypes.array,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
};

export default MetricDataBlockBaseContainer;
