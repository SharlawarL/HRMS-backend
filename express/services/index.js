module.exports = {

    //Employee
    registerEmployee: require('./employeeService').registerEmployee,
    getEmployee: require('./employeeService').getEmployee,
    getEmployeeById: require('./employeeService').getEmployeeById,
    deleteEmployeeById: require('./employeeService').deleteEmployeeById,
    updateEmployee: require('./employeeService').updateEmployee,
}