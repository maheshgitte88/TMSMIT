const { DataTypes } = require('sequelize');
const sequelize = require('../config');
const Department = require('./Department');
const SubDepartment = require('./SubDepartment');

const Employee = sequelize.define('Employee', {
  EmployeeID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  EmployeeName: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  EmployeeEmail: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  EmployeePassword: {
    type: DataTypes.STRING, // Change the data type based on your security requirements
    allowNull: false,
  },
});

Employee.belongsTo(Department, { foreignKey: 'DepartmentID' });
Employee.belongsTo(SubDepartment, { foreignKey: 'SubDepartmentID' });

module.exports = Employee;