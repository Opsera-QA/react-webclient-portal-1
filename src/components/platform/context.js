import React from "react";
import { withRouter } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";  //REact Context API Code for User Authentication

const Ctx = React.createContext();

class NewAppProvider extends React.Component {
  static contextType = AuthContext;  //Registers the User Authentication context data in the component

  constructor(props, context) {
    super(props, context);

    this.state = {
      open: false,
      data: {},
      appname: null,
      appid: "",
      saving: false,
      token: "",
      user: {}
    };
  }

  componentDidMount = () => {
    this.getToken();
  }

  /*   componentDidUpdate() {
    this.getToken();
  }
 */
  getToken = async () => {
    const { getAccessToken, getUserRecord } = this.context;
    const userInfo = await getUserRecord();
    const accessToken = await getAccessToken();
    
    console.log("IN CONTEXT", userInfo);
    this.setState({
      token: accessToken,
      user: userInfo
    });
  }

  reset = () => {
    this.setState({
      open: false,
      data: {},
      appname: null,
      appid: "",
      saving: false,
    });
  }

  handleCancel = () => {
    const { service, data } = this.state;
    delete data[service];

    this.setState({
      data,
      open: false,
    });
  }

  handleSave = () => {
    const { service, data } = this.state;
    if (!data[service]) data[service] = {};

    this.setState({
      open: false,
      data,
    });
  }

  gotoInventory = () => {
    this.props.history.push("/inventory");
  }

  setAppDetails = (app) => {
    this.setState({ appid: app._id, appname: app.name, data: {} });
  }

  // eslint-disable-next-line  no-unused-vars
  handleChange = ({ target: { name, value } }, service) => {
    const s = this.state.data[service] || {};
    s.port = value;
    this.setState(ps => {
      return {
        data: {
          ...ps.data,
          [service]: s,
        },
      };
    });
  }
  isChecked = (service, name) => {
    const { data } = this.state;
    return data[service] && data[service][name];
  }

  // eslint-disable-next-line  no-unused-vars
  handleCheckboxChanged = (service, name) => {
    const { data } = this.state;
    data[service] = data[service] || {};
    data[service].decrypt = !data[service].decrypt;

    this.setState({
      data,
    });
  }

  toggleModal = ({ open }) => {
    this.setState({
      open,
    });
  }

  render() {
    return (
      <Ctx.Provider
        value={{
          ...this.state,
          gotoInventory: this.gotoInventory,
          handleCancel: this.handleCancel,
          handleSave: this.handleSave,
          openModal: this.openModal,
          setState: this.setState.bind(this),
          handleServiceCheckBoxChange: this.handleServiceCheckBoxChange,
          handleCheckboxChanged: this.handleCheckboxChanged,
          handleChange: this.handleChange,
          setAppDetails: this.setAppDetails,
          isChecked: this.isChecked,
          reset: this.reset
        }}
      >
        {this.props.children}
      </Ctx.Provider>
    );
  }
}

export const NewAppContext = Ctx;
export default withRouter(NewAppProvider);
