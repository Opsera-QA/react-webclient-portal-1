import React from "react";
import PropType from "prop-types";
import SelectionCardBase from "components/common/card/selection/SelectionCardBase";
import useComponentStateReference from "hooks/useComponentStateReference";
import useGetFeatureFlagModel from "hooks/settings/organization_settings/feature_flags/useGetFeatureFlagModel";
import DeleteConfirmationOverlay from "components/common/overlays/center/delete/DeleteConfirmationOverlay";
import useFeatureFlagAdministrationActions
  from "hooks/settings/organization_settings/feature_flags/useFeatureFlagAdministrationActions";
import {useHistory} from "react-router-dom";
import entitlementConstants
  from "@opsera/definitions/constants/settings/organization-settings/entitlements/entitlement.constants";

export default function OrganizationSettingsEntitlementPageLinkCardBase(
  {
    featureFlag,
    description,
    icon,
    organizationDomain,
    organizationAccountId,
  }) {
  const { getFeatureFlagModel } = useGetFeatureFlagModel();
  const featureFlagAdministrationActions = useFeatureFlagAdministrationActions();
  const featureFlagModel = getFeatureFlagModel(featureFlag);
  const history = useHistory();
  const {
    toastContext,
  } = useComponentStateReference();

  const handleDeleteFunction = async () => {
    return await featureFlagAdministrationActions.deleteFeatureFlag(
      featureFlagModel?.getMongoDbId(),
      organizationDomain,
      organizationAccountId,
    );
  };

  const handleOnClickFunction = () => {
    toastContext.showOverlayPanel(
      <DeleteConfirmationOverlay
        type={"Entitlement"}
        handleDeleteFunction={handleDeleteFunction}
        afterDeleteFunction={() => history.push(history.location)}
      />
    );
  };

  const getTitle = () => {
    return (
      <div className={"w-100"}>
        <div>{entitlementConstants.getEntitlementNameLabel(featureFlag?.name)}</div>
      </div>
    );
  };

  const getBody = () => {
    return (
      <div>
        {description}
      </div>
    );
  };

  return (
    <SelectionCardBase
      titleText={getTitle()}
      body={getBody()}
      icon={icon}
      onClickFunction={handleOnClickFunction}
      className={"my-3"}
    />
  );
}

OrganizationSettingsEntitlementPageLinkCardBase.propTypes = {
  featureFlag: PropType.object,
  description: PropType.any,
  icon: PropType.object,
  organizationDomain: PropType.string,
  organizationAccountId: PropType.string,
};
