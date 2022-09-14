module.exports = {

    //register employee api
    registerEmployee: require('./employeeController').registerEmployee,
    getEmployee: require('./employeeController').getEmployee,
    getEmployeeById: require('./employeeController').getEmployeeById,
    deleteEmployeeById: require('./employeeController').deleteEmployeeById,
    updateEmployee: require('./employeeController').updateEmployee,
}