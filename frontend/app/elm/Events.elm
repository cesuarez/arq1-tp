module Events (..) where

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)

import StartApp.Simple

main = Signal.map view getEvents

-- MODEL

type alias Event = { name: String, date: String }

type alias Model = List Event

port getEvents : Signal Model

-- VIEW

view : Model -> Html
view model =
  div [class "row"] <| List.map viewEvent model
  
viewEvent : Event -> Html
viewEvent { name, date } = 
  div [class "col-sm-6 col-md-4"] [ 
    div [class "thumbnail"] [
       img [src "http://www.elchacalparrilla.com/images/carta/CHORIPAN.jpg", style [("width", "300px"), ("height", "200px")] ] [],
       div [class "caption"] [
         h3 [] [text name],
         p  [] [text date]
       ]
    ]
  ]
