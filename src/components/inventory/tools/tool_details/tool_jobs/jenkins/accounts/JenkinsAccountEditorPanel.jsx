import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import JenkinsAccountServiceSelectInput from "./inputs/JenkinsAccountServiceSelectInput";
import JenkinsAccountToolSelectInput from "./inputs/JenkinsAccountToolSelectInput";
import jenkinsAccountActions
  from "components/inventory/tools/tool_details/tool_jobs/jenkins/accounts/jenkinsToolAccounts.actions";
import StandaloneDeleteButtonWithConfirmationModal
  from "components/common/buttons/delete/StandaloneDeleteButtonWithConfirmationModal";
import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";
import axios from "axios";
import EditWarningModalToolRegistry from "components/common/modal/EditWarningModalToolRegistry";
import {AuthContext} from "contexts/AuthContext";
import LoadingDialog from "components/common/status_notifications/loading";
import TextInputBase from "components/common/inputs/text/TextInputBase";

function JenkinsAccountEditorPanel(
  {
    toolId,
    jenkinsAccountData,
    setJenkinsAccountData,
    handleClose,
  }) {
  const {getAccessToken} = useContext(AuthContext);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [toolId]);

  const createJenkinsAccount = async () => {
    const response = await jenkinsAccountActions.createJenkinsAccountV2(getAccessToken, cancelTokenSource, toolId, jenkinsAccountData);
    handleClose();
    return response;
  };

  const deleteJenkinsAccount = async () => {
    const response = await jenkinsAccountActions.deleteJenkinsAccountV2(getAccessToken, cancelTokenSource, toolId, jenkinsAccountData);
    handleClose();
    return response;
  };

  const getDeleteButton = () => {
    if (jenkinsAccountData?.isNew() === false) {
      return (
        <StandaloneDeleteButtonWithConfirmationModal
          model={jenkinsAccountData}
          deleteDataFunction={deleteJenkinsAccount}
          handleCloseFunction={handleClose}
        />
      );
    }
  };

  if (jenkinsAccountData == null) {
    return <LoadingDialog size="sm"/>;
  }

  return (
    <EditorPanelContainer
      handleClose={handleClose}
      recordDto={jenkinsAccountData}
      createRecord={createJenkinsAccount}
      updateRecord={() => setShowEditModal(true)}
      lenient={true}
      disable={jenkinsAccountData?.isNew() !== true}
      setRecordDto={setJenkinsAccountData}
      extraButtons={getDeleteButton()}
    >
      <Row>
        <Col lg={12}>
          <JenkinsAccountServiceSelectInput
            dataObject={jenkinsAccountData}
            setDataObject={setJenkinsAccountData}
            disabled={
              (jenkinsAccountData?.isNew() === false && !jenkinsAccountData.getData("credentialsId")) ||
              (jenkinsAccountData?.isNew() === true && jenkinsAccountData.getData("toolId"))
            }
          />
        </Col>
        <Col lg={12}>
          <JenkinsAccountToolSelectInput
            model={jenkinsAccountData}
            setModel={setJenkinsAccountData}
            disabled={
              (jenkinsAccountData?.isNew() === false && !jenkinsAccountData.getData("credentialsId")) ||
              (jenkinsAccountData?.isNew() === true && jenkinsAccountData.getData("toolId"))
            }
          />
        </Col>
        <Col lg={12}>
          <TextInputBase
            fieldName={"credentialsId"}
            dataObject={jenkinsAccountData}
            setDataObject={setJenkinsAccountData}
            disabled={jenkinsAccountData?.isNew() === false}
          />
        </Col>
        <Col lg={12}>
          <TextInputBase
            fieldName={"credentialsDescription"}
            dataObject={jenkinsAccountData}
            setDataObject={setJenkinsAccountData}
            disabled={jenkinsAccountData?.isNew() === false}
          />
        </Col>
      </Row>
      <EditWarningModalToolRegistry
        showModal={showEditModal}
        setShowModal={setShowEditModal}
        dataObject={jenkinsAccountData}
        handleEdit={createJenkinsAccount}
        handleClose={handleClose}
      />
    </EditorPanelContainer>
  );
}

JenkinsAccountEditorPanel.propTypes = {
  toolId: PropTypes.string,
  jenkinsAccountData: PropTypes.object,
  setJenkinsAccountData: PropTypes.func,
  handleClose: PropTypes.func,
  credentialId: PropTypes.string,
};

export default JenkinsAccountEditorPanel;
