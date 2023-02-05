import {useEffect, useState} from "react";
import useGetOrganizationById from "hooks/settings/insights/organizations/useGetOrganizationById";
import useGetOrganizationModel from "hooks/settings/insights/organizations/useGetOrganizationModel";

export default function useGetOrganizationModelById(organizationId, handleErrorFunction) {
  const [organizationModel, setOrganizationModel] = useState(undefined);
  const {
    organization,
    isLoading,
    error,
    setError,
    loadData,
  } = useGetOrganizationById(organizationId, handleErrorFunction);
  const getOrganizationModel = useGetOrganizationModel();

  useEffect(() => {
    setOrganizationModel(undefined);

    if (organization) {
      setOrganizationModel({...getOrganizationModel(organization, false)});
    }
  }, [organization]);

  return ({
    organizationModel: organizationModel,
    setOrganizationModel: setOrganizationModel,
    loadData: loadData,
    isLoading: isLoading,
    error: error,
    setError: setError,
  });
}
