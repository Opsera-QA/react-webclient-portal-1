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
import useGetPolicyModelByName from "hooks/settings/organization_settings/policies/useGetPolicyModelByName";
import policyConstants from "@opsera/definitions/constants/settings/organization-settings/policies/policy.constants";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import SiteRoleHelper from "@opsera/know-your-role/roles/helper/site/siteRole.helper";

export default function ActionBarPublishPipelineToCustomerCatalogButton({pipelineModel, className}) {
  const {
    toastContext,
    userData,
  } = useComponentStateReference();
  const {
    isLoading,
    policyModel,
  } = useGetPolicyModelByName(policyConstants.POLICY_NAMES.PIPELINE_PRIVATE_CATALOG_PUBLISHING_RESTRICTIONS);
  const allowedRoles = DataParsingHelper.parseArray(policyModel?.getData("parameters.allowed_roles"), []);

  const launchPublishDashboardToCustomerCatalogOverlay = () => {
    toastContext.showOverlayPanel(
      <PublishCustomerPipelineOverlay
        pipelineModel={pipelineModel}
      />
    );
  };

  if (
    pipelineModel == null
    || CustomerPipelineTemplateRoleHelper.canPublishCustomerPipelineTemplate(userData, pipelineModel?.getCurrentData()) !== true
    || isLoading === true
    || SiteRoleHelper.isMemberOfAllowedSiteRoles(userData, allowedRoles) !== true
  ) {
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