import React, {useContext} from "react";
import PropTypes from "prop-types";
import CenterOverlayContainer from "components/common/overlays/center/CenterOverlayContainer";
import {faChartBar} from "@fortawesome/pro-light-svg-icons";
import ChartDetailsTabPanel from "components/insights/charts/detail_overlay/ChartDetailsTabPanel";
import {DialogToastContext} from "contexts/DialogToastContext";

function ChartDetailsOverlay({ dashboardData, kpiConfiguration, chartModel, kpiIdentifier, pipelineName, currentDate }) {
  const toastContext = useContext(DialogToastContext);
  const closePanel = () => {
    // if (isMounted?.current === true) {
    //   loadData();
    // }

    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  return (
    <CenterOverlayContainer
      closePanel={closePanel}
      showPanel={true}
      titleText={`${chartModel.getType()} Chart Details`}
      // TODO: Make component that changes icon depending on chart type
      titleIcon={faChartBar}
      showToasts={true}
      showCloseButton={false}
    >
      <div className="shaded-panel m-3">
        <ChartDetailsTabPanel dashboardData={dashboardData} kpiConfiguration={kpiConfiguration} chartModel={chartModel} kpiIdentifier={kpiIdentifier} pipelineName={pipelineName} currentDate={currentDate}/>
      </div>
    </CenterOverlayContainer>
  );
}

ChartDetailsOverlay.propTypes = {
  chartModel: PropTypes.object,
  kpiIdentifier: PropTypes.string,
  dashboardData: PropTypes.object,
  kpiConfiguration: PropTypes.object,
  pipelineName: PropTypes.string,
  currentDate: PropTypes.string
};

export default ChartDetailsOverlay;


