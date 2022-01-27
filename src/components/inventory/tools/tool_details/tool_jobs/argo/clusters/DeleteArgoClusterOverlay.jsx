import React, {useState, useEffect, useContext, useRef} from "react";
import PropTypes from "prop-types";
import argoClusterMetadata from "./argo-cluster-metadata";
import {DialogToastContext} from "contexts/DialogToastContext";
import axios from "axios";
import argoActions from "components/inventory/tools/tool_details/tool_jobs/argo/argo-actions";
import {AuthContext} from "contexts/AuthContext";
import Row from "react-bootstrap/Row";
import {Col} from "react-bootstrap";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import ArgoClusterPlatformSelectInput
  from "components/inventory/tools/tool_details/tool_jobs/argo/clusters/details/inputs/ArgoClusterPlatformSelectInput";
import SaveButtonContainer from "components/common/buttons/saving/containers/SaveButtonContainer";
import DeleteButton from "components/common/buttons/delete/DeleteButton";
import DeleteCenterPanel from "components/common/overlays/center/DeleteCenterPanel";
import {hasStringValue} from "components/common/helpers/string-helpers";
import RoleRestrictedAwsAccountToolSelectInput
  from "components/common/list_of_values_input/tools/aws/tool/RoleRestrictedAwsAccountToolSelectInput";
import RoleRestrictedAzureToolSelectInput
  from "components/common/list_of_values_input/tools/azure/tools/RoleRestrictedAzureToolSelectInput";

function DeleteArgoClusterOverlay(
  {
    loadData,
    argoClusterModel,
    toolId,
  }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [deleteClusterModel, setDeleteClusterModel] = useState(undefined);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    initializeData();

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);


  const initializeData = () => {
    setDeleteClusterModel({...argoClusterModel});
  };

  const closePanel = () => {
    if (isMounted?.current === true) {
      loadData();
    }

    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  const deleteCluster = async () => {
    try {
      const response = await argoActions.deleteArgoCluster(getAccessToken, cancelTokenSource, toolId, argoClusterModel);
      closePanel();
    }
    catch (error) {
      toastContext.showDeleteFailureResultDialog("Argo Cluster", error);
    }
  };

  const getPlatformToolInput = () => {
    if (deleteClusterModel?.getData("platform") === "azure") {
      return (
        <Col lg={12}>
          <RoleRestrictedAzureToolSelectInput
            fieldName={"platformToolId"}
            setModel={setDeleteClusterModel}
            model={deleteClusterModel}
          />
        </Col>
      );
    }


    if (deleteClusterModel?.getData("platform") === "aws") {
      return (
        <Col lg={12}>
          <RoleRestrictedAwsAccountToolSelectInput
            fieldName={"platformToolId"}
            setModel={setDeleteClusterModel}
            model={deleteClusterModel}
          />
        </Col>
      );
    }
  };

  if (deleteClusterModel == null) {
    return null;
  }

  return (
    <DeleteCenterPanel
      closePanel={closePanel}
      objectType={argoClusterMetadata.type}
    >
      <div className={"m-3"}>
        <Row>
          <Col>
            <TextInputBase
              disabled={true}
              fieldName={"clusterName"}
              dataObject={deleteClusterModel}
            />
          </Col>
          <Col>
            <TextInputBase
              disabled={true}
              fieldName={"server"}
              dataObject={deleteClusterModel}
            />
          </Col>
          <Col lg={12}>
            <ArgoClusterPlatformSelectInput
              setModel={setDeleteClusterModel}
              model={deleteClusterModel}
            />
          </Col>
          {getPlatformToolInput()}
        </Row>
        <SaveButtonContainer>
          <DeleteButton
            dataObject={deleteClusterModel}
            deleteRecord={deleteCluster}
            disabled={
              hasStringValue(deleteClusterModel?.getData("platform")) !== true
              || hasStringValue(deleteClusterModel?.getData("platformToolId")) !== true
            }
          />
        </SaveButtonContainer>
      </div>
    </DeleteCenterPanel>
  );
}

DeleteArgoClusterOverlay.propTypes = {
  argoClusterModel: PropTypes.object,
  loadData: PropTypes.func,
  toolId: PropTypes.string,
};

export default DeleteArgoClusterOverlay;
