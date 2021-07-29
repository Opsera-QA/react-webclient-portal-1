import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import twistlockPipelineStepConfigurationMetadata from "./twistlockPipelineStepConfigurationMetadata";
import modelHelpers from "components/common/model/modelHelpers";
import DetailPanelLoadingDialog from "components/common/loading/DetailPanelLoadingDialog";
import StepConfigBitbucketWorkspaceInput from "../common/inputs/StepConfigBitbucketWorkspaceInput";
import StepConfigGitBranchInput from "../common/inputs/StepConfigGitBranchInput";
import StepConfigGitRepositoryInput from "../common/inputs/StepConfigGitRepositoryInput";
import StepConfigJenkinsAccountInput from "../common/inputs/StepConfigJenkinsAccountInput";
import StepConfigJenkinsJobInput from "../common/inputs/StepConfigJenkinsJobInput";
import StepConfigJenkinsToolInput from "../common/inputs/StepConfigJenkinsToolInput";
import PipelineStepEditorPanelContainer
  from "components/common/panels/detail_panel_container/PipelineStepEditorPanelContainer";
import { 
    getMissingRequiredFieldsErrorDialog    
  } from "../../../../../../../common/toasts/toasts";

function TwistlockStepConfiguration ({
    stepTool,
    pipelineId,
    plan,
    stepId,
    parentCallback,
    callbackSaveToVault,
    createJob,
    setToast,
    setShowToast,
    closeEditorPanel
}) {
    const [isLoading, setIsLoading] = useState(false);
    const [jobType, setJobType] = useState("");
    const [twistLockStepConfigurationDto, setTwistLockStepConfigurationDto] = useState(undefined);
    const [thresholdVal, setThresholdValue] = useState("");
    const [thresholdType, setThresholdType] = useState("");
    const [listOfSteps, setListOfSteps] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        if (plan && stepId) {
          setListOfSteps(formatStepOptions(plan, stepId));
        }
      }, [plan, stepId]);

    const formatStepOptions = (plan, stepId) => {
        let STEP_OPTIONS = plan.slice(
            0,
            plan.findIndex((element) => element._id === stepId)
        );
        STEP_OPTIONS.unshift({ _id: "", name: "Select One", isDisabled: "yes" });
        return STEP_OPTIONS;
    };
    
    const loadData = async () => {
        setIsLoading(true);
        let { threshold, job_type } = stepTool;
        let twistLockConfigurationData = modelHelpers.getPipelineStepConfigurationModel(stepTool, twistlockPipelineStepConfigurationMetadata);

        if (twistLockConfigurationData.getData("sourceScript") === true) {
            twistLockConfigurationData.setMetaDataFields(twistlockPipelineStepConfigurationMetadata.fields);
        }        

        setTwistLockStepConfigurationDto(twistLockConfigurationData);

        if (job_type) {
            setJobType(job_type);
        }

        if (threshold) {
            setThresholdType(threshold?.type);
            setThresholdValue(threshold?.value);
        }

        setIsLoading(false);
    };

    const handleCreateAndSave = async () => {
        const toolId = twistLockStepConfigurationDto.getData("toolConfigId");

        if (validateRequiredFields() && toolId) {
            setLoading(true);            

            const createJobPostBody = {
                jobId: "",
                pipelineId: pipelineId,
                stepId: stepId,
                buildParams: {},
                // buildParams: {
                //     stepId: formData.stepIdXML && formData.stepIdXML,
                // },
            };

            const toolConfiguration = {
                configuration: twistLockStepConfigurationDto.getPersistData(),
                threshold: {
                    type: thresholdType,
                    value: thresholdVal,
                },
                job_type: "opsera-job",
            };

            await createJob(toolId, toolConfiguration, stepId, createJobPostBody);
        }
    };

    const validateRequiredFields = () => {
        if (
            twistLockStepConfigurationDto.getData("toolConfigId").length === 0 ||
            twistLockStepConfigurationDto.getData("jenkinsUrl").length === 0 ||
            twistLockStepConfigurationDto.getData("jUserId").length === 0 ||
            twistLockStepConfigurationDto.getData("jAuthToken").length === 0 ||
            (twistLockStepConfigurationDto.getData("buildType") === "docker"
                ? twistLockStepConfigurationDto.getData("dockerName").length === 0 || 
                twistLockStepConfigurationDto.getData("dockerTagName").length === 0
                : false)
        ) {
            let toast = getMissingRequiredFieldsErrorDialog(setShowToast, "stepConfigurationTop");
            setToast(toast);
            setShowToast(true);
            return false;
        } else {
            return true;
        }
    };

    if (isLoading || twistLockStepConfigurationDto == null) {
        return <DetailPanelLoadingDialog />;
    }

    return (
        <PipelineStepEditorPanelContainer
          handleClose={closeEditorPanel}
          recordDto={twistLockStepConfigurationDto}
          persistRecord={handleCreateAndSave}
          isLoading={isLoading}
        >
          <StepConfigJenkinsToolInput dataObject={twistLockStepConfigurationDto} setDataObject={setTwistLockStepConfigurationDto} />
          <StepConfigJenkinsJobInput dataObject={twistLockStepConfigurationDto} setDataObject={setTwistLockStepConfigurationDto} typeFilter={""} />
          <StepConfigJenkinsAccountInput dataObject={twistLockStepConfigurationDto} setDataObject={setTwistLockStepConfigurationDto} />
          <StepConfigBitbucketWorkspaceInput dataObject={twistLockStepConfigurationDto} setDataObject={setTwistLockStepConfigurationDto} />
          <StepConfigGitRepositoryInput dataObject={twistLockStepConfigurationDto} setDataObject={setTwistLockStepConfigurationDto} />
          <StepConfigGitBranchInput dataObject={twistLockStepConfigurationDto} setDataObject={setTwistLockStepConfigurationDto} />
        </PipelineStepEditorPanelContainer>
    );
}

TwistlockStepConfiguration.propTypes = {
    pipelineId: PropTypes.string,
    stepId: PropTypes.string,
    createJob: PropTypes.func,
    stepTool: PropTypes.object,
    closeEditorPanel: PropTypes.func,
    plan: PropTypes.object,
    parentCallback: PropTypes.func,
    callbackSaveToVault: PropTypes.func,
    setToast: PropTypes.func,
    setShowToast: PropTypes.func
};

export default TwistlockStepConfiguration;