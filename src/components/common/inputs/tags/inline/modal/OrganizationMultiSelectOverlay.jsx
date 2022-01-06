import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import { DialogToastContext } from "contexts/DialogToastContext";
import ModalSaveButtonBase from "components/common/buttons/saving/ModalSaveButtonBase";
import CancelButton from "components/common/buttons/CancelButton";
import OrganizationMultiSelectInput from "components/common/list_of_values_input/settings/organizations/OrganizationMultiSelectInput";
import CenterOverlayContainer from "components/common/overlays/center/CenterOverlayContainer";
import { faSitemap } from "@fortawesome/pro-light-svg-icons/faSitemap";
import SaveButtonContainer from "components/common/buttons/saving/containers/SaveButtonContainer";
import LenientSaveButton from "components/common/buttons/saving/LenientSaveButton";

function OrganizationMultiSelectOverlay({ showModal, dataObject, fieldName, saveDataFunction, type }) {
  const toastContext = useContext(DialogToastContext);
  const [temporaryDataObject, setTemporaryDataObject] = useState(undefined);

  useEffect(() => {
    toastContext.removeInlineMessage();
    setTemporaryDataObject(new Model({ ...dataObject?.getPersistData() }, dataObject?.getMetaData(), false));
  }, [showModal]);

  const handleSave = async () => {
    dataObject.setData(fieldName, temporaryDataObject.getArrayData("organizations"));
    const response = await saveDataFunction(dataObject);
    closePanel();
    return response;
  };

  const getTagInput = () => {
    return (
      <OrganizationMultiSelectInput
        dataObject={temporaryDataObject}
        setDataObject={setTemporaryDataObject}
        fieldName={fieldName}
      />
    );
  };

  const getButtonContainer = () => {
    return (
      <div className={"p-3 bg-white"}>
        <SaveButtonContainer>
          <CancelButton cancelFunction={closePanel} size={"md"} className={"mr-2"} />
          <LenientSaveButton recordDto={temporaryDataObject} updateRecord={handleSave} />
        </SaveButtonContainer>
      </div>
    );
  };

  const closePanel = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  if (temporaryDataObject == null) {
    return null;
  }

  return (
    <CenterOverlayContainer
      closePanel={closePanel}
      titleIcon={faSitemap}
      titleText={`Edit Organizations`}
      showCloseButton={false}
      showPanel={true}
      buttonContainer={getButtonContainer()}
    >
      <div className="m-3">
        {toastContext.getInlineBanner()}
        <div className="p-3">{getTagInput()}</div>
      </div>
    </CenterOverlayContainer>
  );
}

OrganizationMultiSelectOverlay.propTypes = {
  showModal: PropTypes.bool,
  saveDataFunction: PropTypes.func,
  dataObject: PropTypes.object,
  fieldName: PropTypes.string,
  type: PropTypes.string,
};

export default OrganizationMultiSelectOverlay;
