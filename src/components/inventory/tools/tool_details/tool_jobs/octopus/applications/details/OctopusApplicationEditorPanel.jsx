import React, { useEffect, useContext, useState, useRef } from "react";
import { Col, Button, Card } from "react-bootstrap";
import PropTypes from "prop-types";
import { AuthContext } from "../../../../../../../../contexts/AuthContext";
import Loading from "../../../../../../../common/status_notifications/loading";
import Row from "react-bootstrap/Row";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { DialogToastContext } from "../../../../../../../../contexts/DialogToastContext";
import OctopusActions from "../../octopus-actions";
import DeleteModal from "components/common/modal/DeleteModal";
import CloudProviderSelectInput from "./input/CloudProviderSelectInput";
import OctopusApplicationAzureAccountToolSelectInput from "components/inventory/tools/tool_details/tool_jobs/octopus/applications/details/input/OctopusApplicationAzureAccountToolSelectInput";
import CommunicationStyleSelectInput from "./input/CommunicationStyleSelectInput";
import WebAppNameSelectInput from "./input/WebAppNameSelectInput";
import SpaceNameSelectInput from "./input/SpaceNameSelectInput";
import EnvironmentNameSelectInput from "./input/EnvironmentSelectInput";
import AccountSelectInput from "./input/AccountSelectInput";
import RoleRestrictedAwsAccountToolSelectInput from "components/common/list_of_values_input/tools/aws/tool/RoleRestrictedAwsAccountToolSelectInput";
import ClusterSelectInput from "./input/ClusterSelectInput";
import TestConnectionButton from "./input/TestConnectionButton";
import EditWarningModalToolRegistry from "components/common/modal/EditWarningModalToolRegistry";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import OctopusThumbprintDisplay from "./OctopusThumbprintDisplay";
import axios from "axios";
import VaultTextInput from "components/common/inputs/text/VaultTextInput";
import pipelineActions from "components/workflow/pipeline-actions";
import OctopusStepAzureToolSelectInput from "components/inventory/tools/tool_details/tool_jobs/octopus/applications/details/input/OctopusStepAzureToolSelectInput";
import AzureClusterSelectInput from "./input/AzureClusterSelectInput";
import AzureResourceGroupSelectInput from "./input/AzureResourceGroupSelectInput";
import OctopusFeedEditorForm from "./sub_forms/OctopusFeedEditorForm";
import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";
import {getOctopusApplicationTypeLabel} from "components/common/list_of_values_input/tools/octopus/applications/type/octopus.application.types";
import IconBase from "components/common/icons/IconBase";
import LoadingIcon from "components/common/icons/LoadingIcon";

