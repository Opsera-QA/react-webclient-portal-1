import React, { useContext, useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import { AuthContext } from "contexts/AuthContext";
import { DialogToastContext } from "contexts/DialogToastContext";
import axios from "axios";
import pipelineActions from "components/workflow/pipeline-actions";

function TerraformAwsCredentialsSelectInput({dataObject, setDataObject, disabled}) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(false);
  const [awsCredentials, setAwsCredentials] = useState([]);
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
      await getCredentials(cancelSource);
    } catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        toastContext.showServiceUnavailableDialog();
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getCredentials = async (cancelSource = cancelTokenSource) => {
    const response = await pipelineActions.getToolsListV2(getAccessToken, cancelSource, "aws_account");
    const data = response?.data;

    if (isMounted?.current === true && Array.isArray(data) && data.length > 0) {
      let formattedData = [];
      data.map((item) => {
        if (item.configuration == null) {
          return;
        }

        formattedData.push({
          name: item.name,
          id: item._id,
          configuration: item.configuration,
        });
      });

      if (Array.isArray(formattedData) && formattedData.length > 0) {
        setAwsCredentials(formattedData);
      }
    }
  };

  return (
    
     <SelectInputBase
       fieldName={"awsToolConfigId"}
       dataObject={dataObject}
       setDataObject={setDataObject}
       selectOptions={awsCredentials ? awsCredentials : []}
       valueField={"id"}
       textField={"name"}
       placeholderText={"Select Credentials"}
       disabled={disabled || isLoading || awsCredentials.length === 0}
       busy={isLoading}
     />
  );
}

TerraformAwsCredentialsSelectInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default TerraformAwsCredentialsSelectInput;