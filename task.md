# Salarify Movie Rater

### Summary

You have been approached by a movie critique, who were using his notepad until now, to create a browser based tool for him to add,
review and rate movies. Since you are running low on coins, and you are hungry as hell (might die in 3 days from now) you are really keen to finish
the job as soon as possible. His requirements are quite simple, he wants to add new movies, browse already added movies and change their ratings or reviews or delete entire movies.
Luckily, one of your friends created a wireframe for you to help.

### Requirements

- __Fork this repository into your own GitHub account, DO NOT try to push commits into this repository__
- __Create a Restful API (technology of your choice, since our stack is Typescript we would prefer that) with the following requirements:__
  - you find a JSON file containing the dummy data in the _data_ folder
  - DB should be in memory
  - create an endpoint to query movies, a narrowed list should be available by the partial name of the movie, this endpoint should only return the name, year, image and the average rating of the movie
  - create an endpoint to fetch details by movie
  - create an endpoint to add movies, input data should be validated backend side!
  - create and endpoint to update movies
  - delete movies
- __Create a webpage / web application (technology of your choice, since our stack is Angular we would prefer that) with the following requirements:__
  - create a 3x2 grid view for movies, movies should be paginated
  - by clicking on the add nav menu, a user should be able to add new movies in a form
  - by clicking on the card a modal should appear with the details of the movie
  - in the card a user should be able to edit / delete the given record
  - always try to follow the guidelines in the _wireframes_ folder
- __Create a readme / documentation about your solution, please give us instructions on how to start your program, it should be easy since we are only movie critiques__
- __You have 3 days to finish__
- __Commit your work frequently, so we can track your progress if you cannot finish everything, don't worry, just push every bit of code you finished__
- __It's far more important to create a precise and clean job, than to finish every sub-task in time!__
- __If you are not familiar with Typescript or Angular, don't worry just use frameworks and languages you are confident with__

### If you feel it's too easy, and you are bored

- use SQLite or other SQL database instead of in memory solution
- create Open API documentation
- if the pagination is only happening in the UI, paginate the data in the backend
- create a basic auth login solution
- create test cases where you feel necessary
- make the page available in english and hungarian as well