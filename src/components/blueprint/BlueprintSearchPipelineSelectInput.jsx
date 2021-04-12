import React, {useContext, useEffect, useState, useRef} from "react";
import PropTypes from "prop-types";
import {faExclamationCircle} from "@fortawesome/pro-light-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import axios from 'axios';
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import pipelineActions from "components/workflow/pipeline-actions";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

function BlueprintSearchPipelineSelectInput({ visible, fieldName, dataObject, setDataObject, disabled, showLabel}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [pipelines, setPipelines] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadPipelines(cancelSource);
    }
    catch (error) {
      if(isMounted?.current === true){
        console.error(error);
        toastContext.showLoadingErrorDialog(error);
      }
    }
    finally {
      if(isMounted?.current === true){
        setIsLoading(false);
      }
    }
  };

  const loadPipelines = async (cancelSource = cancelTokenSource) => {
    const response = await pipelineActions.getAllPipelinesV2(getAccessToken, cancelSource);
    const pipelines = response?.data?.response;

    if (Array.isArray(pipelines) && pipelines.length > 0) {

      let parsedArray = [];

      pipelines.forEach((pipeline) => {
        if (pipeline?.workflow?.run_count > 0) {
          parsedArray.push(pipeline);
        }

        if (pipeline._id === dataObject.getData("pipelineId")) {
          setDataFunction(fieldName, pipeline);
        }
      });

      setPipelines(parsedArray);
    }
  };

  const setDataFunction = (fieldName, pipeline) => {
    let newDataObject = dataObject;
    newDataObject.setData("pipelineId", pipeline?._id);
    newDataObject.setData("runNumber", pipeline?.workflow?.run_count);
    newDataObject.setData("title", `${pipeline?.name} (${pipeline?._id})`);
    setDataObject({...newDataObject});
  };

  if (visible === false) {
    return <></>;
  }

  if (!isLoading && (pipelines == null || pipelines.length === 0)) {
    return (
      <div className="form-text text-muted p-2">
        <FontAwesomeIcon icon={faExclamationCircle} className="text-muted mr-1" fixedWidth />
        No pipeline runs have been recorded, or there was a problem pulling data.
      </div>
    );
  }

  return (
    <SelectInputBase
      fieldName={fieldName}
      selectOptions={pipelines}
      dataObject={dataObject}
      setDataObject={setDataObject}
      valueField={"_id"}
      textField={(pipeline) => `${pipeline?.name} (${pipeline?._id})`}
      setDataFunction={setDataFunction}
      busy={isLoading}
      placeholderText={"Select A Pipeline"}
      disabled={disabled}
      showLabel={showLabel}
    />
  );
}

BlueprintSearchPipelineSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  visible: PropTypes.bool,
  showLabel: PropTypes.bool
};

BlueprintSearchPipelineSelectInput.defaultProps = {
  fieldName: "pipelineId"
};

export default BlueprintSearchPipelineSelectInput;