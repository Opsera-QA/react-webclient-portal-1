import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getMissingRequiredFieldsErrorDialog } from "components/common/toasts/toasts";
import StepConfigBitbucketWorkspaceInput from "../common/inputs/StepConfigBitbucketWorkspaceInput";
import StepConfigGitBranchInput from "../common/inputs/StepConfigGitBranchInput";
import StepConfigGitRepositoryInput from "../common/inputs/StepConfigGitRepositoryInput";
import StepConfigJenkinsAccountInput from "../common/inputs/StepConfigJenkinsAccountInput";
import StepConfigJenkinsToolInput from "../common/inputs/StepConfigJenkinsToolInput";
import PipelineStepEditorPanelContainer
  from "components/common/panels/detail_panel_container/PipelineStepEditorPanelContainer";
import mongodbRealmStepFormMetadata from "./mongodb-realm-stepForm-metadata";
import modelHelpers from "components/common/model/modelHelpers";
import DetailPanelLoadingDialog from "components/common/loading/DetailPanelLoadingDialog";
import RoleRestrictedMongoDbRealmToolSelectInput from "components/common/list_of_values_input/tools/mongodb_realm/RoleRestrictedMongoDbRealmToolSelectInput";
import MongodbRealmSchemaMapInput from "./inputs/MongodbRealmSchemaMapInput";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import _ from "lodash";

function MongodbRealmStepConfiguration({ 
  pipelineId, 
  stepTool, 
  stepId, 
  createJob, 
  closeEditorPanel,
  setToast,
  setShowToast
}) {
    const [isLoading, setIsLoading] = useState(false); 
    const [mongodbRealmStepConfigurationDto, setMongodbRealmStepConfigurationDto] = useState(undefined);
    const [thresholdVal, setThresholdValue] = useState("");
    const [thresholdType, setThresholdType] = useState("");

    useEffect(() => {
        loadData();
      }, []);
    
      const loadData = async () => {
        setIsLoading(true);        

        let { threshold } = stepTool;

        let mongodbRealmConfigurationData = modelHelpers.getPipelineStepConfigurationModel(stepTool, mongodbRealmStepFormMetadata);
        setMongodbRealmStepConfigurationDto(mongodbRealmConfigurationData);

        if (threshold) {
          setThresholdType(threshold?.type);
          setThresholdValue(threshold?.value);
        }

        setIsLoading(false);
      };


      const handleCreateAndSave = async () => {
        const toolId = mongodbRealmStepConfigurationDto.getData("toolConfigId");
        
        if (validateRequiredFields() && toolId) {
          // setLoading(true);
          
          const createJobPostBody = {
            jobId: "",
            pipelineId: pipelineId,
            stepId: stepId,
            buildParams: {},
          };
          
          
    
          const toolConfiguration = {
            configuration: mongodbRealmStepConfigurationDto.getPersistData(),
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
          mongodbRealmStepConfigurationDto.getData("toolConfigId").length === 0 ||
          mongodbRealmStepConfigurationDto.getData("jenkinsUrl").length === 0 ||
          mongodbRealmStepConfigurationDto.getData("jUserId").length === 0 ||
          mongodbRealmStepConfigurationDto.getData("jAuthToken").length === 0
        ) {
            let toast = getMissingRequiredFieldsErrorDialog(setShowToast, "stepConfigurationTop");
            setToast(toast);
            setShowToast(true);        
            return false;
        } else {
            return true;
        }
      };
    
      if (isLoading || mongodbRealmStepConfigurationDto == null) {
        return <DetailPanelLoadingDialog />;
      }

      const disableSaveButton = () => {
        return (
          mongodbRealmStepConfigurationDto.getData("toolConfigId").length === 0 ||
          mongodbRealmStepConfigurationDto.getData("jenkinsUrl").length === 0 ||
          mongodbRealmStepConfigurationDto.getData("jUserId").length === 0 ||
          mongodbRealmStepConfigurationDto.getData("jAuthToken").length === 0 || 
          mongodbRealmStepConfigurationDto.getData("mongoToolId").length === 0 ||
          mongodbRealmStepConfigurationDto.getData("applicationName").length === 0 ||
          mongodbRealmStepConfigurationDto.getData("gitCredential").length === 0 ||
          mongodbRealmStepConfigurationDto.getData("repository").length === 0 ||
          mongodbRealmStepConfigurationDto.getData("gitBranch").length === 0 ||
          _.isEmpty(mongodbRealmStepConfigurationDto.getData("schemaGitFileList"))
        );
      };

      return (
        <PipelineStepEditorPanelContainer
          handleClose={closeEditorPanel}
          recordDto={mongodbRealmStepConfigurationDto}
          persistRecord={handleCreateAndSave}
          isLoading={isLoading}
          isStrict={true}
          disableSaveButton={disableSaveButton()}
        >
          <StepConfigJenkinsToolInput model={mongodbRealmStepConfigurationDto} setModel={setMongodbRealmStepConfigurationDto} />
          <RoleRestrictedMongoDbRealmToolSelectInput model={mongodbRealmStepConfigurationDto} setModel={setMongodbRealmStepConfigurationDto} fieldName="mongoToolId" />
          <TextInputBase dataObject={mongodbRealmStepConfigurationDto} setDataObject={setMongodbRealmStepConfigurationDto} fieldName="applicationName" />
          <StepConfigJenkinsAccountInput dataObject={mongodbRealmStepConfigurationDto} setDataObject={setMongodbRealmStepConfigurationDto} />
          <StepConfigBitbucketWorkspaceInput dataObject={mongodbRealmStepConfigurationDto} setDataObject={setMongodbRealmStepConfigurationDto} />
          <StepConfigGitRepositoryInput dataObject={mongodbRealmStepConfigurationDto} setDataObject={setMongodbRealmStepConfigurationDto} />
          <StepConfigGitBranchInput dataObject={mongodbRealmStepConfigurationDto} setDataObject={setMongodbRealmStepConfigurationDto} />
          <MongodbRealmSchemaMapInput dataObject={mongodbRealmStepConfigurationDto} setDataObject={setMongodbRealmStepConfigurationDto} fieldName="schemaGitFileList" />
        </PipelineStepEditorPanelContainer>
      );
}

MongodbRealmStepConfiguration.propTypes = {
    pipelineId: PropTypes.string,
    stepId: PropTypes.string,
    createJob: PropTypes.func,
    stepTool: PropTypes.object,
    closeEditorPanel: PropTypes.func,
  setToast: PropTypes.func,
  setShowToast: PropTypes.func
};
    
export default MongodbRealmStepConfiguration;
