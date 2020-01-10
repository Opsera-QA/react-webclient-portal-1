import React, { PureComponent } from 'react'
import { Container, Form, Alert } from 'react-bootstrap';
import { AuthContext } from '../../../contexts/AuthContext';  //REact Context API Code for User Authentication
import { ApiService } from '../../../api/apiService';
import ErrorDialog from "../../common/error";
import LoadingDialog from "../../common/loading";
import Tools from "./Tools"

class DeleteTools extends PureComponent {
  static contextType = AuthContext;
  constructor(props, context) {
    super(props, context);
    this.state = {
      data: [],
      fetching: true,
      error: null,
      messages: null,
      application: null
    };
  }

  async componentDidMount() {
    const { getAccessToken, getUserInfo } = this.context;  //this.context is where all data from the above AuthContext component resides.  It's like the state props design wise
    const userInfo = await getUserInfo();
    const urlParams = { userid: userInfo.sub };
    const accessToken = await getAccessToken();
    this.getApiData(accessToken, urlParams);
  }

  getApiData(accessToken, urlParams) {
    const apiCall = new ApiService('applications', urlParams, accessToken);
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


  handleChangeValue = (e) => {
    const { data } = this.state
    const application = data.find(app => app.name === e.target.value)
    this.setState({
      application,
    })
  }

  getOptionsForApp = a => ({
    value: a.name,
    text: a.name,
    key: a._id,
  })

  render() {
    const { data, error, messages, fetching } = this.state
    console.log(data)

    return (
      <Container className="DefaultDashboardPage">
        <h2>Delete Tools</h2>
        {error ? <ErrorDialog errorMessage={messages} /> : null}
        {fetching && <LoadingDialog />}

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
              onChange={this.handleChangeValue}
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

        <Tools application={this.state.application} />
      </Container>
    )
  }
}

export default DeleteTools;
