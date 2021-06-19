import React, { useEffect, useContext, useState, useRef } from "react";
import { Col, Button, Card } from "react-bootstrap";
import PropTypes from "prop-types";
import "components/inventory/tools/tools.css";
import { AuthContext } from "../../../../../../../../contexts/AuthContext";
import Loading from "../../../../../../../common/status_notifications/loading";
import Row from "react-bootstrap/Row";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { DialogToastContext } from "../../../../../../../../contexts/DialogToastContext";
import OctopusActions from "../../octopus-actions";
import DeleteModal from "components/common/modal/DeleteModal";
import SaveButtonBase from "components/common/buttons/saving/SaveButtonBase";
import CloudProviderSelectInput from "./input/CloudProviderSelectInput";
import AzureToolSelectInput from "./input/AzureToolSelectInput";
import CommunicationStyleSelectInput from "./input/CommunicationStyleSelectInput";
import WebAppNameSelectInput from "./input/WebAppNameSelectInput";
import SpaceNameSelectInput from "./input/SpaceNameSelectInput";
import EnvironmentNameSelectInput from "./input/EnvironmentSelectInput";
import AccountSelectInput from "./input/AccountSelectInput";
import AWSToolSelectInput from "./input/AWSToolSelectInput";
import ClusterSelectInput from "./input/ClusterSelectInput";
import FeedTypeSelectInput from "./input/FeedTypeSelectInput";
import NexusSelectInput from "./input/NexusSelectInput";
import NexusRepoSelectInput from "./input/NexusRepoSelectInput";
import TestConnectionButton from "./input/TestConnectionButton";
import EditWarningModalToolRegistry from "components/common/modal/EditWarningModalToolRegistry";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import OctopusThumbprintDisplay from "./OctopusThumbprintDisplay";
import axios from "axios";
import {faSpinner} from "@fortawesome/pro-light-svg-icons";
import VaultTextInput from "components/common/inputs/text/VaultTextInput";
import toolsActions from "components/inventory/tools/tools-actions";

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
  }, []);

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
    newConfiguration.password = await toolsActions.saveKeyPasswordToVault(octopusApplicationDataDto, "password", newConfiguration.password, tomcatManagerPasswordKey, getAccessToken, newConfiguration.toolId);
    octopusApplicationDataDto.setData("password", newConfiguration.password);
  }

  const createApplication = async () => {
    try {
      if(type === "tomcat"){        
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

  if (isLoading || octopusApplicationDataDto === null || octopusApplicationDataDto === undefined) {
    return <Loading size="sm" />;
  }

  return (
    <>
      <div className="scroll-y full-height">
          <div className="d-flex justify-content-between px-2">
            <div className="text-muted pt-1 pb-3">
              Enter the required configuration information below. These settings will be used for Octopus {type ? type.charAt(0).toUpperCase() + type.slice(1) + " Creation" : ""}.
            </div>
            <div>
              {appID && octopusApplicationDataDto.getData("id") && type && (type !== "environment") && (
              <TestConnectionButton toolDataDto={octopusApplicationDataDto} />
              )}
            </div>
          </div>
        {octopusApplicationDataDto && type && type === "environment" && !isLoading && (
          <Row>
            <Col lg={12}>
              <TextInputBase
                setDataObject={setOctopusApplicationDataDto}
                dataObject={octopusApplicationDataDto}
                fieldName={"name"}
                disabled={appID && !octopusApplicationDataDto.getData("id") ? true : false}
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
        )}
        {octopusApplicationDataDto && type && type === "account" && !isLoading && (
          <Row>
            <Col lg={12}>
              <TextInputBase
                setDataObject={setOctopusApplicationDataDto}
                dataObject={octopusApplicationDataDto}
                fieldName={"name"}
                disabled={appID && !octopusApplicationDataDto.getData("id") ? true : false}
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
                <AzureToolSelectInput
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
                  <AWSToolSelectInput
                    fieldName={"awsToolConfigId"}
                    dataObject={octopusApplicationDataDto}
                    setDataObject={setOctopusApplicationDataDto}
                    disabled={
                      (octopusApplicationDataDto && octopusApplicationDataDto.getData("cloudType").length === 0) ||
                      appID
                        ? true
                        : false
                    }
                    tool_prop={octopusApplicationDataDto ? octopusApplicationDataDto.getData("cloudType") : ""}
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
        )}
        {octopusApplicationDataDto && type && type === "target" && !isLoading && (
          <Row>
            <Col lg={12}>
              <TextInputBase
                setDataObject={setOctopusApplicationDataDto}
                dataObject={octopusApplicationDataDto}
                fieldName={"name"}
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
                  <AWSToolSelectInput
                    fieldName={"awsToolConfigId"}
                    dataObject={octopusApplicationDataDto}
                    setDataObject={setOctopusApplicationDataDto}
                    disabled={
                      (octopusApplicationDataDto && octopusApplicationDataDto.getData("cloudType").length === 0) ||
                      appID
                        ? true
                        : false
                    }
                    tool_prop={octopusApplicationDataDto ? octopusApplicationDataDto.getData("cloudType") : ""}
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
                      disabled={false}
                    />
                  </Col>
                  <Col lg={12}>
                    <TextInputBase
                      setDataObject={setOctopusApplicationDataDto}
                      dataObject={octopusApplicationDataDto}
                      fieldName={"port"}
                      disabled={false}
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
                      {isValidatingConfig ? (<span><FontAwesomeIcon icon={faSpinner} spin className="mr-1" fixedWidth/>Validate IIS Configuration</span>) : 'Validate IIS Configuration'}
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
        )}
        {octopusApplicationDataDto && type && type === "feed" && !isLoading && (
          <Row>
            <Col lg={12}>
              <TextInputBase
                setDataObject={setOctopusApplicationDataDto}
                dataObject={octopusApplicationDataDto}
                fieldName={"name"}
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
              <NexusSelectInput
                fieldName={"nexusToolId"}
                dataObject={octopusApplicationDataDto}
                setDataObject={setOctopusApplicationDataDto}
                disabled={appID && !octopusApplicationDataDto.getData("id") ? true : false}
                tool_prop={octopusApplicationDataDto ? octopusApplicationDataDto.getData("spaceId") : ""}
              />
            </Col>
            <Col lg={12}>
              <NexusRepoSelectInput
                fieldName={"nexusRepository"}
                dataObject={octopusApplicationDataDto}
                setDataObject={setOctopusApplicationDataDto}
                disabled={
                  (octopusApplicationDataDto &&
                    octopusApplicationDataDto.getData("nexusToolId") &&
                    octopusApplicationDataDto.getData("nexusToolId").length === 0) ||
                  (appID && !octopusApplicationDataDto.getData("id"))
                    ? true
                    : false
                }
                tool_prop={octopusApplicationDataDto ? octopusApplicationDataDto.getData("nexusToolId") : ""}
              />
            </Col>
            <Col lg={12}>
              <FeedTypeSelectInput
                fieldName={"feedType"}
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
        )}
        {octopusApplicationDataDto && type && type === "tomcat" && !isLoading && (
          <Row>
            <Col lg={12}>
              <TextInputBase 
                dataObject={octopusApplicationDataDto} 
                setDataObject={setOctopusApplicationDataDto} 
                fieldName={"name"} 
                disabled={octopusApplicationDataDto.getData("name")} 
              />              
            </Col>
            <Col lg={12}>
              <TextInputBase 
                dataObject={octopusApplicationDataDto} 
                setDataObject={setOctopusApplicationDataDto} 
                fieldName={"tomcatManagerUrl"}
                disabled={octopusApplicationDataDto.getData("tomcatManagerUrl")} 
              />              
            </Col>
            <Col lg={12}>              
              <TextInputBase 
                dataObject={octopusApplicationDataDto} 
                setDataObject={setOctopusApplicationDataDto} 
                fieldName={"tomcatUserName"} 
                disabled={octopusApplicationDataDto.getData("tomcatUserName")} 
              />
            </Col>
            <Col lg={12}>              
              <VaultTextInput 
                dataObject={octopusApplicationDataDto} 
                setDataObject={setOctopusApplicationDataDto} 
                fieldName={"tomcatPassword"}                 
              />
            </Col>
          </Row>
        )}
        <Row>
          {appID && octopusApplicationDataDto && octopusApplicationDataDto.getData("id") && (
            <div className="mr-auto ml-2 mt-3 px-3">
              <Button variant="outline-primary" size="sm" onClick={() => setShowDeleteModal(true)}>
                <FontAwesomeIcon icon={faTrash} className="danger-red" /> Delete{" "}
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </Button>
              <br />
            </div>
          )}
          <div className="ml-auto mt-3 px-3">
            <SaveButtonBase
              updateRecord={appID ? updateApplicationCaller : createApplication}
              setRecordDto={setOctopusApplicationDataDto}
              setData={setOctopusApplicationDataDto}
              createRecord={createApplication}
              recordDto={octopusApplicationDataDto}
              handleClose={handleClose}
              showSuccessToasts={false}
            />
          </div>
        </Row>
      </div>
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
