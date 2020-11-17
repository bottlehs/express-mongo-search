const e = require("express");
const { request } = require("../app");

var Employee = require('../models/Employee');
var employeeController = {};

// 전체 직원 목록 보기
employeeController.list = function (req, res) {
  Employee.find({}).exec(function (err, employees) {
    if (err) {
      console.log(`Error: ${err}`);
    } else {
      res.render('../views/employees/index', {employees : employees});
    };
  });
};

// id 로 단일 직원 표시
employeeController.show = function (req, res) {
  Employee.findOne({_id: req.params.id}).exec(function(err, employee) {
    if (err) {
      console.log(`Error: ${err}`);
    } else {
      res.render('../views/employees/show', {employee: employee});
    };
  });
};

// 직원추가
employeeController.create = function (req, res) {
  res.render('../views/employees/create');
};

// 직원 저장
employeeController.save = function (req, res) {
  var employee = new Employee(req.body);
  employee.save(function(err) {
    if(err) {
      console.log(err);
      res.render('../views/employees/create');
    } else {
      console.log('Successfully create an employee');
      res.redirect(`/employees/show/${employee.id}`)
    };
  });
};

// 직원 편집
employeeController.edit = function(req, res) {
  Employee.findOne({_id: req.params.id}).exec(function(err, employee) {
    if(err) {
      console.log(`Error : ${err}`);
    } else {
      res.render('../views/employees/edit', {employee: employee});
    };
  });
};

// 편집된 직원 업데이트
employeeController.update = function(req, res) {
  Employee.findByIdAndUpdate(
    req.params.id, { $set: {
      name: req.body.name,
      address: req.body.address,
      position: req.body.position,
      salary: req.body.salary
    }},

    {new: true}, function (err, employee) {
      if(err) {
        console.log(err);
        res.render('../views/employee/edit', {employee: req.body});
      } else {
        res.redirect(`/employees/show/${employee._id}`);
      };
  });
};

// 단일 직원 데이터 제거
employeeController.delete = function(req, res) {
  Employee.remove({_id:req.params.id}, function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log('Employee deleted!!');
      res.redirect('/employees');
    };
  });
};

module.exports = employeeController;