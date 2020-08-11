import React, { useReducer, useEffect, useState, useContext, useMemo } from "react";
import { useHistory } from "react-router-dom";
import ErrorDialog from "../../common/error";
import LoadingDialog from "../../common/loading";
import { AuthContext } from "../../../contexts/AuthContext";
import Modal from "../../common/modal/modal";
import { ApiService, axiosApiService } from "../../../api/apiService";
import RegisteredUserTable from "./RegisteredUserTable";
import Pagination from "components/common/pagination";
import { Link } from "react-router-dom";

import AccessDeniedDialog from "../../common/accessDeniedInfo";

function RegisteredUsers() {
  let history = useHistory();
  const Auth = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [accessRoleData, setAccessRoleData] = useState({});
  const { getUserRecord, setAccessRoles, getAccessToken } = Auth;

  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      userData: [],
      confirm: false,
      delUserId: "",
      administrator: false,
      fetching: true,
      error: null,
      messages: null,
      deployingElk: false,
      userInfo: null,
    },
  );

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


  function handleDeletePress(userId) {
    setState({ confirm: true, delUserId: userId });
  }

  function handleCancel() {
    setState({ confirm: false, delUserId: "" });
  }

  function handleConfirm() {
    const { delUserId } = state;
    handleDeactivateUser(delUserId);
    setState({ confirm: false, delUserId: "" });
  }

  function handleDeactivateUser(userId) {
    const { userInfo } = state;
    deactivateUser(userId, userInfo);
  }

  async function handleDeployElkStack(userId) {
    console.log("Deploying for User ID: ", userId);
    setState({ deployingElk: true });
    await deployElkStack(userId);
    //refresh page
    getApiData();
    setState({ deployingElk: false });
  }

  async function deployElkStack(id) {
    const accessToken = await getAccessToken();
    const apiUrl = `/users/tools/activate-elk/${id}`;
    try {
      const response = await axiosApiService(accessToken).get(apiUrl);
      //console.log(response);    
    } catch (err) {
      console.log(err.message);
      setState({
        error: err,
        fetching: false,
      });
    }
  }

  async function deactivateUser(userId, userInfo) {
    const accessToken = await getAccessToken();
    const apiCall = new ApiService("/users/deactivate-user", null, accessToken, { userId: userId });
    apiCall.post()
      .then(function(response) {
        setState({
          deactivate: response.data,
          error: null,
          fetching: false,
        });
      })
      .catch(function(error) {
        setState({
          error: error,
          fetching: false,
        });
      });

  }

  async function getApiData() {
    const accessToken = await getAccessToken();
    const urlParams = {
      page: currentPage,
      size: pageSize,
    };
    const apiCall = new ApiService("/users/get-users", urlParams, accessToken);
    apiCall.get()
      .then(function(response) {
        //console.log(response.data);
        setState({
          userData: response.data.users,
          error: null,
          fetching: false,
        });
      })
      .catch(function(error) {
        setState({
          error: error,
          fetching: false,
        });
      });
  }

  const { userData, error, fetching, confirm, deployingElk } = state;

  if (!accessRoleData) {
    return (<LoadingDialog size="sm"/>);
  } else if (!accessRoleData.OpseraAdministrator) {
    return (<AccessDeniedDialog roleData={accessRoleData}/>);
  } else {
    return (

      <div>

        <h4>Administration Tools</h4>

        <nav aria-label="breadcrumb">
          <ol className="breadcrumb" style={{ backgroundColor: "#fafafb" }}>
            <li className="breadcrumb-item">
              <Link to="/admin">Admin</Link>
            </li>
            <li className="breadcrumb-item active">Registered Users</li>
          </ol>
        </nav>

        <h5>Registered Users</h5>
        <br/>

        {error ? <ErrorDialog error={error}/> : null}
        {fetching && <LoadingDialog/>}

        {confirm ? <Modal header="Confirm Deactivation"
                          message="Warning! Data cannot be recovered once a User is deactivated. Do you still want to proceed?"
                          button="Confirm"
                          handleCancelModal={handleCancel}
                          handleConfirmModal={handleConfirm}/> : null}

        {Object.keys(userData).length > 0 && <RegisteredUserTable
          data={userData}
          deployingElk={deployingElk}
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
}


export default RegisteredUsers;