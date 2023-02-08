import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import argoActions from "components/inventory/tools/tool_details/tool_jobs/argo/argo-actions";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";

function ArgoApplicationTargetRevisionSelectInput(
  {
    toolId,
    visible,
    fieldName,
    model,
    setModel,
    disabled,
    className,
    repoUrl,
  }) {
  const { getAccessToken } = useContext(AuthContext);
  const [refs, setRefs] = useState([]);
  const [completeRefs, setCompleteRefs] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    if (isMongoDbId(toolId) === true && repoUrl) {
      loadData(toolId, repoUrl, source).catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [toolId, repoUrl]);

  const loadData = async (toolId, repoUrl, cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      setCompleteRefs(undefined);
      setRefs([]);
      setError(undefined);
      await loadRefs(toolId, repoUrl, cancelSource);
    }
    catch (error) {
      if (isMounted?.current === true) {
        setError(error);
      }      
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const loadRefs = async (toolId, repoUrl, cancelSource = cancelTokenSource) => {    
    const response = await argoActions.getArgoRepositoryBranchesAndTags(getAccessToken, cancelSource, toolId, repoUrl);
    const refs = response?.data?.data;
    setCompleteRefs(refs);
    const activeRefs = model?.getData("useTag") ? refs?.tags : refs.branches;
    if (isMounted?.current === true && Array.isArray(activeRefs)) {
      setRefs(activeRefs);
    }
  };

  const setDataFunction = (fieldName, newValues) => {
    const currentVal = model?.getData("useTag");
    if (!currentVal) {
      setRefs(completeRefs?.tags || []);
    } else {
      setRefs(completeRefs?.branches || []);
    }
    let newModel = {...model};
    newModel.setData("useTag", !currentVal);
    setModel({...newModel});
  };

  return (
    <>
      <BooleanToggleInput
        dataObject={model}
        setDataObject={setModel}
        fieldName={"useTag"}
        disabled={disabled}
        setDataFunction={setDataFunction}
      />
      <div className={className}>
        <SelectInputBase
          fieldName={fieldName}
          dataObject={model}
          setDataObject={setModel}
          selectOptions={refs}
          busy={isLoading}
          valueField={"repo"}
          textField={"repo"}
          disabled={disabled}
          error={error}
          visible={visible}
        />      
    </div>
    </>    
  );
}

ArgoApplicationTargetRevisionSelectInput.propTypes = {
  toolId: PropTypes.string,
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  visible: PropTypes.bool,
  className: PropTypes.string,
  repoUrl: PropTypes.string,
};

export default ArgoApplicationTargetRevisionSelectInput;
