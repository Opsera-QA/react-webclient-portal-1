import React, { useContext, useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import { AuthContext } from "contexts/AuthContext";
import { DialogToastContext } from "contexts/DialogToastContext";
import terraformStepActions from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/terraform/terraform-step-actions";
import axios from "axios";
import PipelineActions from "../../../../../../../pipeline-actions";

function TerraformAWSCredsSelectInput({dataObject, setDataObject, disabled, tool_prop}) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(false);
  const [credsList, setCredsList] = useState([]);
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
      await getCredsList(cancelSource);
    } catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getCredsList = async (cancelSource) => {
    setIsLoading(true);
    try {
      let results = await PipelineActions.getToolsListV2(getAccessToken, cancelSource, "aws_account");
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
        setCredsList(filteredList);
      }
    } catch (error) {
      console.error(error);
      toastContext.showServiceUnavailableDialog();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    
     <SelectInputBase
       fieldName={"awsToolConfigId"}
       dataObject={dataObject}
       setDataObject={setDataObject}
       selectOptions={credsList ? credsList : []}
       valueField={"id"}
       textField={"name"}
       placeholderText={"Select Credentials"}
       disabled={disabled || isLoading || credsList.length === 0}
       busy={isLoading}
     />
  );
}

TerraformAWSCredsSelectInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  tool_prop: PropTypes.string
};

export default TerraformAWSCredsSelectInput;