import React, {useState} from "react";
import PropTypes from "prop-types";
import {faArrowRight, faPlusCircle, faCode} from "@fortawesome/pro-light-svg-icons";
import ClientSideBottomPaginator from "components/common/pagination/client_side/ClientSideBottomPaginator";
import {Button} from "react-bootstrap";
import IconBase from "components/common/icons/IconBase";
import FieldItemCard from "./FieldItemCard";


function FieldListPanel({selectedNonMembers, setSelectedNonMembers, nonMembers, setNonMembers, members, setMembers, setShowUnsavedChangesMessage, filteredNonmembers}) {
  const [shownNonMembers, setShownNonMembers] = useState([]);

  if (members == null) {
    return <></>;
  }

  const addAllNonmembers = () => {
    setShowUnsavedChangesMessage(true);
    let newMembers = members;
    newMembers.push(...filteredNonmembers);
    let newNonMembers = nonMembers.filter(user => !newMembers.includes(user));
    setMembers([...newMembers]);
    setNonMembers([...newNonMembers]);
  };

  const addAllShownNonMembers = () => {
    setShowUnsavedChangesMessage(true);
    let newMembers = members;
    newMembers.push(...shownNonMembers);
    let newNonMembers = nonMembers.filter(user => !newMembers.includes(user));
    setNonMembers([...newNonMembers]);
    setMembers([...newMembers]);
    setSelectedNonMembers([]);
  };

  const addSelectedToMembers = () => {
    setShowUnsavedChangesMessage(true);
    let newMembers = members;
    newMembers.push(...selectedNonMembers);
    let newNonMembers = nonMembers.filter(user => !newMembers.includes(user));
    setNonMembers([...newNonMembers]);
    setMembers([...newMembers]);
    setSelectedNonMembers([]);
  };

  const formatUser = (user, index) => {
    return (
      <div key={index} className={index % 2 === 0 ? "even-row" : "odd-row"}>
        <FieldItemCard
          selectedFields={selectedNonMembers}
          setSelectedFields={setSelectedNonMembers}
          field={user}
        />
      </div>
    );
  };

  const formatUsers = () => {
    if (shownNonMembers.length === 0) {
      return (
        <div className="h-100 m-auto text-center">
          <span>No Records Found</span>
        </div>
      );
    }

    return (shownNonMembers.map((user, i) => {return (formatUser(user, i));}));
  };

  return (
    <div>
      <div className="mb-2 d-flex justify-content-between">
        <Button size="sm" variant="success" onClick={addAllNonmembers}>
          <span className="mr-2"><IconBase className={"mr-2"} icon={faPlusCircle}/>Add All</span>
          <span className="badge badge-secondary">{filteredNonmembers.length}</span>
        </Button>
        <Button disabled={selectedNonMembers.length === 0} size="sm" variant="outline-primary" onClick={() => addSelectedToMembers()}>
          <div className="d-flex justify-content-between">
            <div><IconBase icon={faArrowRight}/></div>
            <div className="mx-2">Add Selected</div>
            <div><span className="badge badge-secondary">{selectedNonMembers.length}</span></div>
          </div>
        </Button>
        <Button size="sm" variant="outline-success" onClick={addAllShownNonMembers}>
          <span className="mr-2"><IconBase className={"mr-2"} icon={faPlusCircle} />Add All Shown</span>
          <span className="badge badge-secondary">{shownNonMembers.length}</span>
        </Button>
      </div>
      <div className="content-card-1 content-container scroller">
        <div className="p-2 d-flex content-block-header justify-content-between">
          <div><IconBase icon={faCode} className={"mr-2"}/>Field Properties</div>
          <div>{nonMembers.length} {nonMembers.length !== 1 ? "Fields" : "Field"}</div>
        </div>
        <ul className="list-group membership-list">
          {formatUsers()}
        </ul>
        <div className="px-3 mt-2">
          <ClientSideBottomPaginator items={filteredNonmembers} setShownItems={setShownNonMembers} paginationStyle={"stacked"} pageSize={20} />
        </div>
      </div>
    </div>
  );
}

FieldListPanel.propTypes = {
  filteredNonmembers: PropTypes.array,
  members: PropTypes.array,
  setMembers: PropTypes.func,
  nonMembers: PropTypes.array,
  setNonMembers: PropTypes.func,
  selectedNonMembers: PropTypes.array,
  setSelectedNonMembers: PropTypes.func,
  setShowUnsavedChangesMessage: PropTypes.func
};

export default FieldListPanel;