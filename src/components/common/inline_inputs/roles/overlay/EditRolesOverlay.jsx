import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import RoleAccessInput from "components/common/inputs/roles/RoleAccessInput";
import Model from "core/data_model/model";
import {DialogToastContext} from "contexts/DialogToastContext";
import CenterOverlayContainer from "components/common/overlays/center/CenterOverlayContainer";
import {faEdit} from "@fortawesome/pro-light-svg-icons";
import PersistAndCloseButtonContainer from "components/common/buttons/saving/containers/PersistAndCloseButtonContainer";

function EditRolesOverlay(
  {
    model,
    fieldName,
    loadData,
    saveDataFunction,
  }) {
  const toastContext = useContext(DialogToastContext);
  const [temporaryDataObject, setTemporaryDataObject] = useState(undefined);

  useEffect(() => {
    toastContext.removeInlineMessage();
    setTemporaryDataObject(new Model({...model?.getPersistData()}, model?.getMetaData(), false));
  }, [model]);

  const handleSave = async () => {
    const response =  await saveDataFunction(temporaryDataObject.getData(fieldName));
    closePanelFunction();
    return response;
  };

  const closePanelFunction = () => {
    if (loadData != null) {
      loadData();
    }

    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  if (model == null || temporaryDataObject == null) {
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
            model={temporaryDataObject}
            setModel={setTemporaryDataObject}
            fieldName={fieldName}
          />
        </div>
        <PersistAndCloseButtonContainer
          recordDto={temporaryDataObject}
          updateRecord={handleSave}
          handleClose={closePanelFunction}
        />
      </div>
    </CenterOverlayContainer>
  );
}

EditRolesOverlay.propTypes = {
  loadData: PropTypes.func,
  saveDataFunction: PropTypes.func,
  model: PropTypes.object,
  fieldName: PropTypes.string,
};

export default EditRolesOverlay;


