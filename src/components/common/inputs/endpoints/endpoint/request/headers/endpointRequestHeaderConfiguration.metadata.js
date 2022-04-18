export const endpointRequestHeaderConfigurationMetadata = {
  type: "Request Header Configuration",
  fields: [
    {
      label: "Use Authorization Bearer Token",
      id: "useAuthorizationToken",
      isRequired: true,
    },
    {
      label: "Authorization Token Custom Parameter",
      id: "authorizationTokenCustomParameterId",
      formText: `Custom Parameters are saved in the Tool Registry. Authorization Tokens must be encrypted Custom Parameters. Do not include "Bearer" in the Custom Parameter`,
      isRequiredFunction: (model) => {
        return model?.getData("useAuthorizationToken") === true;
      },
    },
  ],
  newObjectFields: {
    useAuthorizationToken: false,
    authorizationTokenCustomParameterId: "",
  }
};
