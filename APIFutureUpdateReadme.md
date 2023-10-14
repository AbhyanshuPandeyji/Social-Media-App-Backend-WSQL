###### Welcome to the API ( Backend ) Future Readme File - its the File for the Social Media File -


#### We talk about What can be done with this and can be updated with this in the future 


- can add an explore page where we can have seen all the posts from all the users on the internet - for that in my sql
```
SELECT p.*, u.id AS userId , name , profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId)

use this line it will only link the posts with the user , and not specific post followed by the users helps in explore pages , the posts.userId if given null will show all the post , and user with id can see it , but if the user is not logged in it will not thanks to the help of jwt verification 
```