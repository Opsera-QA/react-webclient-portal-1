import React, {useState, useContext, useEffect, useRef} from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import Row from "react-bootstrap/Row";
import axios from "axios";
import CloseEditorButton from "components/common/buttons/cancel/CloseEditorButton";
import ButtonBase from "components/common/buttons/ButtonBase";
import SourceRepositoryActions from "./step_configuration/repository/source-repository-actions";
import {DialogToastContext} from "contexts/DialogToastContext";
import useComponentStateReference from "hooks/useComponentStateReference";

function PipelineExportToGitButtonContainer({ pipeline, handleClose }) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken, getUserRecord } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const { isMounted, cancelTokenSource} = useComponentStateReference();
  const service = pipeline?.workflow?.source?.service;
  const gitToolId = pipeline?.workflow?.source?.accountId;

  const exportToGit = async () => {
    try {
      setIsLoading(true);
      await SourceRepositoryActions.exportToGitlab(getAccessToken, cancelTokenSource, pipeline._id, service, gitToolId);
      toastContext.showSuccessDialog(`Pipeline configuration has been commited to ${service}`);
      setIsLoading(false);
      handleClose();
    } catch (error) {
      toastContext.showErrorDialog(error, `Unable to export pipeline configuration to ${service}. Please check your repository configuration and try again.`);
      setIsLoading(false);
  }
  };
  
  return (
      <Row>
            <ButtonBase
              onClickFunction={exportToGit}
              buttonText={"Export to Git"}
              size={"md"}
              className={"ml-4 mr-2 mb-2"}
              isLoading={isLoading}
            />
          <CloseEditorButton
            closeEditorCallback={handleClose}
          />
      </Row>
  );
}

PipelineExportToGitButtonContainer.propTypes = {
  tagData: PropTypes.object,
  setTagData: PropTypes.func,
  handleClose: PropTypes.func,
  pipeline: PropTypes.object
};

export default PipelineExportToGitButtonContainer;


