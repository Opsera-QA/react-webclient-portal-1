import React, {useContext} from "react";
import PropTypes from "prop-types";
import CenterOverlayContainer from "components/common/overlays/center/CenterOverlayContainer";
import {faChartBar} from "@fortawesome/pro-light-svg-icons";
import ChartDetailsTabPanel from "components/insights/charts/detail_overlay/ChartDetailsTabPanel";
import {DialogToastContext} from "contexts/DialogToastContext";

function ChartDetailsOverlay({ chartModel }) {
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
      titleText={`Chart Details ${chartModel.getData("name")}`}
      // TODO: Make component that changes icon depending on chart type
      titleIcon={faChartBar}
      showToasts={true}
      showCloseButton={false}
    >
      <div className="shaded-panel m-3">
        <ChartDetailsTabPanel chartModel={chartModel}/>
      </div>
    </CenterOverlayContainer>
  );
}

ChartDetailsOverlay.propTypes = {
  chartModel: PropTypes.object
};

export default ChartDetailsOverlay;


