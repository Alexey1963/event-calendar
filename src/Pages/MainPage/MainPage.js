import React from 'react';
import { render } from 'react-dom';
import { Route, Link, Routes } from 'react-router-dom';
import './MainPage.css';
import UserMenue from '../../Components/UserMenue/UserMenue'
import Header from '../../Components/Header/Header'
import SearchBox from '../../Components/SearchBox/SearchBox'
import Adverts from '../../Components/Adverts/Adverts'

class MainPage extends React.Component {

    render() {

        return (
            <div className='main-page'>
                <UserMenue />
                <Header />
                <SearchBox />
                <div className='advertss'>
                    <Adverts />
                </div>
            </div>
        )
    }
}

export default MainPage;
