/* import {createStore, applyMiddleware, compose} from "redux"
import thunk from "redux-thunk"
import reducer from "./reducers/index"

const middleware = [thunk]
const prevState = loadState()

const store = createStore(
  reducer,
  prevState,
  compose(applyMiddleware(...middleware),
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // comment on prod
  ),
)

store.subscribe(() => {
  let {authentication, applications} = store.getState()

  if (!authentication.loading && !authentication.error) {
    localStorage.setItem("applications", JSON.stringify(applications))
  }
})

function loadState() {
  let authentication = {}
  try {
    authentication = JSON.parse(localStorage.getItem("authentication")) || {}
  } catch (e) {
    // console.log(e) //uncomment on dev
  }
  return {
    authentication
  }
}
export default store */
