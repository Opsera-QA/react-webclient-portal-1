import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import { DialogToastContext } from "contexts/DialogToastContext";
import ModalSaveButtonBase from "components/common/buttons/saving/ModalSaveButtonBase";
import CancelButton from "components/common/buttons/CancelButton";
import TagMultiSelectInput from "components/common/list_of_values_input/settings/tags/TagMultiSelectInput";
import TagManager from "components/common/inputs/tags/TagManager";
import ModalBase from "components/common/modal/ModalBase";
import OrganizationMultiSelectInput from "components/common/list_of_values_input/settings/organizations/OrganizationMultiSelectInput";

function OrganizationMultiSelectOverlay({ showModal, dataObject, fieldName, handleClose, saveDataFunction }) {
  const toastContext = useContext(DialogToastContext);
  const [temporaryDataObject, setTemporaryDataObject] = useState(undefined);

  useEffect(() => {
    toastContext.removeInlineMessage();
    setTemporaryDataObject(new Model({ ...dataObject?.getPersistData() }, dataObject?.getMetaData(), false));
  }, [showModal]);

  const handleSave = async () => {
    dataObject.setData(fieldName, temporaryDataObject.getArrayData("organizations"));
    return await saveDataFunction(dataObject);
  };

  const getOrganizationInput = () => {
    return (
      <OrganizationMultiSelectInput
        dataObject={temporaryDataObject}
        setDataObject={setTemporaryDataObject}
        fieldName={fieldName}
      />
    );
  };

  const getModalButtons = () => {
    return (
      <>
        <CancelButton cancelFunction={handleClose} size={"sm"} />
        <ModalSaveButtonBase updateRecord={handleSave} recordDto={temporaryDataObject} handleClose={handleClose} />
      </>
    );
  };

  return (
    <ModalBase
      handleClose={handleClose}
      size={"lg"}
      title={"Edit Organizations"}
      showModal={showModal}
      buttonContainer={getModalButtons()}
      className={"tag-modal"}
    >
      <div className="content-block-shaded m-3">
        {toastContext.getInlineBanner()}
        <div className="p-3">{getOrganizationInput()}</div>
      </div>
    </ModalBase>
  );
}

OrganizationMultiSelectOverlay.propTypes = {
  showModal: PropTypes.bool,
  handleClose: PropTypes.func,
  saveDataFunction: PropTypes.func,
  dataObject: PropTypes.object,
  fieldName: PropTypes.string,
};

export default OrganizationMultiSelectOverlay;
