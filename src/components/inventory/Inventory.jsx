import React, { PureComponent } from 'react';
import { Form, Alert, Row, Col, Button } from 'react-bootstrap';
import Moment from 'react-moment';
import { AuthContext } from '../../contexts/AuthContext';  //REact Context API Code for User Authentication
import { ApiService } from '../../api/apiService';
import ErrorDialog from "../common/error";
import LoadingDialog from "../common/loading";
import { handleError } from "../../helpers";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faWrench } from '@fortawesome/free-solid-svg-icons';


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

  async componentDidMount() {
    const { getAccessToken, getUserInfo } = this.context;
    const accessToken = await getAccessToken();
    const userInfo = await getUserInfo();
    this.getApiData(accessToken, userInfo);
  }

  async componentDidUpdate() {
    const { getAccessToken, getUserInfo } = this.context;
    const accessToken = await getAccessToken();
    const userInfo = await getUserInfo();
    this.getApiData(accessToken, userInfo);
  }

  gotoLink = (id) => {
    let path = `/${id}`;
    this.props.history.push(path);
  }

  getApiData(accessToken, userInfo) {

    let message = handleError('test');
    console.log(message)

    console.log(userInfo.sub) //current unique user ID
    let urlParams = { userid: userInfo.sub };
    const apiCall = new ApiService('/applications', urlParams, accessToken);
    let currentComponent = this;
    apiCall.get()
      .then(function (response) {
        currentComponent.setState({
          data: response.data,
          error: false,
          messages: 'API call was successful!'
        });
      })
      .catch(function (error) {
        let message = handleError(error);

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

        <div class="row">
          <div class="col ml-auto">
            <Button variant="outline-primary" className="float-right" size="sm" onClick={() => this.gotoLink('platform')}>
              <FontAwesomeIcon icon={faPlus} fixedWidth /> Register Application
            </Button>

            <Button variant="outline-primary" className="float-right mr-2" size="sm" onClick={() => this.gotoLink('pipeline')}>
              <FontAwesomeIcon icon={faWrench} fixedWidth /> Configure Pipeline
            </Button>
          </div>
        </div>

        {error ? <ErrorDialog errorMessage={messages} /> : null}

        {fetching && <LoadingDialog />}
        <div>
          {(!fetching && !error && data.length === 0) &&
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
    <div style={{ marginTop: 25 }}>
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
        <Col lg={4} style={{ fontWeight: 'bold' }}>{name}</Col>
        <Col lg={2}>Port {port}</Col>
        <Col lg={1}>{toolStatus}</Col>
        <Col lg={2}>{versionNumber}</Col>
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
