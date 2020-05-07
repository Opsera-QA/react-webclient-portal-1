import React, { useContext, useState, useEffect } from "react";
import { axiosApiServiceMultiGet } from "../../api/apiService"; 
import ErrorDialog from "../common/error";
import LoadingDialog from "../common/loading";
import { AuthContext } from "../../contexts/AuthContext"; 
import Modal from "../common/modal";
import ReactJson from "react-json-view";


function ApiDemo() {
  const contextType = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [authData, setAuthData] = useState([]);
  const [user, setUser] = useState([]);
  const [analyticsProfile, setAnalyticsProfile] = useState([]);
  const [tools, setTools] = useState([]);
  const [error, setErrors] = useState();
  const [authenticated, setAuthenticated] = useState();
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState({});
  


  useEffect(() => {    
    const controller = new AbortController();
    const runEffect = async () => {
      try {
        await fetchData();        
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("Request was canceled via controller.abort");
          return;
        }        
      }
    };

    runEffect();

    return () => {
      controller.abort();
    };
  }, []);


  async function fetchData() {
    setLoading(true);
    const { getAccessToken, authenticated } = contextType;
    const accessToken = await getAccessToken();
    setAuthenticated(authenticated);
    const apiUrls = [ "/auth-demo", "/users", "/analytics/settings", "/tools" ];   
    try {
      const [authDemo, userProfile, analyticsProfile, tools ] = await axiosApiServiceMultiGet(accessToken, apiUrls);
      setAuthData(authDemo.data);
      setUser(userProfile.data);
      setAnalyticsProfile(analyticsProfile.data.profile[0]);
      setTools(tools.data);
      setLoading(false);  
      console.log("authDemo", authDemo.data);      
      console.log("userProfile", userProfile.data);
      console.log("tools: ", tools.data);
      console.log("analyticsProfile: ", analyticsProfile.data.profile[0]);
    }
    catch (err) {
      console.log(err.message);
      setLoading(false);
      setErrors(err);
    }
  }


  if (loading) {
    return (<LoadingDialog size="lg" />);
  } else {
    return (
      <div>
        <h2>API Test w/ Okta Authentication Token and Axios.js</h2>
        { error ? <ErrorDialog error={error} /> : null }
      
        <h6 style={{ marginTop: 20 }}>Response Package Breakdown:<br />
          <small className="text-muted">This is confirmation the data is returned from the server and an example of breaking it down 
      into their individual components.  The Response Token is not typically returned, however in this demo, the API Server is 
      programmed to return it to confirm it was sent and received properly.</small></h6>
        <br />
        <div><i>OPSERA_API_SERVER_URL:</i> {process.env.REACT_APP_OPSERA_API_SERVER_URL}</div>
        <div><i>OPSERA_CLIENT_HOST:</i> {process.env.REACT_APP_OPSERA_CLIENT_HOST}</div>
        <div><i>OKTA_BASEURL:</i> {process.env.REACT_APP_OKTA_BASEURL}</div>
        <br />
        {/* <div><i>Response Message Data:</i> {authData ? authData.message : ""}</div>
        <div style={{ marginTop: 20 }}><i>Response Token:</i> <br />
          <span className="code">{authData ? authData.authorization : ""}</span>
        </div> */}
        {/* <div style={{ marginTop: 20 }}>Component getApiData() State Message: {JSON.stringify(messages)}</div> */}
      
        { user && <div className="mt-3 mb-2">
          <div className="lead">User:</div>
                User Name: {user.firstName ? `${user.firstName} ${user.lastName}` : ""}<br />
                User ID: {user ? `${user._id}` : ""}<br />
                Email: {user ? `${user.email}` : ""}<br />
                organizationName: {user ? `${user.organizationName}` : ""}<br />
                division: {user ? `${user.division}` : ""}<br />
                domain: {user ? `${user.domain}` : ""}<br />
                createdAt: {user ? `${user.createdAt}` : ""}<br />
                ssoSystem: {user ? `${user.ssoSystem}` : ""}
          
        </div> }

        { analyticsProfile !== undefined && <div className="mb-2">          
          <div className="lead mt-3">Analytics Profile:</div>
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
        </div> }


        { tools !== undefined && tools.length > 0 && <div className="mb-5">          
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
        </div> }


        
        <div style={{ width: "75vw", border: "1px solid #ced4da", borderRadius: ".25rem" }}>
          <strong>API Response Data Package:</strong>
          <ReactJson src={authData} />            
        </div>
        

        {showModal ? <Modal header="Log Details"
          jsonMessage={modalMessage}
          jsonView="true"
          button="OK"
          size="lg"
          handleCancelModal={() => setShowModal(false)}
          handleConfirmModal={() => setShowModal(false)} /> : null}
      </div>
    );
  }

}







export default ApiDemo;