import React, {useState} from "react";
import PropTypes from "prop-types";
import OverlayPanelBodyContainer from "components/common/panels/detail_panel_container/OverlayPanelBodyContainer";
import ConfirmationOverlay from "components/common/overlays/center/ConfirmationOverlay";
import useComponentStateReference from "hooks/useComponentStateReference";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";
import entitlementConstants
  from "@opsera/definitions/constants/settings/organization-settings/entitlements/entitlement.constants";
import SalesforceFeaturesChildEntitlementEditorPanel
  from "components/admin/organization_settings/details/entitlements/cards/salesforce_landing/SalesforceFeaturesChildEntitlementEditorPanel";
import UpdateOrganizationSettingsEntitlementButton
  from "components/admin/organization_settings/details/entitlements/active/UpdateOrganizationSettingsEntitlementButton";
import DeleteConfirmationOverlay from "components/common/overlays/center/delete/DeleteConfirmationOverlay";
import useEntitlementAdministrationActions
  from "hooks/settings/organization_settings/entitlements/useEntitlementAdministrationActions";
import useGetEntitlementModel from "hooks/settings/organization_settings/entitlements/useGetEntitlementModel";
import DeleteButtonBase from "temp-library-components/button/delete/DeleteButtonBase";
import {useHistory} from "react-router-dom";
import {faEdit} from "@fortawesome/pro-light-svg-icons";

export default function EditOrganizationSettingsEntitlementOverlay(
  {
    entitlement,
    organizationDomain,
    organizationAccountName,
  }) {
  const {
    getEntitlementModel,
    getChildEntitlementModel,
  } = useGetEntitlementModel();
  const [entitlementModel, setEntitlementModel] = useState(getEntitlementModel(entitlement));
  const [childEntitlementModel, setChildEntitlementModel] = useState(getChildEntitlementModel(entitlement));
  const [inDeleteMode, setInDeleteMode] = useState(false);
  const label = DataParsingHelper.parseString(entitlementConstants.getEntitlementNameLabel(entitlementModel?.getEntitlementNameLabel()));
  const entitlementAdministrationActions = useEntitlementAdministrationActions();
  const history = useHistory();
  const {
    toastContext,
  } = useComponentStateReference();

  const closeOverlayFunction = () => {
    toastContext.clearOverlayPanel();
  };

  const updateParentModel = (newChildEntitlementModel) => {
    const parsedParameters = DataParsingHelper.parseObject(newChildEntitlementModel?.getPersistData(), {});
    entitlementModel.setData("parameters", parsedParameters);
    setEntitlementModel({...entitlementModel});
    setChildEntitlementModel({...newChildEntitlementModel});
  };

  const getChildEntitlementEditorPanel = () => {
    switch (entitlementModel?.getData("name")) {
      case entitlementConstants.ENTITLEMENT_NAMES.ENABLE_SALESFORCE_FEATURES:
        return (
          <SalesforceFeaturesChildEntitlementEditorPanel
            childEntitlementModel={childEntitlementModel}
            updateParentModel={updateParentModel}
          />
        );
    }
  };

  const handleDeleteFunction = async () => {
    return await entitlementAdministrationActions.deleteEntitlement(
      entitlementModel?.getMongoDbId(),
      organizationDomain,
      organizationAccountName,
    );
  };

  if (entitlement == null || entitlementModel == null) {
    return null;
  }

  if (inDeleteMode === true) {
    return (
      <DeleteConfirmationOverlay
        type={"Entitlement"}
        handleDeleteFunction={handleDeleteFunction}
        afterDeleteFunction={() => history.push(history.location)}
      />
    );
  }

  return (
    <ConfirmationOverlay
      closePanel={closeOverlayFunction}
      showPanel={true}
      titleText={`Editing ${label} Entitlement`}
      titleIcon={faEdit}
      showToasts={true}
      showCloseButton={false}
    >
      <OverlayPanelBodyContainer
        hideCloseButton={true}
      >
        <div className={"mx-3 mb-3 mt-2"}>
          {getChildEntitlementEditorPanel()}
          <div
            style={{
              marginTop: "150px",
            }}
          />
          <ButtonContainerBase
            leftSideButtons={
              <DeleteButtonBase
                normalText={"Delete Entitlement"}
                onClickFunction={() => setInDeleteMode(true)}
              />
            }
          >
            <UpdateOrganizationSettingsEntitlementButton
              entitlementModel={entitlementModel}
              organizationDomain={organizationDomain}
              organizationAccountName={organizationAccountName}
              closeOverlayFunction={closeOverlayFunction}
            />
          </ButtonContainerBase>
        </div>
      </OverlayPanelBodyContainer>
    </ConfirmationOverlay>
  );
}

EditOrganizationSettingsEntitlementOverlay.propTypes = {
  entitlement: PropTypes.object,
  organizationDomain: PropTypes.string,
  organizationAccountName: PropTypes.string,
};
