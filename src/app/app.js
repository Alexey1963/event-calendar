import React from 'react';
import { render } from 'react-dom';
import { Route, Link, Routes } from 'react-router-dom';
import './app.css';
import MainPage from '../Pages/MainPage/MainPage';
import AdminPage from '../Pages/AdminPage/AdminPage';

class App extends React.Component {

    render() {

        return (
            <div className='app'>
                <Routes>
                    <Route path='/' element={<MainPage />} />
                    <Route path='/admin' element={<AdminPage />} />
                </Routes>
            </div>
        )
    }
}

export default App
