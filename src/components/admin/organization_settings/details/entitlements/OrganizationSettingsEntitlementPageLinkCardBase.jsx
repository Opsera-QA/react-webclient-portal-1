import React from "react";
import PropType from "prop-types";
import SelectionCardBase from "components/common/card/selection/SelectionCardBase";
import useComponentStateReference from "hooks/useComponentStateReference";
import DeleteConfirmationOverlay from "components/common/overlays/center/delete/DeleteConfirmationOverlay";
import {useHistory} from "react-router-dom";
import entitlementConstants
  from "@opsera/definitions/constants/settings/organization-settings/entitlements/entitlement.constants";
import useEntitlementAdministrationActions
  from "hooks/settings/organization_settings/entitlements/useEntitlementAdministrationActions";
import useGetEntitlementModel from "hooks/settings/organization_settings/entitlements/useGetEntitlementModel";

export default function OrganizationSettingsEntitlementPageLinkCardBase(
  {
    entitlement,
    description,
    icon,
    organizationDomain,
    organizationAccountId,
  }) {
  const { getEntitlementModel } = useGetEntitlementModel();
  const entitlementAdministrationActions = useEntitlementAdministrationActions();
  const entitlementModel = getEntitlementModel(entitlement);
  const history = useHistory();
  const {
    toastContext,
  } = useComponentStateReference();

  const handleDeleteFunction = async () => {
    return await entitlementAdministrationActions.deleteEntitlement(
      entitlementModel?.getMongoDbId(),
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
        <div>{entitlementConstants.getEntitlementNameLabel(entitlement?.name)}</div>
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
  entitlement: PropType.object,
  description: PropType.any,
  icon: PropType.object,
  organizationDomain: PropType.string,
  organizationAccountId: PropType.string,
};
