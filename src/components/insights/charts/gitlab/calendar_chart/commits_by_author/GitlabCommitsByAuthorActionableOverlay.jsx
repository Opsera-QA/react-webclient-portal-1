import React, { useState, useContext, useMemo } from "react";
import PropTypes from "prop-types";
import {
  getTableTextColumn
} from "../../../../../common/table/table-column-helpers";
import {getField} from "../../../../../common/metadata/metadata-helpers";
import {DialogToastContext} from "../../../../../../contexts/DialogToastContext";
import FullScreenCenterOverlayContainer
  from "../../../../../common/overlays/center/FullScreenCenterOverlayContainer";
import CustomTable from "../../../../../common/table/CustomTable";
import FilterContainer from "../../../../../common/table/FilterContainer";

function GitlabCommitsBytAuthorActionableModal({ metrics }) {
  const toastContext = useContext(DialogToastContext);

  const noDataMessage = "No data available";

  const addFields = () => {
    //the metrics value is an array of objects which consist of author names and date
    //example: [{ "Noah Champoux":65, "Phanisri Adusumilli":1, "date":"2022-08-24" },
    // { "Noah Champoux":50, "Phanisri Adusumilli":4, "date":"2022-08-23" }]
    try {
      //we extract each author as a new field from metrics
      //sample output: [{ label: 'Date', id: 'date'},
      // { label: 'Phanisri Adusumilli', id: 'Phanisri Adusumilli'},
      // { label: 'Noah Champoux', id: 'Noah Champoux'}]
      const fields = [];
      metrics.forEach(metric => {
        Object.keys(metric).forEach(author => {
          const found = fields.some(field => field.id === author);
          if(!found) {
            if(author === 'date') {
              fields.push({
                label: 'Date',
                id: author
              });
            } else {
              fields.push({
                label: author,
                id: author
              });
            }
          }
        });
      });
      return fields;
    } catch (error) {
        console.error(error);
    }
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


  const getBody = () => {
    return (
      <FilterContainer
        title={'Total Commits Per Author By Date'}
        body={getTable()}
        metadata={metrics}
      />
    );
  };

  const getTable = () => {
    return (
      <CustomTable
        columns={columns}
        data={metrics}
        noDataMessage={noDataMessage}
        className={'no-wrap '}
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