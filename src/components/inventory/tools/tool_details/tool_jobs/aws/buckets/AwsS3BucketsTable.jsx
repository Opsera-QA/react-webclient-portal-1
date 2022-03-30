import React, {useContext, useMemo, useState, useEffect, useRef} from "react";
import PropTypes from "prop-types";
import awsS3BucketMetadata from "./aws-s3-bucket-metadata";
import {getField} from "components/common/metadata/metadata-helpers";
import FilterContainer from "components/common/table/FilterContainer";
import {faBrowser} from "@fortawesome/pro-light-svg-icons";
import {DialogToastContext} from "contexts/DialogToastContext";
import AwsS3BucketsOverlay from "./AwsS3BucketsOverlay";
import {getTableTextColumn} from "components/common/table/table-column-helpers-v2";
import modelHelpers from "components/common/model/modelHelpers";
import AwsS3BucketEditorPanel from "./details/AwsS3BucketEditorPanel";
import VanityTable from "components/common/table/VanityTable";

function AwsS3BucketsTable({ toolData, awsS3Buckets, loadData, isLoading }) {
  const toastContext = useContext(DialogToastContext);  
  const [selectedBucket, setSelectedBucket] = useState(undefined);
  
  let fields = awsS3BucketMetadata.fields;

  const createAwsS3Bucket = () => {
    toastContext.showOverlayPanel(<AwsS3BucketsOverlay toolData={toolData} loadData={loadData} editMode={false} />);
  };

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "bucketName")),
      getTableTextColumn(getField(fields, "regions"))      
    ],
    []
  );

  const onRowSelect = async (grid, row) => {   
    setSelectedBucket({...row});
  };

  const closePanelFunction = async () => {
    setSelectedBucket(null);
    await loadData();
  };

  const getTable = () => {
    return (
      <VanityTable
        columns={columns}
        data={awsS3Buckets}
        onRowSelect={onRowSelect}
        isLoading={isLoading}
      />
    );
  };

  if(selectedBucket != null) {
    return (
      <AwsS3BucketEditorPanel
        awsS3BucketsData={awsS3Buckets}
        toolData={toolData}
        loadData={loadData}
        handleClose={closePanelFunction}
        editMode={true}
        editRowData={selectedBucket}
      />
    );
  }

  return (
    <FilterContainer
      loadData={loadData}
      isLoading={isLoading}
      title={"AWS S3 Buckets"}
      type={"AWS S3 Bucket"}
      titleIcon={faBrowser}
      addRecordFunction={toolData?.data?.configuration ? createAwsS3Bucket : undefined}
      body={getTable()}
      showBorder={false}
    />
  );
}

AwsS3BucketsTable.propTypes = {
  toolData: PropTypes.object,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  awsS3Buckets: PropTypes.array
};

export default AwsS3BucketsTable;
