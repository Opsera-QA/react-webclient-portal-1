import React, { useState, useContext, useEffect, useRef } from "react";
import { AuthContext } from "contexts/AuthContext";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import { ROLE_LEVELS } from "components/common/helpers/role-helpers";
import OrganizationsSubNavigationBar from "components/settings/organizations/OrganizationsSubNavigationBar";
import unassignedRulesActions from "./unassigned-rules-functions";
import Model from "core/data_model/model";
import UnassignedRulesItemsViews from "components/settings/unassigned_rules/UnassignedRulesItemsViews";
import unassignedRulesItemsMetadata from "./unassignedRulesItems.metadata";
import useComponentStateReference from "hooks/useComponentStateReference";

function UnassignedRulesItems() {
  const [isLoading, setIsLoading] = useState(false);
  const { getAccessToken } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [itemFilterModel, setItemFilterModel] = useState(
    new Model({ ...unassignedRulesItemsMetadata.newObjectFields }),
  );
  const {
    isMounted,
    cancelTokenSource,
    accessRoleData,
    toastContext,
  } = useComponentStateReference();

  useEffect(() => {
    loadData(itemFilterModel).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });
  }, []);

  const loadData = async (
    itemFilterModel,
  ) => {
    try {
      setItems([]);
      setIsLoading(true);
      const unassignedItemsData =
        await unassignedRulesActions.getUnassingedRulesItems(
          getAccessToken,
          cancelTokenSource,
          itemFilterModel,
        );
      const items = unassignedItemsData?.data?.message?.data;
      setItems(items);
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

  return (
    <ScreenContainer
      breadcrumbDestination={"unassignedRulesItems"}
      accessRoleData={accessRoleData}
      roleRequirement={ROLE_LEVELS.POWER_USERS_AND_SASS}
      navigationTabContainer={
        <OrganizationsSubNavigationBar activeTab={"organizations"} />
      }
    >
      <UnassignedRulesItemsViews
        items={items}
        itemFilterModel={itemFilterModel}
        setItemsFilterModel={setItemFilterModel}
        loadData={loadData}
        isLoading={isLoading}
        isMounted={isMounted}
      />
    </ScreenContainer>
  );
}

export default UnassignedRulesItems;
