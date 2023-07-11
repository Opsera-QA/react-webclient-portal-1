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
import JFrogRepositoryKeyTextInput
from "components/inventory/tools/tool_details/tool_jobs/jfrog_artifactory/repositories/details/inputs/JFrogRepositoryKeyTextInput";

function JFrogRepositoryEditorPanel(
  {
    toolId,
    jFrogRepositoryModel,
    setJFrogRepositoryModel,
    handleClose,
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
    return await jFrogToolRepositoriesActions.createRepository(getAccessToken, cancelTokenSource, toolId, jFrogRepositoryModel);
  };

  const updateJFrogMavenRepository = async () => {
    return await jFrogToolRepositoriesActions.updateRepository(getAccessToken, cancelTokenSource, toolId, jFrogRepositoryModel);
  };

  const deleteJFrogMavenRepository = async () => {
    return await jFrogToolRepositoriesActions.deleteRepository(getAccessToken, cancelTokenSource, toolId, jFrogRepositoryModel);
  };

  const getExtraButtons = () => {
    if (jFrogRepositoryModel?.isNew() === false) {
      return (
        <StandaloneDeleteButtonWithConfirmationModal
          model={jFrogRepositoryModel}
          deleteDataFunction={deleteJFrogMavenRepository}
          handleCloseFunction={handleClose}
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
          <JFrogRepositoryKeyTextInput
            model={jFrogRepositoryModel}
            setModel={setJFrogRepositoryModel}
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
};

export default JFrogRepositoryEditorPanel;
