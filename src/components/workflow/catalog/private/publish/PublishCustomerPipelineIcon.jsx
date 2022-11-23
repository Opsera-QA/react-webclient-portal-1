import React from "react";
import PropTypes from "prop-types";
import { faShareSquare } from "@fortawesome/pro-light-svg-icons";
import useComponentStateReference from "hooks/useComponentStateReference";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import IconBase from "components/common/icons/IconBase";
import PublishCustomerDashboardOverlay
  from "components/insights/marketplace/dashboards/templates/private/publish/PublishCustomerDashboardOverlay";

export default function PublishCustomerPipelineIcon(
  {
    dashboardModel,
    className,
  }) {
  const {
    toastContext,
  } = useComponentStateReference();

  const launchPublishDashboardToCustomerCatalogOverlay = () => {
    toastContext.showOverlayPanel(
      <PublishCustomerDashboardOverlay
        dashboardModel={dashboardModel}
      />
    );
  };

  if (dashboardModel?.canPublishDashboardToPrivateCatalog() !== true) {
    return null;
  }

  return (
    <div className={className}>
      <TooltipWrapper innerText={`Publish this Dashboard to your Organization's Private Catalog`}>
        <div>
          <IconBase
            onClickFunction={launchPublishDashboardToCustomerCatalogOverlay}
            icon={faShareSquare}
          />
        </div>
      </TooltipWrapper>
    </div>
  );
}

PublishCustomerPipelineIcon.propTypes = {
  dashboardModel: PropTypes.object,
  className: PropTypes.string,
};