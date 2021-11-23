import React, {useContext, useEffect, useState, useRef} from "react";
import PropTypes from "prop-types";
import {AuthContext} from "contexts/AuthContext";
import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import JFrogMavenPackageTypeInput from "components/common/list_of_values_input/tools/jfrog/package_type/JFrogMavenPackageTypeInput";
import axios from "axios";
import jFrogToolRepositoriesActions
  from "components/inventory/tools/tool_details/tool_jobs/jfrog_artifactory/repositories/jFrogToolRepositories.actions";
import StandaloneDeleteButtonWithConfirmationModal
  from "components/common/buttons/delete/StandaloneDeleteButtonWithConfirmationModal";
import DetailPanelLoadingDialog from "components/common/loading/DetailPanelLoadingDialog";

function JFrogRepositoryEditorPanel(
  {
    toolId,
    jFrogRepositoryModel,
    setJFrogRepositoryModel,
    handleClose,
    jfrogRepositories,
  }) {
  const { getAccessToken } = useContext(AuthContext);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const isMounted = useRef(false);

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
  }, []);

  const createJFrogMavenRepository = async () => {
    const repoAlreadyExists = jfrogRepositories.some(repo => repo.key === jFrogRepositoryModel?.getData("key"));
    if (repoAlreadyExists) {
      throw new Error("Name Must Be Unique");
    }

    const response = await jFrogToolRepositoriesActions.createRepository(getAccessToken, cancelTokenSource, toolId, jFrogRepositoryModel);

    if (response?.status === 200) {
      handleClose();
    }

    return response;
  };

  const updateJFrogMavenRepository = async () => {
    const repo = jFrogRepositoryModel?.getPersistData();

    const postBody = {
      toolId: toolId,
      repositoryName: repo.key,
      description: repo.description,
    };

    const response = await jFrogToolRepositoriesActions.updateRepository(postBody, getAccessToken, cancelTokenSource);
    if (response?.status === 200) {
      handleClose();
    }

    return response;
  };

  const deleteJFrogMavenRepository = async () => {
    const repo = jFrogRepositoryModel?.getPersistData();
    let postBody = {
      toolId: toolId,
      repositoryName: repo.key
    };
    const response = await jFrogToolRepositoriesActions.deleteRepository(postBody, getAccessToken, cancelTokenSource);
    handleClose();
    return response;
  };

  const getExtraButtons = () => {
    if (jFrogRepositoryModel?.isNew() === false) {
      return (
        <StandaloneDeleteButtonWithConfirmationModal
          model={jFrogRepositoryModel}
          deleteDataFunction={deleteJFrogMavenRepository}
        />
      );
    }
  };

  if (jFrogRepositoryModel == null) {
    return (
      <DetailPanelLoadingDialog />
    );
  }

  return (
    <EditorPanelContainer
      recordDto={jFrogRepositoryModel}
      setRecordDto={setJFrogRepositoryModel}
      handleClose={handleClose}
      extraButtons={getExtraButtons()}
      updateRecord={updateJFrogMavenRepository}
      createRecord={createJFrogMavenRepository}
      lenient={true}
      disable={jFrogRepositoryModel?.checkCurrentValidity() !== true}
    >
      <div className="text-muted pt-1 pb-3">
        Enter the required configuration information below. These settings will be used for Repository Creation.
      </div>
      <Row>
        <Col lg={12}>
          <TextInputBase
            dataObject={jFrogRepositoryModel}
            setDataObject={setJFrogRepositoryModel}
            fieldName={"key"}
            disabled={jFrogRepositoryModel?.isNew() !== true}
          />
        </Col>
        <Col lg={12}>
          <TextInputBase
            dataObject={jFrogRepositoryModel}
            setDataObject={setJFrogRepositoryModel}
            fieldName={"description"}
          />
        </Col>
        <Col lg={12}>
          <JFrogMavenPackageTypeInput
            model={jFrogRepositoryModel}
            setModel={setJFrogRepositoryModel}
            fieldName={"packageType"}
            disabled={jFrogRepositoryModel?.isNew() !== true}
          />
        </Col>
      </Row>
    </EditorPanelContainer>
  );
}

JFrogRepositoryEditorPanel.propTypes = {
  toolId: PropTypes.string,
  jFrogRepositoryModel: PropTypes.object,
  setJFrogRepositoryModel: PropTypes.func,
  handleClose: PropTypes.func,
  jfrogRepositories: PropTypes.array,
};

export default JFrogRepositoryEditorPanel;
