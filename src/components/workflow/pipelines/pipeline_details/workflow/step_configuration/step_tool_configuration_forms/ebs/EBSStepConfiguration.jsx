import React, { useEffect, useState } from "react";
import DetailPanelLoadingDialog from "components/common/loading/DetailPanelLoadingDialog";
import PipelineStepEditorPanelContainer
  from "components/common/panels/detail_panel_container/PipelineStepEditorPanelContainer";
import PropTypes from "prop-types";
import ebsStepFormMetadata
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/ebs/ebs-stepForm-metadata";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import AWSToolSelectInput from "components/inventory/tools/tool_details/tool_jobs/octopus/applications/details/input/AWSToolSelectInput";
import pipelineHelpers from "components/workflow/pipelineHelpers";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import JsonInput from "components/common/inputs/object/JsonInput";
import Model from "core/data_model/model";
import EBSAccessOptionsInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/ebs/inputs/EBSAccessOptionsInput";
import EBSBucketInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/ebs/inputs/EBSBucketInput";
import EBSKeyPairInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/ebs/inputs/EBSKeyPairInput";
import EBSPlatformOptionsInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/ebs/inputs/EBSPlatformOptionsInput";
import EBSCreateDomainToggleInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/ebs/inputs/EBSCreateDomainToggleInput";
function EBSStepConfiguration({ stepTool, plan, stepId, parentCallback, getToolsList, callbackSaveToVault, pipelineId, closeEditorPanel }) {
  const [isLoading, setIsLoading] = useState(false);
  const [listOfSteps, setListOfSteps] = useState([]);
  const [jobType, setJobType] = useState("");  
  const [thresholdVal, setThresholdValue] = useState("");
  const [thresholdType, setThresholdType] = useState("");
  const [ebsStepConfigurationDto, setEBSStepConfigurationDataDto] = useState(undefined);


  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    console.log(stepTool);
    let { configuration, threshold } = stepTool;

    if (typeof configuration !== "undefined") {
      setEBSStepConfigurationDataDto(new Model(configuration, ebsStepFormMetadata, false));
      if (typeof threshold !== "undefined") {
        setThresholdType(threshold.type);
        setThresholdValue(threshold.value);
      }
    } else {
      setEBSStepConfigurationDataDto(
        new Model({ ...ebsStepFormMetadata.newObjectFields }, ebsStepFormMetadata, false)
      );
    }

    if (plan && stepId) {
      let pipelineSteps = pipelineHelpers.formatStepOptions(plan, stepId);
      setListOfSteps(pipelineSteps);
    }
    setIsLoading(false);
  };

  const getDynamicFields = () => {
    if (ebsStepConfigurationDto.getData("createDomain") === true) {
      return (
        <div>
          <TextInputBase
            setDataObject={setEBSStepConfigurationDataDto}
            dataObject={ebsStepConfigurationDto}
            fieldName={"hostedZoneId"}
          />
          <TextInputBase
            setDataObject={setEBSStepConfigurationDataDto}
            dataObject={ebsStepConfigurationDto}
            fieldName={"domainName"}
          />
        </div>
      );
    }
  };

  const setStepId = (fieldName, selectedOption) => {
    let newDataObject = {...ebsStepConfigurationDto};
    newDataObject.setData("s3ECRStepId", selectedOption._id);
    newDataObject.setData("tool_identifier", selectedOption?.tool?.tool_identifier);
    setEBSStepConfigurationDataDto({...newDataObject});
  };
  
  const clearStepIdFunction = () => {
    let newDataObject = {...ebsStepConfigurationDto};
    newDataObject.setData("s3ECRStepId", "");
    newDataObject.setData("tool_identifier", "");
    setEBSStepConfigurationDataDto({...newDataObject});
  };

  const getJsonInputs = () => {
    if (ebsStepConfigurationDto.getData("tool_identifier") === "docker-push") {
      return (
        <div>
          <JsonInput fieldName={"dockerVolumePath"} model={ebsStepConfigurationDto} setModel={setEBSStepConfigurationDataDto}/>
          <JsonInput fieldName={"environments"} model={ebsStepConfigurationDto} setModel={setEBSStepConfigurationDataDto}/>
        </div>
      );
    }
  };

  const handleCreateAndSave = async () => {
    let newConfiguration = ebsStepConfigurationDto.getPersistData();

    const item = {
      configuration: newConfiguration,
      threshold: {
        type: thresholdType,
        value: thresholdVal,
      },
    };
    parentCallback(item);
  };

  if (isLoading || ebsStepConfigurationDto == null) {
    return <DetailPanelLoadingDialog />;
  }

  return (
    <PipelineStepEditorPanelContainer
      handleClose={closeEditorPanel}
      recordDto={ebsStepConfigurationDto}
      persistRecord={handleCreateAndSave}
      isLoading={isLoading}
    >
      <AWSToolSelectInput
        fieldName={"awsToolConfigId"}
        dataObject={ebsStepConfigurationDto}
        setDataObject={setEBSStepConfigurationDataDto}
      />
      <EBSBucketInput
          fieldName={"bucketName"}
          dataObject={ebsStepConfigurationDto}
          setDataObject={setEBSStepConfigurationDataDto}
      />
      <EBSKeyPairInput
        fieldName={"ec2KeyName"}
        dataObject={ebsStepConfigurationDto}
        setDataObject={setEBSStepConfigurationDataDto}
      />
      <TextInputBase
        setDataObject={setEBSStepConfigurationDataDto}
        dataObject={ebsStepConfigurationDto}
        fieldName={"port"}
      />
      <EBSPlatformOptionsInput  dataObject={ebsStepConfigurationDto} setDataObject={setEBSStepConfigurationDataDto} fieldName={"platform"}/>
      <TextInputBase
        setDataObject={setEBSStepConfigurationDataDto}
        dataObject={ebsStepConfigurationDto}
        fieldName={"applicationName"}
      />
      <TextInputBase
        setDataObject={setEBSStepConfigurationDataDto}
        dataObject={ebsStepConfigurationDto}
        fieldName={"environmentName"}
      />
      <TextInputBase
        setDataObject={setEBSStepConfigurationDataDto}
        dataObject={ebsStepConfigurationDto}
        fieldName={"description"}
      />
      <TextInputBase
        setDataObject={setEBSStepConfigurationDataDto}
        dataObject={ebsStepConfigurationDto}
        fieldName={"applicationVersionLabel"}
      />
      <SelectInputBase
        setDataObject={setEBSStepConfigurationDataDto}
        textField={"name"}
        valueField={"_id"}
        dataObject={ebsStepConfigurationDto}
        setDataFunction={setStepId}
        clearDataFunction={clearStepIdFunction}
        filter={"contains"}
        selectOptions={listOfSteps ? listOfSteps : []}
        fieldName={"s3ECRStepId"}
      />
      {getJsonInputs()}
      <EBSAccessOptionsInput fieldName={"bucketAccess"} dataObject={ebsStepConfigurationDto} setDataObject={setEBSStepConfigurationDataDto} />
      <EBSCreateDomainToggleInput dataObject={ebsStepConfigurationDto} setDataObject={setEBSStepConfigurationDataDto} fieldName={"createDomain"}/>
      {getDynamicFields()}
    </PipelineStepEditorPanelContainer>
  );
}

EBSStepConfiguration.propTypes = {
  stepTool: PropTypes.object,
  plan: PropTypes.array,
  stepId: PropTypes.string,
  parentCallback: PropTypes.func,
  callbackSaveToVault: PropTypes.func,
  pipelineId: PropTypes.string,
  getToolsList: PropTypes.func,
  closeEditorPanel: PropTypes.func
};

export default EBSStepConfiguration;
