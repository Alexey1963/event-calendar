import { WRITE_CURRENT_DATE_TO_STORE, ADD_USER_TO_ADVERTITEM_IN_STORE, ADD_USER_TOKEN_TO_STORE,
        ADD_CATEGORY_INDEX_TO_STORE, ADD_ADVERTS_LIST_TO_STORE } from "./actions";

const initialState = {
    user: {
        id: 0,
        login: 'Пупкин',
        password: '',
        hash: '',
    },
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
    users: [
        {
            id: 0,
            login: 'Пупкин',
            age: 16,
            phone: '7(985)3091582',
            email: 'ash@tenflex.com',
            adverts: [
                {
                    id: ''
                }
            ]
        }
    ],
    adverts: [
        // {
        //     id: 1,
        //     type: 0,
        //     category: 0,
        //     date: '2022-02-23',
        //     descr: 'bla-bla-bla',
        //     participants: [
        //         {
        //             id: ''
        //         }
        //     ]
        // }
    ],
        types: ['ФанЛаб1', 'ФанЛаб2', 'ФанЛаб3', 'ФанЛаб4'],
    categories: ['Дошкольники 3+', 'Школьники 6-16', 'Взрослые 16+']
}

function reducer(state=initialState, action) {

    const { user, users, adverts, advertsRequest } = state;
    
    switch(action.type) {

        case WRITE_CURRENT_DATE_TO_STORE:
            const { date } = action.payload;
            state = {...state, currentDate: date}
            console.log(state)
            return state;
        
        case ADD_USER_TO_ADVERTITEM_IN_STORE:
            const { index } = action.payload;
            const newUsers = [...users];
            const newAdverts = [...adverts];
            const userIndex = newUsers.findIndex((x) => x.login === user.login);
            const advertsIndex = newAdverts.findIndex((x) => x.id === index);
            if (userIndex !== -1 && advertsIndex !== -1) {
                newUsers[userIndex].adverts.push({id:index});
                newAdverts[advertsIndex].participants.push({id: newUsers[userIndex].id});
                state = {...state, users: newUsers, adverts: newAdverts}
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
                console.log(state)
                return state;    
        
        default:
              
    }

    return state;
}

export default reducer;