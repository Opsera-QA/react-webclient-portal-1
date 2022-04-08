import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { faSync } from "@fortawesome/pro-light-svg-icons";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import { parseError } from "components/common/helpers/error-helpers";
import ButtonBase from "components/common/buttons/ButtonBase";
import pipelineActions from "components/workflow/pipeline-actions";
import InfoText from "components/common/inputs/info_text/InfoText";

function SyncTerraformOutputParametersButton(
  {
    disabled,
    syncTerraformStepParameters,
    pipelineId,
    terraformStepId,
    className,
  }) {
  const { getAccessToken } = useContext(AuthContext);
  const [terraformStepCustomParameters, setTerraformStepCustomParameters] = useState([]);
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
    setTerraformStepCustomParameters([]);

    if (
      !disabled
      && isMongoDbId(terraformStepId) === true
      && isMongoDbId(pipelineId) === true
    ) {
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
  }, [terraformStepId]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      setTerraformStepCustomParameters([]);
      setError(undefined);
      await getCustomParameters(cancelSource);
    } catch (error) {
      if (isMounted?.current === true) {
        const parsedError = parseError(error);
        setError(parsedError);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getCustomParameters = async (cancelSource = cancelTokenSource) => {
    const response = await pipelineActions.getPipelineStepById(getAccessToken, cancelSource, pipelineId,terraformStepId);
    const parameters = response?.data?.data?.tool?.configuration?.customParameters;

    if (isMounted?.current === true && Array.isArray(parameters)) {
      setTerraformStepCustomParameters(parameters);
    }
  };

  if (syncTerraformStepParameters == null) {
    return null;
  }

  return (
    <div className={className}>
      <ButtonBase
        variant={"primary"}
        disabled={disabled || terraformStepCustomParameters?.length === 0}
        isLoading={isLoading}
        onClickFunction={() => syncTerraformStepParameters(terraformStepCustomParameters)}
        buttonText={`Sync ${terraformStepCustomParameters?.length} Terraform Output Parameters`}
        icon={faSync}
      />
      <InfoText errorMessage={error} />
    </div>
  );
}

SyncTerraformOutputParametersButton.propTypes = {
  terraformStepId: PropTypes.string,
  pipelineId: PropTypes.string,
  syncTerraformStepParameters: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default SyncTerraformOutputParametersButton;
