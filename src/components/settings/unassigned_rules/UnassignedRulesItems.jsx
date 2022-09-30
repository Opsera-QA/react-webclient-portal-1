import React, { useState, useContext, useEffect, useRef } from "react";
import { AuthContext } from "contexts/AuthContext";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import { ROLE_LEVELS } from "components/common/helpers/role-helpers";
import OrganizationsSubNavigationBar from "components/settings/organizations/OrganizationsSubNavigationBar";
import axios from "axios";
import { DialogToastContext } from "../../../contexts/DialogToastContext";
import unassignedRulesActions from "./unassigned-rules-functions";
import UnassignedRulesItemsTable from "./UnassignedRulesItemsTable";
import Model from "core/data_model/model";

function UnassignedRulesItems() {
  const { userAccessRoles } = useContext(AuthContext);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [itemFilterModel, setItemFilterModel] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData(itemFilterModel, source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async (
    itemFilterModel,
    cancelSource = cancelTokenSource,
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
      setItems(items);
    } catch (error) {
      if (isMounted?.current === true) {
        toastContext.showLoadingErrorDialog(error);
        console.error(error);
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
      accessRoleData={userAccessRoles}
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
