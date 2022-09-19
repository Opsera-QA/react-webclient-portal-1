import React, {useContext, useMemo} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import {useHistory} from "react-router-dom";
import {
  getTableTextColumn,
} from "components/common/table/table-column-helpers";
import {getField} from "components/common/metadata/metadata-helpers";
import FilterContainer from "components/common/table/FilterContainer";
import {faStream} from "@fortawesome/pro-light-svg-icons";
import {DialogToastContext} from "contexts/DialogToastContext";
import { platformSettingsMetadata } from "components/admin/platform_settings/platformSettings.metadata";
import NewPlatformSettingsOverlay from "components/admin/platform_settings/create/NewPlatformSettingsOverlay";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";

export default function PlatformSettingsTable(
  {
    platformSettings,
    loadData,
    isLoading,
  }) {
  const toastContext = useContext(DialogToastContext);
  const history = useHistory();
  const fields = platformSettingsMetadata.fields;

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "platformId")),
    ],
    []
  );

  const noDataMessage = "No platform settings have been registered.";

  const onRowSelect = (rowData) => {
    history.push(`/admin/platform/settings/details/${rowData.original._id}`);
  };

  const addRecordFunction = () => {
    toastContext.showOverlayPanel(
      <NewPlatformSettingsOverlay
        loadData={loadData}
      />
    );
  };

  const getTable = () => {
    return (
      <CustomTable
        isLoading={isLoading}
        onRowSelect={onRowSelect}
        noDataMessage={noDataMessage}
        data={platformSettings}
        columns={columns}
      />
    );
  };

  return (
    <div>
      <CenteredContentWrapper>
        <H5FieldSubHeader
          subheaderText={"This is limited to one record as that is all that is currently supported in the platform."}
        />
      </CenteredContentWrapper>
      <FilterContainer
        loadData={loadData}
        addRecordFunction={Array.isArray(platformSettings) && platformSettings.length === 0 ? addRecordFunction : undefined}
        isLoading={isLoading}
        body={getTable()}
        titleIcon={faStream}
        title={"Platform Settings"}
        type={"Platform Setting"}
        className={"p-2"}
      />
    </div>
  );
}

PlatformSettingsTable.propTypes = {
  platformSettings: PropTypes.array,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
};