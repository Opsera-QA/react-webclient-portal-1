import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import RoleAccessInput from "components/common/inputs/roles/RoleAccessInput";
import CenterOverlayContainer from "components/common/overlays/center/CenterOverlayContainer";
import {faEdit} from "@fortawesome/pro-light-svg-icons";
import PersistAndCloseButtonContainer from "components/common/buttons/saving/containers/PersistAndCloseButtonContainer";
import RoleParsingHelper from "@opsera/persephone/helpers/data/roles/roleParsing.helper";
import modelHelpers from "components/common/model/modelHelpers";
import {roleAccessInputMetadata} from "components/common/inline_inputs/roles/overlay/roleAccessInput.metadata";
import RoleHelper from "@opsera/know-your-role/roles/role.helper";
import useComponentStateReference from "hooks/useComponentStateReference";
import AccessRoleLoseAccessConfirmationOverlay
  from "components/common/inline_inputs/roles/overlay/AccessRoleLoseAccessConfirmationOverlay";
import {hasStringValue} from "components/common/helpers/string-helpers";
import StandaloneSaveButton from "components/common/buttons/saving/StandaloneSaveButton";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";
import {useHistory} from "react-router-dom";

function EditRolesOverlay(
  {
    model,
    fieldName,
    loadData,
    saveDataFunction,
    lostAccessRerouteRoute,
  }) {
  const history = useHistory();
  const [roleAccessInputModel, setRoleAccessInputModel] = useState(undefined);
  const {
    userData,
    toastContext,
  } = useComponentStateReference();

  useEffect(() => {
    toastContext.removeInlineMessage();
    const data = {
      roles: RoleParsingHelper.parseRoleArray(model?.getData(fieldName), []),
    };
    setRoleAccessInputModel({...modelHelpers.parseObjectIntoModel(data, roleAccessInputMetadata)});
  }, [model]);

  const handleSave = async (willLoseAccess) => {
    const response =  await saveDataFunction(roleAccessInputModel.getData(fieldName));
    toastContext.showUpdateSuccessResultDialog("Access Rules");
    closePanelFunction();

    if (willLoseAccess === true) {
      history.push(lostAccessRerouteRoute);
    }

    return response;
  };

  const handleAccessCheck = async () => {
    if (hasStringValue(lostAccessRerouteRoute) === true) {
      const willLoseAccess = RoleHelper.willLoseAccessIfRolesChanged(
        userData,
        model?.getCurrentData(),
        RoleParsingHelper.parseRoleArray(model?.getData(fieldName), []),
      );

      if (willLoseAccess === true) {
       toastContext.showOverlayPanel(
         <AccessRoleLoseAccessConfirmationOverlay
          closePanelFunction={closePanelFunction}
          lostAccessRerouteRoute={lostAccessRerouteRoute}
          saveAccessRolesFunction={() => handleSave(true)}
         />
       );
        return;
      }
    }

    return await handleSave();
  };

  const closePanelFunction = () => {
    if (loadData != null) {
      loadData();
    }

    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  if (model == null || roleAccessInputModel == null) {
    return null;
  }

  return (
    <CenterOverlayContainer
      closePanel={closePanelFunction}
      showPanel={true}
      titleText={`Edit Access Rules`}
      titleIcon={faEdit}
      showToasts={true}
      showCloseButton={false}
    >
      <div className={"mx-3 mb-3 mt-2"}>
        <div className="text-color mb-2">Access Rules define who has privileges to interact with a resource.
          Individual users or groups can be used to grant the access. Owners and Administrators have full access,
          Managers and SecOps roles have
          limited editing access while users can only run or use resources.
        </div>
        <div>
          <RoleAccessInput
            model={roleAccessInputModel}
            setModel={setRoleAccessInputModel}
            fieldName={fieldName}
          />
        </div>
        <ButtonContainerBase>
          <StandaloneSaveButton
            size={"1x"}
            showToasts={false}
            disable={roleAccessInputModel?.checkCurrentValidity() !== true}
            // saveFunction={handleAccessCheck}
            saveFunction={handleSave}
          />
        </ButtonContainerBase>
      </div>
    </CenterOverlayContainer>
  );
}

EditRolesOverlay.propTypes = {
  loadData: PropTypes.func,
  saveDataFunction: PropTypes.func,
  model: PropTypes.object,
  fieldName: PropTypes.string,
  lostAccessRerouteRoute: PropTypes.string,
};

export default EditRolesOverlay;


