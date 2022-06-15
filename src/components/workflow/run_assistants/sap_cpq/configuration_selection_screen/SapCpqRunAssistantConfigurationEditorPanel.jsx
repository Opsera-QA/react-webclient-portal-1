import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Model from "core/data_model/model";
import { sapCpqRunParameterConfigurationMetadata } from "components/workflow/run_assistants/sap_cpq/configuration_selection_screen/sapCpqRunParameterConfiguration.metadata";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import SapCpqRunParameterDateTimeInput from "components/workflow/run_assistants/sap_cpq/configuration_selection_screen/inputs/SapCpqRunParameterDateTimeInput";
import SapCpqScripCategoriesMultiSelectInput from "./inputs/SapCpqScripCategoriesMultiSelectInput";

const SapCpqRunAssistantConfigurationEditorPanel = ({
  sapCpqRunParametersModel,
  sapCpqRunParameterConfigurationModel,
  setSapCpqRunParameterConfigurationModel,
  index,
}) => {
  useEffect(() => {
    if (
      index != null &&
      sapCpqRunParametersModel != null &&
      setSapCpqRunParameterConfigurationModel
    ) {
      const configurations =
        sapCpqRunParametersModel?.getArrayData("configurations");
      const configuration =
        Array.isArray(configurations) && configurations.length > index
          ? configurations[index]
          : null;
      const newModel = configuration
        ? new Model(
            { ...configuration },
            sapCpqRunParameterConfigurationMetadata,
            false,
          )
        : null;
      setSapCpqRunParameterConfigurationModel(newModel);
    }
  }, [index]);

  if (sapCpqRunParameterConfigurationModel == null) {
    return null;
  }

  return (
    <div>
      <Row className="my-3">
        <Col xs={12}>
          <TextInputBase
            fieldName={"name"}
            dataObject={sapCpqRunParameterConfigurationModel}
            setDataObject={setSapCpqRunParameterConfigurationModel}
          />
        </Col>
        <Col xs={12}>
          <SapCpqScripCategoriesMultiSelectInput
            fieldName={"scriptCategory"}
            dataObject={sapCpqRunParameterConfigurationModel}
            setDataObject={setSapCpqRunParameterConfigurationModel}
          />
        </Col>
        <Col xs={6}>
          <SapCpqRunParameterDateTimeInput
            sapCpqRunParameterConfigurationModel={
              sapCpqRunParameterConfigurationModel
            }
            setSapCpqRunParameterConfigurationModel={
              setSapCpqRunParameterConfigurationModel
            }
            fieldName={"commitFromTimestamp"}
          />
        </Col>
        <Col xs={6}>
          <SapCpqRunParameterDateTimeInput
            sapCpqRunParameterConfigurationModel={
              sapCpqRunParameterConfigurationModel
            }
            setSapCpqRunParameterConfigurationModel={
              setSapCpqRunParameterConfigurationModel
            }
            fieldName={"commitToTimestamp"}
          />
        </Col>
      </Row>
    </div>
  );
};

SapCpqRunAssistantConfigurationEditorPanel.propTypes = {
  index: PropTypes.number,
  sapCpqRunParameterConfigurationModel: PropTypes.object,
  setSapCpqRunParameterConfigurationModel: PropTypes.func,
  sapCpqRunParametersModel: PropTypes.object,
};

export default SapCpqRunAssistantConfigurationEditorPanel;
