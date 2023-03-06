import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CheckboxInputBase from "../../../../../../../../../../common/inputs/boolean/CheckboxInputBase";
import modelHelpers from "../../../../../../../../../../common/model/modelHelpers";
import { jsonViewFileMetadata } from "../../../jsonViewFile.metadata";
import TextFieldBase from "../../../../../../../../../../common/fields/text/TextFieldBase";
import { customFieldJsonMetadata } from "../jsonFileEdit.metadata";

const CustomFieldProfileEditorView = ({
  fieldPermissionsData,
  setCustomFieldDataJson,
  isLoading,
  disabled,
}) => {
  const [customMetaJsonMetadata, setCustomMetaJsonMetadata] =
    useState(undefined);

  useEffect(() => {
    const newCustomMetadata = modelHelpers.parseObjectIntoModel(
      fieldPermissionsData,
      customFieldJsonMetadata,
    );
    setCustomMetaJsonMetadata(newCustomMetadata);
  }, [fieldPermissionsData]);

  if (isLoading) {
    return (
      <LoadingDialog
        size={"sm"}
        message={"Loading"}
      />
    );
  }

  const setDataFunction = (fieldName, newValue) => {
    const newModel = { ...customMetaJsonMetadata };
    newModel?.setData(fieldName, newValue);
    if (fieldName === "readable" && !newValue) {
      newModel?.setData("editable", false);
    }
    setCustomMetaJsonMetadata({ ...newModel });
    setCustomFieldDataJson(newModel.getPersistData());
  };

  return (
    <div>
      <Col>
        <TextFieldBase
          dataObject={customMetaJsonMetadata}
          fieldName={"field"}
        />
      </Col>
      <Col>
        <CheckboxInputBase
          fieldName={"readable"}
          model={customMetaJsonMetadata}
          setModel={setCustomMetaJsonMetadata}
          setDataFunction={setDataFunction}
          disabled={disabled}
        />
      </Col>
      <Col>
        <CheckboxInputBase
          fieldName={"editable"}
          model={customMetaJsonMetadata}
          setModel={setCustomMetaJsonMetadata}
          setDataFunction={setDataFunction}
          disabled={disabled || !customMetaJsonMetadata?.getData("readable")}
        />
      </Col>
    </div>
  );
};

CustomFieldProfileEditorView.propTypes = {
  setCustomFieldDataJson: PropTypes.func,
  isLoading: PropTypes.bool,
  fieldPermissionsData: PropTypes.object,
  disabled: PropTypes.bool,
};

export default CustomFieldProfileEditorView;
