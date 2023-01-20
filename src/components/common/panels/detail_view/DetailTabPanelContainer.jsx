import React from "react";
import PropTypes from "prop-types";

function DetailTabPanelContainer({ tabContainer, detailView }) {
  return (
    <div className={"mx-3 mb-3"}>
      <div className={"mt-1"}>
          {tabContainer}
      </div>
      <div className={"shaded-panel detail-panel-body"}>
        {detailView}
      </div>
    </div>
  );
}


DetailTabPanelContainer.propTypes = {
  tabContainer: PropTypes.object,
  detailView: PropTypes.object,
};

export default DetailTabPanelContainer;