import React, { useState, useEffect } from "react";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import { ROLE_LEVELS } from "components/common/helpers/role-helpers";
import OrganizationsSubNavigationBar from "components/settings/organizations/OrganizationsSubNavigationBar";
import unassignedRulesActions from "./unassigned-rules-functions";
import UnassignedRulesItemsTable from "./UnassignedRulesItemsTable";
import Model from "core/data_model/model";
import useComponentStateReference from "hooks/useComponentStateReference";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

function UnassignedRulesItems() {
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [itemFilterModel, setItemFilterModel] = useState(undefined);
  const {
    getAccessToken,
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
      setItemFilterModel(new Model({ ...itemFilterModel }));
      const unassignedItemsData =
        await unassignedRulesActions.getUnassingedRulesItems(
          getAccessToken,
          cancelTokenSource,
          itemFilterModel,
        );
      const items = unassignedItemsData?.data?.message?.data;
      const parsedItems = DataParsingHelper.parseArray(items, []);

      if (isMounted.current === true) {
        setItems(items);
      }
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
      <UnassignedRulesItemsTable
        items={items}
        isLoading={isLoading}
        loadDataFunction={loadData}
        itemFilterModel={itemFilterModel}
        isMounted={isMounted}
      />
    </ScreenContainer>
  );
}

export default UnassignedRulesItems;
