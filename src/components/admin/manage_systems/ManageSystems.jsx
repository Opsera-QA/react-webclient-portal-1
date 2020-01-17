import React, { PureComponent } from "react";
import { Container, Form, Alert } from "react-bootstrap";
import { AuthContext } from "../../../contexts/AuthContext";  //REact Context API Code for User Authentication
import { ApiService } from "../../../api/apiService";
import UserInfo from "./UserInfo";
import SearchInput from "./SearchInput";
import ErrorDialog from "../../common/error";
import Tools from "../delete_tools/Tools";


const initState = {
  loading: false,
  applications: null,
  users: null,
  application: null,
  orgs: null,
  org: "",
  fetching: true,
  error: null,
  messages: null
};

export default class ManageSystems extends PureComponent {
    static contextType = AuthContext; 
    constructor(props, context) {
      super(props, context);
      this.state = initState; 
    }

    componentDidMount() {}
  
    handleUserChangeValue = (_, {value}) => {
      const {users} = this.state;
      const user = users.find(user => user.email === value);
      this.setState({
        user,
        applications: user.applications || [],
      });
    }
  
    handleChangeValue = (_, {value}) => {
      const {applications = []} = this.state;
      const application = applications.find(app => app.name === value);
      this.setState({
        application,
      });
    }
  
    getOptionsForApp = a => ({
      value: a.name,
      text: a.name,
      key: a._id,
    })
  
    getOptionsFromUser = user => ({
      value: user.email,
      text: user.email,
    })
  
    orgSearch = async (e) => {
      e.preventDefault();
      const {org} = this.state;
      this.setState({
        loading: true,
      });
      try {
        const { getAccessToken } = this.context;  //this.context is where all data from the above AuthContext component resides.  It's like the state props design wise
        const accessToken = await getAccessToken();
        const apiCall = new ApiService("/organization/"+org, {}, accessToken);
        let currentComponent = this;
        apiCall.get().then(function (response) {
          const users = response.data;              // TODO : verify this after api req is processed
          currentComponent.setState({
            users: users.data,                      // users.data or users verify with api response
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
      } catch (err) {
        console.log(err);
      }
      this.setState({
        loading: false,
      });
    }
  
    handleChange = ({target: {value, name}}) => {
      let updater = {
        [name]: value,
      };
  
      if (name === "org") {
        updater = {
          ...initState,
          [name]: value,
        };
      }
  
      this.setState(updater);
    }
    render() {
      const {applications, application, users, loading, org, user, fetching, error} = this.state;
    
      return (
        <Container>
          <h2>Manage Tools</h2>
          {error ? <ErrorDialog error={error} /> : null}
          <Form loading={loading ? "true" : undefined} style={{maxWidth: "500px"}}>
            <SearchInput
              org={org}
              loading={loading ? "true" : undefined}
              orgSearch={this.orgSearch}
              handleChange={this.handleChange}
            />
    
            {users && users.length === 0 && (
              <p>No Organiztion found that match this name</p>
            )}
    
            {users && users.length > 0 && (
            // <Form.Field>
            //   <label>Users</label>
            //   <Dropdown
            //     fluid
            //     selection
            //     placeholder="Select Users"
            //     onChange={this.handleUserChangeValue}
            //     options={users.map(this.getOptionsFromUser)}
            //   />
            // </Form.Field>
              <Form>
                <Form.Group>
                  <Form.Control as="select"
                    defaultValue=""
                    onChange={this.handleUserChangeValue}
                    style={{ marginTop: 25 }}>
                    <option value="" disabled>{fetching ? "loading..." : "Select Users"}</option>
                    {!fetching && (
                      <>
                        {users ? users.map(this.getOptionsFromUser) : ""}
                      </>
                    )}
                  </Form.Control>
                </Form.Group>
              </Form>
            )}
    
            {user && <UserInfo user={user} />}
    
            {applications && applications.length === 0 && (
              <p>No Applications to display for this user</p>
            )}
    
            {applications && applications.length > 0 && (
            // <Form.Field>
            //   <label>Application</label>
            //   <Dropdown
            //     fluid
            //     selection
            //     placeholder="Select Application"
            //     onChange={this.handleChangeValue}
            //     options={applications.map(this.getOptionsForApp)}
            //   />
            // </Form.Field>
              <Form>
                <Form.Group>
                  <Form.Control as="select"
                    defaultValue=""
                    onChange={this.handleChangeValue}
                    style={{ marginTop: 25 }}>
                    <option value="" disabled>{fetching ? "loading..." : "Select application"}</option>
                    {!fetching && (
                      <>
                        {users ? users.map(this.getOptionsForApp) : ""}
                      </>
                    )}
                  </Form.Control>
                </Form.Group>
              </Form>
            )}
          </Form>
    
          {application && <Tools application={application} />}
        </Container>
      );
    }
}
