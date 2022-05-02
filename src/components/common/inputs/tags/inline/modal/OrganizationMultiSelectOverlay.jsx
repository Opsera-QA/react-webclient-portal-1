import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import { DialogToastContext } from "contexts/DialogToastContext";
import CancelButton from "components/common/buttons/CancelButton";
import OrganizationMultiSelectInput from "components/common/list_of_values_input/settings/organizations/OrganizationMultiSelectInput";
import CenterOverlayContainer from "components/common/overlays/center/CenterOverlayContainer";
import { faSitemap } from "@fortawesome/pro-light-svg-icons/faSitemap";
import SaveButtonContainer from "components/common/buttons/saving/containers/SaveButtonContainer";
import LenientSaveButton from "components/common/buttons/saving/LenientSaveButton";
import axios from "axios";

function OrganizationMultiSelectOverlay({ model, fieldName, saveDataFunction, loadData, }) {
  const toastContext = useContext(DialogToastContext);
  const [temporaryDataObject, setTemporaryDataObject] = useState(undefined);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;
    toastContext.removeInlineMessage();
    setTemporaryDataObject(new Model({...model?.getPersistData()}, model?.getMetaData(), false));

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const handleSave = async () => {
    const newModel = { ...model };
    newModel.setData(fieldName, temporaryDataObject?.getArrayData("organizations"));
    const response = await saveDataFunction(newModel);

    if (isMounted?.current === true) {
      closePanel();
    }

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

    if (loadData) {
      loadData();
    }

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
  model: PropTypes.object,
  fieldName: PropTypes.string,
  loadData: PropTypes.func,
};

export default OrganizationMultiSelectOverlay;
