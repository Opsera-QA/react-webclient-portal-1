import React from "react";
import PropTypes from "prop-types";

function ModalTabPanelContainer({ tabContainer, detailView }) {
  return (
    <div>
      <div>
          {tabContainer}
      </div>
      <div className={"py-2 modal-detail-view-body"}>
        {detailView}
      </div>
    </div>
  );
}


ModalTabPanelContainer.propTypes = {
  tabContainer: PropTypes.object,
  detailView: PropTypes.object,
};

export default ModalTabPanelContainer;