function OctopusApplicationEditorPanel({ octopusApplicationData, toolData, appID, handleClose, type }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [octopusApplicationDataDto, setOctopusApplicationDataDto] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const isMounted = useRef(false);
  const [isValidatingConfig, setIsValidatingConfig] = useState(false);
  const [azureConfig,setAzureConfig]=useState(null);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData();

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [octopusApplicationData, type]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await fetchOnloadDetails();
    } catch (error) {
      toastContext.showLoadingErrorDialog(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchOnloadDetails = async () => {
    if (!appID) {
      let newDataObject = octopusApplicationData;
      newDataObject.setData("toolId", toolData._id);
      setOctopusApplicationDataDto({ ...newDataObject });
    } else {
      setOctopusApplicationDataDto(octopusApplicationData);
      if (type === "account" || type === "target" || type === "feed") {
        let newDataObject = octopusApplicationData;
        if (!newDataObject.getData("cloudType")) {
          if (newDataObject.getData("awsToolConfigId")) {
            newDataObject.setData("cloudType", "AmazonWebServicesAccount");
          }
          if (newDataObject.getData("azureToolConfigId")) {
            newDataObject.setData("cloudType", "AzureServicePrincipal");
          }
        }
        setOctopusApplicationDataDto({ ...newDataObject });
      }
    }
  };

  const saveTomcatPasswordToVault = async () => {
    let newConfiguration = octopusApplicationDataDto.getPersistData();
    const tomcatManagerPasswordKey = `${newConfiguration.toolId}-${newConfiguration.name.toLowerCase()}${newConfiguration.userName.toLowerCase()}-secretKey`;
    if (newConfiguration.password != null && typeof(newConfiguration.password) === "string") {
      const body = { "key": tomcatManagerPasswordKey, "value": newConfiguration.password, "toolId": newConfiguration.toolId };
      const response = await pipelineActions.saveToolRegistryRecordToVault(body, getAccessToken);
      newConfiguration.password = response?.status === 200 ? { name: "Vault Secured Key", vaultKey: tomcatManagerPasswordKey } : {};
      octopusApplicationDataDto.setData("password", newConfiguration.password);
    }
  };

  const createApplication = async () => {
    try {
      if(type === "tomcat"){
        let actions = toolData.getData("actions");
        let newName = octopusApplicationDataDto.getData("name");
        if(actions.filter(action => action.name === newName).length > 0){
          toastContext.showCreateFailureResultDialog(type ? type.charAt(0).toUpperCase() + type.slice(1) : "", "Tomcat Manager Instance Name should be unique. Please with a different name");
          return;
        }
        await saveTomcatPasswordToVault();
      }
      await OctopusActions.createOctopusApplication(octopusApplicationDataDto, type, getAccessToken);
      toastContext.showCreateSuccessResultDialog(type ? type.charAt(0).toUpperCase() + type.slice(1) : "");
      handleClose();
    } catch (error) {
      toastContext.showCreateFailureResultDialog(type ? type.charAt(0).toUpperCase() + type.slice(1) : "", error);
    }
  };

  const updateApplication = async () => {
    if(type === "tomcat"){
      await saveTomcatPasswordToVault();
    }
    return await OctopusActions.updateOctopusApplication(octopusApplicationDataDto, type, getAccessToken, appID);
  };

  const deleteApplication = async () => {
    try {
      await OctopusActions.deleteOctopusApplication(toolData._id, type, getAccessToken, appID, octopusApplicationDataDto);
      toastContext.showDeleteSuccessResultDialog(type && type.length > 2 ? type.charAt(0).toUpperCase() + type.slice(1) : "");
      handleClose();
    } catch (error) {
      toastContext.showDeleteFailureResultDialog(type && type.length > 2 ? type.charAt(0).toUpperCase() + type.slice(1) : "", error);
    }
  };

  const updateApplicationCaller= async () => {
    setShowEditModal(true);
  };

  const validateIisConfig = async (cancelSource = cancelTokenSource) => {
    setIsValidatingConfig(true);
    const response =  await OctopusActions.validateIisConfig(octopusApplicationDataDto, getAccessToken, cancelSource);
    let newDataObject = octopusApplicationDataDto;
    if(response.data.status === 200){
      newDataObject.setData("healthStatus", response.data.message.healthStatus);
    } else {
      newDataObject.setData("healthStatus", "Not Healthy");
      toastContext.showLoadingErrorDialog(response.data.message);
    }
    setOctopusApplicationDataDto({ ...newDataObject });
    setIsValidatingConfig(false);
  };

  // TODO: Make sub forms
  const getEnvironmentEditorFields = () => {
    if (type === "environment") {
      return (
        <Row>
          <Col lg={12}>
            <TextInputBase
              dataObject={octopusApplicationDataDto}
              setDataObject={setOctopusApplicationDataDto}
              fieldName={"name"}
              disabled={appID}
            />
          </Col>
          <Col lg={12}>
            <TextInputBase
              setDataObject={setOctopusApplicationDataDto}
              dataObject={octopusApplicationDataDto}
              fieldName={"description"}
              disabled={appID && !octopusApplicationDataDto.getData("id") ? true : false}
            />
          </Col>
          <Col lg={12}>
            <SpaceNameSelectInput
              fieldName={"spaceName"}
              dataObject={octopusApplicationDataDto}
              setDataObject={setOctopusApplicationDataDto}
              disabled={appID ? true : false}
              tool_prop={octopusApplicationDataDto ? octopusApplicationDataDto.getData("spaceId") : ""}
            />
          </Col>
        </Row>
      );
    }
  };

  const getAccountEditorFields = () => {
    if (type === "account") {
      return (
        <div>
          <Row>
            <Col lg={12}>
              <TextInputBase
                dataObject={octopusApplicationDataDto}
                setDataObject={setOctopusApplicationDataDto}
                fieldName={"name"}
                disabled={appID}
              />
            </Col>
            <Col lg={12}>
              <TextInputBase
                setDataObject={setOctopusApplicationDataDto}
                dataObject={octopusApplicationDataDto}
                fieldName={"description"}
                disabled={appID && !octopusApplicationDataDto.getData("id") ? true : false}
              />
            </Col>
            <Col lg={12}>
              <SpaceNameSelectInput
                fieldName={"spaceName"}
                dataObject={octopusApplicationDataDto}
                setDataObject={setOctopusApplicationDataDto}
                disabled={appID ? true : false}
                tool_prop={octopusApplicationDataDto ? octopusApplicationDataDto.getData("spaceId") : ""}
              />
            </Col>
            <Col lg={12}>
              <CloudProviderSelectInput
                fieldName={"cloudType"}
                dataObject={octopusApplicationDataDto}
                setDataObject={setOctopusApplicationDataDto}
                disabled={
                  (octopusApplicationDataDto && octopusApplicationDataDto.getData("spaceName").length === 0) || appID
                    ? true
                    : false
                }
                tool_prop={octopusApplicationDataDto ? octopusApplicationDataDto.getData("spaceId") : ""}
              />
            </Col>
            {octopusApplicationDataDto && octopusApplicationDataDto.getData("cloudType") === "AzureServicePrincipal" && (
              <Col lg={12}>
                <OctopusApplicationAzureAccountToolSelectInput
                  fieldName={"azureToolConfigId"}
                  dataObject={octopusApplicationDataDto}
                  setDataObject={setOctopusApplicationDataDto}
                  disabled={
                    (octopusApplicationDataDto && octopusApplicationDataDto.getData("cloudType").length === 0) || appID
                      ? true
                      : false
                  }
                  tool_prop={octopusApplicationDataDto ? octopusApplicationDataDto.getData("cloudType") : ""}
                />
              </Col>
            )}
            {octopusApplicationDataDto &&
            octopusApplicationDataDto.getData("cloudType") === "AmazonWebServicesAccount" && (
              <Col lg={12}>                
                <RoleRestrictedAwsAccountToolSelectInput
                  fieldName={"awsToolConfigId"}
                  model={octopusApplicationDataDto}
                  setModel={setOctopusApplicationDataDto} 
                  valueField={"_id"}
                  textField={"name"}
                  disabled={
                    (octopusApplicationDataDto && octopusApplicationDataDto.getData("cloudType").length === 0) ||
                    appID
                      ? true
                      : false
                  }
                />
              </Col>
            )}
            <Col lg={12}>
              <EnvironmentNameSelectInput
                fieldName={"environmentIds"}
                dataObject={octopusApplicationDataDto}
                setDataObject={setOctopusApplicationDataDto}
                disabled={
                  (octopusApplicationDataDto && octopusApplicationDataDto.getData("spaceId").length === 0) ||
                  (appID && !octopusApplicationDataDto.getData("id"))
                    ? true
                    : false
                }
                tool_prop={octopusApplicationDataDto ? octopusApplicationDataDto.getData("spaceId") : ""}
              />
            </Col>
          </Row>
        </div>
      );
    }
  };


  const getTargetEditorFields = () => {
    if (type === "target") {
      return (
        <div>
          <Row>
            <Col lg={12}>
              <TextInputBase
                dataObject={octopusApplicationDataDto}
                setDataObject={setOctopusApplicationDataDto}
                fieldName={"name"}
                disabled={appID}
              />
            </Col>
            <Col lg={12}>
              <SpaceNameSelectInput
                fieldName={"spaceName"}
                dataObject={octopusApplicationDataDto}
                setDataObject={setOctopusApplicationDataDto}
                disabled={appID ? true : false}
                tool_prop={octopusApplicationDataDto ? octopusApplicationDataDto.getData("spaceId") : ""}
              />
            </Col>
            {octopusApplicationDataDto &&
            octopusApplicationDataDto.getData("cloudType") !== "TentaclePassive" && (
              <Col lg={12}>
                <AccountSelectInput
                  fieldName={"accountId"}
                  dataObject={octopusApplicationDataDto}
                  setDataObject={setOctopusApplicationDataDto}
                  disabled={
                    (octopusApplicationDataDto && octopusApplicationDataDto.getData("spaceName").length === 0) ||
                    (appID && !octopusApplicationDataDto.getData("id"))
                      ? true
                      : false
                  }
                  tool_prop={octopusApplicationDataDto ? octopusApplicationDataDto.getData("spaceId") : ""}
                />
              </Col>
            )}
            <Col lg={12}>
              <CloudProviderSelectInput
                fieldName={"cloudType"}
                dataObject={octopusApplicationDataDto}
                setDataObject={setOctopusApplicationDataDto}
                disabled={
                  (octopusApplicationDataDto && octopusApplicationDataDto.getData("spaceName").length === 0) || appID
                    ? true
                    : false
                }
                tool_prop={octopusApplicationDataDto ? octopusApplicationDataDto.getData("spaceId") : ""}
              />
            </Col>
            {octopusApplicationDataDto &&
            octopusApplicationDataDto.getData("cloudType") === "AmazonWebServicesAccount" && (
              <Col lg={12}>                
                <RoleRestrictedAwsAccountToolSelectInput
                  fieldName={"awsToolConfigId"}
                  model={octopusApplicationDataDto}
                  setModel={setOctopusApplicationDataDto} 
                  valueField={"_id"}
                  textField={"name"}
                  disabled={
                    (octopusApplicationDataDto && octopusApplicationDataDto.getData("cloudType").length === 0) ||
                    appID
                      ? true
                      : false
                  }
                />
              </Col>
            )}
            {octopusApplicationDataDto && octopusApplicationDataDto.getData("cloudType") === "AzureServicePrincipal" && (
              <>
                <Col lg={12}>
                  <CommunicationStyleSelectInput
                    fieldName={"communicationStyle"}
                    dataObject={octopusApplicationDataDto}
                    setDataObject={setOctopusApplicationDataDto}
                    disabled={
                      (octopusApplicationDataDto && octopusApplicationDataDto.getData("cloudType").length === 0) ||
                      appID
                        ? true
                        : false
                    }
                    tool_prop={
                      octopusApplicationDataDto &&
                      octopusApplicationDataDto.getData("cloudType") === "AzureServicePrincipal"
                        ? octopusApplicationDataDto.getData("spaceId")
                        : ""
                    }
                  />
                </Col>
                <Col lg={12}>
                  <WebAppNameSelectInput
                    fieldName={"webAppName"}
                    dataObject={octopusApplicationDataDto}
                    setDataObject={setOctopusApplicationDataDto}
                    disabled={
                      (octopusApplicationDataDto && octopusApplicationDataDto.getData("cloudType").length === 0) ||
                      (appID && !octopusApplicationDataDto.getData("id"))
                        ? true
                        : false
                    }
                    tool_prop={
                      octopusApplicationDataDto &&
                      octopusApplicationDataDto.getData("cloudType") === "AzureServicePrincipal"
                        ? octopusApplicationDataDto.getData("accountId")
                        : ""
                    }
                  />
                </Col>
                <Col lg={12}>
                  <OctopusStepAzureToolSelectInput
                    model={octopusApplicationDataDto}
                    setModel={setOctopusApplicationDataDto}
                    setAzureConfig={setAzureConfig}
                  />
                </Col>
                <Col lg={12}>
                  <TextInputBase
                    dataObject={octopusApplicationDataDto}
                    setDataObject={setOctopusApplicationDataDto}
                    fieldName={"resource"}
                  />
                </Col>
                <Col lg={12}>
                  <AzureClusterSelectInput
                    dataObject={octopusApplicationDataDto}
                    setDataObject={setOctopusApplicationDataDto}
                    azureToolConfigId={octopusApplicationDataDto?.getData("azureToolId")}
                    azureConfig={azureConfig}
                    resource={octopusApplicationData?.getData("resource")}
                  />
                </Col>
                <Col lg={12}>
                  <AzureResourceGroupSelectInput
                    dataObject={octopusApplicationDataDto}
                    setDataObject={setOctopusApplicationDataDto}
                    azureToolConfigId={octopusApplicationDataDto?.getData("azureToolId")}
                    azureConfig={azureConfig}
                    resource={octopusApplicationData?.getData("resource")}
                  />
                </Col>
              </>
            )}
            {octopusApplicationDataDto && octopusApplicationDataDto.getData("cloudType") === "TentaclePassive" && (
              <OctopusThumbprintDisplay
                className="my-2"
                dataObject={octopusApplicationDataDto}
                setDataObject={setOctopusApplicationDataDto}
                toolData={toolData}
              />
            )
            }
            <Col lg={12}>
              <EnvironmentNameSelectInput
                fieldName={"environmentIds"}
                dataObject={octopusApplicationDataDto}
                setDataObject={setOctopusApplicationDataDto}
                disabled={
                  (octopusApplicationDataDto && octopusApplicationDataDto.getData("spaceId").length === 0) ||
                  (appID && !octopusApplicationDataDto.getData("id"))
                    ? true
                    : false
                }
                tool_prop={octopusApplicationDataDto ? octopusApplicationDataDto.getData("spaceId") : ""}
              />
            </Col>
            {octopusApplicationDataDto && octopusApplicationDataDto.getData("cloudType") === "TentaclePassive" && (
              <>
                <Col lg={12}>
                  <TextInputBase
                    setDataObject={setOctopusApplicationDataDto}
                    dataObject={octopusApplicationDataDto}
                    fieldName={"hostName"}
                  />
                </Col>
                <Col lg={12}>
                  <TextInputBase
                    setDataObject={setOctopusApplicationDataDto}
                    dataObject={octopusApplicationDataDto}
                    fieldName={"port"}
                  />
                </Col>
                <Col lg={12} className="my-2">
                  <TextFieldBase dataObject={octopusApplicationDataDto} fieldName={"healthStatus"}/>
                  <small className="form-text text-muted">
                    Validate IIS configuration to get the latest health status
                  </small>
                </Col>
                <Col lg={12} className="mt-2">
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={() => validateIisConfig(cancelTokenSource)}
                    disabled={octopusApplicationDataDto.getData("hostName") === "" || octopusApplicationDataDto.getData("port") === ""}
                  >
                    {isValidatingConfig ? (<span><LoadingIcon className={"mr-1"}/>Validating IIS Configuration</span>) : 'Validate IIS Configuration'}
                  </Button>
                </Col>
              </>
            )
            }
            {octopusApplicationDataDto &&
            octopusApplicationDataDto.getData("cloudType") === "AmazonWebServicesAccount" && (
              <Col lg={12}>
                <ClusterSelectInput
                  fieldName={"clusterName"}
                  dataObject={octopusApplicationDataDto}
                  setDataObject={setOctopusApplicationDataDto}
                  disabled={
                    (octopusApplicationDataDto &&
                      octopusApplicationDataDto.getData("awsToolConfigId").length === 0) ||
                    appID
                      ? true
                      : false
                  }
                  tool_prop={octopusApplicationDataDto ? octopusApplicationDataDto.getData("awsToolConfigId") : ""}
                />
              </Col>
            )}
          </Row>
        </div>
      );
    }
  };

  const getFeedEditorForm = () => {
    if (type === "feed") {
      return (
        <OctopusFeedEditorForm
          dataObject={octopusApplicationDataDto}
          setDataObject={setOctopusApplicationDataDto}
          appID={appID}
        />
      );
    }
  };

  const getTomcatEditorFields = () => {
    if (type === "tomcat") {
      return (
        <Row>
          <Col lg={12}>
            <TextInputBase
              dataObject={octopusApplicationDataDto}
              setDataObject={setOctopusApplicationDataDto}
              fieldName={"name"}
              disabled={appID}
            />
          </Col>
          <Col lg={12}>
            <SpaceNameSelectInput
              fieldName={"spaceName"}
              dataObject={octopusApplicationDataDto}
              setDataObject={setOctopusApplicationDataDto}
              tool_prop={octopusApplicationDataDto ? octopusApplicationDataDto.getData("spaceId") : ""}
            />
          </Col>
          <Col lg={12}>
            <TextInputBase
              dataObject={octopusApplicationDataDto}
              setDataObject={setOctopusApplicationDataDto}
              fieldName={"managerUrl"}
            />
          </Col>
          <Col lg={12}>
            <TextInputBase
              dataObject={octopusApplicationDataDto}
              setDataObject={setOctopusApplicationDataDto}
              fieldName={"userName"}
            />
          </Col>
          <Col lg={12}>
            <VaultTextInput
              dataObject={octopusApplicationDataDto}
              setDataObject={setOctopusApplicationDataDto}
              fieldName={"password"}
            />
          </Col>
        </Row>
      );
    }
  };

  const getDeleteButton = () => {
    if (type === "tomcat" || (appID && octopusApplicationDataDto && octopusApplicationDataDto?.getData("id"))) {
      return (
        <div className="mr-auto">
          <Button variant="outline-primary" size="sm" onClick={() => setShowDeleteModal(true)}>
            <IconBase icon={faTrash} className={"danger-red"}/> Delete{" "}
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </Button>
          <br/>
        </div>
      );
    }
  };

  const getCreateMessage = () => {
    if (octopusApplicationDataDto?.isNew()) {
      return (
        <div className="text-muted pb-3">
          Enter the required configuration information below. These settings will be used for Octopus {getOctopusApplicationTypeLabel(type)} Application Creation.
        </div>
      );
    }
  };

  if (isLoading || octopusApplicationDataDto === null || octopusApplicationDataDto === undefined) {
    return <Loading size="sm" />;
  }

  return (
    <>
    <EditorPanelContainer
      handleClose={handleClose}
      isLoading={isLoading}
      recordDto={octopusApplicationDataDto}
      updateRecord={appID ? updateApplicationCaller : createApplication}
      createRecord={createApplication}
      setRecordDto={setOctopusApplicationDataDto}
      extraButtons={getDeleteButton()}
      className={""}
    >
      {getCreateMessage()}
      <div>
        {appID && octopusApplicationDataDto.getData("id") && type && (type !== "environment") && (
          <TestConnectionButton toolDataDto={octopusApplicationDataDto} />
          )}
      </div>
      {getEnvironmentEditorFields()}
      {getAccountEditorFields()}
      {getTargetEditorFields()}
      {getFeedEditorForm()}
      {getTomcatEditorFields()}
    </EditorPanelContainer>
      <DeleteModal
        showModal={showDeleteModal}
        setShowModal={setShowDeleteModal}
        dataObject={octopusApplicationDataDto}
        handleDelete={deleteApplication}
      />
      <EditWarningModalToolRegistry
        showModal={showEditModal}
        setShowModal={setShowEditModal}
        dataObject={octopusApplicationDataDto}
        handleEdit={updateApplication}
        handleClose={handleClose}
      />
    </>
  );
}

OctopusApplicationEditorPanel.propTypes = {
  octopusApplicationData: PropTypes.object,
  toolData: PropTypes.object,
  loadData: PropTypes.func,
  appID: PropTypes.string,
  handleClose: PropTypes.func,
  type: PropTypes.string,
};

export default OctopusApplicationEditorPanel;
