import React, {useEffect} from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Model from "core/data_model/model";
import {informaticaRunParameterConfigurationMetadata} from "components/workflow/run_assistants/informatica/configuration_selection_screen/informaticaRunParameterConfiguration.metadata";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import InformaticaIntelligentCloudServiceTypeMultiSelectInputBase
  from "components/common/list_of_values_input/tools/informatica/iics_types/InformaticaIntelligentCloudServiceTypeMultiSelectInputBase";

const InformaticaRunAssistantConfigurationEditorPanel = (
  {
    informaticaRunParameterConfigurationModel,
    setInformaticaRunParameterConfigurationModel,
    configuration,
  }) => {

  useEffect(() => {
    if (configuration) {
      setInformaticaRunParameterConfigurationModel(new Model({...configuration}, informaticaRunParameterConfigurationMetadata, false));
    }
  }, [JSON.stringify(configuration)]);


  if (informaticaRunParameterConfigurationModel == null) {
    return null;
  }

  return (
    <div>
      <Row className="my-3">
        <Col xs={12}>
          <TextInputBase
            fieldName={"name"}
            dataObject={informaticaRunParameterConfigurationModel}
            setDataObject={setInformaticaRunParameterConfigurationModel}
          />
        </Col>
        <Col xs={12}>
          <TextInputBase
            fieldName={"location"}
            dataObject={informaticaRunParameterConfigurationModel}
            setDataObject={setInformaticaRunParameterConfigurationModel}
          />
        </Col>
        <Col xs={12}>
          <InformaticaIntelligentCloudServiceTypeMultiSelectInputBase
            fieldName={"types"}
            model={informaticaRunParameterConfigurationModel}
            setModel={setInformaticaRunParameterConfigurationModel}
          />
        </Col>
        <Col xs={12}>
          <TextInputBase
            fieldName={"updateBy"}
            dataObject={informaticaRunParameterConfigurationModel}
            setDataObject={setInformaticaRunParameterConfigurationModel}
          />
        </Col>
        <Col xs={12}>
          <TextInputBase
            fieldName={"tag"}
            dataObject={informaticaRunParameterConfigurationModel}
            setDataObject={setInformaticaRunParameterConfigurationModel}
          />
        </Col>
        <Col xs={12}>

        </Col>
      </Row>
    </div>
  );
};

InformaticaRunAssistantConfigurationEditorPanel.propTypes = {
  configuration: PropTypes.object,
  informaticaRunParameterConfigurationModel: PropTypes.object,
  setInformaticaRunParameterConfigurationModel: PropTypes.func
};

export default InformaticaRunAssistantConfigurationEditorPanel;
