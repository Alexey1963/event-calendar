import { WRITE_CURRENT_DATE_TO_STORE, ADD_USER_TO_ADVERTITEM_IN_STORE, ADD_USER_TOKEN_TO_STORE,
        ADD_CATEGORY_INDEX_TO_STORE, ADD_ADVERTS_LIST_TO_STORE } from "./actions";

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
        date: '',
        month: '',
        year: ''
    },
    advertsRequest: {
        date: '',
        month: '',
        year: '',
        category: ''
    },
    adverts: [],
        types: ['ФанЛаб1', 'ФанЛаб2', 'ФанЛаб3', 'ФанЛаб4'],
    categories: ['Дошкольники 3+', 'Школьники 6-16', 'Взрослые 16+'],
    userAdvertsStack: []
}

function reducer(state=initialState, action) {

    const { user, myId, adverts, advertsRequest } = state;
    
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
                const { ind } = action.payload;
                const req = {...advertsRequest}
                req.category = ind;
                state = {...state, advertsRequest: req}
                console.log(state)
                return state; 

            case ADD_ADVERTS_LIST_TO_STORE:
                const { list } = action.payload;
                state = {...state, adverts: list}
                // console.log(state)
                return state;    
        
        default:
              
    }

    return state;
}

export default reducer;