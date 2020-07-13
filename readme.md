Space News and Tracking -
_____________________________

I started this project with the intent of being a search engine and media hub for news and public images.

Currently, it has a streaming news page, and the ability to store image url's from the front page.

The front page and image functionality is pretty well fleshed out, with structure
in place for storing and viewing news, url's, and spaceX API data. 
There is Currently no mention of community interaction (outside of plans to call relevant Reddit threads from the SpaceX API)

ROUTES    * - Beta
_____________________________
GET '/' front page (News Stream)
GET '/profile' (login, shows user name and email)
GET '/upcoming' (SpaceX API call, showing soon-to-launch missions)
GET '/faveNews' (user-defined list of news articles)
GET '/faveSpaceX' (user-defined list of SpaceX objects)
GET '/faveImage' (user-defined list of images, displayed)
POST '/images/add' (appends image url to array db.favoritesImages.favoritesListImages)
POST (DELETION) '/images/delete' (removes image url from array ^^)
POST '/favorites/add' (appends spaceX ID to array db.favoritesSpaceX.favoritesListSpaceX)
POST (DELETION) '/favorites/delete' (removes spaceX ID from array ^^)


resources used - note that these are public API's with API keys for admin use.
_____________________________
SpaceFlightNews API - news and images
SpaceX API - objects with tech data and reddit threads
NASA Image and Video Library - as yet unused