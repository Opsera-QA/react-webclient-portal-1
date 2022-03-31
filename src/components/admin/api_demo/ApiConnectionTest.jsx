import React, { useContext, useState, useEffect } from "react";
import { axiosApiServiceMultiGet } from "api/apiService";
import { AuthContext } from "contexts/AuthContext";
import Modal from "components/common/modal/modal";
import ReactJson from "react-json-view";
import {DialogToastContext} from "contexts/DialogToastContext";
import RegisteredUserActions from "components/admin/registered_users/registered-user-actions";
import Model from "core/data_model/model";
import registeredUserToolsMetadata
  from "components/admin/registered_users/details/tools/registered-user-tools-form-fields";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import JsonField from "components/common/fields/json/JsonField";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import ApiConnectionDemoSubNavigationBar from "components/admin/api_demo/ApiConnectionDemoSubNavigationBar";
import StandaloneJsonField from "components/common/fields/json/StandaloneJsonField";
import InfoContainer from "components/common/containers/InfoContainer";
import {faChartNetwork, faUser} from "@fortawesome/pro-light-svg-icons";

function ApiConnectionTest() {
  const {getAccessToken, getUserRecord} = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(false);
  const [authData, setAuthData] = useState([]);
  const [user, setUser] = useState([]);
  const [analyticsProfile, setAnalyticsProfile] = useState([]);
  const [tools, setTools] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState({});
  const [registeredUserToolsDto, setRegisteredUserToolsDto] = useState(undefined);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await fetchData();
      await getUserTools();
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const getUserTools = async () => {
    const user = await getUserRecord();
    const response = await RegisteredUserActions.getRegisteredUserTools(user["_id"], getAccessToken);
    setRegisteredUserToolsDto(new Model({...response?.data}, registeredUserToolsMetadata, false));
  };

  const fetchData = async () => {
    const accessToken = await getAccessToken();
    const apiUrls = ["/auth-demo", "/users", "/analytics/settings", "/tools"];
    try {
      const [authDemo, userProfile, analyticsProfile, tools] = await axiosApiServiceMultiGet(accessToken, apiUrls);
      setAuthData(authDemo?.data);
      setUser(userProfile?.data);

      if (analyticsProfile?.data != null) {
        setAnalyticsProfile(analyticsProfile?.data?.profile[0]);
        console.log("analyticsProfile: ", analyticsProfile?.data?.profile[0]);
      }
      setTools(tools?.data);
      console.log("authDemo", authDemo?.data);
      console.log("userProfile", userProfile?.data);
      console.log("tools: ", tools?.data);
    } catch (error) {
      console.error(error);
      toastContext.showLoadingErrorDialog(error);
    }
  };

  // TODO: Remove if unnecessary, but for now leaving here in case we want to use it again
  const getOldToolsDisplayer = () => {
    return (
      <>
        {tools !== undefined && tools.length > 0 && <div className="mb-5">
          <div className="lead mt-3">Tools:</div>
          <div className="text-muted">Tool entries from Platform MongoDB registered by microservices.</div>
          {tools.map((item, idx) => (
            <div key={idx} className="mb-2">
              <div>instanceStatus: {JSON.stringify(item.instanceStatus)}</div>
              <div>ID: {JSON.stringify(item._id)}</div>
              <div>User: {JSON.stringify(item.user)}</div>

              <div>Name: {JSON.stringify(item.name)}</div>
              <div>Instance ID: {JSON.stringify(item.instanceId)}</div>
              <div>DNS Name: {JSON.stringify(item.dnsName)}</div>
            </div>
          ))}
        </div>}
      </>
    );
  };

  const getToolDetails = () => {
    if (registeredUserToolsDto != null) {
      return (
        <div className={"my-2"}>
          <Row>
            <Col md={12} lg={6}>
              <JsonField dataObject={registeredUserToolsDto} fieldName={"platformDbTools"}/>
            </Col>
            <Col md={12} lg={6}>
              <JsonField dataObject={registeredUserToolsDto} fieldName={"customerDbTools"}/>
            </Col>
          </Row>
        </div>
      );
    }
  };

  const getUserFields = () => {
    if (user) {
      return (
        <InfoContainer
          titleText={"User"}
          titleIcon={faUser}
        >
          <div className={"m-3"}>
            User Name: {user.firstName ? `${user.firstName} ${user.lastName}` : ""}<br/>
            User ID: {user ? `${user._id}` : ""}<br/>
            Email: {user ? `${user.email}` : ""}<br/>
            organizationName: {user ? `${user.organizationName}` : ""}<br/>
            division: {user ? `${user.division}` : ""}<br/>
            domain: {user ? `${user.domain}` : ""}<br/>
            createdAt: {user ? `${user.createdAt}` : ""}<br/>
            updatedAt: {user ? `${user.updatedAt}` : ""}<br/>
            ssoSystem: {user ? `${user.ssoSystem}` : ""}<br/>
            LDAP Account: {user ? `${JSON.stringify(user.ldap, null, 2)}` : ""}<br/>
            Group Membership: {user ? `${JSON.stringify(user.groups, null, 2)}` : ""}<br/>
            LDAP SyncAt: {user ? `${user.ldapSyncAt}` : ""}
          </div>
        </InfoContainer>
      );
    }
  };

  const getApiResponseDataPackageContainer = () => {
    if (analyticsProfile) {
      return (
        <div className={"my-2"}>
          <StandaloneJsonField
            titleText={"API Response Data Package:"}
            json={authData}
          />
        </div>
      );
    }
  };

  const getAnalyticsProfileContainer = () => {
    if (analyticsProfile) {
      return (
        <InfoContainer
          titleText={"Analytics Profile"}
          className={"my-2"}
          titleIcon={faChartNetwork}
        >
          <div className={"m-3"}>
            <div>Enabled Tools: {JSON.stringify(analyticsProfile.enabledTools)}</div>
            <div>dataUsage: {JSON.stringify(analyticsProfile.dataUsage)}</div>
            <div>workflowType: {JSON.stringify(analyticsProfile.workflowType)}</div>

            <div>enabledToolsOn: {JSON.stringify(analyticsProfile.enabledToolsOn)}</div>
            <div>updatedToolsOn: {JSON.stringify(analyticsProfile.updatedToolsOn)}</div>
            <div>disabledToolsOn: {JSON.stringify(analyticsProfile.disabledToolsOn)}</div>
            <div>defaultPersona: {JSON.stringify(analyticsProfile.defaultPersona)}</div>
            <div>query_configuration: {JSON.stringify(analyticsProfile.query_configuration)}</div>
            <div>analyticsConfiguration: {JSON.stringify(analyticsProfile.analyticsConfiguration)}</div>

            <div>personaConfiguration: {JSON.stringify(analyticsProfile.personaConfiguration)}</div>
            <div>dashboardConfiguration: {JSON.stringify(analyticsProfile.dashboardConfiguration)}</div>
            <div>customerDB: {JSON.stringify(analyticsProfile.customerDB)}</div>
            <div>active: {JSON.stringify(analyticsProfile.active)}</div>
          </div>
        </InfoContainer>
      );
    }
  };

  return (
    <ScreenContainer
      breadcrumbDestination={"apiConnectionTest"}
      isLoading={isLoading}
      navigationTabContainer={
        <ApiConnectionDemoSubNavigationBar
          activeTab={"apiConnectionTest"}
        />
      }
    >
      <div className="m-3">
      <h6 style={{marginTop: 20}}>Response Package Breakdown:<br/>
        <small className="text-muted">This is confirmation the data is returned from the server and an example of
          breaking it down
          into their individual components. The Response Token is not typically returned, however in this demo, the
          API Server is
          programmed to return it to confirm it was sent and received properly.</small></h6>
      <br/>
      <div><i>OPSERA_API_SERVER_URL:</i> {process.env.REACT_APP_OPSERA_API_SERVER_URL}</div>
      <div><i>OPSERA_CLIENT_HOST:</i> {process.env.REACT_APP_OPSERA_CLIENT_HOST}</div>
      <div><i>OKTA_BASEURL:</i> {process.env.REACT_APP_OKTA_BASEURL}</div>
      <br/>
      {/* <div><i>Response Message Data:</i> {authData ? authData.message : ""}</div>
        <div style={{ marginTop: 20 }}><i>Response Token:</i> <br />
          <span className="code">{authData ? authData.authorization : ""}</span>
        </div> */}
      {/* <div style={{ marginTop: 20 }}>Component getApiData() State Message: {JSON.stringify(messages)}</div> */}

      {getUserFields()}
        {getAnalyticsProfileContainer()}
        {getApiResponseDataPackageContainer()}
      {/*{getOldToolsDisplayer()}*/}
      {getToolDetails()}
      {showModal ? <Modal header="Log Details"
                          jsonMessage={modalMessage}
                          jsonView="true"
                          button="OK"
                          size="lg"
                          handleCancelModal={() => setShowModal(false)}
                          handleConfirmModal={() => setShowModal(false)}/> : null}
      </div>
    </ScreenContainer>
  );
}


export default ApiConnectionTest;