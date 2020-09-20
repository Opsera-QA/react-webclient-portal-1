import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {Form, Button, Row} from "react-bootstrap";
import {getFormValidationErrorDialog, getUpdateFailureResultDialog} from "../../../../../common/toasts/toasts";
import SaveButton from "../../../../../common/buttons/SaveButton";
import Model from "../../../../../../core/data_model/model";
import jenkinsConnectionMetadata from "./jenkins-connection-metadata";
import LoadingDialog from "../../../../../common/status_notifications/loading";
import DtoTextInput from "../../../../../common/input/dto_input/dto-text-input";
import DtoToggleInput from "../../../../../common/input/dto_input/dto-toggle-input";
import Col from "react-bootstrap/Col";

function JenkinsToolConfiguration({ toolData, toolId, fnSaveChanges, fnSaveToVault }) {
  const [configurationData, setConfigurationData] = useState(undefined);
  const [showToast, setShowToast] = useState(false);
  const [toast, setToast] = useState({});

  useEffect(() => {
    loadData();
  }, [toolData]);

  const loadData = async () => {
    if (toolData["configuration"] != null) {
        setConfigurationData(new Model(toolData["configuration"], jenkinsConnectionMetadata, false))
    } else {
      setConfigurationData(new Model({...jenkinsConnectionMetadata.newModelBase}, jenkinsConnectionMetadata, true));
    }
  };

  const validateFields = () => {
    const {proxyEnable , jenkinsUrl, jUserId, jAuthToken, proxyUserName, proxyPassword, jPassword  } = configurationData.data;
    if(!proxyEnable) {
      console.log(jAuthToken)
      console.log(jAuthToken.length)
      if(jenkinsUrl.length > 0 && jUserId.length > 0 && ( typeof(jAuthToken) === "string" ? jAuthToken.length > 0 : true)) {
        return true;
      }
      return false;
    } else {
      if(jenkinsUrl.length > 0 && jUserId.length > 0 && proxyUserName.length > 0 && ( typeof(jPassword) === "string" ? jPassword.length > 0 : true) && ( typeof(proxyPassword) === "string" ? proxyPassword.length > 0 : true) ) {
        return true;
      }
      return false;
    }
  }

  const callbackFunction = async () => {
    if (configurationData.isModelValid() && validateFields()) {
      let newConfiguration = {...configurationData.getPersistData()};
      
      if (typeof(configurationData.getData("jAuthToken")) === "string" || configurationData.isChanged("jAuthToken")) {
        newConfiguration.jAuthToken = await saveToVault(toolId, toolData.tool_identifier, "jAuthToken", "Vault Secured Key", configurationData.getData("jAuthToken"));
      }
      if (typeof(configurationData.getData("jPassword")) === "string" || configurationData.isChanged("jPassword")) {
        newConfiguration.jPassword = await saveToVault(toolId, toolData.tool_identifier, "jPassword", "Vault Secured Key", configurationData.getData("jPassword"));
      }
      if (typeof(configurationData.getData("proxyPassword")) === "string" || configurationData.isChanged("proxyPassword")) {
        newConfiguration.proxyPassword = await saveToVault(toolId, toolData.tool_identifier, "proxyPassword", "Vault Secured Key",configurationData.getData("proxyPassword"));
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
    //const keyName = `${pipelineId}-${stepId}-${key}`;  //old keyname with pipelineID
    const keyName = `${toolId}-${toolIdentifier}-${key}`; 
    // const keyName = `${toolId}-${toolIdentifier}`; 
    const body = {
      "key": keyName,
      "value": value
    };
    const response = await fnSaveToVault(body);    
    if (response.status === 200 ) {
      return { name: name, vaultKey: keyName };
    } else {
      return {};
    }
  };

  if (configurationData == null) {
    return <LoadingDialog size="sm" />;
  }

  const toggleProxy = async (fieldName, value) => {
    let newConfigurationData = {...configurationData};
    newConfigurationData.setData(fieldName, value);
    newConfigurationData.setData("jAuthToken", "");
    newConfigurationData.setData("jPassword", "");
    newConfigurationData.setData("proxyUserName", "");
    newConfigurationData.setData("proxyPassword", "");
    await setConfigurationData({...newConfigurationData});
  }

  return (
    <Form>
      <Row>
      {showToast && toast}
        <Col sm={12}>
          <DtoTextInput setDataObject={setConfigurationData} fieldName={"jenkinsUrl"} dataObject={configurationData} />
        </Col>
        <Col sm={12}>
          <DtoTextInput setDataObject={setConfigurationData} fieldName={"jenkinsPort"} dataObject={configurationData} />
        </Col>
        <Col sm={12}>
          <DtoTextInput setDataObject={setConfigurationData} fieldName={"jUserId"} dataObject={configurationData} />
        </Col>
        <Col sm={12}>
          <DtoToggleInput setData={toggleProxy} setDataObject={setConfigurationData} fieldName={"proxyEnable"} dataObject={configurationData} />
        </Col>
        {configurationData.getData("proxyEnable") ?
        <>
          <Col sm={12}>
            <DtoTextInput disabled={!configurationData.getData("proxyEnable")} setDataObject={setConfigurationData} fieldName={"proxyUserName"} dataObject={configurationData} />
          </Col>
          <Col sm={12}>
            <DtoTextInput type={"password"} disabled={!configurationData.getData("proxyEnable")} setDataObject={setConfigurationData} fieldName={"proxyPassword"} dataObject={configurationData} />
          </Col>
          <Col sm={12}>
            <DtoTextInput type={"password"} disabled={!configurationData.getData("proxyEnable")} setDataObject={setConfigurationData} fieldName={"jPassword"} dataObject={configurationData} />
          </Col>
        </> : 
        <Col sm={12}>
          <DtoTextInput type={"password"} disabled={configurationData.getData("proxyEnable")} setDataObject={setConfigurationData} fieldName={"jAuthToken"} dataObject={configurationData} />
        </Col>
        }
        
      </Row>
      <Row>
        <div className="ml-auto mt-3 px-3">
        <SaveButton recordDto={configurationData} createRecord={callbackFunction} updateRecord={callbackFunction} />
        </div>
      </Row>
      <small className="form-text text-muted mt-2 text-right">* Required Fields</small>
    </Form>
  );
}


export default JenkinsToolConfiguration;