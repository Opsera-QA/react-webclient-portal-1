import useApiService from "hooks/api/service/useApiService";

export default function useVaultActions() {
  const apiService = useApiService();
  const vaultActions = {};

  // vaultActions.getKeyFromVault = async (key) => {
  //   const apiUrl = `/vault/${key}`;
  //   return await apiService.handleApiGetRequest(apiUrl);
  // };

  return vaultActions;
}
