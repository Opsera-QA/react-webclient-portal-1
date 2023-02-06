import {useEffect, useState} from "react";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import ObjectHelper from "@opsera/persephone/helpers/object/object.helper";
import useOrganizationActions from "hooks/settings/insights/organizations/useOrganizationActions";

export default function useGetOrganizationNamesByIds(organizationIds, handleErrorFunction) {
  const organizationActions = useOrganizationActions();
  const [organizations, setOrganizations] = useState([]);
  const {
    isLoading,
    error,
    setError,
    loadData,
  } = useLoadData();

  useEffect(() => {
    setOrganizations([]);

    const parsedIdArray = DataParsingHelper.parseMongoDbIdArray(organizationIds);
    if (parsedIdArray.length > 0 && loadData) {
      loadData(getOrganizationNames, handleErrorFunction).catch(() => {});
    }
  }, [organizationIds]);

  const getOrganizationNames = async () => {
    setOrganizations([]);
    const parsedIdArray = DataParsingHelper.parseMongoDbIdArray(organizationIds);

    if (parsedIdArray.length > 0) {
      const response = await organizationActions.getOrganizationNamesForIds(parsedIdArray);
      const newOrganizationList = DataParsingHelper.parseNestedArray(response, "data.data");

      if (ObjectHelper.areObjectsEqualLodash(organizations, newOrganizationList) !== true) {
        setOrganizations([...newOrganizationList]);
      }
    }
  };

  return ({
    organizations: organizations,
    setOrganizations: setOrganizations,
    loadData: () => loadData(getOrganizationNames, handleErrorFunction),
    isLoading: isLoading,
    error: error,
    setError: setError,
  });
}
