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
    informaticaRunParametersModel,
    informaticaRunParameterConfigurationModel,
    setInformaticaRunParameterConfigurationModel,
    index,
  }) => {

  useEffect(() => {
    if (index != null && informaticaRunParametersModel != null && setInformaticaRunParameterConfigurationModel) {
      const configurations = informaticaRunParametersModel?.getArrayData("configurations");
      const configuration = Array.isArray(configurations) && configurations.length > index ? configurations[index] : null;
      const newModel = configuration ? new Model({...configuration}, informaticaRunParameterConfigurationMetadata, false) : null;
      setInformaticaRunParameterConfigurationModel(newModel);
    }
  }, [index]);


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
      </Row>
    </div>
  );
};

InformaticaRunAssistantConfigurationEditorPanel.propTypes = {
  index: PropTypes.number,
  informaticaRunParameterConfigurationModel: PropTypes.object,
  setInformaticaRunParameterConfigurationModel: PropTypes.func,
  informaticaRunParametersModel: PropTypes.object,
};

export default InformaticaRunAssistantConfigurationEditorPanel;
