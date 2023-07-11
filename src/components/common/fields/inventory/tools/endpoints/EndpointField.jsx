import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import FieldContainer from "components/common/fields/FieldContainer";
import FieldLabel from "components/common/fields/FieldLabel";
import LoadingIcon from "components/common/icons/LoadingIcon";
import modelHelpers from "components/common/model/modelHelpers";
import externalApiIntegratorEndpointMetadata
from "@opsera/definitions/constants/registry/tools/external_api_integrator/externalApiIntegratorEndpoint.metadata";
import { hasStringValue } from "components/common/helpers/string-helpers";
import ExternalApiIntegratorEndpointSummaryCard
from "components/inventory/tools/details/identifiers/external_api_integrator/endpoints/ExternalApiIntegratorEndpointSummaryCard";
import useGetExternalApiIntegratorEndpointById
from "hooks/tools/external_api_integrator/endpoints/useGetExternalApiIntegratorEndpointById";

function EndpointField(
  {
    model,
    fieldName,
    endpointId,
    toolId,
    className,
  }) {
  const {
    endpoint,
    loadData,
    isLoading,
    error,
  } = useGetExternalApiIntegratorEndpointById(
    toolId,
    endpointId,
  );
  const [endpointModel, setEndpointModel] = useState(undefined);
  const field = model?.getFieldById(fieldName);

  useEffect(() => {
    if (endpoint == null) {
      setEndpointModel(undefined);
    } else {
      setEndpointModel({...modelHelpers.parseObjectIntoModel(endpoint, externalApiIntegratorEndpointMetadata)});
    }
  }, [endpoint]);

  const getBody = () => {
    if (hasStringValue(model?.getData(fieldName)) !== true) {
      return "";
    }

    if (isLoading === true || endpointModel == null) {
      return (
        <span>
          <LoadingIcon className={"mr-1"}/>
          {model?.getData(fieldName)}
        </span>
      );
    }

    return (
      <div className={"mt-2"}>
        <ExternalApiIntegratorEndpointSummaryCard
          endpointModel={endpointModel}
        />
      </div>
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