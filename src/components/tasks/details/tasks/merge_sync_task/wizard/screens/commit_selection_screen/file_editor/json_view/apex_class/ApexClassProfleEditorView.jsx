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
  wizardModel,
  comparisonFileModel,
  setComparisonFileModel,
  apexClassData,
  isLoading,
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
        message={"Loading"}
      />
    );
  }

  return (
    <div>
      <Col>
        <TextFieldBase
          dataObject={apexClassJsonMetadata}
          fieldName={"apexClass"}
        />
      </Col>
      <Col>
        <CheckboxInputBase
          fieldName={"enabled"}
          model={apexClassJsonMetadata}
          setModel={setApexClassJsonMetadata}
        />
      </Col>
    </div>
  );
};


ApexClassProfleEditorView.propTypes = {
  wizardModel: PropTypes.object,
  comparisonFileModel: PropTypes.object,
  setComparisonFileModel: PropTypes.func,
  isLoading: PropTypes.bool,
  apexClassData: PropTypes.object,
};

export default ApexClassProfleEditorView;