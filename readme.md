
# Movie Booking API

### To view this as a PR, please visit the following link:



## Introduction
This project implements API endpoints to allow a user to search for theaters in their city, find dates with available shows for a particular theater, and then view all showings for that theater for a particular day.

It is meant to support the following front end component.


## Endpoints
-   **GET /api/city/:cityid**: Fetches a list of all theaters in a city.
    
-   **GET /api/city/:cityid/theater/:theaterid**: Fetches a list of dates in the next 7 days for which the theater has showings.
    
-   **GET /api/city/:cityid/theater/:theaterid/date/:yyyy-:mm-:dd**: Returns a list of showings for the selected theater and date, with details about the movies language, rating, subtitles, start times etc.

## ER Diagram
[!ERDiagram](ERDiagram.png)