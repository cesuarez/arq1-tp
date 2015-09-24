module Events (..) where

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)

import StartApp.Simple

main =
  StartApp.Simple.start
    { model = init
    , update = update
    , view = view
    }

-- MODEL

type alias Event = { name: String, date: String, srcImg: String }

type alias Model = List Event

init : Model
init = 
  [ 
    { name = "Choripateada"
    , date = "12/12/2015"
    , srcImg = "http://www.elchacalparrilla.com/images/carta/CHORIPAN.jpg"
    } 
  , { name = "Parcial"
    , date = "10/11/2015" 
    , srcImg = "http://israeladentro.com/wp-content/uploads/2014/05/examen-psicometrico.jpg"
    } 
  , { name = "Cumpleaños"
    , date = "09/10/2015"
    , srcImg = "http://cpabarzuza.educacion.navarra.es/blog/aula56/wp-content/blogs.dir/3/files/2013/12/mi-cumple.jpg"
    } 
  ]

-- UPDATE

type Action = Crear | Abrir

update : Action -> Model -> Model
update action model =
  case action of
    Crear -> model
    Abrir -> model

-- VIEW

view : Signal.Address Action -> Model -> Html
view address model =
  div [class "row"] <| List.map viewEvent model
  
viewEvent : Event -> Html
viewEvent { name, date, srcImg } = 
  div [class "col-sm-6 col-md-4"] [ 
    div [class "thumbnail"] [
       img [src srcImg, style [("width", "300px"), ("height", "200px")] ] [],
       div [class "caption"] [
         h3 [] [text name],
         p  [] [text date]
       ]
    ]
  ]
