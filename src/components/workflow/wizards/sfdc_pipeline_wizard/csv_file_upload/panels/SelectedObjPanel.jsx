import React, {useState} from 'react';
import PropTypes from 'prop-types';
import ClientSideBottomPaginator from "components/common/pagination/client_side/ClientSideBottomPaginator";

function SelectedObjPanel({ selectedItems }) {
  const [shownSelectedItems, setShownSelectedItems] = useState([]);
  
  if (selectedItems == null) {
    return <></>;
  }
  const formatItem = (item, index) => {
    return (
      <div key={item.componentType+"_"+item.committedFile} className={index % 2 === 0 ? "even-row" : "odd-row"}>
        <li key={item.componentType+"_"+item.committedFile} className="p-2 member-list">
          <div className="px-2 justify-content-between d-flex w-100">
            <div className="force-text-wrap" style={{"width": "200px"}}>{item.componentType}</div>
            <div className="force-text-wrap" style={{"width": "400px"}}>{item.committedFile}</div>
          </div>
        </li>
      </div>
    );
  };
  
  const formatItems = () => {
    if (shownSelectedItems.length === 0) {
      return (
        <div className="h-100 m-auto text-center">
          <span>No Records Found</span>
        </div>
      );
    }

    return (shownSelectedItems.map((item, i) => {return (formatItem(item, i));}));
  };

  return (
     <div className="content-card-1 content-container scroller" style={{"height": "500px"}}>
        <div className="px-2 d-flex content-block-header members-title justify-content-between">
          <div>Selected Items</div>
        </div>
        <ul className="list-group membership-list">
          {formatItems()}
        </ul>
        <div className="px-3 mt-2">
          <ClientSideBottomPaginator items={selectedItems} setShownItems={setShownSelectedItems} paginationStyle={"stacked"} pageSize={10} />
        </div>
      </div>
  );
}

SelectedObjPanel.propTypes = {
  selectedItems: PropTypes.array,
};

export default SelectedObjPanel;

