import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import RegisteredUserActions from "components/admin/registered_users/registered-user-actions";
import LoadingDialog from "components/common/status_notifications/loading";
import DetailPanelLoadingDialog from "components/common/loading/DetailPanelLoadingDialog";
import Model from "core/data_model/model";
import registeredUsersFilterMetadata from "components/admin/registered_users/registered-users-filter-metadata";
import FilterBar from "components/common/filters/FilterBar";
import DtoTopPagination from "components/common/pagination/DtoTopPagination";
import {Col, Row} from "react-bootstrap";
import DtoBottomPagination from "components/common/pagination/DtoBottomPagination";
import InformationDialog from "components/common/status_notifications/info";
import RegisteredUserSummaryCard from "components/admin/registered_users/RegisteredUserSummaryCard";
import ScreenContainer from "components/common/panels/general/ScreenContainer";

function RegisteredUsersManagement() {
  const { getUserRecord, setAccessRoles, getAccessToken } = useContext(AuthContext);
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const toastContext = useContext(DialogToastContext);
  const [userData, setUserData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [registeredUsersFilterDto, setRegisteredUsersFilterDto] = useState(new Model({...registeredUsersFilterMetadata.newObjectFields}, registeredUsersFilterMetadata, false));

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async (filterDto = registeredUsersFilterDto) => {
    try {
      setIsLoading(true);
      await getRoles(filterDto);
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false)
    }
  };

  const getRoles = async (filterDto = registeredUsersFilterDto) => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);

    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);

      if (userRoleAccess?.OpseraAdministrator) {
        await getRegisteredUsers(filterDto);
      }
    }
  };

  const getRegisteredUsers = async (filterDto = registeredUsersFilterDto) => {
    const response = await RegisteredUserActions.getRegisteredUsers(filterDto, getAccessToken);
    const responseData = response?.data;

    if (responseData) {
      setUserData(responseData.data);
      let newFilterDto = registeredUsersFilterDto;
      newFilterDto.setData("totalCount", response.data.count);
      newFilterDto.setData("activeFilters", newFilterDto.getActiveFilters());
      setRegisteredUsersFilterDto({ ...newFilterDto });
    }
  }

  const getFilterBar = () => {
    return (
      <FilterBar
        loadData={loadData}
        filterDto={registeredUsersFilterDto}
        setFilterDto={setRegisteredUsersFilterDto}
        supportSearch={true}
      />
    );
  };

  const getRegisteredUsersBlock = () => {
    if (isLoading) {
      return (<DetailPanelLoadingDialog type={"Registered Users"} />);
    }

    return (
      <div className="max-content-width px-3">
        <div className="mb-4">
          {getFilterBar()}
          <div className="px-2">
            <div className="pt-1">
              <DtoTopPagination
                loadData={loadData}
                isLoading={isLoading}
                paginationDto={registeredUsersFilterDto}
                setPaginationDto={setRegisteredUsersFilterDto}
              />
            </div>
            <Row>
              {getBody()}
            </Row>
            <div className="pb-2">
              <DtoBottomPagination
                loadData={loadData}
                isLoading={isLoading}
                paginationDto={registeredUsersFilterDto}
                setPaginationDto={setRegisteredUsersFilterDto}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

  const getBody = () => {
    if (userData == null || !Array.isArray(userData)) {
      return (<InformationDialog message="Could not load registered users" />);
    }


    if (userData.length === 0) {
      return (<InformationDialog message="No registered users found" />);
    }

    return (
      <Row>
        {userData.map((user, index) => {
          return (
            <Col lg={12} key={index}>
              <RegisteredUserSummaryCard registeredUsersData={user} loadData={loadData} />
            </Col>
          );
        })}
      </Row>
    );
  };

  return (
      <ScreenContainer
        accessDenied={!accessRoleData?.OpseraAdministrator}
        breadcrumbDestination={"registeredUsersManagement"}
        isLoading={!accessRoleData}
      >
        {getRegisteredUsersBlock()}
      </ScreenContainer>
    );
}


export default RegisteredUsersManagement;