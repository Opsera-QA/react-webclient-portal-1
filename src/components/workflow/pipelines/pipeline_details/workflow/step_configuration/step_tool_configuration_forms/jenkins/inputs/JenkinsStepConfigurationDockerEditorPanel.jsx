import React, { useState } from "react";
import PropTypes from "prop-types";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import JsonInput from "components/common/inputs/object/JsonInput";
import DockerSecretsInput from "../DockerSecretsInput";
import _ from "lodash";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import DockerTagTypeSelectionInput from "./DockerTagTypeSelectionInput";

function JenkinsStepConfigurationDockerEditorPanel({ dataObject, setDataObject }) {
  const [deleteDockerSecrets, setDeleteDockerSecrets] = useState(false);

  const loadDockerTags =()=>{
    return (
      <>
        <BooleanToggleInput dataObject={dataObject} setDataObject={setDataObject} fieldName={"dynamicTag"} />
        {!dataObject.getData("dynamicTag") && (
          <TextInputBase dataObject={dataObject} setDataObject={setDataObject} fieldName={"dockerTagName"} />
        )}
        {dataObject.getData("dynamicTag") && (
          <>
            <DockerTagTypeSelectionInput
              dataObject={dataObject}
              setDataObject={setDataObject}
              fieldName={"dockerTagType"}
            />
            {dataObject.getData("dockerTagType") === "other" && (
              <TextInputBase dataObject={dataObject} setDataObject={setDataObject} fieldName={"dockerDynamicTagName"} />
            )}
          </>
        )}
      </>
    );
  };

  if (dataObject == null || dataObject.getData("buildType") !== "docker") {
    return null;
  }

  return (
    <div className={"mb-3"}>
      <TextInputBase disabled={false} fieldName={"dockerName"} dataObject={dataObject} setDataObject={setDataObject} />
      {loadDockerTags()}
      <TextInputBase disabled={false} fieldName={"dockerPath"} dataObject={dataObject} setDataObject={setDataObject} />
      <div className="text-muted mb-2">
        Enter Runtime Build arguments as a key value pair JSON. You can add any number of runtime arguments to
        the JSON Object. Sample: {" { Key1: Value1, Key2: value2 }"}
      </div>
      <JsonInput fieldName={"buildArgs"} dataObject={dataObject} setDataObject={setDataObject} />
      <DockerSecretsInput
        setDataObject={setDataObject}
        dataObject={dataObject}
        deleteDockerSecrets={deleteDockerSecrets}
        setDeleteDockerSecrets={setDeleteDockerSecrets}
        addSecret={deleteDockerSecrets || _.isEmpty(dataObject.data.dockerBuildPathJson)}
      />
    </div>
  );
}

JenkinsStepConfigurationDockerEditorPanel.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
};

export default JenkinsStepConfigurationDockerEditorPanel;
