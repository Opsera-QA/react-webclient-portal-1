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
import DtoToggleInput from "../../../../../../../common/input/dto_input/dto-toggle-input";
import DtoSelectInput from "../../../../../../../common/input/dto_input/dto-select-input";
import DtoMultiselectInput from "../../../../../../../common/input/dto_input/dto-multiselect-input";
import { DialogToastContext } from "../../../../../../../../contexts/DialogToastContext";
import OctopusStepActions from "../../../../../../../workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/octopus/octopus-step-actions";
import PipelineActions from "../../../../../../../workflow/pipeline-actions";
import OctopusActions from "../../octopus-actions";
import DeleteModal from "components/common/modal/DeleteModal";
import SaveButtonBase from "components/common/buttons/saving/SaveButtonBase";
import CloudProviderSelectInput from "./input/CloudProviderSelectInput";
import AzureToolSelectInput from "./input/AzureToolSelectInput";
import CommunicationStyleSelectInput from "./input/CommunicationStyleSelectInput";
import WebAppNameSelectInput from "./input/WebAppNameSelectInput";
import ListOfFeedsSelectInput from "./input/ListofFeedsSelectInput";
import SpaceNameSelectInput from "./input/SpaceNameSelectInput";
import EnvironmentNameSelectInput from "./input/EnvironmentSelectInput";
import AccountSelectInput from "./input/AccountSelectInput";
import AWSToolSelectInput from "./input/AWSToolSelectInput";
import ClusterSelectInput from "./input/ClusterSelectInput";
import FeedTypeSelectInput from "./input/FeedTypeSelectInput";

