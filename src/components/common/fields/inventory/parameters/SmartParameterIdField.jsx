import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import VisibleVaultField from "components/common/fields/text/VisibleVaultField";
import axios from "axios";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import { DialogToastContext } from "contexts/DialogToastContext";
import parametersActions from "components/inventory/parameters/parameters-actions";
import { AuthContext } from "contexts/AuthContext";
import ParameterModel from "components/inventory/parameters/parameter.model";
import StandaloneTextFieldBase from "components/common/fields/text/standalone/StandaloneTextFieldBase";

function SmartParameterIdField({fieldName, model}) {
  const toastContext = useContext(DialogToastContext);
  const {getAccessToken} = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [parameterModel, setParameterModel] = useState(undefined);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const isMounted = useRef(false);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;
    setParameterModel(undefined);

    if (isMongoDbId(model?.getData(fieldName)) === true) {
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
  }, [parameterModel]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadParameter(cancelSource);
    } catch (error) {
      if (error?.response?.status !== 404) {
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const loadParameter = async (cancelSource = cancelTokenSource) => {
    const response = await parametersActions.getParameterByIdV2(getAccessToken, cancelSource, model?.getData(fieldName));
    const parameter = response?.data?.data;

    if (parameter) {
      const newParameterMetadata = response?.data?.metadata;
      setParameterModel({ ...new ParameterModel({ ...parameter }, newParameterMetadata, false, getAccessToken, cancelTokenSource, loadData, false, false, false) });
    }
  };

  const getValueFromVault = async () => {
    try {
      if (model?.getData("vaultEnabled") === true) {
        return await model.getValueFromVault(fieldName);
      }
    }
    catch (error) {
      if (isMounted.current === true) {
        console.error(error);
        if (error?.response?.status === 404) {
          return "No value stored in vault";
        } else {
          return "Could not pull value from Vault";
        }
      }
    }
  };

  if (model?.getData("vaultEnabled") !== true) {
    return (
      <StandaloneTextFieldBase
        text={parameterModel?.getData("value")}
        fieldName={fieldName}
        showClipboardButton={true}
        isBusy={isLoading}
        label={model?.getLabel(fieldName)}
      />
    );
  }

  return (
    <VisibleVaultField
      fieldName={fieldName}
      pullVaultDataFunction={getValueFromVault}
      model={model}
      isStoredInVault={true}
    />
  );
}

SmartParameterIdField.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
};

export default SmartParameterIdField;