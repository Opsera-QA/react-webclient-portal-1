import React, { useState } from "react";
import PropTypes from "prop-types";
import { faShareSquare } from "@fortawesome/pro-light-svg-icons";
import useComponentStateReference from "hooks/useComponentStateReference";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import IconBase from "components/common/icons/IconBase";
import {
  customerDashboardTemplateCatalogActions
} from "components/insights/marketplace/dashboards/templates/private/customerDashboardTemplateCatalog.actions";
import PublishCustomerDashboardOverlay
  from "components/insights/marketplace/dashboards/templates/private/publish/PublishCustomerDashboardOverlay";

export default function PublishCustomerDashboardIcon(
  {
    dashboardModel,
    className,
  }) {
  const [isPublishing, setIsPublishing] = useState(false);
  const {
    cancelTokenSource,
    toastContext,
    isMounted,
    getAccessToken,
  } = useComponentStateReference();

  const addDashboardToCustomerCatalog = async () => {
    try {
      setIsPublishing(true);
      await customerDashboardTemplateCatalogActions.publishTemplateV2(
        getAccessToken,
        cancelTokenSource,
        dashboardModel?.getMongoDbId(),
      );
      toastContext.showFormSuccessToast(
        `Added Dashboard to your organization's Private Catalog`,
      );
    } catch (error) {
      if (isMounted?.current === true) {
        toastContext.showSystemErrorToast(
          error,
          `Error Adding Dashboard to your organization's Private Catalog:`,
        );
      }
    } finally {
      if (isMounted?.current === true) {
        setIsPublishing(false);
      }
    }
  };

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
            onClickFunction={addDashboardToCustomerCatalog}
            // onClickFunction={launchPublishDashboardToCustomerCatalogOverlay}
            icon={faShareSquare}
            isLoading={isPublishing}
          />
        </div>
      </TooltipWrapper>
    </div>
  );
}

PublishCustomerDashboardIcon.propTypes = {
  dashboardModel: PropTypes.object,
  className: PropTypes.string,
};