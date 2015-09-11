module CounterList where

import Counter
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)


-- MODEL

type alias Model =
    { counters : List ( ID, Counter.Model )
    , nextID : ID
    }

type alias ID = Int


init : Model
init =
    { counters = []
    , nextID = 0
    }

-- UPDATE

type Action
    = Insert
    | Remove ID
    | Modify ID Counter.Action

insert model = 
  { model |
    counters <- ( model.nextID, Counter.init 0 ) :: model.counters,
    nextID <- model.nextID + 1
  }

remove id model = 
  { model |
    counters <- List.filter (\(counterID, _) -> counterID /= id) model.counters
  }

modify id counterAction model = 
  let updateCounter (counterID, counterModel) =
        if counterID == id
            then (counterID, Counter.update counterAction counterModel)
            else (counterID, counterModel)
  in
      { model | counters <- List.map updateCounter model.counters }

update : Action -> Model -> Model
update action =
  case action of
    Insert -> insert
    Remove id -> remove id
    Modify id counterAction -> modify id counterAction

-- VIEW

insertButton address = button [ onClick address Insert ] [ text "Add" ]

countersList address model = List.map (viewCounter address) model.counters

viewCounter : Signal.Address Action -> (ID, Counter.Model) -> Html
viewCounter address (id, model) =
  let context =
        Counter.Context
          (Signal.forwardTo address (Modify id))
          (Signal.forwardTo address (always (Remove id)))
  in
      Counter.viewWithRemoveButton context model

view : Signal.Address Action -> Model -> Html
view address model =
  div [] (insertButton address :: countersList address model)