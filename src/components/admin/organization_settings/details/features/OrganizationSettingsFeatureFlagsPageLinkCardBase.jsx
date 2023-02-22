import React from "react";
import PropType from "prop-types";
import SelectionCardBase from "components/common/card/selection/SelectionCardBase";
import useComponentStateReference from "hooks/useComponentStateReference";
import useGetFeatureFlagModel from "hooks/settings/organization_settings/feature_flags/useGetFeatureFlagModel";
import OrganizationSettingsFeatureFlagEditorPanelOverlay
  from "components/admin/organization_settings/details/features/OrganizationSettingsFeatureFlagEditorPanelOverlay";
import featureFlagConstants
  from "@opsera/definitions/constants/settings/organization-settings/feature_flags/featureFlag.constants";
import DeleteConfirmationOverlay from "components/common/overlays/center/delete/DeleteConfirmationOverlay";
import useFeatureFlagAdministrationActions
  from "hooks/settings/organization_settings/feature_flags/useFeatureFlagAdministrationActions";
import {useHistory} from "react-router-dom";

export default function OrganizationSettingsFeatureFlagsPageLinkCardBase(
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
        type={"Feature Flag"}
        handleDeleteFunction={handleDeleteFunction}
        afterDeleteFunction={() => history.push(history.location)}
      />
      // <OrganizationSettingsFeatureFlagEditorPanelOverlay
      //   organizationDomain={organizationDomain}
      //   organizationAccountId={organizationAccountId}
      //   featureFlagModel={featureFlagModel}
      // />
    );
  };

  const getTitle = () => {
    return (
      <div className={"w-100"}>
        <div>{featureFlagConstants.getFeatureFlagNameLabel(featureFlag?.name)}</div>
        {/*<div>*/}
        {/*  <FeatureFlagParametersSummaryPanel*/}
        {/*    featureFlagModel={featureFlagModel}*/}
        {/*  />*/}
        {/*</div>*/}
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

OrganizationSettingsFeatureFlagsPageLinkCardBase.propTypes = {
  featureFlag: PropType.object,
  description: PropType.any,
  icon: PropType.object,
  organizationDomain: PropType.string,
  organizationAccountId: PropType.string,
};
