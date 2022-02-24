import React from 'react';
import { render } from 'react-dom';
import { Route, Link, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './AdminMenu.css';
import LoginPage from './Login/Login';
import NewAdvert from './NewAdvert/NewAdvert';
import UsersList from './UsersList/UsersList';
import { addUserTokenToStore } from '../../redux/actions';
import { addCategoryIndexToStore } from '../../redux/actions';
import { setAdminStatusInStore } from '../../redux/actions';
import { connect } from 'react-redux';

class AdminMenu extends React.Component {
    
    state = {
        joker: false,
        toggle: false,
        toggle1: false
    };

    exit = () => {
        const {history} = this.props
        this.props.addUserToken('')
        this.props.setAdminStatus(false)
        history('/')
    }

    setJoker = (id, item) => {
        // let {joker} = this.state

        let res
        id ? res = false : res = true
        this.setState({[item]: res})
    }
    
    render() {
        let {joker, toggle, toggle1} = this.state

        return (
            <div className='admin-menue-page'>
                <div>
                    <div className='button' onClick={() => this.exit()}>Выход</div>
                    {!joker && <LoginPage  callBack={this.setJoker} />}
                </div>
                <div className='button' onClick={() => this.setJoker(0,'toggle')}>Новое объявление</div>
                    {toggle && <NewAdvert callBack={this.setJoker} />}
                <div className='button' onClick={() => this.setJoker(0,'toggle1')}>Смотреть подписки</div>
                {toggle1 && <UsersList callBack={this.setJoker} />}
            </div>
        )
    }
}

// export default UserMenue;

function mapDispatchToProps(dispatch) {
    return {
        addUserToken: (token) => dispatch(addUserTokenToStore(token)),
        addCategoryIndex: (index) => dispatch(addCategoryIndexToStore(index)),
        setAdminStatus: (value) => dispatch(setAdminStatusInStore(value)),
    }
}

function AdminMenuPage(props) {
    const history = useNavigate()
    return <AdminMenu {...props} history={history} />
}

export default connect( null, mapDispatchToProps)(AdminMenuPage);
