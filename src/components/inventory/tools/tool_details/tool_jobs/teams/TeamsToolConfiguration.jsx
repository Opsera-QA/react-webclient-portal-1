import React, {useState, useEffect, useContext} from "react";
import PropTypes from "prop-types";
import {Row} from "react-bootstrap";
import SaveButton from "../../../../../common/buttons/SaveButton";
import LoadingDialog from "../../../../../common/status_notifications/loading";
import DtoTextInput from "../../../../../common/input/dto_input/dto-text-input";
import {DialogToastContext} from "../../../../../../contexts/DialogToastContext";
import DetailPanelContainer from "../../../../../common/panels/detail_panel_container/DetailPanelContainer";
import Col from "react-bootstrap/Col";
import teamsConnectionMetadata from "./teams-connection-metadata";
import modelHelpers from "../../../../../common/model/modelHelpers";

function TeamsToolConfiguration({ toolData, fnSaveChanges, fnSaveToVault }) {
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(false);
  const [teamsConfigurationDto, setTeamsConfigurationDto] = useState(undefined);

  useEffect(() => {
    loadData();
  }, [toolData]);

  const loadData = async () => {
    setTeamsConfigurationDto(modelHelpers.getToolConfigurationModel(toolData["configuration"], teamsConnectionMetadata));
  };

  const saveTeamsConfiguration = async () => {
      let newConfiguration = {...teamsConfigurationDto.getPersistData()};
      // TODO: Implement if needed
      if (teamsConfigurationDto.isChanged("webhookUrl")) {
        newConfiguration.webhookUrl = await saveToVault(toolData._id, toolData.tool_identifier, "secretKey", "webhookUrl", teamsConfigurationDto.getData("webhookUrl"));
      }
      const item = {
        configuration: newConfiguration
      };
      await fnSaveChanges(item);
  };

  const saveToVault = async (toolId, toolIdentifier, key, name, value) => {
    // key as only toolID as requested by purushoth!
    const keyName = `${toolId}`;
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

  if (teamsConfigurationDto == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <DetailPanelContainer>
      <div className="h5">Teams Credentials</div>
        {isLoading ? <LoadingDialog size={"sm"} message={"Loading Teams Configuration Details"} /> :
        <div>
          <Row>
            <Col sm={12}><DtoTextInput type={"password"} dataObject={teamsConfigurationDto} setDataObject={setTeamsConfigurationDto} fieldName={"webhookUrl"} /></Col>
          </Row>
          <Row>
            <div className="ml-auto pr-3 pt-2">
              <SaveButton modal={false}
                          recordDto={teamsConfigurationDto} setRecordDto={setTeamsConfigurationDto}
                          createRecord={saveTeamsConfiguration} updateRecord={saveTeamsConfiguration} />
            </div>
          </Row>
        </div>
        }
    </DetailPanelContainer>
  );
}

TeamsToolConfiguration.propTypes = {
  toolData: PropTypes.object,
  fnSaveChanges: PropTypes.func,
  fnSaveToVault: PropTypes.func
};

export default TeamsToolConfiguration;