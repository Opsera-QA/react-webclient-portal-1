import React from "react";
import PropTypes from "prop-types";

export default function VanityTabPanelContainer(
  {
    tabContainer,
    detailView,
    tabContainerClassName,
    detailViewClassName,
  }) {
  return (
    <>
      <div className={tabContainerClassName}>
        {tabContainer}
      </div>
      <div className={detailViewClassName}>
        {detailView}
      </div>
    </>
  );
}


VanityTabPanelContainer.propTypes = {
  tabContainer: PropTypes.object,
  detailView: PropTypes.object,
  tabContainerClassName: PropTypes.string,
  detailViewClassName: PropTypes.string,
};
