import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import teamcityStepConfigurationMetadata from "./teamcity-step-configuration-metadata";
import stepConfigurationThresholdMetadata
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/common/step-configuration-threshold-metadata";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import LoadingDialog from "components/common/status_notifications/loading";
import Model from "core/data_model/model";
import SaveButtonBase from "components/common/buttons/saving/SaveButtonBase";

function TeamCityStepConfiguration( { configurationData, parentCallback }) {
  const [thresholdDataDto, setThresholdDataDto] = useState(undefined);
  const [teamCityDataDto, setTeamCityDataDto] = useState(undefined);

  useEffect(() => {
    loadData();
  }, [configurationData]);

  const loadData = async () => {
    if (configurationData == null) {
      setTeamCityDataDto(new Model({...teamcityStepConfigurationMetadata.newObjectFields}, teamcityStepConfigurationMetadata, false));
      setThresholdDataDto(new Model({...stepConfigurationThresholdMetadata.newObjectFields}, stepConfigurationThresholdMetadata, false));
    }
    else {
      let { configuration, threshold } = configurationData;

      let configurationModelData = configuration != null ? {...configuration} : {...teamcityStepConfigurationMetadata.newObjectFields};
      setTeamCityDataDto(new Model({...configurationModelData}, teamcityStepConfigurationMetadata, false));

      let thresholdModelData = threshold != null ? {...threshold} : {...stepConfigurationThresholdMetadata.newObjectFields};
      setThresholdDataDto(new Model({...thresholdModelData}, stepConfigurationThresholdMetadata, false));
    }
  };


  const callbackFunction = () => {
    const item = {
      configuration: teamCityDataDto.getPersistData(),
      threshold: {
        ...thresholdDataDto.getPersistData()
      }
    };
    parentCallback(item);
  };

  if (teamCityDataDto == null) {
    return <LoadingDialog size="sm" />;
  }
  
  return (
    <div className="scroll-y hide-x-overflow full-height">
      <TextInputBase fieldName={"teamcityApiURL"} dataObject={teamCityDataDto} setDataObject={setTeamCityDataDto} />
      <TextInputBase fieldName={"teamcityUsername"} dataObject={teamCityDataDto} setDataObject={setTeamCityDataDto} />
      <TextInputBase type={"password"} fieldName={"teamcityPassword"} dataObject={teamCityDataDto} setDataObject={setTeamCityDataDto} />
      <TextInputBase fieldName={"teamcityBuildTypeId"} dataObject={teamCityDataDto} setDataObject={setTeamCityDataDto} />
      <TextInputBase fieldName={"teamcityProjectId"} dataObject={teamCityDataDto} setDataObject={setTeamCityDataDto} />
      <TextInputBase disabled={true} fieldName={"value"} dataObject={thresholdDataDto} setDataObject={setThresholdDataDto} />
      <div className="pt-3 pl-2">
        <SaveButtonBase recordDto={teamCityDataDto} setRecordDto={setTeamCityDataDto} updateRecord={callbackFunction} createRecord={callbackFunction} />
      </div>
      <small className="form-text text-muted mt-2 text-right">* Required Fields</small>
    </div>
  );
}

TeamCityStepConfiguration.propTypes = {
  configurationData: PropTypes.object,
  parentCallback: PropTypes.func
};

export default TeamCityStepConfiguration;