import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CheckboxInputBase from "../../../../../../../../../../common/inputs/boolean/CheckboxInputBase";
import modelHelpers from "../../../../../../../../../../common/model/modelHelpers";
import { jsonViewFileMetadata } from "../../../jsonViewFile.metadata";
import TextFieldBase from "../../../../../../../../../../common/fields/text/TextFieldBase";
import { customApplicationJsonMetadata } from "../jsonFileEdit.metadata";

const CustomApplicationProfileEditorView = ({
  customAppData,
  setCustomAppJson,
  isLoading,
  disabled,
}) => {
  const [customAppJsonMetadata, setCustomAppJsonMetadata] = useState(undefined);

  useEffect(() => {
    const newCustomAppMetadata = modelHelpers.parseObjectIntoModel(
      customAppData,
      customApplicationJsonMetadata,
    );
    setCustomAppJsonMetadata(newCustomAppMetadata);
  }, [customAppData]);

  if (isLoading) {
    return (
      <LoadingDialog
        size={"sm"}
        message={"Loading"}
      />
    );
  }

  const setDataFunction = (fieldName, newValue) => {
    const newModel = { ...customAppJsonMetadata };
    if(fieldName === "default" && newValue) {
      newModel?.setData("visible", newValue);
    }
    newModel?.setData(fieldName, newValue);
    setCustomAppJsonMetadata({ ...newModel });
    setCustomAppJson(newModel.getPersistData());
  };

  return (
    <Row>
      <Col lg={12}>
        <TextFieldBase
          dataObject={customAppJsonMetadata}
          fieldName={"application"}
        />
      </Col>
        <Col lg={6}>
          <CheckboxInputBase
            fieldName={"default"}
            model={customAppJsonMetadata}
            setModel={setCustomAppJsonMetadata}
            setDataFunction={setDataFunction}
            disabled={disabled}
          />
        </Col>
        <Col lg={6}>
          <CheckboxInputBase
            fieldName={"visible"}
            model={customAppJsonMetadata}
            setModel={setCustomAppJsonMetadata}
            setDataFunction={setDataFunction}
            disabled={disabled}
          />
        </Col>
    </Row>
  );
};

CustomApplicationProfileEditorView.propTypes = {
  setCustomAppJson: PropTypes.func,
  isLoading: PropTypes.bool,
  customAppData: PropTypes.object,
  disabled: PropTypes.bool,
};

export default CustomApplicationProfileEditorView;
