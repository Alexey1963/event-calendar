import React from 'react';
import './UsersList.css';
import { addUserTokenToStore } from '../../../redux/actions'
import { connect } from 'react-redux';


class UsersList extends React.Component {
    state = {
        usersList: []
    }

    closeUsersList = () => {
        this.props.callBack(1,'toggle1');
    }

    getUsersList = (id) => {
        const {usersList} = this.state;
        const {token} = this.props;
        let list = this.state.usersList;
        const request = {
            token: token,
            advertID: id
        }
        // console.log(list)
        if(token) {
            fetch('http://localhost:3002/advertuserslist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(request)
            })
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                // console.log(list)
                list.push(data)
                this.setState({usersList: list}, () => {
                    console.log(this.state.usersList)
                    let item = []
                    const user = usersList.find(u => u.id === id).users.map((x,i) => x.name)
                    console.log(user, item)
                })
            })
            .catch(err => console.error(err))
        } 
    }
    
    componentDidMount() {
        const {adverts} = this.props
        adverts.forEach(a => {
            this.getUsersList(a.id)
        })
    }

    render() {
        const {usersList} = this.state
console.log('\n\n\n',usersList,'\n\n\n')

        const {adverts} = this.props
        return (
            <div className='users-list'>
                <div className='main'>
                    {adverts.map((a) => (
                        <ul>
                            <li>
                                <div className='header'>{`${a.date} ${a.category} ${a.type}`}</div>
                            {/* <div className='button' onClick={() => this.removeSubscribeItem(x.id)}>Скрыть</div> */}
                            </li>
                            {(usersList.find(u => {
                                console.log(u.id, a.id)
                                return u.id == a.id
                            }) || {users: []}).users.map((x, i) => (
                                <li className='item' key={i}>
                                    <div className='data'>{x.name}</div>
                                    <div className='data'>{x.age}</div>
                                    <div className='data'>{x.phone}</div>
                                    <div className='data'>{x.email}</div>
                                </li>
                            ))}
                        </ul>
                    ))}
                </div>
                <div className='footer'>
                    <button className='close' onClick={() => this.closeUsersList()}>Закрыть</button>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        token: state.token,
        types: state.types,
        categories: state.categories,
        adverts: state.adverts
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addUserToken: (obj) => dispatch(addUserTokenToStore(obj))
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(UsersList);

