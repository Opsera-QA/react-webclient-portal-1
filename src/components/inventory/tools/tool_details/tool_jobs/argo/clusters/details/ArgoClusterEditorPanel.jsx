import React, { useEffect, useContext, useState, useRef } from "react";
import { Col } from "react-bootstrap";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import argoActions from "../../argo-actions";
import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";
import { AuthContext } from "contexts/AuthContext";
import { DialogToastContext } from "contexts/DialogToastContext";
import LoadingDialog from "components/common/status_notifications/loading";
import axios from "axios";
import ArgoClusterPlatformSelectInput from "./inputs/ArgoClusterPlatformSelectInput";
import ArgoAwsClusterEditorForm from "./sub-forms/ArgoAwsClusterEditorForm";
import ArgoAzureClusterEditorForm from "./sub-forms/ArgoAzureClusterEditorForm";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import DeleteButtonWithInlineConfirmation from "components/common/buttons/delete/DeleteButtonWithInlineConfirmation";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";

function ArgoClusterEditorPanel(
  {
    argoClusterData,
    toolId,
    clusterData,
    handleClose,
  }) {
  const { getAccessToken } = useContext(AuthContext);
  const [argoClusterModel, setArgoClusterModel] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const toastContext = useContext(DialogToastContext);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData();

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [argoClusterData]);

  const loadData = () => {
    setIsLoading(true);
    setArgoClusterModel(argoClusterData);
    setIsLoading(false);
  };

  const createCluster = async () => {
    return await argoActions.createArgoCluster(getAccessToken, cancelTokenSource, toolId, argoClusterModel);
  };

  const handleDeleteClose = () => {
    if (isMounted?.current === true) {
      loadData();
    }

    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
    handleClose();
  };

  const deleteCluster = async () => {
    try {
      const response = await argoActions.deleteArgoCluster(getAccessToken, cancelTokenSource, toolId, argoClusterModel);
      handleDeleteClose();
    }
    catch (error) {
      toastContext.showDeleteFailureResultDialog("Argo Cluster", error);
    }
  };

  const getExtraButtons = () => {
    if (argoClusterModel?.isNew() === false) {
      return (
        <DeleteButtonWithInlineConfirmation
          dataObject={argoClusterModel}
          deleteRecord={deleteCluster}
        />
      );
    }
  };

  const getArgoClusterEditorFields = () => {
    if (argoClusterModel?.isNew() === false) {
      return (
        <>
          <Row>
            <Col>
              <TextInputBase
                disabled={true}
                fieldName={"clusterName"}
                dataObject={argoClusterModel}
                setDataObject={setArgoClusterModel}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <TextInputBase
                disabled={true}
                fieldName={"server"}
                dataObject={argoClusterModel}
                setDataObject={setArgoClusterModel}
              />
            </Col>
          </Row>
        </>
      );
    }
    return (
      <Row>
        <Col lg={12}>
          <ArgoClusterPlatformSelectInput
            setModel={setArgoClusterModel}
            model={argoClusterModel}
            disabled={!argoClusterData?.isNew()}
          />
        </Col>
        {argoClusterModel.getData("platform") === "aws" &&
          <ArgoAwsClusterEditorForm
            setModel={setArgoClusterModel}
            model={argoClusterModel}
            clusterData={clusterData}
            disabled={argoClusterData ? !argoClusterData?.isNew() : false}
          />
        }
        {argoClusterModel.getData("platform") === "azure" &&
          <ArgoAzureClusterEditorForm
            setModel={setArgoClusterModel}
            model={argoClusterModel}
            clusterData={clusterData}
            disabled={argoClusterData ? !argoClusterData?.isNew() : false}
          />
        }
        {argoClusterModel.getData("platform") && 
          <Col lg={12}>
            <BooleanToggleInput
              dataObject={argoClusterModel}
              setDataObject={setArgoClusterModel}
              fieldName={"argoRolloutsEnabled"}
              disabled={argoClusterData ? !argoClusterData?.isNew() : false}
            />
          </Col>
        }
      </Row>
    );
  };

  if (isLoading || argoClusterModel == null) {
    return <LoadingDialog size="sm" message={"Loading Data"} />;
  }

  return (
    <EditorPanelContainer
      recordDto={argoClusterModel}
      createRecord={createCluster}
      setRecordDto={setArgoClusterModel}
      isLoading={isLoading}
      extraButtons={getExtraButtons()}
      handleClose={handleClose}
      disable={!argoClusterData?.isNew()}
    >
      <div>
        {getArgoClusterEditorFields()}
      </div>
    </EditorPanelContainer>
  );
}

ArgoClusterEditorPanel.propTypes = {
  argoClusterData: PropTypes.object,
  toolId: PropTypes.string,
  handleClose: PropTypes.func,
  clusterData: PropTypes.array,
};

export default ArgoClusterEditorPanel;
