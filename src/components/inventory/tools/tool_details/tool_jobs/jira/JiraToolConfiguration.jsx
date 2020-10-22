import React, {useState, useEffect, useContext} from "react";
import PropTypes from "prop-types";
import {Form, Button, Row} from "react-bootstrap";
import SaveButton from "../../../../../common/buttons/SaveButton";
import Model from "../../../../../../core/data_model/model";
import LoadingDialog from "../../../../../common/status_notifications/loading";
import DtoTextInput from "../../../../../common/input/dto_input/dto-text-input";
import {DialogToastContext} from "../../../../../../contexts/DialogToastContext";
import jiraConnectionMetadata from "./jira-connection-metadata";
import DetailPanelContainer from "../../../../../common/panels/detail_panel_container/DetailPanelContainer";
import Col from "react-bootstrap/Col";
import {getFormValidationErrorDialog} from "components/common/toasts/toasts";


function JiraToolConfiguration({ toolData, fnSaveChanges, fnSaveToVault }) {
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(false);
  const [jiraConfigurationDto, setJiraConfigurationDto] = useState(undefined);
  const [showToast, setShowToast] = useState(false);
  const [toast, setToast] = useState({});

  useEffect(() => {
    loadData();
  }, [toolData]);

  const loadData = async () => {
    try {
      console.log("tool data config: " + JSON.stringify(toolData));
      if (toolData["configuration"] != null) {
        setJiraConfigurationDto(new Model(toolData["configuration"], jiraConnectionMetadata, false))
      } else {
        setJiraConfigurationDto(new Model({...jiraConnectionMetadata.newModelBase}, jiraConnectionMetadata, true));
      }
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const saveJiraConfig = async () => {
    if (jiraConfigurationDto.isModelValid()) {
      let newConfiguration = {...jiraConfigurationDto.getPersistData()};

      newConfiguration.toolURL = jiraConfigurationDto.getData("toolURL").trim();
      newConfiguration.jiraPort = jiraConfigurationDto.getData("jiraPort").trim();
      newConfiguration.userName = jiraConfigurationDto.getData("userName").trim();

      if (jiraConfigurationDto.isChanged("vaultSecretKey")) {
        newConfiguration.vaultSecretKey = await saveToVault(toolData._id, toolData.tool_identifier, "secretKey", "Vault Secured Key", jiraConfigurationDto.getData("vaultSecretKey").trim());
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

  if (jiraConfigurationDto == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <DetailPanelContainer>
      {showToast && toast}
      <div className="h5">Jira Credentials</div>
        {isLoading ? <LoadingDialog size={"sm"} message={"Loading JIRA Configuration Details"} /> :
        <div>
          <Row>
            <Col sm={6}><DtoTextInput dataObject={jiraConfigurationDto} setDataObject={setJiraConfigurationDto} fieldName={"toolURL"} /></Col>
            <Col sm={6}><DtoTextInput dataObject={jiraConfigurationDto} setDataObject={setJiraConfigurationDto} fieldName={"jiraPort"} /></Col>
            <Col sm={12}><DtoTextInput dataObject={jiraConfigurationDto} setDataObject={setJiraConfigurationDto} fieldName={"userName"} /></Col>
            <Col sm={12}><DtoTextInput type={"password"} dataObject={jiraConfigurationDto} setDataObject={setJiraConfigurationDto} fieldName={"vaultSecretKey"} /></Col>
          </Row>
          <Row>
            <div className="ml-auto px-2">
              <SaveButton setRecordDto={setJiraConfigurationDto} modal={false} recordDto={jiraConfigurationDto} createRecord={saveJiraConfig} updateRecord={saveJiraConfig} />
            </div>
          </Row>
        </div>
        }
    </DetailPanelContainer>
  );
}

JiraToolConfiguration.propTypes = {
  toolData: PropTypes.object,
  fnSaveChanges: PropTypes.func,
  fnSaveToVault: PropTypes.func
};

export default JiraToolConfiguration;