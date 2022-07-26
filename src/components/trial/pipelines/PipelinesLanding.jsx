import React from "react";
import PropTypes from "prop-types";
import PipelineLandingDataBlockWidgets
  from "components/trial/pipelines/data_blocks/PipelineLandingDataBlockWidgets";
import PipelineWidgetsHeader from "components/trial/pipelines/widgets/PipelineWidgetsHeader";
import PipelineWidgetsBody from "components/trial/pipelines/widgets/PipelineWidgetsBody";

function PipelinesLanding() {
  return (
    <div className={"max-content-width"}>
      <div className={"mt-3"}>
        <PipelineLandingDataBlockWidgets />
      </div>
      <div className={"mt-3"}>
        <PipelineWidgetsHeader />
      </div>
      <div>
        <PipelineWidgetsBody />
      </div>
    </div>
  );
}

PipelinesLanding.propTypes = {
  activeTab: PropTypes.string,
  handleTabClick: PropTypes.func,
};

export default PipelinesLanding;