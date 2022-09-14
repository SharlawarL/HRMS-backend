module.exports = {
    //login api
    createEmployee: require('./employeeModel').create,
    findEmployee: require('./employeeModel').find,
    deleteEmployee: require('./employeeModel').delete,
    updateEmployee: require('./employeeModel').update,
}