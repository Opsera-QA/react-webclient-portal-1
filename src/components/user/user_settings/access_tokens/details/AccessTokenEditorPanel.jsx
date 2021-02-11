import React, {useState, useContext} from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import tokenActions from "components/user/user_settings/access_tokens/token-actions";
import Model from "core/data_model/model";
import {accessTokenMetadata} from "components/user/user_settings/access_tokens/access-token-metadata";
import StandaloneSaveButton from "components/common/buttons/saving/StandaloneSaveButton";
import SaveButtonBase from "components/common/buttons/saving/SaveButtonBase";
import CreateButton from "components/common/buttons/saving/CreateButton";

function AccessTokenEditorPanel({ cancelTokenSource }) {
  const { getAccessToken } = useContext(AuthContext);
  const [accessToken, setAccessToken] = useState(new Model({...accessTokenMetadata.newObjectFields}, accessTokenMetadata, true));

  const createToken = async () => {
    const response = await tokenActions.createToken(getAccessToken, cancelTokenSource, accessToken);
    console.log("response: " + JSON.stringify(response));
    setAccessToken({...new Model({...accessTokenMetadata.newObjectFields}, accessTokenMetadata, true)});
    return response;
  };

  if (accessToken == null) {
    return <></>;
  }

  return (
    <EditorPanelContainer>
      <div>
        <div className="mb-2">
          <div><strong>Personal Access Tokens</strong></div>
          <div>You can generate multiple personal access tokens with unique expiration dates in order to interact with the Opsera API.</div>
        </div>
        <Row>
          <Col md={12}>
            <TextInputBase dataObject={accessToken} setDataObject={setAccessToken} fieldName={"name"}/>
          </Col>
          <Col md={12}>
            <TextInputBase dataObject={accessToken} setDataObject={setAccessToken} fieldName={"scope"} />
          </Col>
          <Col md={12}>
            <TextInputBase dataObject={accessToken} setDataObject={setAccessToken} fieldName={"expiration"} />
          </Col>
        </Row>
        <Row className="mt-3 ml-1">
          <CreateButton addAnotherOption={false} recordDto={accessToken} createRecord={createToken} />
        </Row>
      </div>
    </EditorPanelContainer>
  );
}

AccessTokenEditorPanel.propTypes = {
  cancelTokenSource: PropTypes.object,
};

export default AccessTokenEditorPanel;


