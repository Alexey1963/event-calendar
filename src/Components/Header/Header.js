import React from 'react';
import { render } from 'react-dom';
import { Route, Link, Routes } from 'react-router-dom';
import './Header.css';
import Image from '../../Images/image1.svg'

class UserMenue extends React.Component {

    optionList = ['Дети', 'Школьники', 'Взрослые'];

    render() {

        return (
            <div className='header-page'>
                <p>Календарь событий</p>
                <div className='image'>
                <img src={Image} />
                </div>

            </div>
        )
    }
}

export default UserMenue;