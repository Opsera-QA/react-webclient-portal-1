import React from "react";
import PropTypes from "prop-types";
import {faShareAll} from "@fortawesome/pro-light-svg-icons";
import useComponentStateReference from "hooks/useComponentStateReference";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import IconBase from "components/common/icons/IconBase";
import PublishCustomerPipelineOverlay
  from "components/workflow/pipelines/summary/action_bar/buttons/publish/PublishCustomerPipelineOverlay";
import CustomerPipelineTemplateRoleHelper
  from "@opsera/know-your-role/roles/pipelines/templates/customer/customerPipelineTemplateRole.helper";

export default function ActionBarPublishPipelineToCustomerCatalogButton({pipelineModel, className}) {
  const {
    toastContext,
    userData,
  } = useComponentStateReference();

  const launchPublishDashboardToCustomerCatalogOverlay = () => {
    toastContext.showOverlayPanel(
      <PublishCustomerPipelineOverlay
        pipelineModel={pipelineModel}
      />
    );
  };

  if (pipelineModel == null || CustomerPipelineTemplateRoleHelper.canPublishCustomerPipelineTemplate(userData, pipelineModel?.getCurrentData()) !== true) {
    return null;
  }

  return (
    <div className={className}>
      <TooltipWrapper innerText={`Publish this Pipeline to your Organization's Private Catalog`}>
        <div>
          <IconBase
            onClickFunction={launchPublishDashboardToCustomerCatalogOverlay}
            icon={faShareAll}
            iconSize={"lg"}
          />
        </div>
      </TooltipWrapper>
    </div>
  );
}

ActionBarPublishPipelineToCustomerCatalogButton.propTypes = {
  pipelineModel: PropTypes.object,
  className: PropTypes.string,
};