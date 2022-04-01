import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {faExclamationCircle, faFileCode} from "@fortawesome/pro-light-svg-icons";
import {Link} from "react-router-dom";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import scriptsActions from "components/inventory/scripts/scripts-actions";
import ScriptOverlay from "components/common/list_of_values_input/inventory/scripts/ScriptOverlay";
import {DialogToastContext} from "contexts/DialogToastContext";
import {getScriptLanguageDisplayText} from "components/common/list_of_values_input/inventory/scripts/ScriptLanguageSelectInput";
import IconBase from "components/common/icons/IconBase";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";

function ScriptLibrarySelectInput(
  {
    fieldName,
    model,
    setModel,
    disabled,
    textField,
    valueField,
    className,
    fields,
    setDataFunction,
    language,
  }) {
  let toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [scripts, setScripts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadScripts(cancelSource);
    }
    catch (error) {
      if (isMounted?.current === true) {
        setError(error);
      }
    }
    finally {
      if (isMounted?.current === true ) {
        setIsLoading(false);
      }
    }
  };

  const loadScripts = async (cancelSource = cancelTokenSource) => {
    const response = await scriptsActions.getScripts(getAccessToken, cancelSource, undefined, language, fields);
    const scriptList = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(scriptList)) {
      setScripts(scriptList);
    }
  };

  const toggleScriptOverlay = () => {
    toastContext.showInfoOverlayPanel(
      <ScriptOverlay
        scriptId={model?.getData(fieldName)}
      />
    );
  };

  const getInfoText = () => {
    if (isMongoDbId(model?.getData(fieldName)) === true) {
      return (
        <div className={"text-muted d-flex pointer"} onClick={() => {toggleScriptOverlay();}}>
          <span><IconBase icon={faFileCode} className={"pr-1"} />View this Script</span>
        </div>
      );
    }
  };

  const getNoScriptsMessage = () => {
    if (isLoading === false && (!Array.isArray(scripts) || scripts.length === 0)) {
      const dynamicText = language ? `${getScriptLanguageDisplayText(language)} ` : "";
      return (
        <div className="form-text text-muted p-2">
          <IconBase icon={faExclamationCircle} className={"text-muted mr-1"} />
          No {dynamicText}scripts have been registered.
          Please go to
          <Link to="/inventory/scripts"> Scripts Library</Link> and add an entry in order to proceed.
        </div>
      );
    }

  };

  return (
    <>
      <SelectInputBase
        fieldName={fieldName}
        dataObject={model}
        setDataObject={setModel}
        setDataFunction={setDataFunction}
        selectOptions={scripts}
        busy={isLoading}
        errorMessage={error}
        valueField={valueField}
        textField={textField}
        className={className}
        disabled={disabled}
        singularTopic={"Script"}
        pluralTopic={"Scripts"}
        error={error}
      />
      {getNoScriptsMessage()}
      {getInfoText()}
    </>
  );
}

ScriptLibrarySelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  className: PropTypes.string,
  fields: PropTypes.array,
  setDataFunction: PropTypes.func,
  language: PropTypes.string,
};

ScriptLibrarySelectInput.defaultProps = {
  valueField: "_id",
  textField: "name",
};

export default ScriptLibrarySelectInput;