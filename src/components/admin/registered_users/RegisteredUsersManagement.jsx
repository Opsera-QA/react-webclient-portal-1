import React, {useEffect, useState} from "react";
import RegisteredUserActions from "components/admin/registered_users/registered-user-actions";
import Model from "core/data_model/model";
import registeredUsersFilterMetadata from "components/admin/registered_users/registered-users-filter-metadata";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import FilterContainer from "components/common/table/FilterContainer";
import {faUserCircle} from "@fortawesome/pro-light-svg-icons";
import {ROLE_LEVELS} from "components/common/helpers/role-helpers";
import RegisteredUserCardView from "components/admin/registered_users/RegisteredUserCardView";
import RegisteredUsersManagementSubNavigationBar
  from "components/admin/registered_users/RegisteredUsersManagementSubNavigationBar";
import useComponentStateReference from "hooks/useComponentStateReference";

function RegisteredUsersManagement() {
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [registeredUsersFilterDto, setRegisteredUsersFilterDto] = useState(new Model({...registeredUsersFilterMetadata.newObjectFields}, registeredUsersFilterMetadata, false));
  const {
    isMounted,
    cancelTokenSource,
    toastContext,
    accessRoleData,
    isOpseraAdministrator,
    getAccessToken,
  } = useComponentStateReference();

  useEffect(() => {
    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });
  }, []);

  const loadData = async (filterDto = registeredUsersFilterDto) => {
    try {
      setUserData([]);

      if (isOpseraAdministrator !== true) {
        return;
      }

      setIsLoading(true);
      await getRegisteredUsers(filterDto);
    }
    catch (error) {
      if (isMounted?.current === true) {
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getRegisteredUsers = async (filterDto = registeredUsersFilterDto) => {
    const response = await RegisteredUserActions.getRegisteredUsersV2(getAccessToken, cancelTokenSource, filterDto);
    const responseData = response?.data?.data;

    if (isMounted?.current === true && responseData != null) {
      setUserData([...responseData]);
      let newFilterDto = {...filterDto};
      newFilterDto.setData("totalCount", response?.data?.count);
      newFilterDto.setData("activeFilters", newFilterDto.getActiveFilters());
      setRegisteredUsersFilterDto({ ...newFilterDto });
    }
  };

  const getCardView = () => {
    return (
      <RegisteredUserCardView
        registeredUsersFilterDto={registeredUsersFilterDto}
        setRegisteredUsersFilterDto={setRegisteredUsersFilterDto}
        isLoading={isLoading}
        data={userData}
        loadData={loadData}
      />
    );
  };

  if (isOpseraAdministrator !== true) {
    return null;
  }

  return (
    <ScreenContainer
      breadcrumbDestination={"registeredUsersManagement"}
      isLoading={!accessRoleData}
      navigationTabContainer={
        <RegisteredUsersManagementSubNavigationBar
          activeTab={"registeredUsersManagement"}
        />
      }
    >
      <div className="px-2">
        <FilterContainer
          filterDto={registeredUsersFilterDto}
          setFilterDto={setRegisteredUsersFilterDto}
          body={getCardView()}
          isLoading={isLoading}
          loadData={loadData}
          supportSearch={true}
          titleIcon={faUserCircle}
          title={"Registered Users"}
        />
      </div>
    </ScreenContainer>
  );
}


export default RegisteredUsersManagement;