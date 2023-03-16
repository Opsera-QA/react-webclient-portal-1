import React, {useState, useEffect, useContext} from 'react';
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CheckboxInputBase from "../../../../../../../../../../common/inputs/boolean/CheckboxInputBase";
import modelHelpers from "../../../../../../../../../../common/model/modelHelpers";
import { jsonViewFileMetadata } from "../../../jsonViewFile.metadata";
import TextFieldBase from "../../../../../../../../../../common/fields/text/TextFieldBase";
import { apexClassFileJsonMetadata } from "../jsonFileEdit.metadata";

const ApexClassProfleEditorView = ({
  apexClassData,
  setApexClassJson,
  isLoading,
  disabled,
}) => {
  const [apexClassJsonMetadata, setApexClassJsonMetadata] = useState(undefined);

  useEffect(() => {
    const newApexClassMetadata = modelHelpers.parseObjectIntoModel(
      apexClassData,
      apexClassFileJsonMetadata,
    );
    setApexClassJsonMetadata(newApexClassMetadata);
  }, [apexClassData]);

  if (isLoading) {
    return (
      <LoadingDialog
        size={"sm"}
        message={"Fetching Permissions"}
      />
    );
  }

  const setDataFunction = (fieldName, newValue) => {
    const newModel = { ...apexClassJsonMetadata };
    newModel?.setData("enabled", newValue);
    setApexClassJsonMetadata({ ...newModel });
    setApexClassJson(newModel.getPersistData());
  };

  return (
    <Row>
      <Col lg={12}>
        <TextFieldBase
          dataObject={apexClassJsonMetadata}
          fieldName={"apexClass"}
        />
      </Col>
      <Col lg={6}>
        <CheckboxInputBase
          fieldName={"enabled"}
          model={apexClassJsonMetadata}
          setModel={setApexClassJsonMetadata}
          setDataFunction={setDataFunction}
          disabled={disabled}
        />
      </Col>
    </Row>
  );
};


ApexClassProfleEditorView.propTypes = {
  setApexClassJson: PropTypes.func,
  isLoading: PropTypes.bool,
  apexClassData: PropTypes.object,
  disabled: PropTypes.bool,
};

export default ApexClassProfleEditorView;