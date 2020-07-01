import React, { useReducer, useEffect, useState, useContext, useMemo } from "react";
import { Table, Row, Col, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import ErrorDialog from "../common/error";
import LoadingDialog from "../common/loading";
import { AuthContext } from "../../contexts/AuthContext";
import { format } from "date-fns";
//import InfoDialog from "../common/info";
import Modal from "../common/modal";
import { ApiService, axiosApiService } from "../../api/apiService";
import { useTable, usePagination, useSortBy } from "react-table";
import RegisteredUserTable from "./RegisteredUserTable";
import Pagination from "components/common/pagination";
import { Link } from "react-router-dom";

function RegisteredUsers() {
  const Auth = useContext(AuthContext);
  let history = useHistory();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

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
      accessToken: null,
      userInfo: null
    }
  );

  // Executed every time page number or page size changes
  useEffect(() => {   
    loadPage();
  }, [currentPage, pageSize]);


  const gotoPage = (pageNumber, pageSize) => {
    setCurrentPage(pageNumber);
    setPageSize(pageSize);
  };

  async function loadPage() {
    await checkUserData();
    getApiData();
  }

  async function checkUserData() {
    const { authenticated, getUserRecord, getAccessToken } = Auth;    
    const accessToken = await getAccessToken();
    const userInfo = await getUserRecord();
    setState({ accessToken: accessToken, userInfo: userInfo, authenticated: authenticated });
    if (userInfo) {
      setState({ administrator: userInfo.groups.includes("Admin") });
    }

    if (!userInfo.groups.includes("Admin")) {
      //move out
      history.push("/");
    } 
  }

  function handleDeletePress(userId) { setState({ confirm: true, delUserId: userId }); }
  function handleCancel() { setState({ confirm: false, delUserId: "" }); }

  function handleConfirm() {
    const { delUserId } = state;
    handleDeactivateUser(delUserId);
    setState({ confirm: false, delUserId: "" });
  }

  function handleDeactivateUser(userId) {
    const { accessToken, userInfo } = state;
    deactivateUser(userId, accessToken, userInfo);
  }

  async function handleDeployElkStack(userId) {
    setState({ deployingElk: true });
    await deployElkStack(userId);
    //refresh page
    getApiData();
    setState({ deployingElk: false });
  }

  async function deployElkStack(id) {
    const { accessToken } = state;
    const apiUrl = `/users/tools/activate-elk/${id}`;         
    try {
      const response = await axiosApiService(accessToken).get(apiUrl);      
      console.log(response);    
    }
    catch (err) {
      console.log(err.message);
      setState({
        error: err,
        fetching: false
      });
    }
  }

  function deactivateUser(userId, accessToken, userInfo) {
    const apiCall = new ApiService("/users/deactivate-user", null, accessToken, { userId: userId });
    apiCall.post()
      .then(function (response) {
        setState({
          deactivate: response.data,
          error: null,
          fetching: false
        });
      })
      .catch(function (error) {
        setState({
          error: error,
          fetching: false
        });
      });

  }

  function getApiData() {    
    const { accessToken } = state;
    const urlParams = {
      page: currentPage,
      size: pageSize
    };
    const apiCall = new ApiService("/users/get-users", urlParams, accessToken);
    apiCall.get()
      .then(function (response) {
        // console.log(response.data)
        setState({
          userData: response.data.users,
          error: null,
          fetching: false
        });
      })
      .catch(function (error) {
        setState({
          error: error,
          fetching: false
        });
      });
  }

  const { userData, error, fetching, confirm, administrator, deployingElk } = state;

  return (
    <>
      {
        administrator &&
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
          <br />

          {error ? <ErrorDialog error={error} /> : null}
          {fetching && <LoadingDialog />}

          {confirm ? <Modal header="Confirm Deactivation"
            message="Warning! Data cannot be recovered once a User is deactivated. Do you still want to proceed?"
            button="Confirm"
            handleCancelModal={handleCancel}
            handleConfirmModal={handleConfirm} /> : null}

          {Object.keys(userData).length > 0 && <RegisteredUserTable 
            data={userData} 
            deployingElk={deployingElk} 
            handleDeletePress={(id) => { handleDeletePress(id); }} 
            handleDeployElkStack={(id) => {handleDeployElkStack(id);}} />}

          {Object.keys(userData).length > 0 && <Pagination total={userData.count || 30} currentPage={currentPage} pageSize={pageSize} onClick={(pageNumber, pageSize) => gotoPage(pageNumber, pageSize)} /> }

          <br />
        </div>
      }
    </>
  );
}


export default RegisteredUsers;