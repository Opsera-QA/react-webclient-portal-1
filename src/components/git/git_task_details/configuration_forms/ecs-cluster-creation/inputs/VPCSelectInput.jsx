import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { DialogToastContext } from "contexts/DialogToastContext";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import { AuthContext } from "../../../../../../contexts/AuthContext";
import axios from "axios";
import ECSCreationActions from "../ecs-creation-actions";

function VPCSelectInput({
  fieldName,
  dataObject,
  setDataObject,
  disabled,
  textField,
  valueField,
  awstoolId,
  pipelineId,
}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [configurations, setVPCs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState("Select a VPC");
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
  }, [awstoolId]);

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
      setVPCs([]);
      const res = await ECSCreationActions.getVPCs(dataObject, getAccessToken, cancelSource);
      console.log(res.data);
      if (res && res.status === 200) {
        if (res.data.length === 0) {
          setPlaceholder("No VPCs Found");
          return;
        }
        setPlaceholder("Select a VPC");
        setVPCs(res.data);
        return;
      }
      setPlaceholder("No VPCs Found");
      setVPCs([]);
    } catch (error) {
      setPlaceholder("No VPCs Found");
      console.error(error);
      toastContext.showServiceUnavailableDialog();
    }
  };

  return (
      <SelectInputBase
        fieldName={fieldName}
        dataObject={dataObject}
        setDataObject={setDataObject}
        selectOptions={configurations}
        textField={textField}
        valueField={valueField}
        busy={isLoading}
        placeholderText={placeholder}
        disabled={disabled || isLoading || (!isLoading && (configurations == null || configurations.length === 0))}
      />
  );
}

VPCSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  awstoolId: PropTypes.string,
  pipelineId: PropTypes.string,
};

VPCSelectInput.defaultProps = {
  fieldName: "vpcId",
  textField: "name",
  valueField: "id",
};

export default VPCSelectInput;
