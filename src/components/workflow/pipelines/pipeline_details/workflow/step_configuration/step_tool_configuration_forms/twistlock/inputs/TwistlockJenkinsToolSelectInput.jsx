import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { DialogToastContext } from "contexts/DialogToastContext";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import { AuthContext } from "contexts/AuthContext";
import PipelineActions from "components/workflow/pipeline-actions";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faTools } from "@fortawesome/pro-light-svg-icons";
import axios from "axios";

function TwistlockJenkinsToolSelectInput({ fieldName, dataObject, setDataObject, disabled, textField, valueField, tool_prop }) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [jenkinsList, setJenkinsList] = useState([]);
  const [isJenkinsSearching, setIsJenkinsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState("Select a Twistlock Instance");
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    if (!disabled) {
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
  }, []);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await fetchTwistlockDetails(cancelSource);
    } catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getInfoText = () => {
    if (dataObject.getData(fieldName) !== "") {
      return (
        <Link to={`/inventory/tools/details/${dataObject.getData(fieldName)}`}>
          <span>
            <FontAwesomeIcon icon={faTools} className="pr-1" />
            View Or Edit this Tool&apos;s Registry settings
          </span>
        </Link>
      );
    }
    return "Select a tool to continue";
  };

  const fetchTwistlockDetails = async (cancelSource) => {
    setIsJenkinsSearching(true);
    try {
      let results = await PipelineActions.getToolsListV2(getAccessToken, cancelSource, "jenkins");
      if (results?.data) {
        let respObj = [];
        let arrOfObj = results.data;
        arrOfObj.map((item) => {
          respObj.push({
            name: item.name,
            id: item._id,
            configuration: item.configuration,
          });
        });
        results = respObj;
      }
      const filteredList = results ? results.filter((el) => el.configuration !== undefined) : [];
      if (filteredList) {
        setJenkinsList(filteredList);
      }
    } catch (error) {
      setPlaceholder("No Config Tool Found");
      console.error(error);
      toastContext.showServiceUnavailableDialog();
    } finally {
      setIsJenkinsSearching(false);
    }
  };

  return (
    <div>
      <SelectInputBase
        fieldName={fieldName}
        dataObject={dataObject}
        setDataObject={setDataObject}
        selectOptions={jenkinsList ? jenkinsList : []}
        busy={isJenkinsSearching}
        valueField={valueField}
        textField={textField}
        placeholderText={placeholder}
        disabled={disabled || isJenkinsSearching || (jenkinsList == null || jenkinsList.length === 0)}
      />
      <small className="text-muted ml-3">{getInfoText()}</small>
    </div>
  );
}

TwistlockJenkinsToolSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array
  ]),
  textField: PropTypes.string,
  valueField: PropTypes.string,
  tool_prop: PropTypes.string,
};

TwistlockJenkinsToolSelectInput.defaultProps = {
  valueField: "id",
  textField: "name",
  fieldName: "toolConfigId",
};

export default TwistlockJenkinsToolSelectInput;

