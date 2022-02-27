import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamationCircle, faTools} from "@fortawesome/pro-light-svg-icons";
import {Link} from "react-router-dom";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import RegistryToolInfoOverlay from "components/common/list_of_values_input/tools/RegistryToolInfoOverlay";
import toolsActions from "components/inventory/tools/tools-actions";
import {capitalizeFirstLetter, hasStringValue} from "components/common/helpers/string-helpers";

function RoleRestrictedToolByIdentifierInputBase(
  {
    toolIdentifier,
    toolFriendlyName,
    placeholderText,
    visible,
    fieldName,
    model,
    setModel,
    setDataFunction,
    clearDataFunction,
    disabled,
    configurationRequired,
    className,
    fields,
    textField,
    valueField,
    filterDataFunction,
  }) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [tools, setTools] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [toolMetadata, setToolMetadata] = useState(undefined);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;


    setTools([]);
    if (hasStringValue(toolIdentifier) === true) {
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
  }, [toolIdentifier]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadTools(cancelSource);
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const loadTools = async (cancelSource = cancelTokenSource) => {
    const response = await toolsActions.getRoleLimitedToolsByIdentifier(getAccessToken, cancelSource, toolIdentifier, fields);
    const tools = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(tools)) {
      setToolMetadata(response?.data?.metadata);
      if (filterDataFunction) {
        const filteredTools = filterDataFunction(tools);
        // TODO: This is a safeguard temporarily but won't be forever
        setTools(Array.isArray(filteredTools) ? filteredTools : []);
      }
      else if (configurationRequired) {
        const filteredTools = tools?.filter((tool) => {return tool.configuration != null && Object.entries(tool.configuration).length > 0; });
        setTools(filteredTools);
      }
      else {
        setTools(tools);
      }
    }
  };

  const getDetailViewToolUrl = () => {
    if (model?.getData(fieldName) != null && model?.getData(fieldName) !== "") {
      return (`/inventory/tools/details/${model?.getData(fieldName)}`);
    }
  };

  const getErrorMessage = () => {
    if (!isLoading && (!Array.isArray(tools) || tools.length === 0) && toolFriendlyName && toolIdentifier) {
      return (
        <div className="form-text text-muted p-2">
          <FontAwesomeIcon icon={faExclamationCircle} className="text-muted mr-1" fixedWidth />
          No {configurationRequired ? "configured " : ""}tools have been registered for <span className="upper-case-first">{toolFriendlyName}</span>.
          Please go to
          <Link to="/inventory/tools"> Tool Registry</Link> and add an entry for this repository in order to
          proceed.
        </div>
      );
    }
  };

  const getEllipsisTooltipText = () => {
    if (model?.getData(fieldName) != null && model?.getData(fieldName) !== "") {
      return (`View selected ${capitalizeFirstLetter(toolFriendlyName)} tool's details`);
    }

    return (`View ${capitalizeFirstLetter(toolFriendlyName)} tools`);
  };

  const getInfoOverlay = () => {
    if (toolIdentifier != null && toolIdentifier !== "") {
      return (
        <RegistryToolInfoOverlay
          selectedToolId={model?.getData(fieldName)}
          tools={tools}
          loadData={loadData}
          toolMetadata={toolMetadata}
          isMounted={isMounted}
          isLoading={isLoading}
          model={model}
          setModel={setModel}
          setDataFunction={setDataFunction}
          fieldName={fieldName}
        />
      );
    }
  };

  if (visible === false) {
    return null;
  }

  return (
    <>
      <SelectInputBase
        className={className}
        fieldName={fieldName}
        dataObject={model}
        setDataObject={setModel}
        setDataFunction={setDataFunction}
        selectOptions={tools}
        busy={isLoading}
        valueField={valueField}
        textField={textField}
        placeholderText={placeholderText}
        clearDataFunction={clearDataFunction}
        disabled={disabled || isLoading}
        detailViewLink={getDetailViewToolUrl()}
        ellipsisTooltipText={getEllipsisTooltipText()}
        infoOverlay={getInfoOverlay()}
        linkTooltipText={`Load Tool Registry`}
        linkIcon={faTools}
      />
      {getErrorMessage()}
    </>
  );
}

RoleRestrictedToolByIdentifierInputBase.propTypes = {
  toolIdentifier: PropTypes.string,
  toolFriendlyName: PropTypes.string,
  placeholderText: PropTypes.string,
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
  visible: PropTypes.bool,
  configurationRequired: PropTypes.bool,
  clearDataFunction: PropTypes.func,
  className: PropTypes.string,
  fields: PropTypes.array,
  textField: PropTypes.any,
  valueField: PropTypes.string,
  filterDataFunction: PropTypes.func,
};

RoleRestrictedToolByIdentifierInputBase.defaultProps = {
  textField: "name",
  valueField: "_id",
};

export default RoleRestrictedToolByIdentifierInputBase;