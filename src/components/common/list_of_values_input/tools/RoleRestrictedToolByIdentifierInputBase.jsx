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
import {capitalizeFirstLetter} from "components/common/helpers/string-helpers";

function RoleRestrictedToolByIdentifierInputBase({ toolType, toolFriendlyName, placeholderText, visible, fieldName, model, setModel, setDataFunction, clearDataFunction, disabled, configurationRequired, className}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [tools, setTools] = useState([]);
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


    setTools([]);
    if (toolType !== "") {
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
  }, [toolType]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadTools(cancelSource);
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const loadTools = async (cancelSource = cancelTokenSource) => {
    const response = await toolsActions.getRoleLimitedToolsByIdentifier(getAccessToken, cancelSource, toolType);
    const tools = response?.data?.data;

    if (Array.isArray(tools)) {
      if (configurationRequired) {
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
    if (!isLoading && (!Array.isArray(tools) || tools.length === 0) && toolFriendlyName && toolType) {
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
        valueField="_id"
        textField="name"
        placeholderText={placeholderText}
        clearDataFunction={clearDataFunction}
        disabled={disabled || isLoading}
        detailViewLink={getDetailViewToolUrl()}
        ellipsisTooltipText={getEllipsisTooltipText()}
        infoOverlay={
          <RegistryToolInfoOverlay
            selectedToolId={model?.getData(fieldName)}
            tools={tools}
            toolData={tools?.find((tool) => tool?._id === model?.getData(fieldName))}
            loadData={loadData}
            isLoading={isLoading}
          />
        }
        linkTooltipText={`Load Tool Registry`}
        linkIcon={faTools}
      />
      {getErrorMessage()}
    </>
  );
}

RoleRestrictedToolByIdentifierInputBase.propTypes = {
  toolType: PropTypes.string,
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
};

export default RoleRestrictedToolByIdentifierInputBase;