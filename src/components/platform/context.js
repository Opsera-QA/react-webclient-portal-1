import React from "react"
import { withRouter } from "react-router-dom"
import { AuthContext } from '../../contexts/AuthContext';  //REact Context API Code for User Authentication
import { ApiService } from '../../api/apiService';

const Ctx = React.createContext()

class NewAppProvider extends React.Component {
  static contextType = AuthContext;  //Registers the User Authentication context data in the component

  constructor(props, context) {
    super(props, context);

    this.state = {
      open: false,
      data: {},
      appname: null,
      saving: false,
      token: '',
      user: {}
    };
  }

  componentDidMount = async () => {
    const { getAccessToken, getUserInfo } = this.context;
    const accessToken = await getAccessToken();
    const userInfo = await getUserInfo();
    this.setState({
      token: accessToken,
      user: userInfo
    })
  }

  handleCancel = () => {
    const { service, data } = this.state;
    delete data[service];

    this.setState({
      data,
      open: false,
    })
  }

  handleSave = () => {
    const { service, data } = this.state
    if (!data[service]) data[service] = {}

    this.setState({
      open: false,
      data,
    })
  }

  confirm = async () => {
    const { appname: name, data, token, user } = this.state

    this.setState({
      saving: true,
    })

    //TODO: Passing user ID (okta.sub) but need to test this
    const apiCall = new ApiService('/applications',
      Object.assign({ name }, data, { uid: user.sub }), token);
    let currentComponent = this;
    apiCall.post()
    .then(function (response) {
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

    this.setState(
      {
        saving: false,
      },
      () => {
        this.props.history.push("/")
      },
    )
  }

  // eslint-disable-next-line  no-unused-vars
  handleChange = ({ target: { name, value } }, service) => {
    const s = this.state.data[service] || {}
    s.port = value
    this.setState(ps => {
      return {
        data: {
          ...ps.data,
          [service]: s,
        },
      }
    })
  }
  isChecked = (service, name) => {
    const { data } = this.state
    return data[service] && data[service][name]
  }

  // eslint-disable-next-line  no-unused-vars
  handleCheckboxChanged = (service, name) => {
    const { data } = this.state
    data[service] = data[service] || {}
    data[service].decrypt = !data[service].decrypt

    this.setState({
      data,
    })
  }

  toggleModal = ({ open }) => {
    this.setState({
      open,
    })
  }

  render() {
    return (
      <Ctx.Provider
        value={{
          ...this.state,
          confirm: this.confirm,
          handleCancel: this.handleCancel,
          handleSave: this.handleSave,
          openModal: this.openModal,
          setState: this.setState.bind(this),
          handleServiceCheckBoxChange: this.handleServiceCheckBoxChange,
          handleCheckboxChanged: this.handleCheckboxChanged,
          handleChange: this.handleChange,
          isChecked: this.isChecked
        }}
      >
        {this.props.children}
      </Ctx.Provider>
    )
  }
}

export const NewAppContext = Ctx
export default withRouter(NewAppProvider)
