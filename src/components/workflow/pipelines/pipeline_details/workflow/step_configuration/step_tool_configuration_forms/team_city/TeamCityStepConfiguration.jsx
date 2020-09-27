import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import teamcityStepConfigurationMetadata from "./teamcity-step-configuration-metadata";
import Model from "../../../../../../../../core/data_model/model";
import DtoTextInput from "../../../../../../../common/input/dto_input/dto-text-input";
import SaveButton from "../../../../../../../common/buttons/SaveButton";
import LoadingDialog from "../../../../../../../common/status_notifications/loading";
import stepConfigurationThresholdMetadata from "../common/step-configuration-threshold-metadata";

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
    return <LoadingDialog size="sm" />
  }
  
  return (
    <div className="scroll-y full-height">
      <DtoTextInput fieldName={"teamcityApiURL"} dataObject={teamCityDataDto} setDataObject={setTeamCityDataDto} />
      <DtoTextInput fieldName={"teamcityUsername"} dataObject={teamCityDataDto} setDataObject={setTeamCityDataDto} />
      <DtoTextInput type={"password"} fieldName={"teamcityPassword"} dataObject={teamCityDataDto} setDataObject={setTeamCityDataDto} />
      <DtoTextInput fieldName={"teamcityBuildTypeId"} dataObject={teamCityDataDto} setDataObject={setTeamCityDataDto} />
      <DtoTextInput fieldName={"teamcityProjectId"} dataObject={teamCityDataDto} setDataObject={setTeamCityDataDto} />
      <DtoTextInput disabled={true} fieldName={"value"} dataObject={thresholdDataDto} setDataObject={setThresholdDataDto} />
      <div className="pt-3 pl-2">
        <SaveButton recordDto={teamCityDataDto} setRecordDto={setTeamCityDataDto} updateRecord={callbackFunction} createRecord={callbackFunction} />
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