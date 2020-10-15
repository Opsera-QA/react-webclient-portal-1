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

function JiraToolConfiguration({ toolData, fnSaveChanges, fnSaveToVault }) {
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(false);
  const [jiraConfigurationDto, setJiraConfigurationDto] = useState(undefined);

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

  const updateJiraConnection = async () => {
    let newConfiguration = {...jiraConfigurationDto.getPersistData()};
    const item = {
      configuration: newConfiguration
    };
    await fnSaveChanges(item);
  };

  if (jiraConfigurationDto == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <DetailPanelContainer>
      <div className="h5">Jira Credentials</div>
        {isLoading ? <LoadingDialog size={"sm"} message={"Loading JIRA Configuration Details"} /> :
        <div>
          <Row>
            <Col sm={6}><DtoTextInput dataObject={jiraConfigurationDto} setDataObject={setJiraConfigurationDto} fieldName={"jiraUrl"} /></Col>
            <Col sm={6}><DtoTextInput dataObject={jiraConfigurationDto} setDataObject={setJiraConfigurationDto} fieldName={"jiraPort"} /></Col>
            <Col sm={12}><DtoTextInput dataObject={jiraConfigurationDto} setDataObject={setJiraConfigurationDto} fieldName={"jiraUserName"} /></Col>
            <Col sm={12}><DtoTextInput type={"password"} dataObject={jiraConfigurationDto} setDataObject={setJiraConfigurationDto} fieldName={"jiraPassword"} /></Col>
            <Col sm={12}><DtoTextInput dataObject={jiraConfigurationDto} setDataObject={setJiraConfigurationDto} fieldName={"projectName"} /></Col>
          </Row>
          <Row className="m-2">
            <div className="text-muted italic">Please Note: All fields are required for connectivity.</div>
          </Row>
          <Row>
            <div className="ml-auto">
              <SaveButton setRecordDto={setJiraConfigurationDto} modal={false} recordDto={jiraConfigurationDto} createRecord={updateJiraConnection} updateRecord={updateJiraConnection} />
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