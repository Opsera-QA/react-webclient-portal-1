import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {Form, Row} from "react-bootstrap";
import SaveButton from "components/common/buttons/SaveButton";
import argoConnectionMetadata from "./argo-connection-metadata";
import LoadingDialog from "components/common/status_notifications/loading";
import Model from "core/data_model/model";
import Col from "react-bootstrap/Col";
import DtoTextInput from "components/common/input/dto_input/dto-text-input";
import TestToolConnectionButton from "../../../../../common/buttons/connection/TestToolConnectionButton";

function ArgoToolConfiguration({ toolData, toolId, fnSaveChanges, fnSaveToVault }) {
  const [configurationData, setConfigurationData] = useState(undefined);

  useEffect(() => {
    loadData();
  }, [toolData]);

  const loadData = async () => {
    if (toolData["configuration"] != null) {
      setConfigurationData(new Model(toolData["configuration"], argoConnectionMetadata, false))
    } else {
      setConfigurationData(new Model({...argoConnectionMetadata.newModelBase}, argoConnectionMetadata, true));
    }
  };

  const callbackFunction = async () => {
    let newConfiguration = {...configurationData.getPersistData()};

    if (configurationData.isChanged("accountPassword")) {
      newConfiguration.accountPassword = await saveToVault(toolId, toolData.tool_identifier, "accountPassword", "Vault Secured Key", configurationData.getData("accountPassword"));
    }

    const item = {
      configuration: newConfiguration
    };
    await fnSaveChanges(item);
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
        <div className="ml-auto"><TestToolConnectionButton recordData={toolData} toolName={"Argocd"} disable={configurationData.isNew() || configurationData.isChanged()}/></div>
      </Row>
      <Form>
        <Row>
          <Col sm={12}>
            <DtoTextInput setDataObject={setConfigurationData} fieldName={"toolURL"} dataObject={configurationData} />
          </Col>
          <Col sm={12}>
            <DtoTextInput setDataObject={setConfigurationData} fieldName={"userName"} dataObject={configurationData} />
          </Col>
          <Col sm={12}>
            <DtoTextInput type={"password"} setDataObject={setConfigurationData} fieldName={"accountPassword"} dataObject={configurationData} />
          </Col>
        </Row>
        <Row>
          <div className="ml-auto mt-3 px-3 d-flex">
            <div>
              <SaveButton recordDto={configurationData} createRecord={callbackFunction} updateRecord={callbackFunction} />
            </div>
          </div>
        </Row>
        <small className="form-text text-muted mt-2 text-right">* Required Fields</small>
      </Form>
    </div>
  );
}

ArgoToolConfiguration.propTypes = {
  toolData: PropTypes.object,
  toolId:  PropTypes.string,
  fnSaveChanges: PropTypes.func,
  fnSaveToVault: PropTypes.func
};

export default ArgoToolConfiguration;
