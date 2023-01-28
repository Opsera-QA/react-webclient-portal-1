import {useEffect, useState} from "react";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import ObjectHelper from "@opsera/persephone/helpers/object/object.helper";
import useOrganizationActions from "hooks/settings/insights/organizations/useOrganizationActions";

export default function useGetOrganizationById(organizationId, handleErrorFunction) {
  const organizationActions = useOrganizationActions();
  const [organization, setOrganization] = useState(undefined);
  const {
    isLoading,
    error,
    setError,
    loadData,
  } = useLoadData();

  useEffect(() => {
    setOrganization(undefined);

    if (isMongoDbId(organizationId) && loadData) {
      loadData(getOrganizationId, handleErrorFunction).catch(() => {});
    }
  }, [organizationId]);

  const getOrganizationId = async () => {
    setOrganization(undefined);
    const response = await organizationActions.getOrganizationById(organizationId);
    const newOrganization = DataParsingHelper.parseNestedObject(response, "data.data");

    console.log("organization: " + JSON.stringify(organization));

    if (ObjectHelper.areObjectsEqualLodash(organization, newOrganization) !== true) {
      setOrganization({...newOrganization});
    }
  };

  return ({
    organization: organization,
    setOrganization: setOrganization,
    loadData: () => loadData(getOrganizationId, handleErrorFunction),
    isLoading: isLoading,
    error: error,
    setError: setError,
  });
}
