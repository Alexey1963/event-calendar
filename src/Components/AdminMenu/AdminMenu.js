import React from 'react';
import { render } from 'react-dom';
import { Route, Link, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './AdminMenu.css';
import LoginPage from './Login/Login';
import NewAdvert from './NewAdvert/NewAdvert';
import { addUserTokenToStore } from '../../redux/actions';
import { addCategoryIndexToStore } from '../../redux/actions';
import { connect } from 'react-redux';

class AdminMenu extends React.Component {
    
    optionList = ['Дошкольники 3+', 'Школьники 6-15', 'Взрослые 16+'];
    
    state = {
        joker: false,
        toggle: false
    };

    setJoker = (id, item) => {
        // let {joker} = this.state
        const {history} = this.props

        let res
        id ? res = false : res = true
        this.setState({[item]: res})
        if (item === 'joker' && id === 1) {
            this.props.addUserToken('')
            history('/')
        }
    }
    
    render() {
        let {joker, toggle} = this.state

        return (
            <div className='admin-menue-page'>
                <div>
                    <div className='button' onClick={() => this.setJoker(1,'joker')}>Выход</div>
                    {!joker && <LoginPage  callBack={this.setJoker} />}
                </div>
                <div className='button' onClick={() => this.setJoker(0,'toggle')}>Новое объявление</div>
                    {toggle && <NewAdvert callBack={this.setJoker} />}
                <div className='button' onClick={() => this.createNewAdvert()}>Смотреть</div>
            </div>
        )
    }
}

// export default UserMenue;

function mapDispatchToProps(dispatch) {
    return {
        addUserToken: (token) => dispatch(addUserTokenToStore(token)),
        addCategoryIndex: (index) => dispatch(addCategoryIndexToStore(index)),
    }
}

function AdminMenuPage(props) {
    const history = useNavigate()
    return <AdminMenu {...props} history={history} />
}

export default connect( null, mapDispatchToProps)(AdminMenuPage);
