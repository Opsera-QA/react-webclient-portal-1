import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import toolsActions from "components/inventory/tools/tools-actions";
import axios from "axios";
import ToolLinkIcon from "components/common/icons/inventory/tools/ToolLinkIcon";
import RegistryToolInfoOverlay from "components/common/list_of_values_input/tools/RegistryToolInfoOverlay";
import LoadingIcon from "components/common/icons/LoadingIcon";
import { hasStringValue } from "components/common/helpers/string-helpers";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";

function ToolNameFieldDisplayer(
  {
    toolId,
    handleClose,
  }) {
  const toastContext = useContext(DialogToastContext);
  const {getAccessToken} = useContext(AuthContext);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [toolName, setToolName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [accessAllowed, setAccessAllowed] = useState(false);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;
    setAccessAllowed(false);
    setToolName("");

    if (isMongoDbId(toolId) === true) {
      loadData(source).catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [toolId]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadToolName(cancelSource);
    } catch (error) {
      if (isMounted?.current === true) {
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const loadToolName = async (cancelSource = cancelTokenSource) => {
    const response = await toolsActions.getToolNameById(getAccessToken, cancelSource, toolId);
    const toolName = response?.data?.name;

    if (isMounted?.current === true && hasStringValue(toolName) === true) {
      setToolName(toolName);
      setAccessAllowed(response?.data?.accessAllowed === true);
    }
  };

  const getToolName = () => {
    if (isLoading) {
      return (
        <span>
          <LoadingIcon className={"mr-1"}/>
          {toolId}
        </span>
      );
    }

    if (toolName) {
      return toolName;
    }

    if (isMongoDbId(toolId) === true) {
      return (`
      Tool name could not be found with ID: [${toolId}]. 
      The Tool may have been deleted or its access rules may have changed.
    `);
    }
  };

  const getToolInfoOverlay = () => {
    if (isMongoDbId(toolId) && toolName) {
      return (
        <RegistryToolInfoOverlay
          selectedToolId={toolId}
          loadData={loadData}
          isLoading={isLoading}
          isMounted={isMounted}
          // model={model}
        />
      );
    }
  };

  if (isMongoDbId(toolId) !== true) {
    return null;
  }

  return (
    <span>
        <span>{getToolName()}</span>
      {/*// TODO: Determine if worth using*/}
      {/*<EllipsisIcon*/}
      {/*  overlay={getToolInfoOverlay()}*/}
      {/*  tooltipText={`View selected tool's details`}*/}
      {/*  className={"ml-2 view-details-icon"}*/}
      {/*  placement={"right"}*/}
      {/*/>*/}
      <ToolLinkIcon
        isLoading={isLoading}
        className={"ml-2"}
        toolId={toolId}
        accessAllowed={accessAllowed}
        handleClose={handleClose}
      />
    </span>
  );
}

ToolNameFieldDisplayer.propTypes = {
  handleClose: PropTypes.func,
  toolId: PropTypes.string,
};

export default ToolNameFieldDisplayer;