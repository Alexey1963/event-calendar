import { WRITE_CURRENT_DATE_TO_STORE, ADD_USER_TO_ADVERTITEM_IN_STORE, ADD_USER_TOKEN_TO_STORE,
        ADD_CATEGORY_INDEX_TO_STORE, ADD_ADVERTS_LIST_TO_STORE, WRITE_SEARCH_DATE_TO_STORE,
        SET_ADMIN_STATUS_IN_STORE } from "./actions";

const initialState = {
    user: {
        id: 0,
        login: 'Пупкин',
        password: '',
        hash: '',
    },
    admin: false,
    myId: 0,
    token: '',
    currentDate: {
        day: '',
        date: '',
        month: '',
        year: ''
    },
    advertsFilter: {
        date: '',
        month: '',
        year: '',
        category: []
    },
    adverts: [],
    months: ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'],
    days: ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
    types: ['ФанЛаб1', 'ФанЛаб2', 'ФанЛаб3', 'ФанЛаб4'],
    categories: ['для малышей 3+', 'для детей 7+', 'для детей 12+', 'для взрослых'],
    userAdvertsStack: []
}

function reducer(state=initialState, action) {

    const { user, admin, adverts, advertsFilter } = state;
    
    switch(action.type) {

        case WRITE_CURRENT_DATE_TO_STORE:
            const { date } = action.payload;
            state = {...state, currentDate: date}
            // console.log(state)
            return state;
        
        case ADD_USER_TO_ADVERTITEM_IN_STORE:
            const { obj } = action.payload;
            let newAdverts = [...adverts];
            const advertId = obj.advertId;
            const myId = obj.userId;
            const index = newAdverts.findIndex((x) => x.id === advertId);
            if (index !== -1) {
                let advert = newAdverts[index];
                let participants = advert.participants;
                participants = participants.filter(p => p !== myId);
                participants.push(myId);
                state = {...state, myId: myId, adverts: newAdverts}
                console.log(state)
                return state;
            }

            case ADD_USER_TOKEN_TO_STORE:
                const { token } = action.payload;
                state = {...state, token: token}
                console.log(state)
                return state;
            
            case ADD_CATEGORY_INDEX_TO_STORE:
                const { arr } = action.payload;
                // const arr = advertsFilter.category.push(+ind)
                const req = {...advertsFilter, category: arr}
                // req.category = +ind;
                state = {...state, advertsFilter: req}
                console.log(state)
                return state; 

            case ADD_ADVERTS_LIST_TO_STORE:
                const { list } = action.payload;
                state = {...state, adverts: list}
                // console.log(state)
                return state;
            
            case WRITE_SEARCH_DATE_TO_STORE:
                const {searchDate} = action.payload;
                const newFilter = {...advertsFilter,
                    date: searchDate.date,
                    month: searchDate.month,
                    year: searchDate.year
                }
                state = {...state, advertsFilter: newFilter}
                console.log(state)
                return state;
                
            case SET_ADMIN_STATUS_IN_STORE:
                const {value} = action.payload;
                state = {...state, admin: value}
                console.log(state)
                return state;
        
        default:
              
    }

    return state;
}

export default reducer;