import React from "react";
import PropTypes from "prop-types";

export default function SalesforcePipelineWizardPreRunTaskScreen(
  {
    pipeline,
    setPipeline,
    setCurrentScreen,
    className,
  }) {
  return (
    <div className={className}>
      test
    </div>
  );
}

SalesforcePipelineWizardPreRunTaskScreen.propTypes = {
  pipeline: PropTypes.object,
  setPipeline: PropTypes.func,
  setCurrentScreen: PropTypes.func,
  className: PropTypes.string,
};