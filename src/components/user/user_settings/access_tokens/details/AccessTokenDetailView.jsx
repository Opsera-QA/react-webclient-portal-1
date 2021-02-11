import React, {useState, useEffect, useContext, useRef} from "react";
import { useParams } from "react-router-dom";
import Model from "core/data_model/model";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import ActionBarContainer from "components/common/actions/ActionBarContainer";
import ActionBarBackButton from "components/common/actions/buttons/ActionBarBackButton";
import DetailScreenContainer from "components/common/panels/detail_view_container/DetailScreenContainer";
import tokenActions from "components/user/user_settings/access_tokens/token-actions";
import axios from "axios";
import {accessTokenMetadata} from "components/user/user_settings/access_tokens/access-token-metadata";
import AccessTokenDetailPanel from "components/user/user_settings/access_tokens/details/AccessTokenDetailPanel";

function AccessTokenDetailView() {
  const {tokenId} = useParams();
  const { getUserRecord, setAccessRoles, getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [accessToken, setAccessToken] = useState(undefined);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);

    isMounted.current = true;

    if (tokenId) {
      loadData(source).catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }

    return () => {
      source.cancel();
      isMounted.current = false;
    }
  }, []);

  const loadData = async (cancelSource) => {
    try {
      setIsLoading(true);
      await getRoles(cancelSource);
    }
    catch (error) {
      if (!error.error?.message?.includes(404)) {
        toastContext.showLoadingErrorDialog(error);
      }
    }
    finally {
      setIsLoading(false);
    }
  };

  const getToken = async (cancelSource) => {
    const response = await tokenActions.getTokenById(getAccessToken, cancelSource, tokenId);
    const token = response?.data?.data[0];

    if (isMounted?.current === true && token) {
      setAccessToken(new Model(token, accessTokenMetadata, false));
    }
  };

  const getRoles = async (cancelSource) => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);

      if (userRoleAccess?.OpseraAdministrator) {
        await getToken(cancelSource);
      }
    }
  };

  const getActionBar = () => {
    return (
      <ActionBarContainer>
        <div>
          <ActionBarBackButton path={"/user/accessTokens"} />
        </div>
      </ActionBarContainer>
    );
  };

  return (
    <DetailScreenContainer
      breadcrumbDestination={"accessTokenDetailView"}
      // accessDenied={!accessRoleData?.OpseraAdministrator}
      metadata={accessTokenMetadata}
      dataObject={accessToken}
      isLoading={isLoading}
      actionBar={getActionBar()}
      detailPanel={<AccessTokenDetailPanel accessToken={accessToken} setAccessToken={setAccessToken} loadDat={loadData} />}
    />
  );
}

export default AccessTokenDetailView;