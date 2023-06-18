import useApiService from "hooks/api/service/useApiService";

export default function useAuthenticationActions() {
  const apiService = useApiService();
  const authenticationActions = {};

  authenticationActions.getReactAuthenticationToken = async (id) => {
    const apiUrl = `/auth/react/unauthenticated`;
    const queryParameters = {
      id: id,
    };

    return await apiService.handleApiGetRequest(
      apiUrl,
      queryParameters,
    );
  };

  return authenticationActions;
}
