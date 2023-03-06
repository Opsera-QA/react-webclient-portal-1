import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CheckboxInputBase from "../../../../../../../../../../common/inputs/boolean/CheckboxInputBase";
import modelHelpers from "../../../../../../../../../../common/model/modelHelpers";
import { jsonViewFileMetadata } from "../../../jsonViewFile.metadata";
import TextFieldBase from "../../../../../../../../../../common/fields/text/TextFieldBase";
import { customTabJsonMetadata } from "../jsonFileEdit.metadata";

const CustomTabProfileEditorView = ({
                                      customTabData,
                                      setCustomTabDataJson,
  isLoading,
}) => {
  const [customMetaJsonMetadata, setCustomMetaJsonMetadata] =
    useState(undefined);

  useEffect(() => {
    const newCustomMetadata = modelHelpers.parseObjectIntoModel(
      customTabData,
      customTabJsonMetadata,
    );
    setCustomMetaJsonMetadata(newCustomMetadata);
  }, [customTabData]);

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
    setCustomMetaJsonMetadata({ ...newModel });
    setCustomTabDataJson(newModel.getPersistData());
  };

  return (
    <div>
      <Col>
        <TextFieldBase
          dataObject={customMetaJsonMetadata}
          fieldName={"tab"}
        />
      </Col>
      <Col>
        <CheckboxInputBase
          fieldName={"visibility"}
          model={customMetaJsonMetadata}
          setModel={setCustomMetaJsonMetadata}
          setDataFunction={setDataFunction}
        />
      </Col>
    </div>
  );
};

CustomTabProfileEditorView.propTypes = {
  setCustomTabDataJson: PropTypes.func,
  isLoading: PropTypes.bool,
  customTabData: PropTypes.object,
};

export default CustomTabProfileEditorView;
