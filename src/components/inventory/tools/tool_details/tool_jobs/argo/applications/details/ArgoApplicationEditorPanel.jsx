import React, {useEffect, useContext, useState, useRef} from "react";
import { Col } from "react-bootstrap";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import argoActions from "../../argo-actions";
import ActivityToggleInput from "components/common/inputs/boolean/ActivityToggleInput";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import ArgoClusterSelectInput from "components/common/list_of_values_input/tools/argo_cd/cluster/ArgoClusterSelectInput";
import ArgoProjectSelectInput from "components/common/list_of_values_input/tools/argo_cd/projects/ArgoProjectSelectInput";
import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import LoadingDialog from "components/common/status_notifications/loading";
import axios from "axios";
import DeleteButtonWithInlineConfirmation from "components/common/buttons/delete/DeleteButtonWithInlineConfirmation";
import ArgoApplicationArgoProjectSelectInput
  from "components/inventory/tools/tool_details/tool_jobs/argo/applications/details/inputs/ArgoApplicationArgoProjectSelectInput";

function ArgoApplicationEditorPanel({ argoApplicationData, toolData, applicationId, handleClose }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [argoApplicationModel, setArgoApplicationModel] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    if(argoApplicationData) {
      loadData();
    }

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [argoApplicationData]);

  const loadData = () => {
    try {
      setIsLoading(true);
      setArgoApplicationModel(argoApplicationData);
    } catch (error) {
      toastContext.showLoadingErrorDialog(error);
    } finally {
      setIsLoading(false);
    }
  };

  const createApplication = async () => {
    return await argoActions.createArgoApplicationV2(getAccessToken, cancelTokenSource, toolData?.getData("_id"), argoApplicationModel);
  };

  const updateApplication = async () => {
    return await argoActions.updateArgoApplicationV2(getAccessToken, cancelTokenSource, toolData?.getData("_id"), applicationId, argoApplicationModel);
  };

  const deleteApplication = async () => {
    const response = await argoActions.deleteArgoApplicationV2(getAccessToken, cancelTokenSource, toolData?.getData("_id"), applicationId);
    handleClose();
    return response;
  };

  if (isLoading || argoApplicationModel == null) {
    return <LoadingDialog size="sm" message={"Loading Data"} />;
  }

  return (
    <EditorPanelContainer
      recordDto={argoApplicationModel}
      createRecord={createApplication}
      updateRecord={updateApplication}
      setRecordDto={setArgoApplicationModel}
      isLoading={isLoading}
      extraButtons={
        <DeleteButtonWithInlineConfirmation
          dataObject={argoApplicationModel}
          deleteRecord={deleteApplication}
        />
      }
      disable={argoApplicationModel?.isNew() !== true} // TODO: Remove when adding update functionality
      handleClose={handleClose}
    >
      <div className="scroll-y hide-x-overflow">
        <Row>
          <Col lg={12}>
            <TextInputBase
              setDataObject={setArgoApplicationModel}
              dataObject={argoApplicationModel}
              fieldName={"applicationName"}
              disabled={!argoApplicationData?.isNew()}
            />
          </Col>
          <Col lg={12}>
            <ArgoApplicationArgoProjectSelectInput
              argoToolId={toolData?.getData("_id")}
              setModel={setArgoApplicationModel}
              model={argoApplicationModel}
              fieldName={"projectName"}
              disabled={!argoApplicationData?.isNew()}
            />
          </Col>
          <Col lg={12}>
            <TextInputBase
              setDataObject={setArgoApplicationModel}
              dataObject={argoApplicationModel}
              fieldName={"namespace"}
              disabled={!argoApplicationData?.isNew()}
            />
          </Col>
          <Col lg={12}>
            <ArgoClusterSelectInput
              fieldName={"cluster"}
              argoToolId={toolData?.getData("_id")}
              dataObject={argoApplicationModel}
              setDataObject={setArgoApplicationModel}
              disabled={!argoApplicationData?.isNew()}
            />
          </Col>
          <Col lg={12}>
            <TextInputBase
              dataObject={argoApplicationModel}
              fieldName={"gitPath"}
              setDataObject={setArgoApplicationModel}
              disabled={!argoApplicationData?.isNew()}
            />
          </Col>
          <Col lg={12}>
            <TextInputBase
              dataObject={argoApplicationModel}
              fieldName={"gitUrl"}
              setDataObject={setArgoApplicationModel}
              disabled={!argoApplicationData?.isNew()}
            />
          </Col>
          <Col lg={12}>
            <TextInputBase
              dataObject={argoApplicationModel}
              fieldName={"branchName"}
              setDataObject={setArgoApplicationModel}
              disabled={!argoApplicationData?.isNew()}
            />
          </Col>
          <Col lg={12}>
            <ActivityToggleInput
              setDataObject={setArgoApplicationModel}
              fieldName={"active"}
              dataObject={argoApplicationModel}
            />
          </Col>
        </Row>
      </div>
    </EditorPanelContainer>
  );
}

ArgoApplicationEditorPanel.propTypes = {
  argoApplicationData: PropTypes.object,
  toolData: PropTypes.object,
  loadData: PropTypes.func,
  applicationId: PropTypes.string,
  handleClose: PropTypes.func
};

export default ArgoApplicationEditorPanel;
