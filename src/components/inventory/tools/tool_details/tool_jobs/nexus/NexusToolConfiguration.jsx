import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {Form, Row} from "react-bootstrap";
import {getFormValidationErrorDialog} from "components/common/toasts/toasts";
import SaveButton from "components/common/buttons/SaveButton";
import Model from "core/data_model/model";
import nexusConnectionMetadata from "./nexus-connection-metadata";
import LoadingDialog from "components/common/status_notifications/loading";
import DtoTextInput from "components/common/input/dto_input/dto-text-input";
import Col from "react-bootstrap/Col";
import TestToolConnectionButton from "../../../../../common/buttons/connection/TestToolConnectionButton";

function NexusToolConfiguration({ toolData, toolId, fnSaveChanges, fnSaveToVault }) {
  const [configurationData, setConfigurationData] = useState(undefined);
  const [showToast, setShowToast] = useState(false);
  const [toast, setToast] = useState({});

  useEffect(() => {
    loadData();
  }, [toolData]);

  const loadData = async () => {
    if (toolData["configuration"] != null) {
      setConfigurationData(new Model(toolData["configuration"], nexusConnectionMetadata, false))
    } else {
      setConfigurationData(new Model({...nexusConnectionMetadata.newModelBase}, nexusConnectionMetadata, true));
    }
  };

  const callbackFunction = async () => {
    if (configurationData.isModelValid()) {
      let newConfiguration = {...configurationData.getPersistData()};

      newConfiguration.toolURL = configurationData.getData("toolURL").trim();
      newConfiguration.userName = configurationData.getData("userName").trim();
      
      if (configurationData.isChanged("secretKey")) {
        newConfiguration.secretKey = await saveToVault(toolId, toolData.tool_identifier, "secretKey", "Vault Secured Key", configurationData.getData("secretKey").trim());
      }

      const item = {
        configuration: newConfiguration
      };
      await fnSaveChanges(item);
    }
    else {
      let toast = getFormValidationErrorDialog(setShowToast);
      setToast(toast);
      setShowToast(true);
    }
  };

  const saveToVault = async (toolId, toolIdentifier, key, name, value) => {
    const keyName = `${toolId}-${toolIdentifier}-${key}`;
    const body = {
      "key": keyName,
      "value": value
    };
    const response = await fnSaveToVault(body);
    if (response.status === 200 ) {
      return { name: name, vaultKey: keyName };
    } else {
      return "";
    }
  };

  if (configurationData == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <div>
      <Row>
        <div className="ml-auto"><TestToolConnectionButton recordData={toolData} toolName={"Nexus"} disable={configurationData.isNew() || configurationData.isChanged()}/></div>
      </Row>
      <Form>
        <Row>
          {showToast && toast}
          <Col sm={12}>
            <DtoTextInput setDataObject={setConfigurationData} fieldName={"toolURL"} dataObject={configurationData} />
          </Col>
          <Col sm={12}>
            <DtoTextInput setDataObject={setConfigurationData} fieldName={"userName"} dataObject={configurationData} />
          </Col>
          <Col sm={12}>
            <DtoTextInput type={"password"} setDataObject={setConfigurationData} fieldName={"secretKey"} dataObject={configurationData} />
          </Col>
        </Row>
        <Row>
          <div className="ml-auto mt-3 px-3 d-flex">
            <SaveButton recordDto={configurationData} createRecord={callbackFunction} updateRecord={callbackFunction} />
          </div>
        </Row>
        <small className="form-text text-muted mt-2 text-right">* Required Fields</small>
      </Form>
    </div>
  );
}

NexusToolConfiguration.propTypes = {
  toolData: PropTypes.object,
  toolId:  PropTypes.string,
  fnSaveChanges: PropTypes.func,
  fnSaveToVault: PropTypes.func
};

export default NexusToolConfiguration;
