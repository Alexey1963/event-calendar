const WRITE_CURRENT_DATE_TO_STORE = 'WRITE_CURRENT_DATE_TO_STORE'
const ADD_USER_TO_ADVERTITEM_IN_STORE = 'ADD_USER_TO_ADVERTITEM_IN_STORE'
const ADD_USER_TOKEN_TO_STORE = 'ADD_USER_TOKEN_TO_STORE'
const ADD_CATEGORY_INDEX_TO_STORE = 'ADD_CATEGORY_INDEX_TO_STORE'
const ADD_ADVERTS_LIST_TO_STORE = 'ADD_ADVERTS_LIST_TO_STORE'
const WRITE_SEARCH_DATE_TO_STORE = 'WRITE_SEARCH_DATE_TO_STORE'
const SET_ADMIN_STATUS_IN_STORE = 'SET_ADMIN_STATUS_IN_STORE'

function writeCurrentDateToStore (obj) {
    return {
        type: WRITE_CURRENT_DATE_TO_STORE,
        payload: {
          date: obj
        }  
    }
}
function addUserToAdvertItemInStore (obj) {
  return {
      type: ADD_USER_TO_ADVERTITEM_IN_STORE,
      payload: {
        obj: obj
      }  
  }
}
function addUserTokenToStore (token) {
  return {
      type: ADD_USER_TOKEN_TO_STORE,
      payload: {
        token: token
      }  
  }
}
function addCategoryIndexToStore (arr) {
  return {
      type: ADD_CATEGORY_INDEX_TO_STORE,
      payload: {
        arr: arr
      }  
  }
}
function addAdvertsListToStore (list) {
  return {
      type: ADD_ADVERTS_LIST_TO_STORE,
      payload: {
        list: list
      }  
  }
}
function writeSearchDateToStore (obj) {
  return {
      type: WRITE_SEARCH_DATE_TO_STORE,
      payload: {
        searchDate: obj
      }  
  }
}
function setAdminStatusInStore (value) {
  return {
      type: SET_ADMIN_STATUS_IN_STORE,
      payload: {
        value: value
      }  
  }
}

export { writeCurrentDateToStore, addUserToAdvertItemInStore, addUserTokenToStore, addCategoryIndexToStore,
        addAdvertsListToStore, writeSearchDateToStore, setAdminStatusInStore,
        WRITE_CURRENT_DATE_TO_STORE, ADD_USER_TO_ADVERTITEM_IN_STORE, ADD_USER_TOKEN_TO_STORE, ADD_CATEGORY_INDEX_TO_STORE,
        ADD_ADVERTS_LIST_TO_STORE, WRITE_SEARCH_DATE_TO_STORE, SET_ADMIN_STATUS_IN_STORE }