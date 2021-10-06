import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { DialogToastContext } from "contexts/DialogToastContext";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import { AuthContext } from "contexts/AuthContext";
import PipelineActions from "components/workflow/pipeline-actions";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faTools } from "@fortawesome/pro-light-svg-icons";
import axios from "axios";
import RoleRestrictedToolByIdentifierInputBase from "components/common/list_of_values_input/tools/RoleRestrictedToolByIdentifierInputBase";

function AnsibleStepToolSelectInput({ fieldName, model, setModel, disabled, tool_prop, className }) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [ansibleList, setAnsibleList] = useState([]);
  const [isAnsibleSearching, setIsAnsibleSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [placeholderText, setPlaceholderText] = useState("Select a Ansible Connect Instance");
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }
    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;
    if (!disabled) {
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
  }, []);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await fetchAnsibleDetails(cancelSource);
    } catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const fetchAnsibleDetails = async (cancelSource) => {
    setIsAnsibleSearching(true);
    try {
      let results = await PipelineActions.getToolsListV2(getAccessToken, cancelSource, "ansible");
      if (results?.data) {
        let respObj = [];
        let arrOfObj = results.data;
        arrOfObj.map((item) => {
          respObj.push({
            name: item.name,
            id: item._id,
            configuration: item.configuration,
          });
        });
        results = respObj;
      }
      const filteredList = results ? results.filter((el) => el.configuration !== undefined) : [];
      if (filteredList) {
        setAnsibleList(filteredList);
      }
    } catch (error) {
      setPlaceholderText("No Ansible Tool Found");
      console.error(error);
      toastContext.showServiceUnavailableDialog();
    } finally {
      setIsAnsibleSearching(false);
    }
  };

  const getTextField = (tool) => {
    const toolUrl = tool?.configuration?.toolURL || "No Ansible URL Assigned";
    const toolName = tool?.name; 
    return (`${toolName} (${toolUrl})`);
  };

  return (
    <RoleRestrictedToolByIdentifierInputBase
      toolIdentifier={"ansible"}
      toolFriendlyName={"Ansible"}
      fieldName={fieldName}
      placeholderText={placeholderText}
      configurationRequired={true}
      textField={(tool) => getTextField(tool)}
      model={model}
      setModel={setModel}
      disabled={disabled}
      className={className}
    />
  );
}

AnsibleStepToolSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  tool_prop: PropTypes.string,
  className: PropTypes.string,
};

AnsibleStepToolSelectInput.defaultProps = {
  fieldName: "toolConfigId",
};

export default AnsibleStepToolSelectInput;
