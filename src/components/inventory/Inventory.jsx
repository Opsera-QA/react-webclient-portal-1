import React, { PureComponent } from 'react';
import { Form, Alert, Row, Col } from 'react-bootstrap';
import Moment from 'react-moment';
import { AuthContext } from '../../contexts/AuthContext';  //REact Context API Code for User Authentication
import { ApiService } from '../../api/apiService';
import ErrorDialog from "../common/error";
import LoadingDialog from "../common/loading";

class Inventory extends PureComponent {
  static contextType = AuthContext;  //Registers the User Authentication context data in the component

  constructor(props, context) {
    super(props, context);
    this.state = {
      data: [],
      fetching: true,
      error: null,
      messages: null
    };
  }

  // First call the getAccessToken/userId and then call the API
  async componentDidMount() {
    const { getAccessToken, getUserInfo } = this.context; 
    const accessToken = await getAccessToken();
    console.log(accessToken);
    const userInfo = await getUserInfo();
    this.getApiData(accessToken, userInfo);
  }


  getApiData(accessToken, userInfo) {
    console.log(userInfo.sub) //current unique user ID
    let urlParams = {uid: userInfo.sub};
    const apiCall = new ApiService('/applications', urlParams, accessToken); 
    let currentComponent = this;
    apiCall.get().then(function (response) {
      currentComponent.setState({
        data: response.data,
        error: false,
        messages: 'API call was successful!'
      });
    })
      .catch(function (error) {
        let message = null;
        if (error.response) {
          message = `Status ${error.response.status}: ${
            error.response.data.message ? error.response.data.message : JSON.stringify(error.response.data)}`;
        }
        console.log(message ? `ERROR: ${message}` : `Error Reported: ${error}`);

        currentComponent.setState({
          error: true,
          messages: message ? message : 'Error reported accessing API.'
        });

      })
      .finally(function () {
        currentComponent.setState({ fetching: false });
      });
  }


  handleDropdownChange = (e) => {
    this.setState({ key: e.target.value })
  }

  getApp = () => {
    console.log(this.state)
    const { key, data } = this.state
    return data.find(({ name }) => name === key)
  }

  setPlaceholder = () => {
    alert('coming soon');
  }

  render() {
    const { data, error, messages, fetching } = this.state
    console.log(data);
    return (
      <div>
        <h3>Inventory</h3>
        <p>All configured applications are available for viewing below.  Select the item you want to view from the list.</p>
        {error ? <ErrorDialog errorMessage={messages} /> : null}
        {fetching && <LoadingDialog />}
        <div>
          {(!fetching && data.length === 0) &&
            <div className="mt-3">
              <Alert variant="secondary">
                No applications are currently configured for the system.
              </Alert>
            </div>
          }

          <Form>
            <Form.Group>
              <Form.Control as="select"
                inputRef={el => this.inputEl = el}
                hidden={(!fetching && data.length > 0) ? false : true}
                onChange={this.handleDropdownChange}
                style={{ marginTop: 25 }}>
                <option value="" selected disabled>{fetching ? "loading..." : "Select application"}</option>
                {!fetching && (
                  <>
                    {data ? data.map(application => (
                      <option key={application.name} value={application.name}>{application.name}</option>
                    )) : ''}
                  </>
                )}
              </Form.Control>
            </Form.Group>
          </Form>
        </div>
        {(!fetching && data.length > 0) &&
          <>
            {fetching ? null : <App application={this.getApp()} />}
          </>
        }
      </div>
    )
  }
};

function App({ application }) {
  if (!application)
    return (<div></div>)

  const { tools } = application
  if (tools.length === 0) {
    return (
      <div>
        <p>No tools for this application.</p>
      </div>
    )
  }

  return (
    <div style={{marginTop: 25}}>
      {tools.map((tool, key) => (
        <ToolTable tool={tool} key={key} />
      ))}
    </div>
  )
}

const ToolTable = ({ tool }) => {
  const { name, port, toolStatus, toolURL, versionNumber, installationDate, dnsName } = tool
  return (
    <div className="grid-striped">
      <Row style={{ marginTop: 20 }}>
        <Col lg={4} style={{fontWeight: 'bold'}}>{name}</Col>
        <Col lg={2}>Port { port }</Col>
        <Col lg={1}>{ toolStatus }</Col>
        <Col lg={2}>{ versionNumber }</Col>
        <Col lg={3}>Installed <Moment format="MM/DD/YYYY" date={installationDate} /></Col>
      </Row>
      <Row>
        <Col lg={12}><a href={toolURL}>{toolURL}</a></Col>
        <Col lg={12}>{dnsName}</Col>
      </Row>
    </div>
  )
}

export default Inventory;
