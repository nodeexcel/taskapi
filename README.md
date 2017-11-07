#task API


# Start APP - node app.js or npm start 


## 1. Register--

##### route: 

https://ancient-tor-37059.herokuapp.com/register

##### type: 

POST

##### Headers-

Content-Type:application/x-www-form-urlencoded

##### Body-

email:xyz@gmail.com,

password:123,

con_password:123


## 2. login--

##### route: 

https://ancient-tor-37059.herokuapp.com/login

##### type: 

POST

##### Headers-

Content-Type:application/x-www-form-urlencoded

##### Body-

email:xyz@gmail.com,

password:123


## 3. add task--

##### route: 

https://ancient-tor-37059.herokuapp.com/add_task

##### type:

POST

##### Headers-

access_token:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNWEwMTgyYzU5NTI3ZmUwMDEyMzcwN2IyIiwiaWF0IjoxNTEwMDQ4NDY4LCJleHAiOjE1MTM2NDg0Njh9.DG93Hq-Fde9kNZbgnr34l2dZyeEYyJ0OfD_9yZK1JCQ

Content-Type:application/x-www-form-urlencoded


##### Body-

task:test,

date:2017-12-12


## 4. view all task--

##### Route: 

https://ancient-tor-37059.herokuapp.com/view_all_task

##### type:

GET

##### Headers-

Content-Type:application/x-www-form-urlencoded

access_token:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNWEwMTQ3Y2NkODJlMDYxY2ZmOTAxNGUzIiwiaWF0IjoxNTEwMDMzMzYzLCJleHAiOjE1MTM2MzMzNjN9.PLoMnwv9Z92kHv-F33QDvzrOPSlVe_w_uSLdAZY-75Y


## 5. change task status--

##### Route: 

https://ancient-tor-37059.herokuapp.com/task_status

##### type:

GET

##### Headers-

Content-Type:application/x-www-form-urlencoded

access_token:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNWEwMTQ3Y2NkODJlMDYxY2ZmOTAxNGUzIiwiaWF0IjoxNTEwMDMzMzYzLCJleHAiOjE1MTM2MzMzNjN9.PLoMnwv9Z92kHv-F33QDvzrOPSlVe_w_uSLdAZY-75Y

task_id:5a014981d82e061cff9014e6


## 6. edit task--

##### Route: 

https://ancient-tor-37059.herokuapp.com/edit_task

##### type:

POST

##### Headers-

Content-Type:application/x-www-form-urlencoded

access_token:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNWEwMTQ3Y2NkODJlMDYxY2ZmOTAxNGUzIiwiaWF0IjoxNTEwMDMzMzYzLCJleHAiOjE1MTM2MzMzNjN9.PLoMnwv9Z92kHv-F33QDvzrOPSlVe_w_uSLdAZY-75Y

task_id:5a014981d82e061cff9014e6

##### Body-

task: xyz (task name)


## 7. view one task--

##### Route: 

https://ancient-tor-37059.herokuapp.com/get_one_task

##### type:

GET

##### Headers-

Content-Type:application/x-www-form-urlencoded

access_token:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNWEwMTQ3Y2NkODJlMDYxY2ZmOTAxNGUzIiwiaWF0IjoxNTEwMDMzMzYzLCJleHAiOjE1MTM2MzMzNjN9.PLoMnwv9Z92kHv-F33QDvzrOPSlVe_w_uSLdAZY-75Y

task_id:5a014981d82e061cff9014e6


## 8. share task--

##### Route: 

https://ancient-tor-37059.herokuapp.com/share_task

##### type:

POST

##### Headers-

Content-Type:application/x-www-form-urlencoded

access_token:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNWEwMTQ3Y2NkODJlMDYxY2ZmOTAxNGUzIiwiaWF0IjoxNTEwMDMzMzYzLCJleHAiOjE1MTM2MzMzNjN9.PLoMnwv9Z92kHv-F33QDvzrOPSlVe_w_uSLdAZY-75Y

##### body-

task_id:59ed7648eb0dad1730c46a68  

email:test@gmail.com     //(other user's id)


## 9. delete task--

##### Route: 

https://ancient-tor-37059.herokuapp.com/delete

##### type:

DELETE

##### Headers-

Content-Type:application/x-www-form-urlencoded,

access_token:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNWEwMTQ3Y2NkODJlMDYxY2ZmOTAxNGUzIiwiaWF0IjoxNTEwMDMzMzYzLCJleHAiOjE1MTM2MzMzNjN9.PLoMnwv9Z92kHv-F33QDvzrOPSlVe_w_uSLdAZY-75Y,

task_id:5a014981d82e061cff9014e6.




# deployment od heroku---

##### Install heroku and signup on heroku official site.

##### commands: 

##### 1. heroku login

##### 2. git clone https://github.com/nodeexcel/taskapi.git 

##### 3. cd taskapi

##### 4. heroku create

##### 5. git push heroku master

##### 6. heroku ps:scale web=1

##### 7. npm install    //(install all modules)

##### 8. heroku open

for checking the logs errors run command: heroku logs --tail