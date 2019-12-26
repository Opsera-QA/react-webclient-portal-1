
import React, { PureComponent } from 'react';
import { Form, Container, Alert, Row, Col } from 'react-bootstrap';

import { AuthContext } from '../../contexts/AuthContext';  //REact Context API Code for User Authentication
import { ApiService } from '../../api/apiService';
import ErrorDialog from "../common/error";
import LoadingDialog from "../common/loading"

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

  // First call the getAccessToken and then call the API
  async componentDidMount() {
    const { getAccessToken } = this.context;  //this.context is where all data from the above AuthContext component resides.  It's like the state props design wise
    const accessToken = await getAccessToken();
    this.getApiData(accessToken);
  }

  getApiData(accessToken) {
    const apiCall = new ApiService('applications', {}, accessToken); //initial endpoint doesn't require "/""
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
    const { data, error, messages } = this.state
    console.log(data);
    const loading = data == null
    return (
      <div>
        <h3>Inventory</h3>
        <p>All configured applications are available for viewing below.  Select the item you want to view from the list.</p>
        {error ? <ErrorDialog errorMessage={messages} /> : null}
        <div>
          {(loading) && <LoadingDialog />}

          {(!loading && data.length === 0) &&
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
                hidden={(!loading && data.length > 0) ? false : true}
                onChange={this.handleDropdownChange}
                style={{ marginTop: 25 }}>
                <option value="" selected disabled>{loading ? "loading..." : "Select application"}</option>
                {!loading && (
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
        {(!loading && data.length > 0) &&
          <>
            {loading ? null : <App application={this.getApp()} />}
          </>
        }
      </div>
    )
  }
};

function App({ application }) {
  if (!application)
    return (
      <div>
        <p>choose application from above</p>
      </div>
    )

  const { tools } = application

  if (tools.length === 0) {
    return (
      <div>
        <p>No tools for this application.</p>
      </div>
    )
  }

  return (
    <div>
      {tools.map((tool, key) => (
        <ToolTable tool={tool} key={key} />
      ))}
    </div>
  )
}

const ToolTable = ({ tool }) => {
  const { name, toolStatus, toolURL } = tool
  const active = toolStatus === "ACTIVE"

  return (
    <Container>
      <Row style={{ marginTop: 10 }}>
        <Col className="row-header-text">{name}</Col>
      </Row>
      <Row>
        <Col>
          {active ? (<div>URL: <a href={toolURL}>{toolURL}</a></div>) : ('Inactive Entry')}
        </Col>
      </Row>
    </Container>
  )
}

const mapStateToProps = ({ applications }) => ({
  applications,
})

export default Inventory;

// export default withAuth(connect(
//   mapStateToProps,
//   { getApps },
// )(Inventory))
