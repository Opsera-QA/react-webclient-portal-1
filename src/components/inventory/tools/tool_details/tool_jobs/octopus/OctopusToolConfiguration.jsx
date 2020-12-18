import React, {useState, useEffect, useContext} from "react";
import PropTypes from "prop-types";
import {Form, Button, Row} from "react-bootstrap";
import SaveButton from "../../../../../common/buttons/SaveButton";
import LoadingDialog from "../../../../../common/status_notifications/loading";
import DtoTextInput from "../../../../../common/input/dto_input/dto-text-input";
import {DialogToastContext} from "../../../../../../contexts/DialogToastContext";
import octopusConnectionMetadata from "./octopus-connection-metadata";
import DetailPanelContainer from "../../../../../common/panels/detail_panel_container/DetailPanelContainer";
import Col from "react-bootstrap/Col";
import {getFormValidationErrorDialog} from "components/common/toasts/toasts";
import modelHelpers from "../../../../../common/model/modelHelpers";


function OctopusToolConfiguration({ toolData, fnSaveChanges, fnSaveToVault }) {
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(false);
  const [octopusConfigurationDto, setOctopusConfigurationDto] = useState(undefined);
  const [showToast, setShowToast] = useState(false);
  const [toast, setToast] = useState({});

  useEffect(() => {
    loadData();
  }, [toolData]);

  const loadData = async () => {
    setOctopusConfigurationDto(modelHelpers.getToolConfigurationModel(toolData["configuration"], octopusConnectionMetadata));
  };

  const saveOctopusConfig = async () => {
    if (octopusConfigurationDto.isModelValid()) {
      let newConfiguration = {...octopusConfigurationDto.getPersistData()};

      if (octopusConfigurationDto.isChanged("octopusApiKey")) {
        newConfiguration.octopusApiKey = await saveToVault(toolData._id, toolData.tool_identifier, "secretKey", "Vault Secured Key", octopusConfigurationDto.getData("octopusApiKey"));
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

  if (octopusConfigurationDto == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <DetailPanelContainer>
      {showToast && toast}
      <div className="h5">Octopus Credentials</div>
        {isLoading ? <LoadingDialog size={"sm"} message={"Loading Octopus Configuration Details"} /> :
        <div>
          <Row>
            <Col sm={12}><DtoTextInput dataObject={octopusConfigurationDto} setDataObject={setOctopusConfigurationDto} fieldName={"toolURL"} /></Col>
            <Col sm={12}><DtoTextInput dataObject={octopusConfigurationDto} setDataObject={setOctopusConfigurationDto} fieldName={"userName"} /></Col>
            <Col sm={12}><DtoTextInput type={"password"} dataObject={octopusConfigurationDto} setDataObject={setOctopusConfigurationDto} fieldName={"octopusApiKey"} /></Col>
          </Row>
          <Row>
          <div className="ml-auto mt-3 px-3">
              <SaveButton setRecordDto={setOctopusConfigurationDto} modal={false} recordDto={octopusConfigurationDto} createRecord={saveOctopusConfig} updateRecord={saveOctopusConfig} />
            </div>
          </Row>
        </div>
        }
    </DetailPanelContainer>
  );
}

OctopusToolConfiguration.propTypes = {
  toolData: PropTypes.object,
  fnSaveChanges: PropTypes.func,
  fnSaveToVault: PropTypes.func
};

export default OctopusToolConfiguration;