import React from "react";
import PropTypes from "prop-types";
import PublishDashboardIconBase
  from "components/common/icons/dashboards/PublishDashboardIconBase";

function PublishDashboardToPrivateCatalogIcon({dashboardData, className}) {
  return (
    <PublishDashboardIconBase
      dashboardData={dashboardData}
      catalog={"private"}
      popoverText={`Publish this Dashboard to your Organization's Private Catalog`}
      className={className}
    />
  );
}

PublishDashboardToPrivateCatalogIcon.propTypes = {
  dashboardData: PropTypes.object,
  className: PropTypes.string
};

export default PublishDashboardToPrivateCatalogIcon;