import React, {createContext} from "react"
import {withRouter} from "react-router-dom"
import {isAlphaNumeric} from "../../helpers"
import { ApiService } from '../../api/apiService'
import { AuthContext } from '../../contexts/AuthContext';

let RMContext
const {Consumer, Provider} = (RMContext = createContext({}))

class rmProvider extends React.Component {
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
    }
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

  componentDidUpdate(prevProps, prevState) {
    const {modalOpen, services, service} = this.state
    const {modalOpen: pModalOpen} = prevState

    if (modalOpen !== pModalOpen) {
      if (modalOpen) {
        this.cached = services[service] || {}
      } else {
        this.cached = {}
      }
    }
  }

  // services
  handleServiceCheckBoxChange = (service, name, val) => {
    const {services} = this.state
    services[service] || (services[service] = {})
    services[service][name] || (services[service][name] = [])
    if (services[service][name].includes(val)) {
      services[service][name] = services[service][name].filter(x => x !== val)
    } else {
      services[service][name].push(val)
    }
    this.setState({
      services,
    },()=>{console.log(this.state)})
  }

  handleServiceChange = ({target}) => {
    const [service, name] = target.name.split(`//`)
    this.setState(ps => {
      return {
        services: {
          ...ps.services,
          [service]: {
            ...ps.services[service],
            [name]: target.value,
          },
        },
      }
    })
  }

  handleChange = ({target: {name, value}}) => {
    let error = null
    if (name === "appname") {
      if (value.length > 10) error = "App Name has to be 10 chars or less"
      if (value.length > 1 && !isAlphaNumeric(value))
        error = "App Name has to be alphanumeric"
    }

    this.setState({
      appnameError: error,
      qtShow: true,
      otherServicesShow: null,
      [name]: value,
    })
  }

  handleCreateClick = async (e) => {
    e.preventDefault()
    if (this.state.appname.trim().length < 1)
      return this.setState({appNameValid: false})

    this.setState({
      checkingAppName: true,
    })

    const { token, user } = this.context;
    console.log("handling it!")

    if (this.state.appname.trim().length < 1) {
      this.setState({ appnameError: true });
      return;
    }

    let postBody = {  name: this.state.appname };
    const {data: applicationExists} = new ApiService(
      '/applications/check-exists',
      null,
      token,
      postBody).post()

    if (!applicationExists) {
      this.setState({
        appNameValid: true,
        checkingAppName: false,
      })
    } else {
      this.setState({
        appNameValid: false,
        checkingAppName: false,
      })
      alert("Application Name already exists!")
    }
  }

  handleNoClick = () => {
    this.setState({
      qtShow: false,
      otherServicesShow: false,
    })
  }

  handleYesClick = () => {
    this.setState({
      qtShow: false,
      otherServicesShow: true,
    })
  }

  confirm = async () => {
    const {appname: name, services: data, token} = this.state
    this.setState({
      saving: true,
    })

    let postBody = Object.assign({name}, data);
    new ApiService(
      '/applications',
      null,
      token,
      postBody).post()
      .then(()=>{
        alert("something went wrong, please try again later")
      })
      .catch(() => {
        alert("something went wrong, please try again later")
      })

    this.setState(
      {
        saving: false,
      },
      () => {
        this.props.history.push("/")
      },
    )
  }

  handleModalSave = ({service}) => {
    const {services} = this.state
    if (!services[service]) {
      services[service] = {}
    }
    services[service].saved = true
    this.setState({
      services,
      modalOpen: false,
    })
  }

  handleModalCancel = ({service}) => {
    const {services} = this.state
    delete services[service]
    this.setState({
      services,
      modalOpen: false,
    })
  }

  serviceClick = ({service, category, fields}) => {
    this.setState({
      service,
      category,
      modalOpen: true,
      fields,
    })
  }

  checkBoxChange = (e, service) => {
    const {services} = this.state
    delete services[service]
    this.setState({
      services,
    })
  }

  render() {
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
          handleServiceCheckBoxChange: this.handleServiceCheckBoxChange,
        }}
      >
        {this.props.children}
      </Provider>
    )
  }
}

const RMProvider = withRouter(rmProvider)

export {RMContext, RMProvider, Consumer as RMConsumer}
