import React from "react";
import PropTypes from "prop-types";

function GeneralTabPanelContainer({ tabContainer, currentView, tabContainerClassName, bodyClassName }) {
  return (
    <div>
      <div className={tabContainerClassName}>
          {tabContainer}
      </div>
      <div className={bodyClassName}>
        {currentView}
      </div>
    </div>
  );
}

GeneralTabPanelContainer.propTypes = {
  tabContainer: PropTypes.object,
  currentView: PropTypes.object,
  tabContainerClassName: PropTypes.string,
  bodyClassName: PropTypes.string
};

GeneralTabPanelContainer.defaultProps = {
  bodyClassName: "pt-1 scroll-y hide-x-overflow"
};

export default GeneralTabPanelContainer;