## Modus.io

### Description
Backend on NodeJS for platform to create sense of living and being an individual person  
Interface in russian language.  

### Stack  

Core of web server - *NodeJS, Nodemon and Express*     
Libraries to use - *shortid, axios, apollo-server-express, mongoose*  

### Architecture  

Import Schemas from folder to use it in mutations.  
Query and mutation on web server.  
Server starts as usual using express.  

Microservices built and interacted with web server:    

1. middlewares with body-parser  
2. mongodb connection  
3. apollo + graphql  
4. slice extra elements  
5. id generator with shortid  

### Demo URL  

Look on https://658fcf952414b2450923f7e8--modus-vivendi.netlify.app  
