import React, { useState, useContext, useMemo } from "react";
import PropTypes from "prop-types";
import {
  getTableTextColumn
} from "../../../../../common/table/table-column-helpers";
import {getField} from "../../../../../common/metadata/metadata-helpers";
import {DialogToastContext} from "../../../../../../contexts/DialogToastContext";
import FullScreenCenterOverlayContainer
  from "../../../../../common/overlays/center/FullScreenCenterOverlayContainer";
import CustomTable from "components/common/table/CustomTable";
import FilterContainer from "components/common/table/FilterContainer";

const NO_DATA_MESSAGE = "No data available";

function GitlabCommitsBytAuthorActionableModal({ metrics }) {
  const toastContext = useContext(DialogToastContext);

  /**
   * given the data format:
   *
   * [
   *  {
   *    id: "2023-04-26", // date
   *    data: [
   *      {
   *        "x": "Suriya Prakash",
   *        "y": 6
   *      },
   *      ...
   *    ]
   *  },
   *  ...
   * ]
   * 
   * Output:
   * [
   *  {
   *    id: "date",
   *    label: "Date",
   *  },
   *  {
   *    id: "Suriya Prakash",
   *    label: "Suriya Prakash",
   *  },
   *  ...
   * ]
   */
  const addFields = () => {
    if (!Array.isArray(metrics) || metrics.length === 0) {
      return {};
    }

    return [
      {
        id: 'date',
        label: 'Date'
      },
      // add each x value from data
      ...metrics[0].data.map(({ x }) => ({
        id: x,
        label: x
      }))
    ];
  };

  const fields = addFields();

  const columnsToRender = () => {
    const columns = [getTableTextColumn(getField(fields, 'date'))];
    fields.forEach(field => {
      if(field.id !== 'date') {
        columns.push(getTableTextColumn(getField(fields, field.id)));
      }
    });
    return columns;
  };

  const columns = useMemo(
    columnsToRender,
    []
  );

  const closePanel = () => {
    toastContext.removeInlineMessage();
    toastContext.clearInfoOverlayPanel();
  };

  const convertData = () => {
    return metrics.map(({ id, data }) => {
      const newData = {
        date: id,
      };

      data.map(({ x, y}) => {
        newData[x] = y;
      });

      return newData;
    });
  };

  const data = convertData();

  const getBody = () => {
    return (
      <FilterContainer
        title={'Total Commits Per Author By Date'}
        body={getTable()}
        metadata={data}
      />
    );
  };

  const getTable = () => {
    return (
      <CustomTable
        columns={columns}
        data={data}
        noDataMessage={NO_DATA_MESSAGE}
        className={'no-wrap'}
      />
    );
  };

  return (
    <FullScreenCenterOverlayContainer
      closePanel={closePanel}
      showPanel={true}
      titleText={`Gitlab Total Commits Per Author By Date`}
      showToasts={true}
    >
      <div className={"p-3"}>
        {getBody()}
      </div>
    </FullScreenCenterOverlayContainer>
  );
}

GitlabCommitsBytAuthorActionableModal.propTypes = {
  metrics: PropTypes.array,
};

export default GitlabCommitsBytAuthorActionableModal;