import React from "react";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import UnsecuredItemReportViews from "components/settings/unsecured_items/UnsecuredItemReportViews";
import UnsecuredItemReportSubNavigationBar
  from "components/settings/unsecured_items/UnsecuredItemReportSubNavigationBar";
import useGetUnsecuredItems from "hooks/settings/unsecured_items/useGetUnsecuredItems";

export default function UnsecuredItemReport() {
  const {
    unsecuredItemFilterModel,
    setUnsecuredItemFilterModel,
    unsecuredItems,
    isLoading,
    error,
    loadData,
  } = useGetUnsecuredItems();

  return (
    <ScreenContainer
      breadcrumbDestination={"unsecuredItemReport"}
      navigationTabContainer={
        <UnsecuredItemReportSubNavigationBar activeTab={"unsecuredItemReport"} />
      }
    >
      <UnsecuredItemReportViews
        items={unsecuredItems}
        itemFilterModel={unsecuredItemFilterModel}
        setItemsFilterModel={setUnsecuredItemFilterModel}
        loadData={loadData}
        isLoading={isLoading}
      />
    </ScreenContainer>
  );
}
