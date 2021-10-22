import React, {useState, useEffect, useContext} from "react";
import PropTypes from "prop-types";
import {Row} from "react-bootstrap";
import modelHelpers from "components/common/model/modelHelpers";
import { Button } from "react-bootstrap";
import sfdcConnectionMetadata from "./sfdc-connection-metadata";
import ToolConfigurationEditorPanelContainer
  from "components/common/panels/detail_panel_container/tools/ToolConfigurationEditorPanelContainer";
import Col from "react-bootstrap/Col";
import {AuthContext} from "contexts/AuthContext";
import toolsActions from "components/inventory/tools/tools-actions";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import VaultTextInput from "components/common/inputs/text/VaultTextInput";
import SFDCBuildTypeSelectInput  from  "components/common/list_of_values_input/workflow/pipelines/SFDCBuildTypeSelectInput";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faPlug } from "@fortawesome/pro-light-svg-icons";
import SfdxTestConnectionStatusModal from './SfdxTestConnectionStatusModal';
import { DialogToastContext } from "contexts/DialogToastContext";
import RoleRestrictedJenkinsToolSelectInput
  from "components/common/list_of_values_input/tools/jenkins/RoleRestrictedJenkinsToolSelectInput";

function SfdcToolConfiguration({ toolData }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [sfdcConfigurationDto, setSfdcConfigurationDto] = useState(undefined);
  const [jenkinsBuildNumber, setJenkinsBuildNumber] = useState("");
  const [jenkinsJobName, setJenkinsJobName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setSfdcConfigurationDto(modelHelpers.getToolConfigurationModel(toolData.getData("configuration"), sfdcConnectionMetadata));
  };

  const testConnection = async() =>{
    setLoading(true);
    let response;

    if (sfdcConfigurationDto != null) {
      try{
        response = await toolsActions.checkSFDXToolConnection(getAccessToken, toolData, sfdcConfigurationDto.getData("jenkinsToolId") );
      } catch (error) {
        toastContext.showErrorDialog(error.message);
      }
    }

    if (response && response.data != null && response.data.status === 200 && response?.data?.message?.buildParams?.buildNumber && response?.data?.message?.buildParams?.jobName ) {
      setJenkinsBuildNumber(response?.data?.message?.buildParams?.buildNumber);
      setJenkinsJobName(response?.data?.message?.buildParams?.jobName);
      setShowModal(true);
    }
    else {
      toastContext.showErrorDialog("Something went wrong during test connection. View browser logs for more details");
      setLoading(false);
    }
  };

  const getSfdxModal = () => {
    return (
      <SfdxTestConnectionStatusModal
        showModal={showModal}
        setShowModal={setShowModal}
        jenkinsBuildNumber={jenkinsBuildNumber}
        setJenkinsBuildNumber={setJenkinsBuildNumber}
        jenkinsJobName={jenkinsJobName}
        setJenkinsJobName={setJenkinsJobName}
        setLoading={setLoading}
        toolData={toolData}
      />
    );
  };

  const getDynamicFields = () => {
    if (sfdcConfigurationDto.getData("buildType") === "sfdx") {
      return (
        <>
        <BooleanToggleInput dataObject={sfdcConfigurationDto} setDataObject={setSfdcConfigurationDto} fieldName={"checkConnection"} />
        {sfdcConfigurationDto.getData("checkConnection") === true &&
          <>
            <RoleRestrictedJenkinsToolSelectInput
              fieldName={"jenkinsToolId"}
              model={sfdcConfigurationDto}
              setModel={setSfdcConfigurationDto}
            />
            <div className="p-2">
              {/* <TooltipWrapper innerText={"Select Jenkins tool to Test Connection"}> */}
                <Button size="sm" variant={"secondary"} disabled={!toolData.getData("_id") || sfdcConfigurationDto.getData("jenkinsToolId").length < 1 || loading} onClick={() => testConnection()}>
                  <FontAwesomeIcon icon={loading ? faSpinner:faPlug} className={`mr-2  ${loading ? ' fa-spin' : ''}`} fixedWidth /> Check SFDX Connection
                </Button>
              {/* </TooltipWrapper> */}
            </div> 
          </>
        }         
        </>
      );
    }
  };
  if (sfdcConfigurationDto == null) {
    return <></>;
  }

  // console.log(sfdcConfigurationDto);

  const saveSfdcToolConfiguration = async () => {
    let newConfiguration = sfdcConfigurationDto.getPersistData();
    const clientIdVaultKey = `${toolData.getData("_id")}-${toolData.getData("tool_identifier")}-client_id`;
    newConfiguration.sfdc_client_id = await toolsActions.saveKeyPasswordToVault(sfdcConfigurationDto, "sfdc_client_id", newConfiguration.sfdc_client_id, clientIdVaultKey, getAccessToken, toolData.getData("_id"));
    const clientSecretVaultKey = `${toolData.getData("_id")}-${toolData.getData("tool_identifier")}-client_secret`;
    newConfiguration.sfdc_client_secret = await toolsActions.saveKeyPasswordToVault(sfdcConfigurationDto, "sfdc_client_secret", newConfiguration.sfdc_client_secret, clientSecretVaultKey, getAccessToken, toolData.getData("_id"));
    const passwordVaultKey = `${toolData.getData("_id")}-${toolData.getData("tool_identifier")}-password`;
    newConfiguration.sfdc_password = await toolsActions.saveKeyPasswordToVault(sfdcConfigurationDto, "sfdc_password", newConfiguration.sfdc_password, passwordVaultKey, getAccessToken, toolData.getData("_id"));
    const tokenVaultKey = `${toolData.getData("_id")}-${toolData.getData("tool_identifier")}-token`;
    newConfiguration.sfdc_token = await toolsActions.saveKeyPasswordToVault(sfdcConfigurationDto, "sfdc_token", newConfiguration.sfdc_token, tokenVaultKey, getAccessToken, toolData.getData("_id"));
    const item = {configuration: newConfiguration};
    return await toolsActions.saveToolConfiguration(toolData, item, getAccessToken);
  };

  return (
    <ToolConfigurationEditorPanelContainer
      model={sfdcConfigurationDto}
      setModel={setSfdcConfigurationDto}
      persistRecord={saveSfdcToolConfiguration}
      toolData={toolData}
      toolConnectionCheckName={"Sfdc"}
    >
      <Row>
        <Col sm={12}>
          <TextInputBase dataObject={sfdcConfigurationDto} setDataObject={setSfdcConfigurationDto} fieldName={"toolURL"} />
          <TextInputBase dataObject={sfdcConfigurationDto} setDataObject={setSfdcConfigurationDto} fieldName={"accountUsername"} />
          <VaultTextInput dataObject={sfdcConfigurationDto} setDataObject={setSfdcConfigurationDto} fieldName={"sfdc_client_id"} />
          <VaultTextInput dataObject={sfdcConfigurationDto} setDataObject={setSfdcConfigurationDto} fieldName={"sfdc_client_secret"} />
          <VaultTextInput dataObject={sfdcConfigurationDto} setDataObject={setSfdcConfigurationDto} fieldName={"sfdc_token"} />
          <VaultTextInput dataObject={sfdcConfigurationDto} setDataObject={setSfdcConfigurationDto} fieldName={"sfdc_password"} />
          <SFDCBuildTypeSelectInput dataObject={sfdcConfigurationDto} setDataObject={setSfdcConfigurationDto} fieldName={"buildType"} />
          {getDynamicFields()}
          {showModal ? getSfdxModal() : null}
        </Col>
      </Row>
    </ToolConfigurationEditorPanelContainer>
  );
}

SfdcToolConfiguration.propTypes = {
  toolData: PropTypes.object,
};

export default SfdcToolConfiguration;