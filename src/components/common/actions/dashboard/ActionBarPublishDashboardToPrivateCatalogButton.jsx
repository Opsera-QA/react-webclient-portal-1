import React from "react";
import PropTypes from "prop-types";
import ActionBarPublishDashboardButtonBase
  from "components/common/actions/dashboard/ActionBarPublishDashboardButtonBase";

function ActionBarPublishDashboardToPrivateCatalogButton({dashboardData, className}) {
  return (
    <ActionBarPublishDashboardButtonBase
      dashboardData={dashboardData}
      catalog={"private"}
      popoverText={`Publish this Dashboard to your Organization's Private Catalog`}
      className={className}
    />
  );
}

ActionBarPublishDashboardToPrivateCatalogButton.propTypes = {
  dashboardData: PropTypes.object,
  className: PropTypes.string
};

export default ActionBarPublishDashboardToPrivateCatalogButton;