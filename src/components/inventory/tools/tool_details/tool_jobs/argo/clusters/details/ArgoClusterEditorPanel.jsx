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
import DeleteButtonWithInlineConfirmation from "components/common/buttons/delete/DeleteButtonWithInlineConfirmation";
import ArgoClusterPlatformSelectInput from "./inputs/ArgoClusterPlatformSelectInput";
import ArgoAwsClusterEditorForm from "./sub-forms/ArgoAwsClusterEditorForm";
import ArgoAzureClusterEditorForm from "./sub-forms/ArgoAzureClusterEditorForm";
import TextInputBase from "components/common/inputs/text/TextInputBase";

function ArgoClusterEditorPanel({ argoClusterData, toolData, clusterData, handleClose, editMode }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [argoClusterModel, setArgoClusterModel] = useState(undefined);
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

    if (argoClusterData) {
      loadData();
    }

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [argoClusterData]);

  const loadData = () => {
    try {
      setIsLoading(true);
      setArgoClusterModel(argoClusterData);
    } catch (error) {
      toastContext.showLoadingErrorDialog(error);
    } finally {
      setIsLoading(false);
    }
  };

  const createCluster = async () => {
    return await argoActions.createArgoCluster(getAccessToken, cancelTokenSource, toolData?._id, argoClusterModel);
  };

  const deleteCluster = async () => {
    const response = await argoActions.deleteArgoCluster(getAccessToken, cancelTokenSource, toolData?._id, argoClusterModel);
    handleClose();
    return response;
  };

  const getExtraButtons = () => {
    if (editMode) {
      return (
        <DeleteButtonWithInlineConfirmation dataObject={argoClusterModel} deleteRecord={deleteCluster} />
      );
    }
  };

  const getArgoClusterEditorFields = () => {
    if (editMode) {
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
    >
      <div>
        {getArgoClusterEditorFields()}
      </div>
    </EditorPanelContainer>
  );
}

ArgoClusterEditorPanel.propTypes = {
  argoClusterData: PropTypes.object,
  toolData: PropTypes.object,
  loadData: PropTypes.func,
  repoId: PropTypes.string,
  handleClose: PropTypes.func,
  editMode: PropTypes.bool,
  clusterData: PropTypes.array,
};

export default ArgoClusterEditorPanel;
