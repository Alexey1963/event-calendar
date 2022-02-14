const WRITE_CURRENT_DATE_TO_STORE = 'WRITE_CURRENT_DATE_TO_STORE'
const ADD_USER_TO_ADVERTITEM_IN_STORE = 'ADD_USER_TO_ADVERTITEM_IN_STORE'
const ADD_USER_TOKEN_TO_STORE = 'ADD_USER_TOKEN_TO_STORE'
const ADD_CATEGORY_INDEX_TO_STORE = 'ADD_CATEGORY_INDEX_TO_STORE'
const ADD_ADVERTS_LIST_TO_STORE = 'ADD_ADVERTS_LIST_TO_STORE'

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
function addCategoryIndexToStore (index) {
  return {
      type: ADD_CATEGORY_INDEX_TO_STORE,
      payload: {
        ind: index
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

export { writeCurrentDateToStore, addUserToAdvertItemInStore, addUserTokenToStore, addCategoryIndexToStore,
        addAdvertsListToStore,
        WRITE_CURRENT_DATE_TO_STORE, ADD_USER_TO_ADVERTITEM_IN_STORE, ADD_USER_TOKEN_TO_STORE, ADD_CATEGORY_INDEX_TO_STORE,
        ADD_ADVERTS_LIST_TO_STORE }