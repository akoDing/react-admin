import { persistReducer, persistStore } from 'redux-persist'
import { applyMiddleware, combineReducers, compose, createStore, type Store } from 'redux'
import storage from 'redux-persist/lib/storage'
import { thunk } from 'redux-thunk'
import global from './modules/global/reducer'
import auth from './modules/auth/reducer'

// redux持久化配置
const persistConfig = {
  key: 'redux-state',
  storage: storage,
}

// 创建reducer
const reducer = combineReducers({
  global,
  auth 
})

// 创建一个新的redux状态的reucer
const persistedReducerConfig = persistReducer(persistConfig, reducer)

// 开启redux-devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// 使用redux中间件
const middleware = applyMiddleware(thunk)

// 创建store
const store: Store = createStore(
  persistedReducerConfig, 
  composeEnhancers(middleware)
)

// 创建一个持久化的store
const persistor = persistStore(store)

export { store, persistor }
