import React, {useState, useEffect, useContext, useRef} from "react";
import PropTypes from "prop-types";
import sfdcActions from "../sfdc-actions";
import axios from "axios";
import {AuthContext} from "contexts/AuthContext";
import {Col, Button} from "react-bootstrap";
import { apiServerUrl } from "config";
import { DialogToastContext } from "contexts/DialogToastContext";

function SfdcOAuthConnectButton({ model, authType, toolId }) {

  const { getUserRecord, getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState("");
  const [oauthDetails, setOauthDetails] = useState(undefined);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadOAuthDetails(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [authType]);

  const loadOAuthDetails = async (cancelSource = cancelTokenSource) => {
    if (authType === "basic") {      
      return;
    }
    try {
      setIsLoading(true);
      const user = await getUserRecord();
      setUserId(user._id);      
      const response = await sfdcActions.getOauthDetails(
        getAccessToken,
        cancelSource
      );
      setOauthDetails(response?.data);
    } catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        toastContext.showErrorDialog(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const connectToSfdcOauth = () => {    
    const toolUrl = model.getData("toolURL");
    const userName = model.getData("accountUsername");
    const redirectUri = `${apiServerUrl}/auth/sfdc`;

    const url = `${toolUrl}/services/oauth2/authorize?client_id=${oauthDetails?.clientId}&redirect_uri=${redirectUri}&response_type=code&login_hint=${userName}&code_challenge=${oauthDetails?.challenge}&state=${userId}|${toolId}|${toolUrl}|${userName}|${redirectUri}|${oauthDetails?.token}&display=popup`;    
    window.open(url);
  };

  if (authType === "basic") {
    return null;
  }

  if (model?.getData("sfdc_refresh_token")) {
    return (
      <>
        <Col lg={12} className="mt-2 p-0">
          <Button
            size="sm"
            variant="outline-secondary"
            onClick={() => connectToSfdcOauth()}
            disabled={model.getData("toolURL") === "" || model.getData("accountUsername") === "" || isLoading || !oauthDetails}
          >
            Re-Connect OAuth
          </Button>
        </Col>
      </>
    );
  }
  return (
    <>
      <Col lg={12} className="mt-2 p-0">
        <Button
          size="sm"
          variant="success"
          onClick={() => connectToSfdcOauth()}
          disabled={model.getData("toolURL") === "" || model.getData("accountUsername") === "" || isLoading || !oauthDetails}
        >
          Connect OAuth
        </Button>
      </Col>
    </>
  );

}

SfdcOAuthConnectButton.propTypes = {
  model: PropTypes.object,
  authType: PropTypes.string,
  toolId: PropTypes.string,
};

export default SfdcOAuthConnectButton;
