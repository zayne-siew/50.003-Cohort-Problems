# Cohort Exercise - Express.js, MongoDB, MySQL and Database design


## Task 1 (5 marks)

Using MongoDB document database, give a logical design of the ER diagram with the Staff and Dept entities and Work relationship

![](./images/er2.png) 

implement a simple API web-app with the following end-points

1. add dept
    ```url
    http://localhost:3000/dept/add/hr
    ```
    yields
    ```json
    {"code":"hr","_id":"6478a5a866394647f94f4021"}
    ```
1. add staff
    ```url
    http://localhost:3000/staff/add/1/aaron/hr
    ```
    yields
    ```json
    {"id":"1","name":"aaron","dept":"hr","_id":"6478a6de67e208e3a7764c43"}
    ```
1. find all deptartments
    ```url
    http://localhost:3000/dept/all/
    ```
    yields
    ```json
    [{"code":"hr"}]
    ```
1. find all staffs 
    ```url
    http://localhost:3000/staff/all/
    ```
    yields
    ```json
    [{"id":"1","name":"aaron","dept":"hr"}]  
    ```
1. find all depts with staffs
    ```url
    http://localhost:3000/dept/all/withstaff/
    ```
    yields
    ```json
    [{"code":"hr","staffs":[{"id":"1","name":"aaron","dept":"hr"}]}]
    ```


## Task 2 (TODO)