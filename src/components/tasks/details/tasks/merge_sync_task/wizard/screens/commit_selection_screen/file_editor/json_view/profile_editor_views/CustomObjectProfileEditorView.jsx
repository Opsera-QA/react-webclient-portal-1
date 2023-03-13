import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CheckboxInputBase from "../../../../../../../../../../common/inputs/boolean/CheckboxInputBase";
import modelHelpers from "../../../../../../../../../../common/model/modelHelpers";
import { jsonViewFileMetadata } from "../../../jsonViewFile.metadata";
import TextFieldBase from "../../../../../../../../../../common/fields/text/TextFieldBase";
import { customObjectJsonMetadata } from "../jsonFileEdit.metadata";

const CustomObjectProfileEditorView = ({
  objectPermissionData,
  setCustomObjDataJson,
  isLoading,
  disabled,
}) => {
  const [customMetaJsonMetadata, setCustomMetaJsonMetadata] =
    useState(undefined);

  useEffect(() => {
    const newCustomMetadata = modelHelpers.parseObjectIntoModel(
      objectPermissionData,
      customObjectJsonMetadata,
    );
    setCustomMetaJsonMetadata(newCustomMetadata);
  }, [objectPermissionData]);

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
    // newModel?.setData(fieldName, newValue);
    switch (fieldName) {
      case "allowCreate":
        if (!newModel?.getData("allowRead")) {
          newModel?.setDefaultValue("allowCreate");
          break;
        }
        newModel?.setData(fieldName, newValue);
        break;
      case "allowDelete":
        if (
          !newModel?.getData("allowRead") ||
          !newModel?.getData("allowEdit")
        ) {
          newModel?.setDefaultValue("allowDelete");
          break;
        }
        newModel?.setData(fieldName, newValue);
        break;
      case "allowEdit":
        if (!newModel?.getData("allowRead")) {
          newModel?.setDefaultValue("allowEdit");
          break;
        }
        newModel?.setData(fieldName, newValue);
        break;
      case "allowRead":
        if (!newValue) {
          newModel?.setDefaultValue("allowCreate");
          newModel?.setDefaultValue("allowDelete");
          newModel?.setDefaultValue("allowEdit");
          newModel?.setDefaultValue("modifyAllRecords");
          newModel?.setDefaultValue("viewAllRecords");
        }
        newModel?.setData(fieldName, newValue);
        break;
      case "modifyAllRecords":
        if (
          !newModel?.getData("allowRead") ||
          !newModel?.getData("allowEdit") ||
          !newModel?.getData("allowDelete") ||
          !newModel?.getData("viewAllRecords")
        ) {
          newModel?.setDefaultValue("modifyAllRecords");
          break;
        }
        newModel?.setData(fieldName, newValue);
        break;
      case "viewAllRecords":
        if (!newModel?.getData("allowRead")) {
          newModel?.setDefaultValue("viewAllRecords");
          break;
        }
        newModel?.setData(fieldName, newValue);
        break;
      default:
        newModel?.setData(fieldName, newValue);
        break;
    }
    setCustomMetaJsonMetadata({ ...newModel });
    setCustomObjDataJson(newModel.getPersistData());
  };

  return (
    <div>
      <Col>
        <TextFieldBase
          dataObject={customMetaJsonMetadata}
          fieldName={"object"}
        />
      </Col>
      <Col>
        <CheckboxInputBase
          fieldName={"allowRead"}
          model={customMetaJsonMetadata}
          setModel={setCustomMetaJsonMetadata}
          setDataFunction={setDataFunction}
          disabled={disabled}
        />
      </Col>
      <Col>
        <CheckboxInputBase
          fieldName={"allowCreate"}
          model={customMetaJsonMetadata}
          setModel={setCustomMetaJsonMetadata}
          setDataFunction={setDataFunction}
          disabled={disabled}
        />
      </Col>
      <Col>
        <CheckboxInputBase
          fieldName={"allowEdit"}
          model={customMetaJsonMetadata}
          setModel={setCustomMetaJsonMetadata}
          setDataFunction={setDataFunction}
          disabled={disabled}
        />
      </Col>
      <Col>
        <CheckboxInputBase
          fieldName={"allowDelete"}
          model={customMetaJsonMetadata}
          setModel={setCustomMetaJsonMetadata}
          setDataFunction={setDataFunction}
          disabled={disabled}
        />
      </Col>
      <Col>
        <CheckboxInputBase
          fieldName={"viewAllRecords"}
          model={customMetaJsonMetadata}
          setModel={setCustomMetaJsonMetadata}
          setDataFunction={setDataFunction}
          disabled={disabled}
        />
      </Col>
      <Col>
        <CheckboxInputBase
          fieldName={"modifyAllRecords"}
          model={customMetaJsonMetadata}
          setModel={setCustomMetaJsonMetadata}
          setDataFunction={setDataFunction}
          disabled={disabled}
        />
      </Col>
    </div>
  );
};

CustomObjectProfileEditorView.propTypes = {
  setCustomObjDataJson: PropTypes.func,
  isLoading: PropTypes.bool,
  objectPermissionData: PropTypes.object,
  disabled: PropTypes.bool,
};

export default CustomObjectProfileEditorView;
