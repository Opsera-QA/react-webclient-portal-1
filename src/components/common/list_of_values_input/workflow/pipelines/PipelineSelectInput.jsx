import React, {useContext, useEffect, useState, useRef} from "react";
import PropTypes from "prop-types";
import {faExclamationCircle} from "@fortawesome/pro-light-svg-icons";
import {Link} from "react-router-dom";
import Model from "core/data_model/model";
import axios from 'axios';
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import pipelineActions from "components/workflow/pipeline-actions";
import pipelineMetadata from "components/workflow/pipelines/pipeline_details/pipeline-metadata";
import PipelineSummaryCard from "components/workflow/pipelines/pipeline_details/pipeline_activity/PipelineSummaryCard";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import IconBase from "components/common/icons/IconBase";

function PipelineSelectInput({ visible, fieldName, dataObject, setDataObject, disabled, fields}) {
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
    const response = await pipelineActions.getPipelinesV3(getAccessToken, cancelSource, undefined, undefined, fields);
    const pipelines = response?.data?.data;

    if (isMounted.current === true && Array.isArray(pipelines)) {
      setPipelines(pipelines);
    }
  };

  // TODO: Make pipeline list component with link to pipeline (open in new window)
  const getSelectedPipelineSummary = (selectedPipelineId) => {
    let foundPipeline = pipelines.find(pipeline => pipeline._id === selectedPipelineId);

    if (foundPipeline != null) {
      let pipelineDataObject = new Model({...foundPipeline.pipeline}, pipelineMetadata, false);
      let run = foundPipeline.workflow?.lastRun?.run;
      return (<PipelineSummaryCard pipelineData={pipelineDataObject} run={run != null ? `${run}` : `0`} /> );
    }

    return ('Could not get pipeline details. Pipeline may have been deleted');
  };

  const getPipelineSummaries = () => {
    if (dataObject.getData(fieldName) !== "" && !isLoading) {
      return (
        <div>
          {getSelectedPipelineSummary(dataObject.getData(fieldName))}
        </div>
      );
    }

    return <span>Select a pipeline to get started.</span>;
  };

  const getNoDataMessage = () => {
    if (!isLoading && (!Array.isArray(pipelines) || pipelines.length === 0)) {
      return (
        <div className="form-text text-muted p-2">
          <IconBase icon={faExclamationCircle} className={"text-muted mr-1"} />
          No other pipelines have been registered. Please go to <Link to="/workflow">Pipelines</Link> and add another pipeline in order to
          configure this field.
        </div>
      );
    }
  };

  if (visible === false) {
    return <></>;
  }

  return (
    <div>
      <SelectInputBase
        fieldName={fieldName}
        selectOptions={pipelines}
        dataObject={dataObject}
        setDataObject={setDataObject}
        valueField={"_id"}
        textField={(pipeline) => `${pipeline?.name} (${pipeline?._id})`}
        busy={isLoading}
        placeholderText={"Select A Pipeline"}
        disabled={disabled}
      />
      {getNoDataMessage()}
    </div>
  );
}

PipelineSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array
  ]),
  visible: PropTypes.bool,
  fields: PropTypes.array,
};

export default PipelineSelectInput;