function OctopusApplicationEditorPanel({ octopusApplicationData, toolData, appID, handleClose, type }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [octopusApplicationDataDto, setOctopusApplicationDataDto] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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
    return await OctopusActions.createOctopusApplication(octopusApplicationDataDto, type, getAccessToken);
  };

  const updateApplication = async () => {
    return await OctopusActions.updateOctopusApplication(octopusApplicationDataDto, type, getAccessToken, appID);
  };

  // DISABLING DELETE AS MICROSERVICE FUNCTIONALITY IS NOT READY YET
  // const deleteApplication = async () => {
  //   await OctopusActions.deleteOctopusApplication(toolData._id, type, getAccessToken, appID);
  //   handleClose();
  // };

  if (isLoading || octopusApplicationDataDto === null || octopusApplicationDataDto === undefined) {
    return <Loading size="sm" />;
  }

  return (
    <>
      <div className="scroll-y full-height">
        {octopusApplicationDataDto && type && type === "environment" && !isLoading && (
          <Row>
            <Col lg={12}>
              <DtoTextInput
                setDataObject={setOctopusApplicationDataDto}
                dataObject={octopusApplicationDataDto}
                fieldName={"name"}
                disabled={appID ? true : false}
              />
            </Col>
            <Col lg={12}>
              <DtoTextInput
                setDataObject={setOctopusApplicationDataDto}
                dataObject={octopusApplicationDataDto}
                fieldName={"description"}
                disabled={appID ? true : false}
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
            <Col lg={12} className={"ml-1"}>
              <DtoToggleInput
                setDataObject={setOctopusApplicationDataDto}
                fieldName={"active"}
                dataObject={octopusApplicationDataDto}
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
                disabled={appID ? true : false}
              />
            </Col>
            <Col lg={12}>
              <DtoTextInput
                setDataObject={setOctopusApplicationDataDto}
                dataObject={octopusApplicationDataDto}
                fieldName={"description"}
                disabled={appID ? true : false}
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
            {octopusApplicationDataDto &&
            octopusApplicationDataDto.getData("cloudType") === "AzureServicePrincipal" && (
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
            </Col>)
            }
            {octopusApplicationDataDto &&
            octopusApplicationDataDto.getData("cloudType") === "AmazonWebServicesAccount" && (
              <Col lg={12}>
                <AWSToolSelectInput
                  fieldName={"awsToolConfigId"}
                  dataObject={octopusApplicationDataDto}
                  setDataObject={setOctopusApplicationDataDto}
                  disabled={
                    (octopusApplicationDataDto && octopusApplicationDataDto.getData("cloudType").length === 0) || appID
                      ? true
                      : false
                  }
                  tool_prop={octopusApplicationDataDto ? octopusApplicationDataDto.getData("cloudType") : ""}
                />
              </Col>)
            }
            <Col lg={12}>
              <EnvironmentNameSelectInput
                fieldName={"environmentIds"}
                dataObject={octopusApplicationDataDto}
                setDataObject={setOctopusApplicationDataDto}
                disabled={
                  (octopusApplicationDataDto && octopusApplicationDataDto.getData("spaceId").length === 0) || appID
                    ? true
                    : false
                }
                tool_prop={octopusApplicationDataDto ? octopusApplicationDataDto.getData("spaceId") : ""}
              />
            </Col>
            <Col lg={12} className={"ml-1"}>
              <DtoToggleInput
                setDataObject={setOctopusApplicationDataDto}
                fieldName={"active"}
                dataObject={octopusApplicationDataDto}
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
                disabled={appID ? true : false}
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
                  (octopusApplicationDataDto && octopusApplicationDataDto.getData("spaceName").length === 0) || appID
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
                      appID
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
                  (octopusApplicationDataDto && octopusApplicationDataDto.getData("spaceId").length === 0) || appID
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
            <Col lg={12} className={"ml-1"}>
              <DtoToggleInput
                setDataObject={setOctopusApplicationDataDto}
                fieldName={"active"}
                dataObject={octopusApplicationDataDto}
              />
            </Col>
          </Row>
        )}
        {octopusApplicationDataDto && type && type === "feed" && !isLoading && (
          <Row>
            {!appID && (
              <Col lg={12}>
                <Card>
                  <Card.Body>
                    <Card.Subtitle className="text-muted">
                      External Feed support is currently only available for Azure Cloud Accounts. In order to configure
                      External Feeds for other cloud providers contact Opsera Support.
                    </Card.Subtitle>
                  </Card.Body>
                </Card>
              </Col>
            )}

            <Col lg={12}>
              <DtoTextInput
                setDataObject={setOctopusApplicationDataDto}
                dataObject={octopusApplicationDataDto}
                fieldName={"name"}
                disabled={appID ? true : false}
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
              <DtoTextInput
                setDataObject={setOctopusApplicationDataDto}
                dataObject={octopusApplicationDataDto}
                fieldName={"username"}
                disabled={appID ? true : false}
              />
            </Col>
            <Col lg={12}>
              <DtoTextInput
                setDataObject={setOctopusApplicationDataDto}
                dataObject={octopusApplicationDataDto}
                type={"password"}
                fieldName={"password"}
                disabled={appID ? true : false}
              />
            </Col>
            <Col lg={12}>
              <FeedTypeSelectInput
                fieldName={"feedType"}
                dataObject={octopusApplicationDataDto}
                setDataObject={setOctopusApplicationDataDto}
                disabled={
                  (octopusApplicationDataDto && octopusApplicationDataDto.getData("spaceId").length === 0) || appID
                    ? true
                    : false
                }
                tool_prop={octopusApplicationDataDto ? octopusApplicationDataDto.getData("spaceId") : ""}
              />
            </Col>
            <Col lg={12}>
              <DtoTextInput
                setDataObject={setOctopusApplicationDataDto}
                dataObject={octopusApplicationDataDto}
                fieldName={"feedUri"}
                disabled={appID ? true : false}
              />
            </Col>
            <Col lg={12} className={"ml-1"}>
                <DtoToggleInput
                  setDataObject={setOctopusApplicationDataDto}
                  fieldName={"active"}
                  dataObject={octopusApplicationDataDto}
                />
            </Col>
          </Row>
        )}
        <Row>
          {/*{appID && (*/}
          {/*  <div className="mr-auto mt-3 px-3">*/}
          {/*    <Button variant="outline-primary" size="sm" onClick={() => setShowDeleteModal(true)}>*/}
          {/*      <FontAwesomeIcon icon={faTrash} className="danger-red" /> Delete{" "}*/}
          {/*      {type.charAt(0).toUpperCase() + type.slice(1)}*/}
          {/*    </Button>*/}
          {/*    <br />*/}
          {/*  </div>*/}
          {/*)}*/}
          <div className="ml-auto mt-3 px-3">
            <SaveButtonBase
              updateRecord={appID ? updateApplication : createApplication}
              setRecordDto={setOctopusApplicationDataDto}
              setData={setOctopusApplicationDataDto}
              createRecord={createApplication}
              recordDto={octopusApplicationDataDto}
              handleClose={handleClose}
            />
          </div>
        </Row>
      </div>
      {/*<DeleteModal*/}
      {/*  showModal={showDeleteModal}*/}
      {/*  setShowModal={setShowDeleteModal}*/}
      {/*  dataObject={octopusApplicationDataDto}*/}
      {/*  handleDelete={deleteApplication}*/}
      {/*/>*/}
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
