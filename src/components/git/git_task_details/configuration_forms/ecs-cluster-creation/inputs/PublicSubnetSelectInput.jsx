import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { DialogToastContext } from "contexts/DialogToastContext";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import { AuthContext } from "../../../../../../../../../contexts/AuthContext";
import axios from "axios";
import ECSCreationActions from "../ecs-creation-actions";
import MultiSelectInputBase from "../../../../../common/inputs/select/MultiSelectInputBase";

function PublicSubnetSelectInput({
                          fieldName,
                          dataObject,
                          setDataObject,
                          disabled,
                          textField,
                          valueField,
                          tool_prop,
                          pipelineId,
                        }) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [publicSubnets, setPublicSubnets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState("Select a Public Subnet");
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

  const loadTypes = async () => {
    try {
      const res = await ECSCreationActions.getSubnets(dataObject, getAccessToken, cancelTokenSource);
      if (res && res.status === 200) {
        if (res.data.length === 0) {
          setPlaceholder("No Public Subnets Found");
          return;
        }
        setPlaceholder("Select a Public Subnet");
        setPublicSubnets(res.data);
        return;
      }
      setPlaceholder("No Public Subnets Found");
      setPublicSubnets([]);
    } catch (error) {
      setPlaceholder("No Public Subnets Found");
      console.error(error);
      toastContext.showServiceUnavailableDialog();
    }
  };

  return (
    <div>
      <MultiSelectInputBase
        fieldName={fieldName}
        dataObject={dataObject}
        setDataObject={setDataObject}
        selectOptions={publicSubnets}
        busy={isLoading}
        placeholderText={placeholder}
        disabled={disabled || isLoading || (!isLoading && (publicSubnets == null || publicSubnets.length === 0))}
      />
    </div>
  );
}

PublicSubnetSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  tool_prop: PropTypes.string,
  pipelineId: PropTypes.string,
};

PublicSubnetSelectInput.defaultProps = {
  fieldName: "publicSubnets",
  textField: "cidrBlock",
  valueField: "subnetId",
};

export default PublicSubnetSelectInput;
