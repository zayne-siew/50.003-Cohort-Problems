# Cohort Exercise - Express.js, MongoDB, MySQL and Database design

## Task 1 (5 marks)

Given the ER diagram below (refer to lecture note),

![](../images/er2.png)

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
1. find all deptartments
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

## Task 2

Given the ER diagram below,

![](../images/er2.png)

and assume that the database has been created after you follow the lecture note. Give step-by-step explanation on how we can implement this API
`http://127.0.0.1:3000/dept/count` which yields
`[{"count":2,"dept":"HR"}]`.
The API basically returns the count of staff from each department.
