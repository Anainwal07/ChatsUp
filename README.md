Backend :----------

SetUp : npm init 
Packages installed : npm i cookie-parser , jsonwebtoken , express , dotenv , mongoose , socket io , bcrypt 
run command : npm run server 


The backend architecture consists of various folders and one Server.js file which is the main file

The folder are divided into 7 parts :-
1. Routes :- Routes are the endpoints in the URL
2. Controllers :- functions to perform specific task . They are called by the routes .
3. Middleware :- To ensure safety , integrity , authorisation and authentication
4. Models :- This consists of the Schemas . I have created 3 tables using this .
5. DB :- Ensure mongoDB connectivity .
6. Utils :- To generate tokens
7. Socket :- To ensure real time communication bw two users .


1. Server.js : 

  const app = express() ; 

  dotenv.config();  
  const PORT = process.env.PORT || 5000 ; 
  
  app.use(express.json()) ;  //to parse the incoming requests with JSON payloads 
  app.use(cookieParser()) ;  //to parse the incoming cookies from requests to JSON values 
  
  
  
  app.use("/api/auth" , authRoutes);  //authRoutes:- signup , login , logout
  app.use("/api/messages" , messageRoutes) ; //messageRoutes :- sendMessage , getMessage
  app.use("/api/users" , userRoutes) ;  //to get users from the  DB to reflect on sidebar 
  
  
  
  
  //listening to PORT : confirmation
  app.listen(PORT, () => {
      connectToMongoDB() ; 
      console.log(`Server is running on port ${PORT}`) ; 
  })

  
  It is the main file of the full backend folder as it is the first file to run whenever we start our backend server .
  All the functions are requested to execute from the server.js file itself . 
  It also ensures that server is running fine on out destined PORT 




2. Routes :
  It consists of 3 files :- 

  1. AuthRoutes for Signup , Login and Logout :- a.router.post("/login" , loginUser)  ; //calls when user will try to login 

                                                 b.router.post("/signup", singupUser) ; //calls when user will try to signup 

                                                 c.router.post("/logout", logoutUser) ; //calls when user will logout
     
  2. messageRoutes for Sending and receiving messages :- a. router.get("/:id", protectRoute, getMessages)  ;//calls when the user will get any messages from other users
     
                                                         b. router.post("/send/:id", protectRoute, sendMessage)  ;//calls when the user will send any message to other user
 
  3. UserRoutes for collecting all the users and displaying their name at the side :- a.  router.get("/", protectRoute, getUsersForSidebar);//calls automatically to get the users from DB , to reflect at the sidebar




3. Controllers :
   It consists of 3 files :- 
   1. AuthControllers for handling the requests from authRoutes :- a. export const LoginRoutes()
                                                                  b. export const SignupRoutes()
                                                                  c. export const LogoutRoutes()
                                                                  
    
   2. MessageControllers for handling the requests from messageRoutes :- a. export const GetMessage() 
                                                                         b. export const SendMessage()
            
   3. UserControllers for handling hte requests from userRoutes :- export const getSideBarUsers () 

4. Middleware :

    const protectRoutes = async() => {
      //validate the user before sending or receiving any message .
    }
    export default protectRoute ; 
    
    It acts as a wall or bridge bw the routes and the controllers to ensure safety and data Integrity . 
    It consists of a single file i.e protectRoute that will get executed before performing any action like sending or recieving message .
    It will check if the user is specified to perfrom such actions by checking the validation of hte tokens received from the cookeies .



5 . Models :
    It consists of 3 files UserSchema , MessageSchema and ConversationSchema .It is just basically the model of how the data will get stored in MongoDB


6. .env

    It consists of some confidential details like MongoDB URL  , JWT_SECRET for JsonWebToken etc 


6 . Socket :
     It consists of one file i.e socket.js and is the backbone of the any real time chat Application . 
     In this I have also integrated the status functionality that will reflect the status of a user and will allow message to be recievec
     by that user only if his status is 'Available' and not if the status is 'BUZY' .


     
