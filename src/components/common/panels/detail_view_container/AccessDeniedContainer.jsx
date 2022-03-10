import React from "react";
import AccessDeniedDialog from "components/common/status_notifications/accessDeniedInfo";
import PropTypes from "prop-types";
import IconBase from "components/common/icons/IconBase";

function AccessDeniedContainer(
  {
    navigationTabContainer,
  }) {
  const getTopNavigation = () => {
    if (navigationTabContainer) {
      return (
        <div className="mb-3">
          {navigationTabContainer}
        </div>
      );
    }

    return (
      <div className="mb-3">
        <div className="sub-navigation-block" />
      </div>
    );
  };

  return (
    <div className="max-content-width mb-2 ml-2">
      {getTopNavigation()}
      <div className="content-container content-card-1 ">
        <div className="pl-2 content-block-header title-text-header-1">
          <IconBase className={"mr-1"}/>Access Denied!
        </div>
        <div className="p-2 mt-2 shaded-container detail-container-body">
          <div className="p-3 shaded-panel">
            <div className="info-text text-center m-auto">
              <AccessDeniedDialog />
            </div>
          </div>
        </div>
        <div className="content-block-footer"/>
      </div>
    </div>
  );
}

AccessDeniedContainer.propTypes = {
  navigationTabContainer: PropTypes.object,
};

export default AccessDeniedContainer;