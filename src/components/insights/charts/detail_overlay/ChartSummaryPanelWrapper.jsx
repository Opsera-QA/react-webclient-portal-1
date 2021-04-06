import React from "react";
import PropTypes from "prop-types";
import ReactJson from "react-json-view";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";

function ChartSummaryPanelWrapper({ chartModel }) {
  const getStepConfigurationSummary = () => {
    switch (chartModel.getData("kpi_identifier")) {
      // case "anchore-integrator":
      //   return (
      //     // <AnchoreIntegratorStepConfigurationSummaryPanel
      //     //   pipelineData={pipelineData}
      //     //   anchoreDataObject={getModelWrappedObject(anchoreIntegratorStepConfigurationMetadata)}
      //     // />
      //   );
      default:
        return (
          <SummaryPanelContainer>
            <ReactJson src={chartModel?.getPersistData()} enableClipboard={false} displayDataTypes={false} collapsed={false}/>
          </SummaryPanelContainer>
        );
    }
  };

  return (
    <div>
      {getStepConfigurationSummary()}
    </div>
  );
}

ChartSummaryPanelWrapper.propTypes = {
  chartModel: PropTypes.object,
};

export default ChartSummaryPanelWrapper;
