## API Details

BaseURL: http://localhost:8080

## ############################################################################# Api ==>>

## logIn

    URL: /api/user/login  (Post)
    @Access Public


    -Request :It need
                    Email*(String),
                    Password*(String)

    -RequestExample: {
                "Email":"user1@gmail.com",
                "Password":"user1@gmail.com"
    }
    -Response : And you get success,message token, UserData

## SignUp

    URL: /api/user/signup  (Post)
    @Access Public

    -Request :It need
                    Email*(String),
                    Password*(String),
                    Location*:{
                        Lat*(Number),
                        Long*(Number)
                    }
     -RequestExample:{
                    "Email":"user7@gmail.com",
                    "Password":"user7@gmail.com",
                    "Location":{
                         "Lat":33.647167,
                          "Long":73.041556
                    }
    -Response : And you get success,message, UserData
## Finding User with in 5Km Radius

    URL: /api/user/find  (Post)
    @Access Private (JWT Token required)

    -Request :It need{
                        Lat*(Number),
                        Long*(Number)
                    }
    -RequestExample:{
                         "Lat":33.647167,
                          "Long":73.041556
                    }
    -Response : And you get success,message,TotalUsers,DataArray

## get weather details (By Default its set for Islamabad)

    URL: /api/weather/get  (Post)
    @Access Private (JWT Token required)

    -Request :It need{
                        Location*(String)
                    }
    -RequestExample:{
                         "Location":"lahore"
                    }
    -Response : And you get success,message,weather_json


