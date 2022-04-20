import React from "react";
import PropTypes from "prop-types";
import PublishDashboardIconBase
  from "components/common/icons/dashboards/PublishDashboardIconBase";
import {faShareSquare} from "@fortawesome/pro-light-svg-icons";

function PublishDashboardToPrivateCatalogIcon({dashboardModel, className}) {
  if (dashboardModel?.canPublishDashboardToPrivateCatalog() !== true) {
    return null;
  }

  return (
    <PublishDashboardIconBase
      dashboardId={dashboardModel?.getMongoDbId()}
      catalog={"private"}
      popoverText={`Publish this Dashboard to your Organization's Private Catalog`}
      icon={faShareSquare}
      className={className}
    />
  );
}

PublishDashboardToPrivateCatalogIcon.propTypes = {
  dashboardModel: PropTypes.object,
  className: PropTypes.string
};

export default PublishDashboardToPrivateCatalogIcon;