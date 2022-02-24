import React from 'react';
import { render } from 'react-dom';
import { Route, Link, Routes } from 'react-router-dom';
import './Header.css';
import { connect } from 'react-redux';
// import Image from '../../Images/img.svg'

class Header extends React.Component {


    render() {
        const {date, months, days} = this.props;
        let currentDay;
        let currentMonth;
        if(date) {
            days.forEach((d,i) => {
                if(i === date.day) {
                    currentDay = d
                }
            })
            months.forEach((m, i) => {
                if (i === date.month) {
                    currentMonth = m;
                    // console.log(currentMonth)
                }
            })
        }

        return (
            <div className='header-page'>
                <Link className='link' to='/admin'>Вход</Link>
                <div className='image'>
                    <div className='text'>Календарь событий</div>
                {/* <img src={Image} /> */}
                </div>
                <div className='current-date'>{`${currentDay} ${date.date} ${currentMonth} ${date.year}`}</div>
            </div>
        )
    }
}

// export default UserMenue;
const mapStateToProps = (state) => {
    return {
        date: state.currentDate,
        days: state.days,
        months: state.months
    }
}

export default connect( mapStateToProps, null)(Header);
