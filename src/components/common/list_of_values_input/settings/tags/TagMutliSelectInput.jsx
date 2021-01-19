import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamationCircle} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import adminTagsActions from "components/settings/tags/admin-tags-actions";
import {faTag} from "@fortawesome/pro-light-svg-icons";
import MultiSelectInputBase from "components/common/inputs/select/MultiSelectInputBase";

function TagMutliSelectInput({ fieldName, dataObject, setDataObject, setDataFunction, disabled, textField, valueField}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [tags, setTags] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true)
      await loadTags();
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const loadTags = async () => {
    const response = await adminTagsActions.getAllTags(getAccessToken);
    setTags(response?.data?.data);
  };

  const getInfoText = () => {
    if (dataObject.getData(fieldName) !== "") {
      return (
        <Link to={`/settings/tags/${dataObject.getData(fieldName)}`}>
          <span><FontAwesomeIcon icon={faTag} className="pr-1" />View Or Edit this Tag's settings</span>
        </Link>
      );
    }

    return <span>Select a tag to get started.</span>
  };

  if (!isLoading && (tags == null || tags.length === 0)) {
    return (
      <div className="form-text text-muted p-2">
        <FontAwesomeIcon icon={faExclamationCircle} className="text-muted mr-1" fixedWidth />
        No tags have been registered.
        Please go to
        <Link to="/settings/tags">Tags</Link> and add an entry for this repository in order to
        proceed.
      </div>
    )
  }

  return (
    <div>
      <MultiSelectInputBase
        fieldName={fieldName}
        dataObject={dataObject}
        setDataObject={setDataObject}
        setDataFunction={setDataFunction}
        selectOptions={tags}
        busy={isLoading}
        valueField={valueField}
        textField={(tag) => `${tag["type"]}: ${tag["value"]}`}
        groupBy={"type"}
        // placeholderText={placeholderText}
        disabled={disabled || isLoading}
      />
      <small className="text-muted ml-3">
        {getInfoText()}
      </small>
    </div>
  );
}

TagMutliSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string
};

export default TagMutliSelectInput;