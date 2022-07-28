import { hasStringValue } from "components/common/helpers/string-helpers";

export const ENDPOINT_TYPES = {
  ACCESS_TOKEN_GENERATION: "access_token_generation",
  CALL_OPERATION: "call_operation",
  CONNECTION_VALIDATION: "connection_validation",
  OPERATION_STATUS_CHECK: "status_check",
};

export const ENDPOINT_TYPE_LABELS = {
  ACCESS_TOKEN_GENERATION: "Access Token Generation",
  CALL_OPERATION: "Call Operation",
  CONNECTION_VALIDATION: "Connection Validation",
  OPERATION_STATUS_CHECK: "Operation Status Check",
};

export const getEndpointTypeLabel = (type) => {
  if (hasStringValue(type) !== true) {
    return "";
  }

  switch (type) {
    case ENDPOINT_TYPES.ACCESS_TOKEN_GENERATION:
      return ENDPOINT_TYPE_LABELS.ACCESS_TOKEN_GENERATION;
    case ENDPOINT_TYPES.CALL_OPERATION:
      return ENDPOINT_TYPE_LABELS.CALL_OPERATION;
    case ENDPOINT_TYPES.CONNECTION_VALIDATION:
      return ENDPOINT_TYPE_LABELS.CONNECTION_VALIDATION;
    case ENDPOINT_TYPES.OPERATION_STATUS_CHECK:
      return ENDPOINT_TYPE_LABELS.OPERATION_STATUS_CHECK;
    default:
      return type;
  }
};

export const ENDPOINT_TYPE_SELECT_OPTIONS = [
  {
    text: ENDPOINT_TYPE_LABELS.ACCESS_TOKEN_GENERATION,
    value: ENDPOINT_TYPES.ACCESS_TOKEN_GENERATION,
  },
  {
    text: ENDPOINT_TYPE_LABELS.CALL_OPERATION,
    value: ENDPOINT_TYPES.CALL_OPERATION,
  },
  {
    text: ENDPOINT_TYPE_LABELS.CONNECTION_VALIDATION,
    value: ENDPOINT_TYPES.CONNECTION_VALIDATION,
  },
  {
    text: ENDPOINT_TYPE_LABELS.OPERATION_STATUS_CHECK,
    value: ENDPOINT_TYPES.OPERATION_STATUS_CHECK,
  },
];

