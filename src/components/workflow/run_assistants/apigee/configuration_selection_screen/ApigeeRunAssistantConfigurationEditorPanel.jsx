import React, {useEffect} from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Model from "core/data_model/model";
import {apigeeRunParameterConfigurationMetadata} from "components/workflow/run_assistants/apigee/configuration_selection_screen/apigeeRunParameterConfiguration.metadata";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import ApigeeAssetTypeMultiSelectInput from "components/common/list_of_values_input/tools/apigee/ApigeeAssetTypeMultiSelectInput";
import ApigeeRunParameterEnvironmentMultiSelectInput from "./inputs/ApigeeRunParameterEnvironmentMultiSelectInput";

const ApigeeRunAssistantConfigurationEditorPanel = (
  {
    apigeeRunParametersModel,
    apigeeRunParameterConfigurationModel,
    setApigeeRunParameterConfigurationModel,
    index,
  }) => {

  useEffect(() => {
    if (index != null && apigeeRunParametersModel != null && setApigeeRunParameterConfigurationModel) {
      const configurations = apigeeRunParametersModel?.getArrayData("configurations");
      const configuration = Array.isArray(configurations) && configurations.length > index ? configurations[index] : null;
      const newModel = configuration ? new Model({...configuration}, apigeeRunParameterConfigurationMetadata, false) : null;
      setApigeeRunParameterConfigurationModel(newModel);
    }
  }, [index]);


  if (apigeeRunParameterConfigurationModel == null) {
    return null;
  }

  return (
    <div>
      <Row className="my-3">
        <Col xs={12}>
          <TextInputBase
            fieldName={"name"}
            dataObject={apigeeRunParameterConfigurationModel}
            setDataObject={setApigeeRunParameterConfigurationModel}
          />
        </Col>
        <Col xs={12}>
          <ApigeeAssetTypeMultiSelectInput
            fieldName={"assetType"}
            dataObject={apigeeRunParameterConfigurationModel}
            setDataObject={setApigeeRunParameterConfigurationModel}
          />
        </Col>
        <Col xs={12}>
          <ApigeeRunParameterEnvironmentMultiSelectInput
            fieldName={"kvmEnvironment"}
            dataObject={apigeeRunParameterConfigurationModel}
            setDataObject={setApigeeRunParameterConfigurationModel}
            parameters={apigeeRunParametersModel}
          />
        </Col>
        <Col xs={12}>
          <TextInputBase
            fieldName={"namePattern"}
            dataObject={apigeeRunParameterConfigurationModel}
            setDataObject={setApigeeRunParameterConfigurationModel}
          />
        </Col>
      </Row>
    </div>
  );
};

ApigeeRunAssistantConfigurationEditorPanel.propTypes = {
  index: PropTypes.number,
  apigeeRunParameterConfigurationModel: PropTypes.object,
  setApigeeRunParameterConfigurationModel: PropTypes.func,
  apigeeRunParametersModel: PropTypes.object,
};

export default ApigeeRunAssistantConfigurationEditorPanel;
