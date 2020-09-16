import React, {useContext, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import LoadingDialog from "../../common/status_notifications/loading";
import {AuthContext} from "../../../contexts/AuthContext";
import Modal from "../../common/modal/modal";
import {ApiService} from "../../../api/apiService";
import RegisteredUsersTable from "./RegisteredUsersTable";
import Pagination from "components/common/pagination";

import AccessDeniedDialog from "../../common/status_notifications/accessDeniedInfo";
import BreadcrumbTrail from "../../common/navigation/breadcrumbTrail";
import RegisteredUserActions from "./registered-user-actions";
import {DialogToastContext} from "../../../contexts/DialogToastContext";

function RegisteredUsersManagement() {
  let history = useHistory();
  const { getUserRecord, setAccessRoles, getAccessToken } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [accessRoleData, setAccessRoleData] = useState({});
  const toastContext = useContext(DialogToastContext);
  const [userData, setUserData] = useState([]);
  const [confirm, setConfirm] = useState(false);
  const [delUserId, setDelUserId] = useState("");
  const [administrator, setAdministrator] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState(false);
  const [messages, setMessages] = useState(null);
  const [deployingElk, setDeployingElk] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [deactivate, setDeactivate] = useState(null);

  // Executed every time page number or page size changes
  useEffect(() => {
    getApiData();
  }, [currentPage, pageSize]);

  useEffect(() => {
    getRoles();
  }, []);

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

    if (userRoleAccess.OpseraAdministrator) {
      getApiData();
    } else {
      history.push("/");
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
    await getApiData();
    setDeployingElk(false);
  }

  const deployElkStack = async (id) => {
    try {
      const response = await RegisteredUserActions.deployElkStack(id, getAccessToken);
      toastContext.showSuccessDialog("Successfully Deployed ELK Stack");
    } catch (error) {
      toastContext.showErrorDialog(error.message);
    }
  }

  // TODO: Move to registeredUsersActions
  const deactivateUser = async (userId) => {
    const accessToken = await getAccessToken();
    const apiCall = new ApiService("/users/deactivate-user", null, accessToken, { userId: userId });
    apiCall.post()
      .then(function(response) {
        setDeactivate(response.data);
        setError(null);
        setFetching(false);
      })
      .catch(function(error) {
        toastContext.showErrorDialog(error);
      });
  }

  // TODO: Move to registeredUsersActions
  const getApiData = async () => {
    const accessToken = await getAccessToken();
    const urlParams = {
      page: currentPage,
      size: pageSize,
    };
    const apiCall = new ApiService("/users/get-users", urlParams, accessToken);
    apiCall.get()
      .then(function(response) {
        //console.log(response.data);
        setUserData(response.data.users);
      })
      .catch(function(error) {
        toastContext.showErrorDialog(error);
      });
  }

  if (!accessRoleData) {
    return (<LoadingDialog size="sm"/>);
  }

  if (!accessRoleData.OpseraAdministrator) {
    return (<AccessDeniedDialog roleData={accessRoleData}/>);
  }

  return (
      <div>
        <BreadcrumbTrail destination={"registeredUsersManagement"} />
        <h5>Registered Users</h5>
        {confirm ? <Modal header="Confirm Deactivation"
                          message="Warning! Data cannot be recovered once a User is deactivated. Do you still want to proceed?"
                          button="Confirm"
                          handleCancelModal={handleCancel}
                          handleConfirmModal={handleConfirm}/> : null}

        {Object.keys(userData).length > 0 && <RegisteredUsersTable
          data={userData}
          deployingElk={deployingElk}
          gotoProfile={(id) => gotoProfile(id) }
          handleDeletePress={(id) => {
            handleDeletePress(id);
          }}
          handleDeployElkStack={(id) => {
            handleDeployElkStack(id);
          }}/>}

        {Object.keys(userData).length > 0 &&
        <Pagination total={userData.count || 30} currentPage={currentPage} pageSize={pageSize}
                    onClick={(pageNumber, pageSize) => gotoPage(pageNumber, pageSize)}/>}
      </div>
    );
}


export default RegisteredUsersManagement;