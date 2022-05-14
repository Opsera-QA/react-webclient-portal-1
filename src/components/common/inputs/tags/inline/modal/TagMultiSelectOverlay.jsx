import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import {DialogToastContext} from "contexts/DialogToastContext";
import CancelButton from "components/common/buttons/CancelButton";
import TagMultiSelectInput from "components/common/list_of_values_input/settings/tags/TagMultiSelectInput";
import TagManager from "components/common/inputs/tags/TagManager";
import CenterOverlayContainer from "components/common/overlays/center/CenterOverlayContainer";
import {faTags} from "@fortawesome/pro-light-svg-icons/faTags";
import SaveButtonContainer from "components/common/buttons/saving/containers/SaveButtonContainer";
import LenientSaveButton from "components/common/buttons/saving/LenientSaveButton";
import axios from "axios";

function TagMultiSelectOverlay(
  {
    model,
    fieldName,
    saveDataFunction,
    type,
    loadData,
  }) {
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
    newModel.setData(fieldName, temporaryDataObject?.getArrayData("tags"));
    const response = await saveDataFunction(newModel);

    if (isMounted?.current === true) {
      closePanel();
    }

    return response;
  };

  const getTagInput = () => {
    if (type) {
      return (
        <TagManager
          type={type}
          fieldName={fieldName}
          setDataObject={setTemporaryDataObject}
          dataObject={temporaryDataObject}
        />
      );
    }

    return (
      <TagMultiSelectInput
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
          <CancelButton
            cancelFunction={closePanel}
            size={"md"}
            className={"mr-2"}
          />
          <LenientSaveButton
            recordDto={temporaryDataObject}
            updateRecord={handleSave}
          />
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
      titleIcon={faTags}
      titleText={`Edit Tags`}
      showCloseButton={false}
      showPanel={true}
      buttonContainer={getButtonContainer()}
    >
      <div className="m-3">
        {toastContext.getInlineBanner()}
        <div className="p-3">
          {getTagInput()}
        </div>
      </div>
    </CenterOverlayContainer>
  );
}

TagMultiSelectOverlay.propTypes = {
  saveDataFunction: PropTypes.func,
  model: PropTypes.object,
  fieldName: PropTypes.string,
  type: PropTypes.string,
  loadData: PropTypes.func,
};

export default TagMultiSelectOverlay;


