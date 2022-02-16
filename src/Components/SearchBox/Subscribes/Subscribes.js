import React from 'react';
import './Subscribes.css';
import { addUserTokenToStore } from '../../../redux/actions'
import { connect } from 'react-redux';


class Subscribes extends React.Component {
    state = {
        advertsList: []
    }

    removeSubscribeItem = (advertId) => {

        const {token} = this.props;
        const request = {
            token: token
        }
        console.log(advertId)
        if(token) {
            fetch(`http://localhost:3002/subscribe-remove/${advertId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(request)
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.getUserSubscribes()
            })
            .catch(err => console.error(err))
        }
    }

    closeSubscribes = () => {
        this.props.callBack(1);
    }

    getUserSubscribes = () => {

        const {token} = this.props;
        const request = {
            token: token
        }
        if(!token) {
            
        } else {
            fetch('http://localhost:3002/subscribesuserlist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(request)
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.setState({advertsList: data})
            })
            .catch(err => console.error(err))
        }
    }
    
    componentDidMount() {
        this.getUserSubscribes()
    }

    render() {
        const {advertsList} = this.state
        const {types, categories} = this.props
        return (
            <div className='list'>
                <ul>
                    {advertsList.map((x) => (
                        <li className='item' key={x.id}>
                            <div className='data'>{x.date}</div>
                            <div className='data'>{types[x.type]}</div>
                            <div className='data'>{categories[x.category]}</div>
                            <div className='data'>{`участников ${x.participants.length}`}</div>
                            <div className='button' onClick={() => this.removeSubscribeItem(x.id)}>Удалить</div>
                        </li>
                    ))}
                    <li className='footer'>
                        <button className='close' onClick={() => this.closeSubscribes()}>Закрыть</button>
                    </li>
                </ul>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        token: state.token,
        types: state.types,
        categories: state.categories
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addUserToken: (obj) => dispatch(addUserTokenToStore(obj))
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(Subscribes);
