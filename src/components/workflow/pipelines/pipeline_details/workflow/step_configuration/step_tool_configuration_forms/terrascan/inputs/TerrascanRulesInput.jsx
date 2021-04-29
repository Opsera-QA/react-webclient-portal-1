import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import TerrascanStepActions
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/terrascan/terrascan-step-actions";
import {faFileContract} from "@fortawesome/pro-light-svg-icons/faFileContract";
import ListInputBase from "components/common/inputs/list/ListInputBase";

function TerrascanRulesInput({ fieldName, dataObject, platform, setDataObject, disabled }) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [rules, setRules] = useState([]);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState("Select Rules");

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    if (platform && platform !== "") {
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
  }, [platform]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadRules(cancelSource);
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

  const loadRules = async (cancelSource = cancelTokenSource) => {
    try {
      const res = await TerrascanStepActions.getRules(platform, getAccessToken, cancelSource);
      if (res && res.status === 200) {
        setRules(res.data);
        return;
      }
      setRules([]);
    } catch (error) {
      setPlaceholder("No Terrascan Rules Found");
      console.error(error);
      toastContext.showServiceUnavailableDialog();
    }
  };

  const searchFunction = (item, searchTerm) => {
    return item.id.toLowerCase().includes(searchTerm.toLowerCase());
  };

  return (
    <div className={"h-100"}>
      <ListInputBase
        fieldName={fieldName}
        selectOptions={rules}
        dataObject={dataObject}
        setDataObject={setDataObject}
        valueField="id"
        textField="id"
        isLoading={isLoading}
        showSelectAllButton={true}
        searchFunction={searchFunction}
        placeholderText={placeholder}
        icon={faFileContract}
        disabled={isLoading || disabled}
      />
    </div>
  );
}

TerrascanRulesInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  platform: PropTypes.string
};

TerrascanRulesInput.defaultProps = {
  fieldName: "rules"
};

export default TerrascanRulesInput;
