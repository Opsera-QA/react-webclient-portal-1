import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { DialogToastContext } from "contexts/DialogToastContext";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import { AuthContext } from "../../../../../../contexts/AuthContext";
import axios from "axios";
import ECSCreationActions from "../ecs-service-creation-actions";

function LogGroupSelectInput({
                               fieldName,
                               dataObject,
                               setDataObject,
                               disabled,
                               textField,
                               valueField,
                               toolConfigId,
                               region,
                             }) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [logGroups, setLogGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState("Select a Log Group");
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;
    console.log(dataObject.getData("region"));

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
  }, [toolConfigId, region]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadTypes(cancelSource);
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

  const loadTypes = async (cancelSource) => {
    try {
      setLogGroups([]);
      const res = await ECSCreationActions.getLogGroups(dataObject, getAccessToken, cancelSource);
      if (res && res.status === 200) {
        if (res.data.length === 0) {
          setPlaceholder("No Log Groups Found");
          return;
        }
        setPlaceholder("Select a Log Group");
        setLogGroups(res.data);
        return;
      }
      setPlaceholder("No Log Groups Found");
      setLogGroups([]);
    } catch (error) {
      setPlaceholder("No Log Groups Found");
      console.error(error);
      toastContext.showServiceUnavailableDialog();
    }
  };

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      selectOptions={logGroups}
      textField={textField}
      valueField={valueField}
      busy={isLoading}
      placeholderText={placeholder}
      disabled={disabled || isLoading || (!isLoading && (logGroups == null || logGroups.length === 0))}
    />
  );
}

LogGroupSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  toolConfigId: PropTypes.string,
  region: PropTypes.string,
};

LogGroupSelectInput.defaultProps = {
  fieldName: "ecsServiceLogGroup",
  textField: "logGroupName",
  valueField: "logGroupName",
};

export default LogGroupSelectInput;
