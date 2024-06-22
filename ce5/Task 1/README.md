# Task 1

## Problem Statement

Given the ER diagram below (refer to lecture note),

![](../../images/er2.png)

implement a simple API web-app with the following end-points using MongoDB database:

1. add dept
   ```url
   http://localhost:3000/dept/add/hr
   ```
   yields
   ```json
   { "code": "hr", "_id": "6478a5a866394647f94f4021" }
   ```
1. add staff
   ```url
   http://localhost:3000/staff/add/1/aaron/hr
   ```
   yields
   ```json
   {
     "id": "1",
     "name": "aaron",
     "dept": "hr",
     "_id": "6478a6de67e208e3a7764c43"
   }
   ```
1. find all departments
   ```url
   http://localhost:3000/dept/all/
   ```
   yields
   ```json
   [{ "code": "hr" }]
   ```
1. find all staffs
   ```url
   http://localhost:3000/staff/all/
   ```
   yields
   ```json
   [{ "id": "1", "name": "aaron", "dept": "hr" }]
   ```
1. find all depts with staffs
   ```url
   http://localhost:3000/dept/all/withstaff/
   ```
   yields
   ```json
   [{ "code": "hr", "staffs": [{ "id": "1", "name": "aaron", "dept": "hr" }] }]
   ```

Make sure the database name is `echo` by having the following definition `const dbName = "echo";` in `db.js`.

## Solution

Refer to [dept.js](https://github.com/zayne-siew/50.003-Cohort-Problems/blob/main/ce5/Task%201/routes/dept.js) and [staff.js](https://github.com/zayne-siew/50.003-Cohort-Problems/blob/main/ce5/Task%201/routes/staff.js) for the respective implementations.
