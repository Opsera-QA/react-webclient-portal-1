import React from "react";
import PropTypes from "prop-types";
import PipelineLandingDataBlockMetrics
  from "components/free_trial/pipelines/data_blocks/PipelineLandingDataBlockMetrics";
import PipelineWidgetsHeader from "components/free_trial/pipelines/widgets/PipelineWidgetsHeader";

// TODO: Make a theme constants file
export const THEME_COLORS = {
  LIGHT_PURPLE: "#B9A1F9",
  LIGHT_GOLD: "#E5C27E",
  LIGHT_SALMON: "#FE8C83",
  LIGHT_MINT: "#95D0D5",
  WHITE: "#FFFFFF",
};

export const THEME_FONTS = {
  INTER: "Inter",
};

function PipelinesLanding() {
  return (
    <div className={"max-content-width"}>
      <div className={"mt-3"}>
        <PipelineLandingDataBlockMetrics />
      </div>
      <div>
        <PipelineWidgetsHeader />
      </div>
    </div>
  );
}

PipelinesLanding.propTypes = {
  activeTab: PropTypes.string,
  handleTabClick: PropTypes.func,
};

export default PipelinesLanding;