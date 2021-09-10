import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { DialogToastContext } from "contexts/DialogToastContext";
import { AuthContext } from "../../../../../../contexts/AuthContext";
import axios from "axios";
import MultiSelectInputBase from "../../../../../common/inputs/select/MultiSelectInputBase";
import ECSCreationActions from "../ecs-service-creation-actions";

function SubnetSelectInput({
                                   fieldName,
                                   dataObject,
                                   setDataObject,
                                   disabled,
                                   textField,
                                   valueField,
                                    vpc,
                                   pipelineId,
                                 }) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [subnet, setSubnets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState("Select a Subnet");
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
  }, [vpc]);

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
      setSubnets([]);
      const res = await ECSCreationActions.getSubnets(dataObject, getAccessToken, cancelSource);
      if (res && res.status === 200) {
        if (res.data.length === 0) {
          setPlaceholder("No Subnets Found");
          return;
        }
        setPlaceholder("Select a Subnet");
        setSubnets(res.data);
        return;
      }
      setPlaceholder("No Subnets Found");
      setSubnets([]);
    } catch (error) {
      setPlaceholder("No Subnets Found");
      console.error(error);
      toastContext.showServiceUnavailableDialog();
    }
  };

  return (
      <MultiSelectInputBase
        fieldName={fieldName}
        dataObject={dataObject}
        setDataObject={setDataObject}
        selectOptions={subnet}
        busy={isLoading}
        textField={textField}
        valueField={valueField}
        placeholderText={placeholder}
        disabled={disabled || isLoading || (!isLoading && (subnet == null || subnet.length === 0))}
      />
  );
}

SubnetSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  vpc: PropTypes.string,
  pipelineId: PropTypes.string,
};

SubnetSelectInput.defaultProps = {
  fieldName: "ecsServiceSubnets",
  textField: "textField",
  valueField: "subnetId",
};

export default SubnetSelectInput;
