import React, { useState, useEffect } from "react";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import { useUnsecuredItemReportActions } from "components/settings/unsecured_items/useUnsecuredItemReportActions";
import Model from "core/data_model/model";
import UnsecuredItemReportViews from "components/settings/unsecured_items/UnsecuredItemReportViews";
import useComponentStateReference from "hooks/useComponentStateReference";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import UnsecuredItemReportSubNavigationBar
  from "components/settings/unsecured_items/UnsecuredItemReportSubNavigationBar";
import {
  unsecureItemsReportFilterMetadata
} from "components/settings/unsecured_items/unsecuredItemReportFilter.metadata";
import UnsecuredItemReportRoleHelper
  from "@opsera/know-your-role/roles/settings/unsecured_items/unsecuredItemReportRole.helper";

export default function UnsecuredItemReport() {
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [itemFilterModel, setItemFilterModel] = useState(
    new Model({ ...unsecureItemsReportFilterMetadata.newObjectFields }),
  );
  const {
    userData,
    isMounted,
    cancelTokenSource,
    accessRoleData,
    toastContext,
    getAccessToken,
  } = useComponentStateReference();

  useEffect(() => {
    setItems([]);
    if (UnsecuredItemReportRoleHelper.canGetUnsecuredItemsList(userData) === true) {
      loadData(itemFilterModel).catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }
  }, [userData]);

  const loadData = async (
    itemFilterModel,
  ) => {
    try {
      setItems([]);
      setIsLoading(true);
      const unassignedItemsData =
        await useUnsecuredItemReportActions.getUnassingedRulesItems(
          getAccessToken,
          cancelTokenSource,
          itemFilterModel,
        );
      const newItemList = DataParsingHelper.parseArray(unassignedItemsData?.data?.message?.data, []);

      if (isMounted?.current === true) {
        setItems([...newItemList]);
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
      breadcrumbDestination={"unsecuredItemReport"}
      accessRoleData={accessRoleData}
      navigationTabContainer={
        <UnsecuredItemReportSubNavigationBar activeTab={"unsecuredItemReport"} />
      }
    >
      <UnsecuredItemReportViews
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
