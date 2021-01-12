import React, { useEffect, useContext, useState } from "react";
import { Col, Button } from "react-bootstrap";
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
import LoadingDialog from "components/common/status_notifications/loading";
import DeleteModal from "components/common/modal/DeleteModal";
import SaveButtonBase from "components/common/buttons/saving/SaveButtonBase";

function OctopusApplicationEditorPanel({ octopusApplicationData, toolData, appID, handleClose, type }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [octopusApplicationDataDto, setOctopusApplicationDataDto] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [spacesSearching, setIsSpacesSearching] = useState(false);
  const [spaces, setSpaces] = useState([]);
  const [loadingOctopusData, setLoadingOctopusData] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [environmentsSearching, setIsEnvironmentsSearching] = useState(false);
  const [environments, setEnvironments] = useState([]);
  const [awsList, setAwsList] = useState([]);
  const [isAwsSearching, setIsAwsSearching] = useState(false);
  const [clustersSearching, setIsClustersSearching] = useState(false);
  const [clusters, setClusters] = useState([]);
  const [projectsSearching, setIsProjectsSearching] = useState(false);
  const [projects, setProjects] = useState([]);
  const [accountsSearching, setIsAccountsSearching] = useState(false);
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      setLoadingOctopusData(true);
      await fetchOnloadDetails()
    } catch (error) {
      toastContext.showLoadingErrorDialog(error);
    } finally {
      setLoadingOctopusData(false);
      setIsLoading(false);
    }
  };

  const fetchOnloadDetails = async () => {
    if (!appID) {
      let newDataObject = octopusApplicationData;
      newDataObject.setData("toolId", toolData._id);
      setOctopusApplicationDataDto({ ...newDataObject });
      if (toolData && toolData._id) {
        await searchSpaces(toolData._id);
      }
      if ((type && type === "account") || type === "target") {
        fetchAWSDetails();
      }
    } else {
      setOctopusApplicationDataDto(octopusApplicationData)
      await searchSpaces(toolData._id);
      if (type === "account" || type === "target") {
        fetchAWSDetails();
        searchEnvironments(toolData._id, octopusApplicationData.getData("spaceId"))
        if (type === "target") {
          searchAccounts(toolData._id, octopusApplicationData.getData("spaceId"))
          searchClusters(toolData._id, octopusApplicationData.getData("awsToolConfigId"))
        }
      }
    }
  }

  const createApplication = async () => {
    return await OctopusActions.createOctopusApplication(octopusApplicationDataDto, type, getAccessToken);
  };

  const updateApplication = async () => {
    return await OctopusActions.updateOctopusApplication(octopusApplicationDataDto, type, getAccessToken, appID);
  };

  const deleteApplication = async () => {
    await OctopusActions.deleteOctopusApplication(toolData._id, type, getAccessToken, appID);
    handleClose();
  };

  const fetchAWSDetails = async () => {
    setIsAwsSearching(true);

    let results = await PipelineActions.getToolsList("aws_account", getAccessToken);

    const filteredList = results.filter((el) => el.configuration !== undefined);
    if (filteredList) {
      setAwsList(filteredList);
    }
    setIsAwsSearching(false);
  };

  const handleDTOChangeEnv = (fieldName, value) => {
    if (fieldName === "spaceName") {
      let newDataObject = octopusApplicationDataDto;
      newDataObject.setData("spaceName", value.name);
      newDataObject.setData("spaceId", value.id);
      setOctopusApplicationDataDto({ ...newDataObject });
      if (type === "account" || type === "target") {
        searchEnvironments(toolData._id, value.id);
      }
      if (type === "target") {
        searchAccounts(toolData._id, value.id);
      }
      return;
    }
    if (fieldName === "awsToolConfigId") {
      let newDataObject = octopusApplicationDataDto;
      newDataObject.setData("awsToolConfigId", value.id);
      setOctopusApplicationDataDto({ ...newDataObject });
      if (type === "target") {
        searchClusters(toolData._id, value.id);
      }
      return;
    }
    if (fieldName === "clusterName") {
      let newDataObject = octopusApplicationDataDto;
      newDataObject.setData("clusterName", value);
      setOctopusApplicationDataDto({ ...newDataObject });
      return;
    }
  };

  const errorCatch = async (setterFunc, error) => {
    setterFunc([{ value: "", name: "Select One", isDisabled: "yes" }]);
    console.error(error);
    toastContext.showServiceUnavailableDialog();
  };

  const credentialCatch = async (setterFunc, tool) => {
    setterFunc([{ value: "", name: "Select One", isDisabled: "yes" }]);
    let errorMessage = `Error fetching Octopus ${tool}!  Please validate configured ${tool}.`;
    toastContext.showErrorDialog(errorMessage);
  };

  const nullDataCatch = async (setterFunc, tool) => {
    setterFunc([{ value: "", name: "Select One", isDisabled: "yes" }]);
    let errorMessage = `No Octopus ${tool} Found!  Please validate credentials and configured  ${tool}.`;
    toastContext.showErrorDialog(errorMessage);
  };

  const searchSpaces = async (id) => {
    setIsSpacesSearching(true);
    try {
      const res = await OctopusStepActions.getSpaces(id, getAccessToken);
      if (res.data) {
        let arrOfObj = res.data.data ? res.data.data : [];
        setSpaces(arrOfObj);
        if (arrOfObj.length === 0) {
          await nullDataCatch(setSpaces, "Spaces");
        }
      } else {
        await credentialCatch(setSpaces, "Spaces");
      }
    } catch (error) {
      await errorCatch(setSpaces, error);
    } finally {
      setIsSpacesSearching(false);
    }
  };

  const searchEnvironments = async (id, spaceID) => {
    setIsEnvironmentsSearching(true);
    try {
      const res = await OctopusStepActions.getEnvironments(id, spaceID, getAccessToken);
      if (res.data) {
        let arrOfObj = res.data.data ? res.data.data : [];
        setEnvironments(arrOfObj);
        if (arrOfObj.length === 0) {
          await nullDataCatch(setEnvironments, "Environments");
        }
      } else {
        await credentialCatch(setEnvironments, "Environments");
      }
    } catch (error) {
      await errorCatch(setEnvironments, error);
    } finally {
      setIsEnvironmentsSearching(false);
    }
  };

  const searchClusters = async (id, awsToolConfigId) => {
    setIsClustersSearching(true);
    try {
      const res = await OctopusStepActions.getClusters(id, awsToolConfigId, getAccessToken);
      if (res.data) {
        let arrOfObj = res.data.data ? res.data.data : [];
        setClusters(arrOfObj);
        if (arrOfObj.length === 0) {
          await nullDataCatch(setClusters, "Clusters");
        }
      } else {
        await credentialCatch(setClusters, "Clusters");
      }
    } catch (error) {
      await errorCatch(setClusters, error);
    } finally {
      setIsClustersSearching(false);
    }
  };

  const searchAccounts = async (id, spaceID) => {
    setIsAccountsSearching(true);
    try {
      const res = await OctopusStepActions.getAccounts(id, spaceID, getAccessToken);
      if (res.data) {
        let arrOfObj = res.data.data ? res.data.data : [];
        setAccounts(arrOfObj);
        if (arrOfObj.length === 0) {
          await nullDataCatch(setAccounts, "Accounts");
        }
      } else {
        await credentialCatch(setAccounts, "Accounts");
      }
    } catch (error) {
      await errorCatch(setAccounts, error);
    } finally {
      setIsAccountsSearching(false);
    }
  };

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
              <DtoSelectInput
                setDataFunction={handleDTOChangeEnv}
                setDataObject={setOctopusApplicationDataDto}
                textField={"name"}
                valueField={"id"}
                dataObject={octopusApplicationDataDto}
                filter={"contains"}
                selectOptions={spaces ? spaces : []}
                fieldName={"spaceName"}
                busy={spacesSearching}
                disabled={(octopusApplicationDataDto && spaces.length === 0) || appID ? true : false}
              />
            </Col>
            <div className="float-right ml-2">
              <DtoToggleInput
                setDataObject={setOctopusApplicationDataDto}
                fieldName={"active"}
                dataObject={octopusApplicationDataDto}
              />
            </div>
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
              <DtoSelectInput
                setDataObject={setOctopusApplicationDataDto}
                textField={"name"}
                valueField={"id"}
                dataObject={octopusApplicationDataDto}
                filter={"contains"}
                selectOptions={awsList ? awsList : []}
                fieldName={"awsToolConfigId"}
                busy={isAwsSearching}
                disabled={awsList.length === 0 || isAwsSearching || appID ? true : false}
              />
            </Col>
            <Col lg={12}>
              <DtoSelectInput
                setDataFunction={handleDTOChangeEnv}
                setDataObject={setOctopusApplicationDataDto}
                textField={"name"}
                valueField={"id"}
                dataObject={octopusApplicationDataDto}
                filter={"contains"}
                selectOptions={spaces ? spaces : []}
                fieldName={"spaceName"}
                busy={spacesSearching}
                disabled={(octopusApplicationDataDto && spaces.length === 0) || appID ? true : false}
              />
            </Col>
            <Col lg={12}>
              <DtoMultiselectInput
                setDataObject={setOctopusApplicationDataDto}
                textField={"name"}
                valueField={"id"}
                dataObject={octopusApplicationDataDto}
                filter={"contains"}
                selectOptions={environments ? environments : []}
                fieldName={"environmentIds"}
                busy={environmentsSearching}
                disabled={
                  (octopusApplicationDataDto && environments.length === 0) ||
                  octopusApplicationDataDto.getData("spaceId").length === 0 ||
                  appID
                    ? true
                    : false
                }
              />
            </Col>
            <div className="float-right ml-2">
              <DtoToggleInput
                setDataFunction={handleDTOChangeEnv}
                setDataObject={setOctopusApplicationDataDto}
                fieldName={"active"}
                dataObject={octopusApplicationDataDto}
              />
            </div>
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
              <DtoSelectInput
                setDataFunction={handleDTOChangeEnv}
                setDataObject={setOctopusApplicationDataDto}
                textField={"name"}
                valueField={"id"}
                dataObject={octopusApplicationDataDto}
                filter={"contains"}
                selectOptions={spaces ? spaces : []}
                fieldName={"spaceName"}
                busy={spacesSearching}
                disabled={(octopusApplicationDataDto && spaces.length === 0) || appID ? true : false}
              />
            </Col>
            <Col lg={12}>
              <DtoSelectInput
                setDataObject={setOctopusApplicationDataDto}
                textField={"name"}
                valueField={"id"}
                dataObject={octopusApplicationDataDto}
                filter={"contains"}
                selectOptions={accounts ? accounts : []}
                fieldName={"accountId"}
                busy={accountsSearching}
                disabled={
                  accounts.length === 0 ||
                  accountsSearching ||
                  (octopusApplicationDataDto && octopusApplicationDataDto.getData("spaceId").length === 0) ||
                  appID
                    ? true
                    : false
                }
              />
            </Col>
            <Col lg={12}>
              <DtoSelectInput
                setDataFunction={handleDTOChangeEnv}
                setDataObject={setOctopusApplicationDataDto}
                textField={"name"}
                valueField={"id"}
                dataObject={octopusApplicationDataDto}
                filter={"contains"}
                selectOptions={awsList ? awsList : []}
                fieldName={"awsToolConfigId"}
                busy={isAwsSearching}
                disabled={awsList.length === 0 || isAwsSearching || appID ? true : false}
              />
            </Col>
            <Col lg={12}>
              <DtoMultiselectInput
                setDataObject={setOctopusApplicationDataDto}
                textField={"name"}
                valueField={"id"}
                dataObject={octopusApplicationDataDto}
                filter={"contains"}
                selectOptions={environments ? environments : []}
                fieldName={"environmentIds"}
                busy={environmentsSearching}
                disabled={
                  (octopusApplicationDataDto && environments.length === 0) ||
                  octopusApplicationDataDto.getData("spaceId").length === 0 ||
                  appID
                    ? true
                    : false
                }
              />
            </Col>
            <Col lg={12}>
              <DtoSelectInput
                setDataFunction={handleDTOChangeEnv}
                setDataObject={setOctopusApplicationDataDto}
                dataObject={octopusApplicationDataDto}
                filter={"contains"}
                selectOptions={clusters ? clusters : []}
                fieldName={"clusterName"}
                busy={clustersSearching}
                disabled={(octopusApplicationDataDto && clusters.length === 0) || appID ? true : false}
              />
            </Col>
            <div className="float-right ml-2">
              <DtoToggleInput
                setDataFunction={handleDTOChangeEnv}
                setDataObject={setOctopusApplicationDataDto}
                fieldName={"active"}
                dataObject={octopusApplicationDataDto}
              />
            </div>
          </Row>
        )}
        <Row>
          {appID && (
            <div className="mr-auto mt-3 px-3">
              <Button variant="outline-primary" size="sm" onClick={() => setShowDeleteModal(true)}>
                <FontAwesomeIcon icon={faTrash} className="danger-red" /> Delete{" "}
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </Button>
              <br />
            </div>
          )}
          <div className="ml-auto mt-3 px-3">
            <SaveButtonBase
              updateRecord={updateApplication}
              setRecordDto={setOctopusApplicationDataDto}
              setData={setOctopusApplicationDataDto}
              createRecord={createApplication}
              recordDto={octopusApplicationDataDto}
              handleClose={handleClose}
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
