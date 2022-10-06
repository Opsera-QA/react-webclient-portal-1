import React from "react";
import PropTypes from "prop-types";

export default function TabPanelContainer(
  {
    tabContainer,
    currentView,
    className,
  }) {
  return (
    <div className={className}>
      <div className="mt-1">
          {tabContainer}
      </div>
      <div>
        {currentView}
      </div>
    </div>
  );
}

TabPanelContainer.propTypes = {
  tabContainer: PropTypes.object,
  currentView: PropTypes.object,
  className: PropTypes.string,
};