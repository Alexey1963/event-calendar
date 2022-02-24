import React from 'react';
import { render } from 'react-dom';
import { Route, Link, Routes } from 'react-router-dom';
import './UserMenu.css';
import RegistrationPage from './token/token';
import { addUserTokenToStore } from '../../redux/actions';
import { addCategoryIndexToStore } from '../../redux/actions';
import { connect } from 'react-redux';

class UserMenu extends React.Component {
    
    state = {
        toggle: false,
    };

    setJoker = (id) => {
        let res
        id ? res = false : res = true
        this.setState({toggle: res})
    }
    
    getAdvertsCategory = (e) => {
        e.preventDefault()
        const index = e.currentTarget.value;
        console.log(index)
        // if (index !== NaN) {
        //     this.props.addCategoryIndex(index)
        // }
    }

    render() {
        let {toggle} = this.state
        const {categories} = this.props

        return (
            <div className='user-menue-page'>
                <div className='button'>
                    <div className='link' onClick={() => this.setJoker(0)}>Зарегистрироваться</div>
                    {toggle && <RegistrationPage  callBack={this.setJoker} />}
                </div>
                <div className='select-category'>
                    {/* <select className='select-list' onChange={(e) => this.getAdvertsCategory(e)}>
                        <option>Выбрать возрастную группу</option>
                        {categories.map((x, index) => {
                            return (
                                <option key={index} value={index}>{`${x}`}</option>
                            )
                        })}
                    </select> */}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        categories: state.categories
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addUserToken: (token) => dispatch(addUserTokenToStore(token)),
        addCategoryIndex: (index) => dispatch(addCategoryIndexToStore(index))

    }
}

export default connect( mapStateToProps, mapDispatchToProps)(UserMenu);
