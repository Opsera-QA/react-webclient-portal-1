import React, { useReducer, useEffect, useContext } from "react";
import { Button, Form, Col, Card, Alert } from "react-bootstrap";
import { AuthContext } from "../../../contexts/AuthContext";  //REact Context API Code for User Authentication
import { ApiService } from "../../../api/apiService";
import { apiServerUrl } from "../../../config";
import LoadingDialog from "../../common/loading";

function Slack() {

  const Auth = useContext(AuthContext);

  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      token: "",
      modal: false,
      update: false,
      fetching: true
    }
  );

  // component did mount use effect

  useEffect(() => {
    getData();
  }, []);


  async function getData() {
    const { getAccessToken } = Auth;
    const accessToken = await getAccessToken();
    const urlParams = state;
    new ApiService(
      apiServerUrl + "/connectors/slack/settings",
      null,
      accessToken,
      urlParams).get()
      .then(response => {
        if (response.data ) {
          let token = "";

          if (response.data.SLACK_TOKEN_KEY !== undefined) {
            token = response.data.SLACK_TOKEN_KEY;
          }
          setState({
            token: token,
            update: true,
            fetching: false
          });
        } else {
          console.log("not data available ==> do nothing!");
          setState({
            fetching: false
          });
        }

      })
      .catch(e => {
        console.log(e);
        setState({
          fetching: false
        });
        showErrorAlert("Error Fetching data for API Connector. Contact Administrator for more details.");
      });
  }

  const handleChange = ({ target: { name, value } }) => {
    setState({
      [name]: value,
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const { getAccessToken } = Auth;
    const accessToken = await getAccessToken();
    const urlParams = state;

    new ApiService(
      apiServerUrl + "/connectors/slack/update",
      null,
      accessToken,
      urlParams).post()
      .then(response => {
        console.log(response);
        showSuccessAlert("Slack Endpoint Updated Successfully!");
      })
      .catch(e => {
        let errorData = e.response && e.response.data ? e.response.data.message : "Network Error!";
        console.log(errorData);
        showErrorAlert(" " + errorData +" " );
      });

  };

  const showSuccessAlert = (message) => {
    setState({
      modal: true,
      type: "success",
      title: "Success!",
      message: message
    });
    getData();
  };

  const showErrorAlert = (message) => {
    setState({
      modal: true,
      type: "danger",
      title: "Error!",
      message: message
    });
  };

  function canBeSubmitted() {
    const {
      token,
    } = state;
    return (
      token.length > 0 
    );
  }

  const { fetching } = state;

  const isEnabled = canBeSubmitted();

  return (
    <div>
      {state.modal &&
        <Alert className="mt-3" variant={state.type} onClose={() => setState({ modal: false, type: "", title: "", message: "" })} dismissible>
          {state.title} {state.message}
        </Alert>
      }
      <Card className="mt-3">
        <Card.Header as="h5">Slack Credentials</Card.Header>
        <Card.Body>

          {fetching && <LoadingDialog />}
          {!fetching &&
            <Form onSubmit={handleSave}>

              <Form.Group controlId="formGridToken">
                <Form.Label>Slack Token</Form.Label>
                <Form.Control
                  type="text"
                  placeholder=""
                  name="token"
                  value={state.token}
                  onChange={handleChange}
                // isInvalid={this.state.token.error}
                />
                {/* <Form.Control.Feedback type="invalid">{this.state.token.error}</Form.Control.Feedback> */}
              </Form.Group>

              <div className="text-muted mt-2 mb-2 italic">Please Note: All fields are required for connectivity.</div>
              <Button id="save-button" disabled={!isEnabled} variant="outline-primary" className="mr-2" type="submit">Save Changes</Button>
              {/* <Button id="cancel-button" variant="outline-secondary" className="mr-2" type="button" onClick={this.cancel}>Cancel</Button> */}
            </Form>
          }


        </Card.Body>
      </Card>
    </div>
  );
}

export default Slack;