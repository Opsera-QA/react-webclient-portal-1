export const ENDPOINT_REQUEST_TYPES = {
  GET: "get",
  PATCH: "patch",
  POST: "post",
  PUT: "put",
};

export const ENDPOINT_REQUEST_TYPE_LABELS = {
  GET: "Get",
  PATCH: "Patch",
  POST: "Post",
  PUT: "Put",
};

export const getEndpointRequestTypeLabel = (packageType) => {
  switch (packageType) {
    case ENDPOINT_REQUEST_TYPES.GET:
      return ENDPOINT_REQUEST_TYPE_LABELS.GET;
    case ENDPOINT_REQUEST_TYPES.PATCH:
      return ENDPOINT_REQUEST_TYPE_LABELS.PATCH;
    case ENDPOINT_REQUEST_TYPES.POST:
      return ENDPOINT_REQUEST_TYPE_LABELS.POST;
    case ENDPOINT_REQUEST_TYPES.PUT:
      return ENDPOINT_REQUEST_TYPE_LABELS.PUT;
    default:
      return packageType;
  }
};

export const ENDPOINT_REQUEST_TYPE_SELECT_OPTIONS = [
  {
    text: ENDPOINT_REQUEST_TYPE_LABELS.GET,
    value: ENDPOINT_REQUEST_TYPES.GET,
  },
  {
    text: ENDPOINT_REQUEST_TYPE_LABELS.POST,
    value: ENDPOINT_REQUEST_TYPES.POST,
  },
  {
    text: ENDPOINT_REQUEST_TYPE_LABELS.PUT,
    value: ENDPOINT_REQUEST_TYPES.PUT,
  },
];