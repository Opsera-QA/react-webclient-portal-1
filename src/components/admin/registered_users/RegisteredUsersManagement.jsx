import React, {useContext, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import LoadingDialog from "../../common/status_notifications/loading";
import {AuthContext} from "../../../contexts/AuthContext";
import Modal from "../../common/modal/modal";
import RegisteredUsersTable from "./RegisteredUsersTable";
import Pagination from "components/common/pagination";

import AccessDeniedDialog from "../../common/status_notifications/accessDeniedInfo";
import BreadcrumbTrail from "../../common/navigation/breadcrumbTrail";
import RegisteredUserActions from "./registered-user-actions";
import {DialogToastContext} from "../../../contexts/DialogToastContext";
import DetailPanelLoadingDialog from "../../common/loading/DetailPanelLoadingDialog";
import InformationDialog from "../../common/status_notifications/info";

function RegisteredUsersManagement() {
  let history = useHistory();
  const { getUserRecord, setAccessRoles, getAccessToken } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const toastContext = useContext(DialogToastContext);
  const [userData, setUserData] = useState(undefined);
  const [confirm, setConfirm] = useState(false);
  const [delUserId, setDelUserId] = useState("");
  const [deployingElk, setDeployingElk] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [currentPage, pageSize]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await getRoles();
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false)
    }
  };

  const gotoPage = (pageNumber, pageSize) => {
    setCurrentPage(pageNumber);
    setPageSize(pageSize);
  };

  const getRoles = async () => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);

    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);
    }

    if (userRoleAccess && userRoleAccess.OpseraAdministrator) {
      await getRegisteredUsers();
    }
  };


  const handleDeletePress = (userId) => {
    setConfirm(true);
    setDelUserId(userId);
  }

  const handleCancel = () => {
    setConfirm(false);
    setDelUserId("");
  }

  const handleConfirm = async () => {
    let userId = delUserId;
    await handleDeactivateUser(delUserId);
    setConfirm(false);
    setDelUserId("");
  }

  const handleDeactivateUser = async (userId) => {
    await deactivateUser(userId);
  }

  const gotoProfile = (id) => {
     history.push("/admin/registered-users/" + id);
  }

  const handleDeployElkStack = async (userId) => {
    console.log("Deploying for User ID: ", userId);
    setDeployingElk(true);
    await deployElkStack(userId);
    //refresh page
    await getRegisteredUsers();
    setDeployingElk(false);
  }

  const deployElkStack = async (id) => {
    try {
      const response = await RegisteredUserActions.deployElkStack(id, getAccessToken);
      let statusCode = response.status;
      if (statusCode === 200) {
        toastContext.showSuccessDialog("Successfully Deployed ELK Stack");
      }
      else {
        toastContext.showErrorDialog("Something went wrong deploying ELK stack. View browser logs for more details");
        console.error(response);
      }
    } catch (error) {
      toastContext.showErrorDialog(error.message);
    }
  }

  const deactivateUser = async (userId) => {
    try {
      const response = await RegisteredUserActions.deactivateUser(userId, getAccessToken);
      toastContext.showSuccessDialog("Successfully deactivated user");
      await getRegisteredUsers();
    }
    catch (error) {
      toastContext.showErrorDialog(error);
    }
  }

  const getRegisteredUsers = async () => {
    const response = await RegisteredUserActions.getRegisteredUsers(currentPage, pageSize, getAccessToken);
    setUserData(response.data.users);
  }

  if (!accessRoleData) {
    return (<LoadingDialog size="sm"/>);
  }

  if (!accessRoleData.OpseraAdministrator && !isLoading) {
    return (<AccessDeniedDialog roleData={accessRoleData}/>);
  }

  return (
    <>
      <div>
        <BreadcrumbTrail destination={"registeredUsersManagement"} />
        <h5>Registered Users</h5>
        {confirm ? <Modal header="Confirm Deactivation"
                          message="Warning! Data cannot be recovered once a User is deactivated. Do you still want to proceed?"
                          button="Confirm"
                          handleCancelModal={handleCancel}
                          handleConfirmModal={handleConfirm}/> : null}

        {isLoading  ? <DetailPanelLoadingDialog type={"Registered Users"} />
        :
          Object.keys(userData).length === 0 ? <InformationDialog message="No registered users found" />
            :
            <>
            <RegisteredUsersTable
              data={userData}
              deployingElk={deployingElk}
              gotoProfile={(id) => gotoProfile(id)}
              handleDeletePress={(id) => {
                handleDeletePress(id);
              }}
              handleDeployElkStack={(id) => {
                handleDeployElkStack(id);
              }}/>
            <div className="mt-2">
              <Pagination total={userData.count || 30} currentPage={currentPage} pageSize={pageSize}
                        onClick={(pageNumber, pageSize) => gotoPage(pageNumber, pageSize)}/>
            </div>
          </>
        }
      </div>
      </>
    );
}


export default RegisteredUsersManagement;