import React from 'react';
import { render } from 'react-dom';
import { Route, Link, Routes } from 'react-router-dom';
import './UserMenue.css';
import Registration from './token/token';
import { addUserTokenToStore } from '../../redux/actions';
import { addCategoryIndexToStore } from '../../redux/actions';
import { connect } from 'react-redux';

class UserMenue extends React.Component {
    
    optionList = ['Дошкольники 3+', 'Школьники 6-15', 'Взрослые 16+'];
    
    state = {joker: false};

    setJoker = (id) => {
        // let {joker} = this.state
        let res
        id ? res = false : res = true
        this.setState({joker: res})
    }
    
    getAdvertsCategory = (e) => {
        e.preventDefault()
        const index = e.currentTarget.value;
        console.log(index)
        if (index !== NaN) {
            this.props.addCategoryIndex(index)
        }
    }

    render() {
        let {joker} = this.state

        return (
            <div className='user-menue-page'>
                <div className='button'>
                    <div className='link' onClick={() => this.setJoker(0)}>Зарегистрироваться</div>
                    {joker && <Registration  callBack={this.setJoker} />}
                </div>
                <div className='select-category'>
                    <select className='select-list' onChange={(e) => this.getAdvertsCategory(e)}>
                        <option>Выбрать возрастную группу</option>
                        {this.optionList.map((x, index) => {
                            return (
                                <option key={index} value={index}>{`${x}`}</option>
                            )
                        })}
                    </select>
                </div>
                {/* <Routes className="routes">
                    <Route path="/token" element={<RegistrationPage />} />
                </Routes>                 */}
            </div>
        )
    }
}

// export default UserMenue;
function mapDispatchToProps(dispatch) {
    return {
        addUserToken: (token) => dispatch(addUserTokenToStore(token)),
        addCategoryIndex: (index) => dispatch(addCategoryIndexToStore(index))

    }
}

export default connect( null, mapDispatchToProps)(UserMenue);

