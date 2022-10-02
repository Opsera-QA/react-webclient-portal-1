import React from "react";
import BackButtonBase from "components/common/buttons/back/BackButtonBase";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";
import FreeTrialExtendUserAccessSelectInput
  from "components/settings/trial/user_expiration/extension/input/FreeTrialExtendUserAccessSelectInput";
import FreeTrialUserExpirationExtendUserAccessButton
  from "components/settings/trial/user_expiration/extension/FreeTrialUserExpirationExtendUserAccessButton";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import useGetFreeTrialUserExpirationManagementModel
  from "components/settings/trial/user_expiration/useGetFreeTrialUserExpirationManagementModel";
import { ROLE_LEVELS } from "components/common/helpers/role-helpers";
import FreeTrialUserExpirationManagementSubNavigationBar
  from "components/settings/trial/user_expiration/FreeTrialUserExpirationManagementSubNavigationBar";
import useComponentStateReference from "hooks/useComponentStateReference";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import { useHistory } from "react-router-dom";

export default function FreeTrialUserExpirationExtendUserAccessScreen() {
  const {
    accessRoleData,
    isOpseraAdministrator,
  } = useComponentStateReference();
  const {
    freeTrialUserExpirationModel,
    setFreeTrialUserExpirationModel,
  } = useGetFreeTrialUserExpirationManagementModel();
  const history = useHistory();

  if (isOpseraAdministrator !== true) {
    return null;
  }

  return (
    <ScreenContainer
      breadcrumbDestination={"freeTrialUserExpirationManagement"}
      isLoading={!accessRoleData}
      roleRequirement={ROLE_LEVELS.OPSERA_ADMINISTRATORS}
      accessRoleData={accessRoleData}
      navigationTabContainer={<FreeTrialUserExpirationManagementSubNavigationBar activeTab={"users"} />}
    >
      <div className={"m-3"}>
        <H5FieldSubHeader
          subheaderText={"A Free Trial user can only be extended once. Afterwards, they will be added to the unlimited rule."}
        />
        <FreeTrialExtendUserAccessSelectInput
          model={freeTrialUserExpirationModel}
          setModel={setFreeTrialUserExpirationModel}
        />
        <ButtonContainerBase
          leftSideButtons={
            <BackButtonBase
              backButtonFunction={() => history.push("/settings/trial/user-expiration-management")}
            />
          }
        >
          <FreeTrialUserExpirationExtendUserAccessButton
            userId={freeTrialUserExpirationModel?.getData("extendUserId")}
            alreadyExtended={freeTrialUserExpirationModel?.getData("alreadyExtended")}
          />
        </ButtonContainerBase>
      </div>
    </ScreenContainer>
  );
}

FreeTrialUserExpirationExtendUserAccessScreen.propTypes = {};