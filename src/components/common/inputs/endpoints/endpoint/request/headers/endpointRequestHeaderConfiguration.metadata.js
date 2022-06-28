export const endpointRequestHeaderConfigurationMetadata = {
  type: "Request Header Configuration",
  fields: [
    {
      label: "Use Authorization Bearer Token",
      id: "useAuthorizationToken",
      isRequired: true,
    },
    {
      label: "Token Type",
      id: "authorizationType",
      isRequired: true,
    },
    {
      label: "Access Token Generation Endpoint",
      id: "accessTokenGenerationEndpointId",
      isRequiredFunction: (model) => {
        return model?.getData("useAuthorizationToken") === true && model?.getData("authorizationType") === "use_endpoint";
      },
    },
    {
      label: "Access Token Response Field",
      id: "accessTokenResponseBodyField",
    },
    {
      label: "Authorization Token Custom Parameter",
      id: "authorizationTokenCustomParameterId",
      formText: `Custom Parameters are saved in the Tool Registry. Authorization Tokens must be encrypted Custom Parameters. Do not include "Bearer" in the Custom Parameter`,
      isRequiredFunction: (model) => {
        return model?.getData("useAuthorizationToken") === true && model?.getData("authorizationType") === "long_lived";
      },
    },
  ],
  newObjectFields: {
    useAuthorizationToken: false,
    authorizationType: "long_lived",
    accessTokenGenerationEndpointId: "",
    accessTokenResponseBodyField: "",
    authorizationTokenCustomParameterId: "",
  }
};
