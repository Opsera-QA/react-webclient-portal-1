import React, {useContext, useEffect, useState, useRef} from "react";
import PropTypes from "prop-types";
import {faExclamationCircle} from "@fortawesome/pro-light-svg-icons";
import axios from 'axios';
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import pipelineActions from "components/workflow/pipeline-actions";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import IconBase from "components/common/icons/IconBase";
import useComponentStateReference from "hooks/useComponentStateReference";

function BlueprintSearchPipelineSelectInput({ visible, fieldName, dataObject, setDataObject, disabled, showLabel}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [pipelines, setPipelines] = useState([]);
  const [disabledPipelines, setDisabledPipelines] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPipeline, setCurrentPipeline] = useState(undefined);
  const {
    cancelTokenSource,
    isMounted,
  } = useComponentStateReference();

  useEffect(() => {
    loadData(searchTerm).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });
  }, [searchTerm]);

  const loadData = async (searchTerm) => {
    let canceled = false;
    try {
      setIsLoading(true);
      canceled = await loadPipelines(searchTerm);
    }
    catch (error) {
      if(isMounted?.current === true){
        console.error(error);
        toastContext.showLoadingErrorDialog(error);
      }
    }
    finally {
      if(isMounted?.current === true && canceled !== true){
        setIsLoading(false);
      }
    }
  };

  const loadPipelines = async (searchTerm) => {
    const fields = [
      "name",
      "_id",
      "owner",
      "roles",
      "workflow.run_count"
    ];
    const response = await pipelineActions.getPipelinesV3(getAccessToken, cancelTokenSource, undefined, searchTerm, "all", fields);
    const pipelines = response?.data?.data;

    if (Array.isArray(pipelines) && pipelines.length > 0) {

      let disabledArray = [];

      pipelines.forEach((pipeline) => {
        if (pipeline?.workflow?.run_count === 0) {
          disabledArray.push(pipeline);
        }

        if (pipeline._id === dataObject?.getData("pipelineId")) {
          let newDataObject = dataObject;
          newDataObject.setData("title", `${pipeline?.name} (${pipeline?._id})`);
          setCurrentPipeline(pipeline);
          setDataObject({...newDataObject});
        }
      });

      pipelines.sort((pipeline) => pipeline?.workflow?.run_count === 0 ? 1 : -1);

      if (currentPipeline && !pipelines.some(pipeline => pipeline._id === currentPipeline?._id)) {pipelines.push(currentPipeline);}
      setDisabledPipelines(disabledArray);
      setPipelines(pipelines);
    }

    return false;
  };

  const setDataFunction = (fieldName, pipeline) => {
    let newDataObject = dataObject;
    newDataObject.setData("pipelineId", pipeline?._id);
    newDataObject.setData("runNumber", pipeline?.workflow?.run_count);
    newDataObject.setData("title", `${pipeline?.name} (${pipeline?._id})`);
    setCurrentPipeline(pipeline);
    setDataObject({...newDataObject});
  };

  const getTextField = (pipeline) => {
    if (pipeline) {
      return `${pipeline?.name} (${pipeline?._id})`;
    }

    if (isLoading) {
      return "Loading Data";
    }

    return dataObject?.getData(fieldName);
  };

  if (visible === false) {
    return <></>;
  }

  if (!isLoading && (pipelines == null)) {
    return (
      <div className="form-text text-muted p-2">
        <IconBase icon={faExclamationCircle} className={"text-muted mr-1"} />
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
      textField={getTextField}
      setDataFunction={setDataFunction}
      busy={isLoading}
      placeholderText={"Select A Pipeline"}
      disabled={disabledPipelines}
      onSearchFunction={(searchTerm) => {setSearchTerm(searchTerm);}}
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
