import React, { useState, useContext, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import ReviewersMultiSelectInputBase from "../../../../../../../../common/list_of_values_input/tools/git/ReviewersMultiSelectInputBase";
import {hasStringValue} from "../../../../../../../../common/helpers/string-helpers";

function GitOperationReviewerSelectInput({
  dataObject,
  setDataObject,
  source,
  repository,
  disabled,
}) {
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const isMounted = useRef(false);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    if (!repository || (hasStringValue(repository) && repository === "")) {
      let newDataObject = { ...dataObject };
      dataObject.setData("prReviewers", []);
      setDataObject({ ...newDataObject });
      return;
    }
    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [source, repository]);

  const setReviewerName = (fieldName, selectedOption) => {
    console.log(selectedOption);
    let newDataObject = { ...dataObject };
    newDataObject.setData(fieldName, selectedOption);
    setDataObject({ ...newDataObject });
  };

  return (
    <ReviewersMultiSelectInputBase
      setDataFunction={setReviewerName}
      service={dataObject?.getData("service")}
      gitToolId={dataObject?.getData("gitToolId")}
      repoId={dataObject?.getData("repoId")}
      projectId={dataObject?.getData("projectId")}
      repository={dataObject?.getData("repository")}
      workspace={dataObject?.getData("workspace")}
      setDataObject={dataObject}
      dataObject={dataObject}
      fieldName={"prReviewers"}
    />
  );
}

GitOperationReviewerSelectInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  repository: PropTypes.string,
  source: PropTypes.string,
};

export default GitOperationReviewerSelectInput;
