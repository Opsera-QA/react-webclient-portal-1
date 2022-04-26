import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import FieldContainer from "components/common/fields/FieldContainer";
import axios from "axios";
import FieldLabel from "components/common/fields/FieldLabel";
import LoadingIcon from "components/common/icons/LoadingIcon";
import externalApiIntegratorEndpointsActions
  from "components/inventory/tools/details/identifiers/external_api_integrator/endpoints/externalApiIntegratorEndpoints.actions";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import modelHelpers from "components/common/model/modelHelpers";
import externalApiIntegratorEndpointMetadata
  from "components/inventory/tools/details/identifiers/external_api_integrator/endpoints/externalApiIntegratorEndpoint.metadata";

function EndpointField({ model, fieldName, endpointId, toolId, className }) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [endpointModel, setEndpointModel] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [field] = useState(model?.getFieldById(fieldName));

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;
    setEndpointModel(undefined);

    if (isMongoDbId(endpointId) === true && isMongoDbId(toolId) === true) {
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
  }, [endpointId, toolId]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadEndpoint(cancelSource);
    } catch (error) {
      if (error?.response?.status !== 404) {
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const loadEndpoint = async (cancelSource = cancelTokenSource) => {
    const response = await externalApiIntegratorEndpointsActions.getExternalApiIntegratorEndpointByIdV2(
      getAccessToken,
      cancelSource,
      toolId,
      endpointId,
    );
    const endpoint = response?.data?.data;

    if (endpoint) {
      const newEndpointModel = modelHelpers.parseObjectIntoModel(endpoint, externalApiIntegratorEndpointMetadata);
      setEndpointModel(newEndpointModel);
    }
  };

  const getEndpointName = () => {
    if (isLoading) {
      return (
        <span>
          <LoadingIcon className={"mr-1"}/>
          {model?.getData(fieldName)}
        </span>
      );
    }

    if (endpointModel) {
      return endpointModel?.getData("name");
    }

    return (`
      Endpoint could not be found with ID: [${model?.getData(fieldName)}]. 
      The Endpoint or Tool may have been deleted or the Tool's access rules may have changed.
    `);
  };

  const getBody = () => {
    if (model?.getData(fieldName) == null || model?.getData(fieldName) === "") {
      return null;
    }

    return (
      <span>
        <span>{getEndpointName()}</span>
      </span>
    );
  };


  if (field == null) {
    return null;
  }

  return (
    <FieldContainer className={className}>
      <FieldLabel field={field}/>
      {getBody()}
    </FieldContainer>
  );
}

EndpointField.propTypes = {
  model: PropTypes.object,
  fieldName: PropTypes.string,
  endpointId: PropTypes.string,
  toolId: PropTypes.string,
  className: PropTypes.string,
};

export default EndpointField;