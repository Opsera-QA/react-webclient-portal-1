import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import toolsActions from "components/inventory/tools/tools-actions";
import {Link} from "react-router-dom";
import {getJenkinsJobTypeLabelForValue} from "components/inventory/tools/tool_details/tool_jobs/jenkins/jobs/details/inputs/JenkinsJobTypeSelectInput";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
import {faTools} from "@fortawesome/pro-light-svg-icons";

function JenkinsRegistryToolJobSelectInput(
  {
    jenkinsToolId,
    visible,
    typeFilter,
    fieldName,
    model,
    setModel,
    setDataFunction,
    clearDataFunction,
    disabled,
    valueField,
    textField,
  }) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [jenkinsJobs, setJenkinsJobs] = useState([]);
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


    setJenkinsJobs([]);
    if (jenkinsToolId != null && jenkinsToolId !== "") {
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
  }, [jenkinsToolId]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadJenkinsJobs(cancelSource);
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const loadJenkinsJobs = async (cancelSource = cancelTokenSource) => {
    // TODO: Make route that actually just returns jobs
    const response = await toolsActions.getRoleLimitedToolByIdV3(getAccessToken, cancelSource, jenkinsToolId);
    const jenkinsJobs = response?.data?.data?.jobs;
    const existingJobSelection = model?.getData(fieldName);

    if (Array.isArray(jenkinsJobs) && jenkinsJobs.length > 0) {
      if (typeFilter) {
        let filteredJobs = jenkinsJobs.filter((job) => {return job.type[0] === typeFilter;});

        if (Array.isArray(filteredJobs) && existingJobSelection != null && existingJobSelection !== "") {
          // TODO: We should probably pass in valueField and check based on that.
          const existingJob = jenkinsJobs.find((x) => x._id === existingJobSelection);

          if (existingJob == null) {
            toastContext.showLoadingErrorDialog(
              "Preselected job is no longer available. It may have been deleted. Please select another job from the list or recreate the job in Tool Registry."
            );
          }
        }
        setJenkinsJobs(filteredJobs);
      } else {
        setJenkinsJobs(jenkinsJobs);

        if (existingJobSelection != null && existingJobSelection !== "") {
          const existingJob = jenkinsJobs.find((x) => x._id === existingJobSelection);
          if (existingJob == null) {
            toastContext.showLoadingErrorDialog(
              "Preselected job is no longer available. It may have been deleted. Please select another job from the list or recreate the job in Tool Registry."
            );
          }
        } 
      }
    }
  };

  const getPlaceholderText = () => {
    if (!isLoading && (jenkinsJobs == null || jenkinsJobs.length === 0 && jenkinsToolId != null && jenkinsToolId !== "")) {
      return (`No configured ${typeFilter ? typeFilter + " " : ""} Jenkins Jobs have been registered for this Jenkins tool.`);
    }

    return ("Select Jenkins Job");
  };

  const closePanel = () => {
    toastContext.clearInfoOverlayPanel();
  };

  // TODO: Make tool job overlay
  const renderOverlayTrigger = () => {
    const toolJobId = model?.getData(fieldName);
    const jenkinsJobIndex = jenkinsJobs.findIndex((x) => x._id === toolJobId);
    const jenkinsJob = jenkinsJobIndex !== -1 ? jenkinsJobs[jenkinsJobIndex] : undefined;

    if (jenkinsJob) {
      return (
        <FullScreenCenterOverlayContainer
          closePanel={closePanel}
          showPanel={true}
          titleText={`Tool Job Details`}
          titleIcon={faTools}
          showToasts={true}
          fullWidth={true}
        >
          <div className={"p-2"}>
            <div className="text-muted mb-2">
              Configuration details for this item are listed below. Tool and account specific settings are stored in
              the
              <Link to="/inventory/tools">Tool Registry</Link>. To add a new entry to a dropdown or update settings,
              make those changes there.
            </div>
            {jenkinsJob?.configuration && (
              <>
                {Object.entries(jenkinsJob?.configuration).map(function (a) {
                  return (
                    <div key={a}>
                      {a[1] != null && a[1].length > 0 && (
                        <>
                          <span className="text-muted pr-1">{a[0]}: </span> {a[1]}
                        </>
                      )}
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </FullScreenCenterOverlayContainer>
      );
    }
  };

  if (visible === false) {
    return <></>;
  }

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      setDataFunction={setDataFunction}
      selectOptions={jenkinsJobs}
      placeholderText={getPlaceholderText()}
      busy={isLoading}
      groupBy={(job) => getJenkinsJobTypeLabelForValue(job?.type)}
      valueField={valueField}
      textField={textField}
      infoOverlay={renderOverlayTrigger()}
      clearDataFunction={clearDataFunction}
      disabled={disabled || jenkinsToolId === ""}
    />
  );
}

JenkinsRegistryToolJobSelectInput.propTypes = {
  jenkinsToolId: PropTypes.string,
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
  visible: PropTypes.bool,
  typeFilter: PropTypes.string,
  configurationRequired: PropTypes.bool,
  clearDataFunction: PropTypes.func,
  valueField: PropTypes.string,
  textField: PropTypes.string,
};

JenkinsRegistryToolJobSelectInput.defaultProps = {
  valueField: "_id",
  textField: "name",
};

export default JenkinsRegistryToolJobSelectInput;