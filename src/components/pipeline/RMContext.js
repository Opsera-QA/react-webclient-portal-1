/* eslint-disable react/prop-types */
import React, { createContext, Component } from "react";
import { withRouter } from "react-router-dom";
import { isAlphaNumeric } from "../../helpers";
import { ApiService } from "../../api/apiService";
import { AuthContext } from "../../contexts/AuthContext";

let RMContext;
const { Consumer, Provider } = (RMContext = createContext({}));

class rmProvider extends Component {
  static contextType = AuthContext;  //Registers the User Authentication context data in the component

  constructor(props, context) {
    super(props, context);

    this.state = {
      checkingAppName: false,
      more: false,
      applicationId: null,
      appname: "",
      initServicesValid: true,
      otherServicesShow: null,
      qtShow: true,
      modalOpen: false,
      services: {},
      category: "",
      service: "",
      saving: false,
    };
  }

  componentDidMount = async () => {
    const { getAccessToken, getUserInfo } = this.context;
    const accessToken = await getAccessToken();
    const userInfo = await getUserInfo();
    this.setState({
      token: accessToken,
      user: userInfo
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { modalOpen, services, service } = this.state;
    const { modalOpen: pModalOpen } = prevState;

    if (modalOpen !== pModalOpen) {
      if (modalOpen) {
        this.cached = services[service] || {};
      } else {
        this.cached = {};
      }
    }
  }

  reset = () => {
    this.setState({
      modalOpen: false,
      services: {},
      applicationId: null,
      appname: "",
      more: false,
      saving: false,
    })
  }
  // services
  handleServiceCheckBoxChange = (service, name, val) => {
    const { services } = this.state;
    services[service] || (services[service] = {});
    services[service][name] || (services[service][name] = []);
    if (services[service][name].includes(val)) {
      services[service][name] = services[service][name].filter(x => x !== val);
    } else {
      services[service][name].push(val);
    }
    this.setState({
      services,
    });
  }

  handleServiceChange = ({ target }) => {
    const [service, name] = target.name.split("//");
    this.setState(ps => {
      return {
        services: {
          ...ps.services,
          [service]: {
            ...ps.services[service],
            [name]: target.value,
          },
        },
      };
    });
  }

  handleChange = ({ target: { name, value } }) => {
    let error = null;
    if (name === "appname") {
      if (value.length > 20) error = "App Name has to be 20 chars or less";
      if (value.length > 1 && !isAlphaNumeric(value))
        error = "App Name has to be alphanumeric";
    }

    this.setState({
      appnameError: error,
      qtShow: true,
      otherServicesShow: null,
      [name]: value,
    });
  }

  handleNoClick = () => {
    this.setState({
      qtShow: false,
      otherServicesShow: false,
    });
  }

  handleYesClick = () => {
    this.setState({
      qtShow: false,
      otherServicesShow: true,
    });
  }

  setAppDetails = (app) => {
    this.setState({ applicationId: app._id, appname: app.name, data: {} });
  }

  confirm = async () => {
    const { appname: name, services: data, token, user, applicationId: id } = this.state;
    this.setState({
      saving: true,
    });

    let postBody = Object.assign({ id }, { tools: data }, { uid: user.sub });
    let currentComponent = this;
    new ApiService(
      "/applications/create/tools",
      null,
      token,
      postBody).post()
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
        // eslint-disable-next-line react/prop-types
        setTimeout(() => { this.props.history.push("/inventory") }, 2000);
      },
    );
  }


  validate = () => {
    console.log("validate")
    const { services, service } = this.state
    if (!service.includes("Jenkins Pipeline")) {
      return false
    } else {
      if (!services["Jenkins Pipeline"]) {
        return false
      } else if (services["Jenkins Pipeline"].jenkins_password) {
        if (services["Jenkins Pipeline"].jenkins_password === "") {
          return false
        } else if (services["Jenkins Pipeline"].jenkins_password.length > 0) {
          return true
        }
        else {
          return false;
        }
      } else {
        return false;
      }

    }

  }

  handleModalSave = ({ service }) => {
    const { services } = this.state;
    if (!services[service]) {
      services[service] = {};
    }
    services[service].saved = true;
    this.setState({
      services,
      modalOpen: false,
    });
  }

  handleModalCancel = ({ service }) => {
    const { services } = this.state;
    delete services[service];

    this.setState({
      services,
      modalOpen: false,
    });
  }

  serviceClick = ({ service, category, fields }) => {
    this.setState({
      service,
      category,
      modalOpen: true,
      fields,
    });
  }

  checkBoxChange = (e, service) => {
    const { services } = this.state;
    delete services[service];
    this.setState({
      services,
    });
  }

  render() {
    console.log(this.state.services)
    return (
      <Provider
        value={{
          ...this.state,
          handleCreateClick: this.handleCreateClick,
          handleChange: this.handleChange,
          handleNoClick: this.handleNoClick,
          handleYesClick: this.handleYesClick,
          confirm: this.confirm,
          handleModalSave: this.handleModalSave,
          handleModalCancel: this.handleModalCancel,
          serviceClick: this.serviceClick,
          handleServiceChange: this.handleServiceChange,
          checkBoxChange: this.checkBoxChange,
          setAppDetails: this.setAppDetails,
          handleServiceCheckBoxChange: this.handleServiceCheckBoxChange,
          reset: this.reset,
          validate: this.validate
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

const RMProvider = withRouter(rmProvider);

export { RMContext, RMProvider, Consumer as RMConsumer };
