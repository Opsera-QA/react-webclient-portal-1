import {createStore, applyMiddleware, compose} from "redux"
import thunk from "redux-thunk"
import reducer from "./reducers/index"

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const middleware = [thunk]
const prevState = {}

const store = createStore(
  reducer,
  prevState,
  compose(applyMiddleware(...middleware),
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  ),
)

export default store
