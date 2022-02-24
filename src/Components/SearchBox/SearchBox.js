import React from 'react';
import { render } from 'react-dom';
import './SearchBox.css';
const dayjs = require('dayjs');
import URL from '../../../config.json';
import Subscribes from './Subscribes/Subscribes';
import { writeCurrentDateToStore } from '../../redux/actions';
import { writeSearchDateToStore } from '../../redux/actions';
import { addCategoryIndexToStore } from '../../redux/actions';
import { connect } from 'react-redux';


const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

class SearchBox extends React.Component {
    state = {
        searchDate: {
            day: '',
            date: '',
            month: '',
            year: ''
        },
    count: 0,
    joker: false,
    styleArr: [
        [ {
            border: '1px solid #E41D84',
        }, {
            border: '1px solid #00ADEA',
        }, {
            border: '1px solid #FCD100',
        }, {
            border: '1px solid #652483',
        } ],
        []
    ],
    toggle: false,
    id: []
    }

    itemToggle = (index, x) => {
        const {styleArr, id} = this.state
        let newArr = [...styleArr]
        let newId = [...id]
        const obj = [
            {
                backgroundColor: '#E41D84',
                color: '#FFFFFF'
            }, {
                backgroundColor: '#00ADEA',
                color: '#FFFFFF'
            }, {
                backgroundColor: '#FCD100',
                color: '#FFFFFF'
            }, {
                backgroundColor: '#652483',
                color: '#FFFFFF'
            } 
        ];
        // console.log(index, x)
        if(x === 1) {
            newArr[1][index] = obj[index]
            newId.includes(index) ? newId : newId.push(index)
            this.setState({styleArr: newArr, id: newId}, () => console.log(this.state.styleArr, this.state.id))
            this.props.addCategoryIndex(newId)
        } else {
            const pos = newId.findIndex(n => n === index)
            newArr[1][index] = {}
            newId.splice(pos, 1)
            this.setState({styleArr: newArr, id: newId}, () => console.log(this.state.styleArr, this.state.id))
            this.props.addCategoryIndex(newId)
        }
    }

    showAll = () => {
        const {date} = this.props;
        const {searchDate, count} = this.state;
        const newDate = {...searchDate};
        newDate.date = -1;
        newDate.month = date.month;
        newDate.year = date.year;
        this.setState({searchDate: newDate, count: 0})
        this.props.writeSearchDate(newDate);
    }

    setJoker = (id) => {
        let res
        id ? res = false : res = true;
        this.setState({joker: res})
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
        this.props.writeSearchDate(newDate);
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
            this.props.writeSearchDate(newDate);
            return this.setState({searchDate: newDate, count: 0}, () => console.log(this.state))
        } else if (newDate.month > 0) {
            newDate.month--
        } else if (newDate.month === 0) {
            newDate.month = 11;
            newDate.year--
        }
        this.props.writeSearchDate(newDate);
        this.setState({searchDate: newDate, count: --counter}, () => console.log(this.state))
    }

    componentDidMount() {
        // Get Current Data & Save to Store
        const {date, month, year} = this.state;
        const currentDate = {
            day: +dayjs().get('day'),
            date: +dayjs().get('date'),
            month: +dayjs().get('month'),
            year: +dayjs().get('year')
        } 
        this.setState({searchDate: currentDate}, () => console.log(this.state));
        this.props.writeCurrentDate(currentDate);
        this.props.writeSearchDate(currentDate);
    }

    componentDidUpdate() {

    }

    render() {
        const {categories} = this.props;
        const {searchDate, joker, styleArr, id} = this.state;
        console.log(styleArr)
        let currentMonth;
        console.log(searchDate)
        if(searchDate) {
            months.forEach((x, i) => {
                if (i === searchDate.month) {
                    currentMonth = x;
                    // console.log(currentMonth)
                }
            })
        }

        return (
            <div className='main'>
                <div className='new-search'>
                    <div className='navigate'>
                        <div className='up'onClick={() => this.dec()}></div>
                        <div className='current-month'>{`${searchDate? currentMonth : ''} ${searchDate.year}`}</div>
                        <div className='down' onClick={() => this.inc()}></div>
                    </div>
                    <div className='selector'>
                        {categories.map((c, index) => (
                            <div className='item' style={id.includes(index) ? styleArr[1][index] : styleArr[0][index]} key={index}>
                                <div className='text'onClick={() => this.itemToggle(index, 1)}>{c}</div>
                                <div className='button' onClick={() => this.itemToggle(index, 0)}>x</div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* <div className='search-box'>
                    <div className='show-all' onClick={() => this.showAll()}>Показать все</div>
                    <div className='search'>
                        <div className='forward' onClick={() => this.inc()}></div>
                        <div className='actual-period'>{`${searchDate? currentMonth : ''} ${searchDate.year}`}</div>
                        <div className='back' onClick={() => this.dec()}></div>
                    </div>
                    <div className='subscribes' onClick={() => this.setJoker(0)}>Показать записи</div>
                    {joker && <Subscribes callBack={this.setJoker} />}
                </div> */}
            </div>
        )
    }
}

// export default SearchBox;
const mapStateToProps = (state) => {
    return {
        date: state.currentDate,
        categories: state.categories
    }
}

function mapDispatchToProps(dispatch) {
    return {
        writeCurrentDate: (obj) => dispatch(writeCurrentDateToStore(obj)),
        writeSearchDate: (obj) => dispatch(writeSearchDateToStore(obj)),
        addCategoryIndex: (arr) => dispatch(addCategoryIndexToStore(arr))
    }
}

export default connect( mapStateToProps, mapDispatchToProps)(SearchBox);
