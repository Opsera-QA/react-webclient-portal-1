// TODO: put metadata on node server and pull down that way?
const ldapUsersFormFields = {
  _id: {
    label: "ID",
    id: "_id",
    rules: {
      // isRequired: true
    }
  },
  name: {
    label: "Account Name",
    id: "name",
    rules: {
      // isRequired: true
    }
  },
  givenName: {
    label: "Given Name",
    id: "givenName",
    rules: {
      // isRequired: true
    }
  },
  preferredName: {
    label: "Preferred Name",
    id: "preferredName",
    rules: {
      // isRequired: true
    }
  },
  firstName: {
    label: "First Name",
    id: "firstName",
    rules: {
      isRequired: true
    }
  },
  lastName: {
    label: "Last Name",
    id: "lastName",
    rules: {
      isRequired: true
    }
  },
  emailAddress: {
    label: "Email Address",
    id: "emailAddress",
    rules: {
      isRequired: true
    }
  },
  division: {
    label: "Division",
    id: "division",
    rules: {
      // isRequired: true
    }
  },
  team: {
    label: "Team",
    id: "team",
    rules: {
      // isRequired: true
    }
  },
  departmentName: {
    label: "Department Name",
    id: "departmentName",
    rules: {
      // isRequired: true
    }
  },
  title: {
    label: "Title",
    id: "title",
    rules: {
      // isRequired: true
    }
  },
  opseraId: {
    label: "Opsera Customer Record",
    id: "opseraId",
    rules: {
      // isRequired: true
    }
  },
  createdAt: {
    label: "Create Time",
    id: "createdAt",
    rules: {
      // isRequired: true
    }
  }
};

export default ldapUsersFormFields;