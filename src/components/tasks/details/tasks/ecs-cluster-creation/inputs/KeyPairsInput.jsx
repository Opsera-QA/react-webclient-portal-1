import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { DialogToastContext } from "contexts/DialogToastContext";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import { AuthContext } from "../../../../../../contexts/AuthContext";
import axios from "axios";
import ECSCreationActions from "../ecs-creation-actions";

function KeyPairSelectInput({
                          fieldName,
                          dataObject,
                          setDataObject,
                          disabled,
                          textField,
                          valueField,
                          awstoolId,
                          region,
                        }) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [keyPairs, setKeyPairs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState("Select a Key Pair");
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
  }, [awstoolId, region]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadTypes(cancelSource);
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

  const loadTypes = async (cancelSource) => {
    try {
      setKeyPairs([]);
      const res = await ECSCreationActions.getKeyPairs(dataObject, getAccessToken, cancelSource);
      if (res && res.status === 200) {
        if (res.data.length === 0) {
          setPlaceholder("No Key Pairs Found");
          return;
        }
        setPlaceholder("Select a Key Pair");
        setKeyPairs(res.data);
        return;
      }
      setPlaceholder("No Key Pairs Found");
      setKeyPairs([]);
    } catch (error) {
      setPlaceholder("No Key Pairs Found");
      console.error(error);
      toastContext.showServiceUnavailableDialog();
    }
  };

  const setDataFunction = (fieldName, value) => {
    const newDataObject = dataObject;
    newDataObject.setData(fieldName, value);
    setDataObject({...newDataObject});
    return;
  };

  return (
      <SelectInputBase
        fieldName={fieldName}
        dataObject={dataObject}
        setDataFunction={setDataFunction}
        setDataObject={setDataObject}
        selectOptions={keyPairs}
        busy={isLoading}
        placeholderText={placeholder}
        disabled={disabled || isLoading || (!isLoading && (keyPairs == null || keyPairs.length === 0))}
      />
  );
}

KeyPairSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  awstoolId: PropTypes.string,
  region: PropTypes.string,
};

KeyPairSelectInput.defaultProps = {
  fieldName: "keyPair"
};

export default KeyPairSelectInput;
