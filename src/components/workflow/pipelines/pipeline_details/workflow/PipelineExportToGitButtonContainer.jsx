import React, {useState, useContext, useEffect, useRef} from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import Row from "react-bootstrap/Row";
import axios from "axios";
import CloseEditorButton from "components/common/buttons/cancel/CloseEditorButton";
import ButtonBase from "components/common/buttons/ButtonBase";
import SourceRepositoryActions from "./step_configuration/repository/source-repository-actions";
import {DialogToastContext} from "contexts/DialogToastContext";

function PipelineExportToGitButtonContainer({ pipeline, handleClose }) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken, getUserRecord } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async () => {
    if (isMounted?.current === true) {
      setIsLoading(true);
      const user = await getUserRecord();
      console.log(user);
      setIsLoading(false);
    }
  };

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
      toastContext.showErrorDialog(`Unable to export pipeline configuration to ${service}. Please check your repository configuration and try again. Error: ${error.mesage}`);
      handleClose();
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


