module.exports = {

    //User
    loginUser: require('./userService').loginUser,
    registerUser: require('./userService').registerUser,
    getUser: require('./userService').getUser,
    getUserById: require('./userService').getUserById,
    deleteUserById: require('./userService').deleteUserById,
    updateUser: require('./userService').updateUser,

    //Employee
    registerEmployee: require('./employeeService').registerEmployee,
    getEmployee: require('./employeeService').getEmployee,
    getEmployeeById: require('./employeeService').getEmployeeById,
    deleteEmployeeById: require('./employeeService').deleteEmployeeById,
    updateEmployee: require('./employeeService').updateEmployee,

    // Organization
    locationSave: require('./organizationService').locationSave,
    getLocation: require('./organizationService').getLocation,
    getLocationByFIlter: require('./organizationService').getLocationByFIlter,
    deleteLocationById: require('./organizationService').deleteLocationById,
    updateLocation: require('./organizationService').updateLocation,

    // Designation
    designationSave: require('./organizationService').designationSave,
    getDesignation: require('./organizationService').getDesignation,
    getDesignationByFIlter: require('./organizationService').getDesignationByFIlter,
}