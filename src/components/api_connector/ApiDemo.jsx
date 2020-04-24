import React, { useContext, useState, useEffect } from "react";
import { axiosApiServiceMultiGet } from "../../api/apiService"; 
import ErrorDialog from "../common/error";
import LoadingDialog from "../common/loading";
import { AuthContext } from "../../contexts/AuthContext"; 
import Modal from "../common/modal";
import JSONInput from "react-json-editor-ajrm";
import locale    from "react-json-editor-ajrm/locale/en";


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
    const apiUrls = [ "/auth-demo", "/users", "/analytics/settings", "/users/tools" ];   
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
        <div><i>Response Message Data:</i> {authData ? authData.message : ""}</div>
        <div style={{ marginTop: 20 }}><i>Response Token:</i> <br />
          <span className="code">{authData ? authData.authorization : ""}</span>
        </div>
        {/* <div style={{ marginTop: 20 }}>Component getApiData() State Message: {JSON.stringify(messages)}</div> */}
      
        { user && <div className="mt-3 mb-2">
          <p className="lead">User:</p>
                User Name: {user.firstName ? `${user.firstName} ${user.lastName}` : ""}<br />
                User ID: {user ? `${user._id}` : ""}<br />
                Email: {user ? `${user.email}` : ""}<br />
                organizationName: {user ? `${user.organizationName}` : ""}<br />
                division: {user ? `${user.division}` : ""}<br />
                domain: {user ? `${user.domain}` : ""}<br />
                createdAt: {user ? `${user.createdAt}` : ""}<br />
                ssoSystem: {user ? `${user.ssoSystem}` : ""}
          
        </div> }

        { tools !== undefined && tools.length > 0 && <div className="mt-3 mb-2">          
          <p className="lead">Tools:</p>
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

        { analyticsProfile !== undefined && <div className="mt-3 mb-5">          
          <p className="lead">Analytics Profile:</p>
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


        
        <div style={{ width: "75vw", border: "1px solid #ced4da", borderRadius: ".25rem" }}>
          <strong>API Response Data Package:</strong>
          <JSONInput
            placeholder={authData}
            theme="light_mitsuketa_tribute"
            locale={locale}
            viewOnly="true"
            confirmGood={false}
            width="950px"
          />
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







/* 
class ApiDemo extends Component {
  static contextType = AuthContext;  //Registers the User Authentication context data in the component
 
  constructor(props, context) {
    super(props, context);
    this.state = {
      data: [],
      user: [],
      fetching: true,
      error: null,
      messages: null
    };
  }

  // First call the getAccessToken and then call the API
  async componentDidMount() {
    const { getAccessToken, setSharedState } = this.context;  //this.context is where all data from the above AuthContext component resides.  It's like the state props design wise
    const accessToken = await getAccessToken();
    this.getApiData(accessToken);
    this.getUserData(accessToken);

    setSharedState({ "data1":"test", "data2":30, "data3":null });  //Demo of how to use sharedState in AuthContext for sharing data between subsets of components
  }

  getApiData(accessToken) {
    const apiCall = new ApiService("/auth-demo", {}, accessToken);
    let currentComponent = this;
    apiCall.get().then(function (response) {
      currentComponent.setState({
        data: response.data,
        error: null,
        fetching: false
      });
    })
      .catch(function (error) {
        currentComponent.setState({
          error: error,
          fetching: false
        }); 
      });
  }


  getUserData(accessToken) {
    const apiCall = new ApiService("/users", {}, accessToken);
    let currentComponent = this;
    apiCall.get().then(function (response) {
      currentComponent.setState({
        user: response.data,
        error: null,
        fetching: false
      });
    })
      .catch(function (error) {
        currentComponent.setState({
          error: error,
          fetching: false
        }); 
      });
  }


  render() {
    const { data, user, error, messages } = this.state;
    const { authenticated, sharedState } = this.context;
    console.log(this.context);
    console.log(sharedState); //  Use this share state temporarily among components
    return (
      <div>
        <h2>API Test w/ Okta Authentication Token and Axios.js</h2>
        { error ? <ErrorDialog error={error} /> : null }

        <div><strong>API Response Data Package:</strong><br />
          <span className="text-muted">{JSON.stringify(data)}</span></div>
        <h6 style={{ marginTop: 20 }}>Response Package Breakdown:<br />
          <small className="text-muted">This is confirmation the data is returned from the server and an example of breaking it down 
        into their individual components.  The Response Token is not typically returned, however in this demo, the API Server is 
        programmed to return it to confirm it was sent and received properly.</small></h6>
        <br />
        <div><i>OPSERA_API_SERVER_URL:</i> {process.env.REACT_APP_OPSERA_API_SERVER_URL}</div>
        <div><i>OPSERA_CLIENT_HOST:</i> {process.env.REACT_APP_OPSERA_CLIENT_HOST}</div>
        <div><i>OKTA_BASEURL:</i> {process.env.REACT_APP_OKTA_BASEURL}</div>
        <br />
        <div><i>Response Message Data:</i> {data ? data.message : ""}</div>
        <div style={{ marginTop: 20 }}><i>Response Token:</i> <br />
          <span className="code">{data ? data.authorization : ""}</span>
        </div>
        <div style={{ marginTop: 20 }}>Component getApiData() State Message: {JSON.stringify(messages)}</div>
        
        { authenticated && <div style={{ marginTop: 20 }}>
          <h6 style={{ marginTop: 25 }}>AuthContext Data:
            <br />
            <small className="text-muted">This confirms the React Context is working properly in the app returning User Properties from Okta.</small></h6>
          <AuthContext.Consumer>
            {({ userInfo }) => {
              console.log(userInfo);
              return(<div style={{ margin:5 }}>
                <div>
                  User Name: {userInfo ? `${userInfo.name}` : ""}<br />
                  User ID: {user ? `${user._id}` : ""}<br />
                  Email: {userInfo ? `${userInfo.email}` : ""}<br />
                  Zone: {userInfo ? `${userInfo.zoneinfo}` : ""}</div>
              </div>);}}
          </AuthContext.Consumer>
        </div> }


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
} */
export default ApiDemo;