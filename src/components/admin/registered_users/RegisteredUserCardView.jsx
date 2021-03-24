import React from "react";
import PropTypes from "prop-types";
import {Col} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import CardView from "components/common/card/CardView";
import RegisteredUserSummaryCard from "components/admin/registered_users/RegisteredUserSummaryCard";

function RegisteredUserCardView({ data, registeredUsersFilterDto, setRegisteredUsersFilterDto, loadData, isLoading }) {
  const getCards = () => {
    if (!Array.isArray(data) || data.length === 0) {
      return null;
    }

    const users = [...data];

    return (
      <Row className="mx-0">
        {users.map((user, index) => {
          return (
            <Col lg={12} className={"px-0"} key={index}>
              <RegisteredUserSummaryCard registeredUsersData={user} loadData={loadData} />
            </Col>
          );
        })}
      </Row>
    );
  };

  return (
    <CardView
      isLoading={isLoading}
      loadData={loadData}
      paginationDto={registeredUsersFilterDto}
      setPaginationDto={setRegisteredUsersFilterDto}
      cards={getCards()}
    />
  );
}

RegisteredUserCardView.propTypes = {
  data: PropTypes.array,
  registeredUsersFilterDto: PropTypes.object,
  setRegisteredUsersFilterDto: PropTypes.func,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool
};

export default RegisteredUserCardView;