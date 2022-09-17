module.exports = {

    //User Controller
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
}