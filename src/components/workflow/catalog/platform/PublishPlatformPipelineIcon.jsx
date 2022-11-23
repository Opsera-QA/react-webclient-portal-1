import React, { useState } from "react";
import PropTypes from "prop-types";
import { faShareAll } from "@fortawesome/pro-light-svg-icons";
import useComponentStateReference from "hooks/useComponentStateReference";
import {
  platformDashboardTemplateActions,
} from "components/insights/marketplace/dashboards/templates/platform/platformDashboardTemplate.actions";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import IconBase from "components/common/icons/IconBase";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";

function PublishPlatformPipelineIcon(
  {
    dashboardId,
    className,
  }) {
  const [isPublishing, setIsPublishing] = useState(false);
  const {
    cancelTokenSource,
    toastContext,
    isOpseraAdministrator,
    isMounted,
    getAccessToken,
  } = useComponentStateReference();

  const addDashboardToPrivateCatalog = async () => {
    try {
      setIsPublishing(true);
      await platformDashboardTemplateActions.publishTemplateV2(
        getAccessToken,
        cancelTokenSource,
        dashboardId,
      );
      toastContext.showFormSuccessToast(
        `Added Dashboard to the Opsera Marketplace Catalog`,
      );
    } catch (error) {
      if (isMounted?.current === true) {
        toastContext.showSystemErrorToast(
          error,
          `Error Adding Dashboard to the Opsera Marketplace Catalog:`,
        );
      }
    } finally {
      if (isMounted?.current === true) {
        setIsPublishing(false);
      }
    }
  };

  if (isOpseraAdministrator !== true || isMongoDbId(dashboardId) !== true) {
    return null;
  }

  return (
    <div className={className}>
      <TooltipWrapper innerText={`Publish this Dashboard to the Public Marketplace.`}>
        <div>
          <IconBase
            onClickFunction={addDashboardToPrivateCatalog}
            icon={faShareAll}
            isLoading={isPublishing}
            className={"pointer"}
          />
        </div>
      </TooltipWrapper>
    </div>
  );
}

PublishPlatformPipelineIcon.propTypes = {
  dashboardId: PropTypes.string,
  className: PropTypes.string,
};

export default PublishPlatformPipelineIcon;