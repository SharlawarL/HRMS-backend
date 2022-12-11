module.exports = {

    //User Controller
    loginUser: require('./userController').loginUser,
    registerUser: require('./userController').registerUser,
    getUser: require('./userController').getUser,
    getUserById: require('./userController').getUserById,
    deleteUserById: require('./userController').deleteUserById,
    updateUser: require('./userController').updateUser,

    //Employee Controller
    registerEmployee: require('./employeeController').registerEmployee,
    getEmployee: require('./employeeController').getEmployee,
    getEmployeeById: require('./employeeController').getEmployeeById,
    deleteEmployeeById: require('./employeeController').deleteEmployeeById,
    updateEmployee: require('./employeeController').updateEmployee,
    
    //Organization Controller
    locationSave: require('./organizationController').locationSave,
    getLocation: require('./organizationController').getLocation,
    getLocationById: require('./organizationController').getLocationById,
    getLocationByCompany: require('./organizationController').getLocationByCompany,
    deleteLocationById: require('./organizationController').deleteLocationById,
    updateLocation: require('./organizationController').updateLocation,
}