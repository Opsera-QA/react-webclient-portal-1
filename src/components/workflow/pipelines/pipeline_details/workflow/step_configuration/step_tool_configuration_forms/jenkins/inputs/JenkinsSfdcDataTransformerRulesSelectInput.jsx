import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import MultiSelectInputBase from "components/common/inputs/multi_select/MultiSelectInputBase";
import { DialogToastContext } from "contexts/DialogToastContext";
import axios from "axios";
import { AuthContext } from "contexts/AuthContext";
import sfdcDataTransformerRulesActions
  from "components/inventory/tools/tool_details/tool_jobs/sfdc/data_transformer_rules_mapping/sfdc-data-transformer-rules-actions";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";

// TODO: Rework
function JenkinsSfdcDataTransformerRulesSelectInput({ model, setModel, fieldName, disabled, jobType, toolId }) {

  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [dataTransformerRules, setDataTransformerRules] = useState([]);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    if (isMongoDbId(toolId) === true) {
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
  }, [toolId]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      setDataTransformerRules([]);
      await getdataTransformerRules(cancelSource);
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

  const getdataTransformerRules = async (cancelSource = cancelTokenSource) => {
    const response = await sfdcDataTransformerRulesActions.getDataTransformerRules(getAccessToken, cancelSource, toolId);
    const rules = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(rules)) {
      setDataTransformerRules([...rules]);
    }
  };

  if (model == null || jobType !== "SFDC DATA TRANSFORM") {
    return null;
  }

  return (
    <MultiSelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      placeholderText={"Select Rule"}
      selectOptions={dataTransformerRules}
      valueField="_id"
      textField="name"
      disabled={disabled}
      busy={isLoading}
    />
  );
}

JenkinsSfdcDataTransformerRulesSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  fieldName: PropTypes.string,
  jobType: PropTypes.string,
  toolId: PropTypes.string,
};

JenkinsSfdcDataTransformerRulesSelectInput.defaultProps = {
  fieldName: "ruleIds",
};

export default JenkinsSfdcDataTransformerRulesSelectInput;
