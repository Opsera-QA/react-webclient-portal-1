import React, {useContext, useEffect, useRef, useState} from "react";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import RegisteredUserActions from "components/admin/registered_users/registered-user-actions";
import Model from "core/data_model/model";
import registeredUsersFilterMetadata from "components/admin/registered_users/registered-users-filter-metadata";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import axios from "axios";
import FilterContainer from "components/common/table/FilterContainer";
import {faUserCircle} from "@fortawesome/pro-light-svg-icons";
import {ROLE_LEVELS} from "components/common/helpers/role-helpers";
import RegisteredUserCardView from "components/admin/registered_users/RegisteredUserCardView";
import RegisteredUsersManagementSubNavigationBar
  from "components/admin/registered_users/RegisteredUsersManagementSubNavigationBar";

function RegisteredUsersManagement() {
  const { getUserRecord, setAccessRoles, getAccessToken } = useContext(AuthContext);
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const toastContext = useContext(DialogToastContext);
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [registeredUsersFilterDto, setRegisteredUsersFilterDto] = useState(new Model({...registeredUsersFilterMetadata.newObjectFields}, registeredUsersFilterMetadata, false));
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData(undefined, source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async (filterDto = registeredUsersFilterDto, cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await getRoles(filterDto, cancelSource);
    }
    catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getRoles = async (filterDto = registeredUsersFilterDto, cancelSource = cancelTokenSource) => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);

    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);

      if (isMounted?.current === true && userRoleAccess?.OpseraAdministrator) {
        await getRegisteredUsers(filterDto, cancelSource);
      }
    }
  };

  const getRegisteredUsers = async (filterDto = registeredUsersFilterDto, cancelSource = cancelTokenSource) => {
    const response = await RegisteredUserActions.getRegisteredUsersV2(getAccessToken, cancelSource, filterDto);
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

  return (
    <ScreenContainer
      roleRequirement={ROLE_LEVELS.OPSERA_ADMINISTRATORS}
      accessRoleData={accessRoleData}
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