import {useEffect, useState} from "react";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import useOrganizationSettingsActions from "hooks/settings/organization_settings/useOrganizationSettingsActions";

export default function useGetOrganizationSettingsRecord(
  userData,
  handleErrorFunction,
) {
  const [organizationSettingsRecord, setOrganizationSettingsRecord] = useState(undefined);
  const organizationSettingsActions = useOrganizationSettingsActions();
  const {
    isLoading,
    error,
    setError,
    loadData,
  } = useLoadData();

  useEffect(() => {
    setOrganizationSettingsRecord(undefined);
    loadData(getOrganizationSettingsRecord, handleErrorFunction).catch(() => {
    });
  }, [userData]);

  const getOrganizationSettingsRecord = async () => {
    setOrganizationSettingsRecord(undefined);

    if (userData == null) {
      return null;
    }

    const response = await organizationSettingsActions.getOrganizationSettingsActions();
    const organizationSettings = DataParsingHelper.parseNestedObject(response, "data.data");

    if (organizationSettings) {
      setOrganizationSettingsRecord({...organizationSettings});
    }
  };

  return ({
    organizationSettingsRecord: organizationSettingsRecord,
    setOrganizationSettingsRecord: setOrganizationSettingsRecord,
    loadData: () => loadData(getOrganizationSettingsRecord, handleErrorFunction),
    isLoading: isLoading,
    error: error,
    setError: setError,
  });
}
