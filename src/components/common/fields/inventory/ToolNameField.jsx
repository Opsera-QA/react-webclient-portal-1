import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import FieldContainer from "components/common/fields/FieldContainer";
import {faSpinner} from "@fortawesome/pro-light-svg-icons";
import toolsActions from "components/inventory/tools/tools-actions";
import axios from "axios";
import ToolLinkIcon from "components/common/icons/inventory/tools/ToolLinkIcon";
import FieldLabel from "components/common/fields/FieldLabel";
import RegistryToolInfoOverlay from "components/common/list_of_values_input/tools/RegistryToolInfoOverlay";
import EllipsisIcon from "components/common/icons/general/EllipsisIcon";
import IconBase from "components/common/icons/IconBase";
import LoadingIcon from "components/common/icons/LoadingIcon";

function ToolNameField({ model, fieldName, className, handleClose }) {
  const [field] = useState(model?.getFieldById(fieldName));
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

    loadData(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadToolName(cancelSource);
    } catch (error) {
      if (error?.response?.status !== 404) {
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const loadToolName = async (cancelSource = cancelTokenSource) => {
    let toolId = model?.getData(fieldName);
    if (toolId != null && toolId !== "") {
      const response = await toolsActions.getToolNameById(getAccessToken, cancelSource, toolId);
      const toolName = response?.data?.name;

      if (toolName) {
        setToolName(toolName);
        setAccessAllowed(response?.data?.accessAllowed === true);
      }
    }
  };

  const getToolName = () => {
    if (isLoading) {
      return (
        <span>
          <LoadingIcon className={"mr-1"}/>
          {model?.getData(fieldName)}
        </span>
      );
    }

    if (toolName) {
      return toolName;
    }

    return (`
      Tool name could not be found with ID: [${model?.getData(fieldName)}]. 
      The Tool may have been deleted or its access rules may have changed.
    `);
  };

  const getToolInfoOverlay = () => {
    const toolId = model?.getData(fieldName);

    if (toolId != null && toolId !== "" && toolName) {
      return (
        <RegistryToolInfoOverlay
          selectedToolId={toolId}
          loadData={loadData}
          isLoading={isLoading}
          isMounted={isMounted}
          model={model}
        />
      );
    }
  };

  const getBody = () => {
    if (model?.getData(fieldName) == null || model?.getData(fieldName) === "") {
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
          toolId={model?.getData(fieldName)}
          accessAllowed={accessAllowed}
          handleClose={handleClose}
        />
      </span>
    );
  };


  if (field == null) {
    return null;
  }

  return (
    <FieldContainer className={className}>
      <FieldLabel field={field}/>
      {getBody()}
    </FieldContainer>
  );
}

ToolNameField.propTypes = {
  model: PropTypes.object,
  fieldName: PropTypes.string,
  className: PropTypes.string,
  handleClose: PropTypes.func
};

export default ToolNameField;