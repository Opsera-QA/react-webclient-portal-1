import React, {useEffect, useState} from "react";
import tokenActions from "components/user/user_settings/access_tokens/token-actions";
import AccessTokenTable from "components/user/user_settings/access_tokens/AccessTokenTable";
import AccessTokenEditorPanel from "components/user/user_settings/access_tokens/details/AccessTokenEditorPanel";
import TabPanelContainer from "components/common/panels/general/TabPanelContainer";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import CustomTab from "components/common/tabs/CustomTab";
import {faTable} from "@fortawesome/pro-light-svg-icons";
import SummaryTab from "components/common/tabs/detail_view/SummaryTab";
import AccessTokenLogPanel from "components/user/user_settings/access_tokens/details/logs/AccessTokenLogPanel";
import Model from "core/data_model/model";
import accessTokenFilterMetadata from "components/user/user_settings/access_tokens/access-token-filter-metadata";
import useComponentStateReference from "hooks/useComponentStateReference";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import UserSettingsSubNavigationBar from "components/user/user_settings/UserSettingsSubNavigationBar";
import {ROLE_LEVELS} from "components/common/helpers/role-helpers";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import {USER_SETTINGS_PAGES} from "components/user/user_settings/userSettings.paths";

function MyAccessTokens() {
  const [accessTokenFilterModel, setAccessTokenFilterModel] = useState(new Model({...accessTokenFilterMetadata.newObjectFields}, accessTokenFilterMetadata, false));
  const [isLoading, setIsLoading] = useState(true);
  const [accessTokens, setAccessTokens] = useState([]);
  const [activeTab, setActiveTab] = useState("summary");
  const {
    userData,
    cancelTokenSource,
    isMounted,
    toastContext,
    getAccessToken,
    accessRoleData,
  } = useComponentStateReference();

  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();
    setActiveTab(tabSelection);
  };

  useEffect(() => {
    if (userData) {
      loadData().catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }
  }, [userData]);

  const loadData = async (filterModel = accessTokenFilterModel) => {
    try {
      setIsLoading(true);
      await getAccessTokens( filterModel);
    } catch (error) {
      if (isMounted?.current === true) {
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getAccessTokens = async (filterModel = accessTokenFilterModel) => {
    const accessTokenResponse = await tokenActions.getTokens(getAccessToken, cancelTokenSource, filterModel);
    const tokens = DataParsingHelper.parseArray(accessTokenResponse?.data?.data, []);

    if (isMounted?.current === true && tokens) {
      setAccessTokens([...tokens]);
      let newFilterModel = filterModel;
      newFilterModel.setData("totalCount", accessTokenResponse?.data?.count);
      newFilterModel.setData("activeFilters", newFilterModel.getActiveFilters());
      setAccessTokenFilterModel({...newFilterModel});
    }
  };

  const getTabContainer = () => {
    return (
      <CustomTabContainer>
        <SummaryTab
          activeTab={activeTab}
          handleTabClick={handleTabClick}
        />
        <CustomTab
          activeTab={activeTab}
          tabText={"Token Activity Log"}
          handleTabClick={handleTabClick}
          tabName={"logs"}
          icon={faTable}
        />
      </CustomTabContainer>
    );
  };

  const getCurrentView = () => {
    switch (activeTab) {
      case "summary":
        return (
          <>
            <AccessTokenEditorPanel
              cancelTokenSource={cancelTokenSource}
              loadData={loadData}
            />
            <AccessTokenTable
              loadData={loadData}
              isLoading={isLoading}
              accessTokenData={accessTokens}
              isMounted={isMounted}
              cancelTokenSource={cancelTokenSource}
              filterModel={accessTokenFilterModel}
              setFilterModel={setAccessTokenFilterModel}
            />
          </>
        );
      case "logs":
        return <AccessTokenLogPanel />;
      default:
        return null;
    }
  };

  return (
    <ScreenContainer
      navigationTabContainer={<UserSettingsSubNavigationBar activeTab={USER_SETTINGS_PAGES.MY_ACCESS_TOKENS} />}
      breadcrumbDestination={USER_SETTINGS_PAGES.MY_ACCESS_TOKENS}
      roleRequirement={ROLE_LEVELS.USERS_AND_SASS}
      accessRoleData={accessRoleData}
    >
      <div className="px-3">
        <TabPanelContainer
          currentView={getCurrentView()}
          tabContainer={getTabContainer()}
        />
      </div>
    </ScreenContainer>
  );
}

export default MyAccessTokens;

