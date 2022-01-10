import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import axios from "axios";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import modelHelpers from "components/common/model/modelHelpers";
import toolPathsActions from "components/inventory/tools/tool_details/paths/toolPaths.actions";
import DetailPanelLoadingDialog from "components/common/loading/DetailPanelLoadingDialog";
import toolPathMetadata from "components/inventory/tools/tool_details/paths/toolPath.metadata";
import ToolPathEditorPanel from "components/inventory/tools/tool_details/paths/ToolPathEditorPanel";

function GitToolPathsPanel({ toolData, toolId }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [toolPathModel, setToolPathModel] = useState(undefined);
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

    loadData(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [toolId]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);

      if (isMongoDbId(toolId)) {
        await getToolPaths(cancelSource);
      }
    }
    catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        toastContext.showLoadingErrorDialog(error);
      }
    }
    finally {
      if (isMounted?.current === true ) {
        setIsLoading(false);
      }
    }
  };

  const getToolPaths = async (cancelSource = cancelTokenSource) => {
    const response = await toolPathsActions.getToolPathsV2(getAccessToken, cancelSource, toolId);
    const toolPathArray = response?.data?.data;

    if (isMounted?.current === true) {
      unpackPath(toolPathArray);
    }
  };

  const unpackPath = (toolPathArray) => {
    const toolPathObject = Array.isArray(toolPathArray) && toolPathArray.length > 0 ? toolPathArray[0] : {...toolPathMetadata.newObjectFields};

    const parsedModel = modelHelpers.parseObjectIntoModel(toolPathObject, toolPathMetadata);
    setToolPathModel({...parsedModel});
  };

  if (isLoading === true || toolPathModel == null) {
    return (
      <DetailPanelLoadingDialog type={"Path"} />
    );
  }

  return (
    <div>
      <ToolPathEditorPanel
        toolModel={toolData}
        toolPathModel={toolPathModel}
        setToolPathModel={setToolPathModel}
      />
    </div>
  );
}

GitToolPathsPanel.propTypes = {
  toolData: PropTypes.object,
  toolId: PropTypes.string,
};

export default GitToolPathsPanel;
