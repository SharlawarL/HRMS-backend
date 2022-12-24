module.exports = {
    //User
    createUser: require('./userModel').create,
    findUser: require('./userModel').find,
    deleteUser: require('./userModel').delete,
    updateUser: require('./userModel').update,

    //Employee
    createEmployee: require('./employeeModel').create,
    findEmployee: require('./employeeModel').find,
    deleteEmployee: require('./employeeModel').delete,
    updateEmployee: require('./employeeModel').update,

    //Organization Location
    createLocation: require('./locationModel').create,
    findLocation: require('./locationModel').find,
    deleteLocation: require('./locationModel').delete,
    updateLocation: require('./locationModel').update,

    //Organization Designation
    createDesignation: require('./designationModel').create,
    findDesignation: require('./designationModel').find,
    deleteDesignation: require('./designationModel').delete,
    updateDesignation: require('./designationModel').update,
}