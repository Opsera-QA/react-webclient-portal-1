import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import Model from "core/data_model/model";
import accountsActions from "components/admin/accounts/accounts-actions";
import DetailScreenContainer from "components/common/panels/detail_view_container/DetailScreenContainer";
import ActionBarContainer from "components/common/actions/ActionBarContainer";
import ActionBarBackButton from "components/common/actions/buttons/ActionBarBackButton";
import {ssoUserMetadata} from "components/settings/users/ssoUser.metadata";
import SsoUserDetailPanel from "components/settings/users/sso_user_details/SsoUserDetailPanel";
import UserManagementSubNavigationBar from "components/settings/users/UserManagementSubNavigationBar";
import useComponentStateReference from "hooks/useComponentStateReference";

function SsoUserDetailView() {
  const {userId} = useParams();
  const [ssoUserData, setSsoUserData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const {
    isMounted,
    cancelTokenSource,
    toastContext,
    getAccessToken,
    isSaasUser,
    domain,
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
      if (isSaasUser !== false) {
        return;
      }

      setIsLoading(true);
      await getSsoUser();
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const getSsoUser = async () => {
    const response = await accountsActions.getPendingUserByIdV2(getAccessToken, cancelTokenSource, domain, userId);
    const user = response?.data?.user;

    if (user != null) {
      setSsoUserData(new Model(user, ssoUserMetadata, false));
    }
  };

  const getActionBar = () => {
    if (ssoUserData != null) {
      return (
        <ActionBarContainer>
          <div>
            <ActionBarBackButton path={"/settings/user-management/"} />
          </div>
          <div>
          </div>
        </ActionBarContainer>
      );
    }
  };

  if (isSaasUser !== false) {
    return null;
  }

  return (
    <DetailScreenContainer
      breadcrumbDestination={"pendingUserDetailView"}
      metadata={ssoUserMetadata}
      dataObject={ssoUserData}
      isLoading={isLoading}
      actionBar={getActionBar()}
      navigationTabContainer={<UserManagementSubNavigationBar activeTab={"pendingUserViewer"} />}
      detailPanel={
        <SsoUserDetailPanel hideSettings={true} ssoUserData={ssoUserData} />
      }
    />
  );
}

export default SsoUserDetailView;