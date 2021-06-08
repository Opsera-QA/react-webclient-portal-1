import React, { useState } from "react";
import PropTypes from "prop-types";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import JsonInput from "components/common/inputs/object/JsonInput";
import DockerSecretsInput from "../DockerSecretsInput";
import _ from "lodash";

function JenkinsDockerPanel({ dataObject, setDataObject }) {
  const [deleteDockerSecrets, setDeleteDockerSecrets] = useState(false);


  if (dataObject.data.buildType != "docker") {
    return null;
  }

  return (
    <div className={"mb-3"}>
      <TextInputBase disabled={false} fieldName={"dockerName"} dataObject={dataObject} setDataObject={setDataObject} />
      <TextInputBase
        disabled={false}
        fieldName={"dockerTagName"}
        dataObject={dataObject}
        setDataObject={setDataObject}
      />
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

JenkinsDockerPanel.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
};

export default JenkinsDockerPanel;
