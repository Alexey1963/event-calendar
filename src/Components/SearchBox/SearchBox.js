import React from 'react';
import { render } from 'react-dom';
import './SearchBox.css';
const dayjs = require('dayjs');
import URL from '../../../config.json';
import { writeCurrentDateToStore } from '../../redux/actions';
import { connect } from 'react-redux';


const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

class SearchBox extends React.Component {
    state = {
        searchDate: {
            date: '',
            month: '',
            year: ''
        },
    count: 0
    }

    getAdvertsList = (month, year) => {

    }

    showAll = () => {
        const {date} = this.props;
        const {searchDate, count} = this.state;
        const newDate = {...searchDate};
        newDate.date = date.date
        newDate.month -= 1;
        newDate.year ++;
        this.setState({searchDate: newDate, count: 0}, () => console.log(this.state))
    }

    inc = () => {
        const {searchDate, count} = this.state;
        let counter = count;
        const newDate = {...searchDate};
        newDate.date = 1;
        if (count === 11) {
            return
        }
        if (newDate.month < 11) {
            newDate.month++
        } else if (newDate.month === 11) {
            newDate.month = 0;
            newDate.year++
        }
        this.setState({searchDate: newDate, count: ++counter}, () => console.log(this.state))
    }

    dec = () => {
        const {date} = this.props;
        const {searchDate, count} = this.state;
        let counter = count;
        let newDate = {...searchDate};
        if(count === 0) {
            return
        } else if (count === 1) {
            newDate = date
            return this.setState({searchDate: newDate, count: 0}, () => console.log(this.state))
        } else if (newDate.month > 0) {
            newDate.month--
        } else if (newDate.month === 0) {
            newDate.month = 11;
            newDate.year--
        }
        this.setState({searchDate: newDate, count: --counter}, () => console.log(this.state))
    }

    componentDidMount() {
        const {date, month, year} = this.state;
        const currentDate = {
            date: +dayjs().get('date'),
            month: +dayjs().get('month'),
            year: +dayjs().get('year')
        } 
        this.setState({searchDate: currentDate}, () => console.log(this.state));
        this.props.writeCurrentDate(currentDate);
    }

    componentDidUpdate() {

    }

    render() {
        const {searchDate} = this.state;
        let currentMonth;
        console.log(searchDate)
        if(searchDate) {
            months.forEach((x, i) => {
                if (i === searchDate.month) {
                    currentMonth = x;
                    console.log(currentMonth)
                }
            })
        }

        return (
            <div className='search-box'>
                {/* <div className='show-all' onClick={() => this.showAll()}>Показать все</div> */}
                <div className='search'>
                    <div className='forward' onClick={() => this.inc()}></div>
                    <div className='actual-period'>{`${searchDate? currentMonth : ''} ${searchDate.year}`}</div>
                    <div className='back' onClick={() => this.dec()}></div>
                </div>
            </div>
        )
    }
}

// export default SearchBox;
const mapStateToProps = (state) => {
    return {
        date: state.currentDate
    }
}

function mapDispatchToProps(dispatch) {
    return {
        writeCurrentDate: (obj) => dispatch(writeCurrentDateToStore(obj))
    }
}

export default connect( mapStateToProps, mapDispatchToProps)(SearchBox);
