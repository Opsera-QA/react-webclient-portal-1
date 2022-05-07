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
import {AuthContext} from "contexts/AuthContext";
import LoadingDialog from "components/common/status_notifications/loading";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import {hasStringValue} from "components/common/helpers/string-helpers";
import {faExclamationTriangle} from "@fortawesome/pro-light-svg-icons";
import IconBase from "components/common/icons/IconBase";
import JenkinsAccountRepositorySelectInput from "./inputs/JenkinsAccountRepositorySelectInput";

function JenkinsAccountEditorPanel(
  {
    toolId,
    jenkinsAccountData,
    setJenkinsAccountData,
    closePanelFunction,
  }) {
  const {getAccessToken} = useContext(AuthContext);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

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
    closePanelFunction();
    return response;
  };

  const deleteJenkinsAccount = async () => {
    const response = await jenkinsAccountActions.deleteJenkinsAccountV2(getAccessToken, cancelTokenSource, toolId, jenkinsAccountData);
    closePanelFunction();
    return response;
  };

  const getDeleteButton = () => {
    if (jenkinsAccountData?.isNew() === false) {
      return (
        <StandaloneDeleteButtonWithConfirmationModal
          model={jenkinsAccountData}
          deleteDataFunction={deleteJenkinsAccount}
          handleCloseFunction={closePanelFunction}
        />
      );
    }
  };

  const getEditWarning = () => {
    if (jenkinsAccountData?.isNew() === false) {
      return (
        <Row>
          <Col sm={1}>
            <div className="mt-2">
              <IconBase icon={faExclamationTriangle} size={"lg"}/>
            </div>
          </Col>
          <Col sm={11}>
            <div>Editing this Account Credential does not change the configuration in any Pipelines.</div>
            <div>Visit the <strong>Usage</strong> tab to view a list of Pipelines that require attention.</div>
          </Col>
        </Row>
      );
    }
  };

  const getDynamicFields = () => {
    if(jenkinsAccountData?.getData("service") === "github-deploykey" && jenkinsAccountData?.getData("repositories")) {
      return (
          <Col lg={12}>
            sdfdv
            <JenkinsAccountRepositorySelectInput
                model={jenkinsAccountData}
                setModel={setJenkinsAccountData}
                repos={jenkinsAccountData?.getData("repositories")}
                disabled={jenkinsAccountData?.isNew() !== true && hasStringValue(jenkinsAccountData?.getData("credentialsId")) === false}
            />
          </Col>
      );
    }
  };

  if (jenkinsAccountData == null) {
    return <LoadingDialog size="sm"/>;
  }

  return (
    <EditorPanelContainer
      handleClose={closePanelFunction}
      recordDto={jenkinsAccountData}
      createRecord={createJenkinsAccount}
      updateRecord={createJenkinsAccount}
      lenient={true}
      setRecordDto={setJenkinsAccountData}
      extraButtons={getDeleteButton()}
    >
      <Row>
        <Col lg={12}>
          <JenkinsAccountServiceSelectInput
            dataObject={jenkinsAccountData}
            setDataObject={setJenkinsAccountData}
            disabled={jenkinsAccountData?.isNew() !== true && hasStringValue(jenkinsAccountData?.getData("credentialsId")) === false}
          />
        </Col>
        <Col lg={12}>
          <JenkinsAccountToolSelectInput
            model={jenkinsAccountData}
            setModel={setJenkinsAccountData}
            disabled={jenkinsAccountData?.isNew() !== true && hasStringValue(jenkinsAccountData?.getData("credentialsId")) === false}
          />
        </Col>
        {getDynamicFields()}
        <Col lg={12}>
          <TextInputBase
            fieldName={"credentialsId"}
            dataObject={jenkinsAccountData}
            setDataObject={setJenkinsAccountData}
            disabled={jenkinsAccountData?.isNew() !== true}
          />
        </Col>
        <Col lg={12}>
          <TextInputBase
            fieldName={"credentialsDescription"}
            dataObject={jenkinsAccountData}
            setDataObject={setJenkinsAccountData}
            disabled={jenkinsAccountData?.isNew() !== true}
          />
        </Col>
      </Row>
      <Row className={"my-2"}>
        <Col sm={12} md={8} lg={6} xl={6} className={"mx-auto"}>
          {getEditWarning()}
        </Col>
      </Row>
    </EditorPanelContainer>
  );
}

JenkinsAccountEditorPanel.propTypes = {
  toolId: PropTypes.string,
  jenkinsAccountData: PropTypes.object,
  setJenkinsAccountData: PropTypes.func,
  closePanelFunction: PropTypes.func,
  credentialId: PropTypes.string,
};

export default JenkinsAccountEditorPanel;
