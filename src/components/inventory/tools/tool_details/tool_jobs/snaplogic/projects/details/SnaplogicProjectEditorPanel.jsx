import React, { useEffect, useContext, useState, useRef } from "react";
import { Col } from "react-bootstrap";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";
import { AuthContext } from "contexts/AuthContext";
import { DialogToastContext } from "contexts/DialogToastContext";
import LoadingDialog from "components/common/status_notifications/loading";
import axios from "axios";
import DeleteButtonWithInlineConfirmation from "components/common/buttons/delete/DeleteButtonWithInlineConfirmation";
import SnaplogicProjectSpaceSelectInput from "../../../../../../../workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/snaplogic/inputs/SnaplogicProjectSpaceSelectInput";
import SnaplogicPermissionsInputBase from "./inputs/snaplogicPermissionsInputBase";
import snaplogicToolActions from "../../snaplogic-tool-actions";

function SnaplogicProjectEditorPanel({
  pmdRuleData,
  toolData,
  projectId,
  handleClose,
}) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [pmdRuleModel, setPmdRuleModel] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }
    console.log(pmdRuleData);

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    if (pmdRuleData) {
      loadData();
    }

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [pmdRuleData]);

  const loadData = () => {
    try {
      setIsLoading(true);
      setPmdRuleModel(pmdRuleData);
    } catch (error) {
      toastContext.showLoadingErrorDialog(error);
    } finally {
      setIsLoading(false);
    }
  };

  const createQualityGate = async () => {
    return await snaplogicToolActions.createProject(
      getAccessToken,
      cancelTokenSource,
      toolData?._id,
      pmdRuleModel,
    );
  };

  const updateQualityGate = async () => {
    return await snaplogicToolActions.updateProject(
      getAccessToken,
      cancelTokenSource,
      toolData?._id,
      projectId,
      pmdRuleModel,
    );
  };

  const deleteQualityGate = async () => {
    const response = await snaplogicToolActions.deleteProject(
      getAccessToken,
      cancelTokenSource,
      toolData?._id,
      projectId,
    );
    handleClose();
    return response;
  };

  if (isLoading || pmdRuleModel == null) {
    return (
      <LoadingDialog
        size="sm"
        message={"Loading Data"}
      />
    );
  }

  return (
    <EditorPanelContainer
      recordDto={pmdRuleModel}
      createRecord={createQualityGate}
      updateRecord={updateQualityGate}
      setRecordDto={setPmdRuleModel}
      isLoading={isLoading}
      extraButtons={
        <DeleteButtonWithInlineConfirmation
          dataObject={pmdRuleModel}
          deleteRecord={deleteQualityGate}
        />
      }
      disable={pmdRuleModel?.isNew() !== true}
      handleClose={handleClose}
    >
      <div className="scroll-y hide-x-overflow">
        <Row>
          <Col lg={12}>
            <SnaplogicProjectSpaceSelectInput
              setModel={setPmdRuleModel}
              model={pmdRuleModel}
              toolConfigId={toolData?._id}
            />
          </Col>
          <Col lg={12}>
            <TextInputBase
              setDataObject={setPmdRuleModel}
              dataObject={pmdRuleModel}
              fieldName={"project"}
              disabled={!pmdRuleData?.isNew()}
            />
          </Col>
          <Col ls={12}>
            <SnaplogicPermissionsInputBase
              fieldName={"permissions"}
              model={pmdRuleModel}
              className={"mt-3 mb-3"}
              setModel={setPmdRuleModel}
            />
          </Col>
        </Row>
      </div>
    </EditorPanelContainer>
  );
}

SnaplogicProjectEditorPanel.propTypes = {
  pmdRuleData: PropTypes.object,
  toolData: PropTypes.object,
  loadData: PropTypes.func,
  projectId: PropTypes.string,
  handleClose: PropTypes.func,
};

export default SnaplogicProjectEditorPanel;
