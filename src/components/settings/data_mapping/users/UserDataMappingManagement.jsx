import React, {useState, useEffect, useContext, useRef} from "react";
import {DialogToastContext} from "contexts/DialogToastContext";
import UserDataMappingsTable from "components/settings/data_mapping/users/UserDataMappingsTable";
import useAnalyticsUserDataMappingActions
  from "hooks/settings/insights/analytics_data_mappings/users/useAnalyticsUserDataMappingActions";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

function UserDataMappingManagement() {
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(true);
  const [userDataMappings, setUserDataMappings] = useState([]);
  const isMounted = useRef(false);
  const analyticsUserDataMappingActions = useAnalyticsUserDataMappingActions();

  useEffect(() => {
    isMounted.current = true;

    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await getUserDataMappings();
    } catch (error) {
      if (isMounted?.current === true) {
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getUserDataMappings = async () => {
    const response = await analyticsUserDataMappingActions.getUserDataMappings();
    const mappings = DataParsingHelper.parseNestedArray(response, "data.data");

    if (isMounted?.current === true && Array.isArray(mappings)) {
      setUserDataMappings(mappings);
    }
  };

  return (
    <div className={"mt-2"}>
      <UserDataMappingsTable
        loadData={loadData}
        isLoading={isLoading}
        userDataMappings={userDataMappings}
        isMounted={isMounted}
      />
    </div>
  );
}

export default UserDataMappingManagement;
