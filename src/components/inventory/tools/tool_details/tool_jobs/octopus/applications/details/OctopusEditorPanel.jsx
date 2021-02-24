import React, { useEffect, useContext, useState } from "react";
import { Col, Button, Card } from "react-bootstrap";
import PropTypes from "prop-types";
import "components/inventory/tools/tools.css";
import { AuthContext } from "../../../../../../../../contexts/AuthContext";
import Loading from "../../../../../../../common/status_notifications/loading";
import Row from "react-bootstrap/Row";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import DtoTextInput from "../../../../../../../common/input/dto_input/dto-text-input";
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
import EditModal from "components/common/modal/EditModal";

function OctopusApplicationEditorPanel({ octopusApplicationData, toolData, appID, handleClose, type }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [octopusApplicationDataDto, setOctopusApplicationDataDto] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    loadData();
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

  const createApplication = async () => {
    try {
      await OctopusActions.createOctopusApplication(octopusApplicationDataDto, type, getAccessToken);
      toastContext.showCreateSuccessResultDialog(type ? type.charAt(0).toUpperCase() + type.slice(1) : "")
      handleClose()
    } catch (error) {
      toastContext.showCreateFailureResultDialog(type ? type.charAt(0).toUpperCase() + type.slice(1) : "", error)
    }
  };

  const updateApplication = async () => {
    return await OctopusActions.updateOctopusApplication(octopusApplicationDataDto, type, getAccessToken, appID);
  };

  const deleteApplication = async () => {
    try {
      await OctopusActions.deleteOctopusApplication(toolData._id, type, getAccessToken, appID, octopusApplicationDataDto);
      toastContext.showDeleteSuccessResultDialog(type && type.length > 2 ? type.charAt(0).toUpperCase() + type.slice(1) : "")
      handleClose();
    } catch (error) {
      toastContext.showDeleteFailureResultDialog(type && type.length > 2 ? type.charAt(0).toUpperCase() + type.slice(1) : "", error)
    }
  };

  const updateApplicationCaller= async () => {
    setShowEditModal(true);
  }

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
              <DtoTextInput
                setDataObject={setOctopusApplicationDataDto}
                dataObject={octopusApplicationDataDto}
                fieldName={"name"}
                disabled={appID && !octopusApplicationDataDto.getData("id") ? true : false}
              />
            </Col>
            <Col lg={12}>
              <DtoTextInput
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
              <DtoTextInput
                setDataObject={setOctopusApplicationDataDto}
                dataObject={octopusApplicationDataDto}
                fieldName={"name"}
                disabled={appID && !octopusApplicationDataDto.getData("id") ? true : false}
              />
            </Col>
            <Col lg={12}>
              <DtoTextInput
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
              <DtoTextInput
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
              <DtoTextInput
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
      <EditModal
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
