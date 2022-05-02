# Salarify Movie Rater

<h2>Dependencies</h2>
	
 - node v17.3.0 ^
  - npm v8.3.0 ^

<h2>Install all the packages</h2>
	



	
    npm install && npm run install
   <h2> Run the service (UI / API)</h2>
   

    npm run dev
    


# Summary
<p>
	This project was built by  <b>Angular 13.3.4 </b> and  <b>Express 4.8 </b>.
	First let's talk about the UI. I think I separated the components like a right way. I managed to create a all-in-all service for the movies. This is where the API fetches went.
	I used where I felt necessary to use the <b>Angular Material</b> kit to have a better and sophisticated look.
	I managed to have a decent feedback from the API to notify the user which request has failed or not, or which form was valid or not.
	I could have done the searching but unfortunately I ran out of time. This could be say for the SimpleAuth system.
	
	
Secondly the API. I Used a database module for the response handling. I used SQLite3 as a database for the movies / rating. I created two table, one for the movies one for the ratings and join together where I had to by the id of the movie.
I managed to set up a very simple CORS system as the middleware as well as the body parser used by express;


Nevertheless, I have managed to run the whole service with one command at all using *concurrently* npm modul.
You can see the run command above.

<<<<<<< HEAD
</p>
=======
</p>
>>>>>>> 0c0d96a92ddb475e0e16fa742a34987ca09d0d82
