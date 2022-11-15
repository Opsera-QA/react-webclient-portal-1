import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import Model from "core/data_model/model";
import ActionBarContainer from "components/common/actions/ActionBarContainer";
import ActionBarBackButton from "components/common/actions/buttons/ActionBarBackButton";
import DetailScreenContainer from "components/common/panels/detail_view_container/DetailScreenContainer";
import tokenActions from "components/user/user_settings/access_tokens/token-actions";
import {accessTokenMetadata} from "components/user/user_settings/access_tokens/access-token-metadata";
import AccessTokenDetailPanel from "components/user/user_settings/access_tokens/details/AccessTokenDetailPanel";
import {ROLE_LEVELS} from "components/common/helpers/role-helpers";
import UserSettingsSubNavigationBar from "components/user/user_settings/UserSettingsSubNavigationBar";
import {USER_SETTINGS_PAGES} from "components/user/user_settings/userSettings.paths";
import useComponentStateReference from "hooks/useComponentStateReference";

function AccessTokenDetailView() {
  const {tokenId} = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [accessToken, setAccessToken] = useState(undefined);
  const {
    isMounted,
    cancelTokenSource,
    getAccessToken,
    accessRoleData,
    toastContext,
  } = useComponentStateReference();

  useEffect(() => {
    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await getToken();
    } catch (error) {
      if (isMounted?.current === true && !error.error?.message?.includes(404)) {
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getToken = async () => {
    const response = await tokenActions.getTokenById(getAccessToken, cancelTokenSource, tokenId);
    const token = response?.data?.data[0];

    if (isMounted?.current === true && token) {
      setAccessToken(new Model(token, accessTokenMetadata, false));
    }
  };

  const getActionBar = () => {
    return (
      <ActionBarContainer>
        <div>
          <ActionBarBackButton path={`/user/${USER_SETTINGS_PAGES.MY_ACCESS_TOKENS}`}/>
        </div>
      </ActionBarContainer>
    );
  };

  return (
    <DetailScreenContainer
      breadcrumbDestination={USER_SETTINGS_PAGES.ACCESS_TOKEN_DETAIL_VIEW}
      metadata={accessTokenMetadata}
      accessRoleData={accessRoleData}
      roleRequirement={ROLE_LEVELS.USERS_AND_SASS}
      dataObject={accessToken}
      navigationTabContainer={
        <UserSettingsSubNavigationBar activeTab={USER_SETTINGS_PAGES.ACCESS_TOKEN_DETAIL_VIEW} />
    }
      isLoading={isLoading}
      actionBar={getActionBar()}
      detailPanel={
        <AccessTokenDetailPanel
          accessToken={accessToken}
          setAccessToken={setAccessToken}
          loadData={loadData}
        />
      }
    />
  );
}

export default AccessTokenDetailView;