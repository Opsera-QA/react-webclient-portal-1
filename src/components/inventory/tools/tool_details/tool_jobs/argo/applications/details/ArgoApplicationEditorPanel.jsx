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
import { DialogToastContext } from "../../../../../../../../contexts/DialogToastContext";
import argoActions from "../../argo-actions";
import Modal from "components/common/modal/modal";
import SaveButton2 from "components/common/buttons/saving/SaveButton2";

function ArgoApplicationEditorPanel({ argoApplicationData, toolData, appID, handleClose }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [argoApplicationDataDto, setArgoApplicationDataDto] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [clusters, setClusters] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loadingArgoData, setLoadingArgoData] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      setArgoApplicationDataDto(argoApplicationData);
      setLoadingArgoData(true);
      let clusters = await argoActions.getArgoClusters(toolData._id, getAccessToken);
      let projects = await argoActions.getArgoProjects(toolData._id, getAccessToken);
      if (clusters.status === 200 && clusters.data && clusters.data.data && clusters.data.data.length > 0) {
        setClusters(clusters.data.data);
      }
      if (projects.status === 200 && projects.data && projects.data.data && projects.data.data.length > 0) {
        setProjects(projects.data.data);
      }
    } catch (error) {
      toastContext.showLoadingErrorDialog(error);
    } finally {
      setLoadingArgoData(false);
      setIsLoading(false);
    }
  };

  const createApplication = async () => {
    return await argoActions.createArgoApplication(argoApplicationDataDto, getAccessToken);
  };

  const updateApplication = async () => {
    return await argoActions.updateArgoApplication(argoApplicationDataDto, getAccessToken, appID);
  };

  const deleteApplication = async () => {
    await argoActions.deleteArgoApplication(toolData._id, getAccessToken, appID);
    handleClose();
  };

  const handleProjectChange = (fieldName, value) => {
    let newDataObject = argoApplicationDataDto;
    newDataObject.setData("projectName", value.name);
    newDataObject.setData("toolId", toolData._id);
    newDataObject.setData("namespace", value.namespace);
    setArgoApplicationDataDto({ ...newDataObject });
  };

  if (isLoading || argoApplicationDataDto == null) {
    return <Loading size="sm" />;
  }

  return (
    <>
      <div className="scroll-y full-height">
        <Row>
          <Col lg={12}>
            <DtoTextInput
              setDataObject={setArgoApplicationDataDto}
              dataObject={argoApplicationDataDto}
              fieldName={"applicationName"}
            />
          </Col>
          <Col lg={12}>
            <DtoSelectInput
              setDataFunction={handleProjectChange}
              setDataObject={setArgoApplicationDataDto}
              textField={"name"}
              valueField={"name"}
              busy={!setLoadingArgoData}
              dataObject={argoApplicationDataDto}
              filter={"contains"}
              selectOptions={projects ? projects : []}
              fieldName={"projectName"}
            />
          </Col>
          <Col lg={12}>
            <DtoSelectInput
              setDataObject={setArgoApplicationDataDto}
              textField={"server"}
              valueField={"server"}
              busy={!setLoadingArgoData}
              dataObject={argoApplicationDataDto}
              filter={"contains"}
              selectOptions={clusters ? clusters : []}
              fieldName={"cluster"}
            />
          </Col>
          <Col lg={12}>
            <DtoTextInput
              dataObject={argoApplicationDataDto}
              fieldName={"gitPath"}
              setDataObject={setArgoApplicationDataDto}
            />
          </Col>
          <Col lg={12}>
            <DtoTextInput
              dataObject={argoApplicationDataDto}
              fieldName={"gitUrl"}
              setDataObject={setArgoApplicationDataDto}
            />
          </Col>
          <Col lg={12}>
            <DtoTextInput
              dataObject={argoApplicationDataDto}
              fieldName={"branchName"}
              setDataObject={setArgoApplicationDataDto}
            />
          </Col>
          <Col lg={12}>
            <DtoToggleInput
              setDataObject={setArgoApplicationDataDto}
              fieldName={"active"}
              dataObject={argoApplicationDataDto}
            />
          </Col>
        </Row>
        <Row>
          {appID && (
            <div className="mr-auto mt-3 px-3">
              <Button variant="outline-primary" size="sm" onClick={() => setShowDeleteModal(true)}>
                <FontAwesomeIcon icon={faTrash} className="danger-red" /> Delete Application
              </Button>
              <br />
            </div>
          )}
          <div className="ml-auto mt-3 px-3">
            <SaveButton2
              updateRecord={updateApplication}
              setRecordDto={setArgoApplicationDataDto}
              setData={setArgoApplicationDataDto}
              createRecord={createApplication}
              recordDto={argoApplicationDataDto}
              handleClose={handleClose}
            />
          </div>
        </Row>
      </div>
      {showDeleteModal ? (
        <Modal
          header="Confirm Application Delete"
          message="Warning! Application cannot be recovered once this Application is deleted. Do you still want to proceed?"
          button="Confirm"
          handleCancelModal={() => setShowDeleteModal(false)}
          handleConfirmModal={() => deleteApplication()}
        />
      ) : null}
    </>
  );
}

ArgoApplicationEditorPanel.propTypes = {
  argoApplicationData: PropTypes.object,
  toolData: PropTypes.object,
  loadData: PropTypes.func,
  appID: PropTypes.string,
  handleClose: PropTypes.func
};

export default ArgoApplicationEditorPanel;
