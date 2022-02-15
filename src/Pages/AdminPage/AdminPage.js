import React from 'react';
import { render } from 'react-dom';
import { Route, Link, Routes } from 'react-router-dom';
import './AdminPage.css';
import AdminMenu from '../../Components/AdminMenu/AdminMenu'
import Header from '../../Components/Header/Header'
import Adverts from '../../Components/Adverts/Adverts'

class AdminPage extends React.Component {

    render() {

        return (
            <div className='admin-page'>
                <AdminMenu />
                <Header />
                <div className='advertss'>
                    <Adverts />
                </div>
            </div>
        )
    }
}

export default AdminPage;
