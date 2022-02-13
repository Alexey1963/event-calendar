import React from 'react';
import { render } from 'react-dom';
import './Adverts.css';
// const dayjs = require('dayjs');
import URL from '../../../config.json';
import AdvertItem from './AdvertItem/AdvertItem'
import { addUserToAdvertItemInStore } from '../../redux/actions';
import { addAdvertsListToStore } from '../../redux/actions';
import { connect } from 'react-redux';

const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

class Adverts extends React.Component {
    state = {

    }

    subscribeUser = (id) => {
        console.log(id)
        this.props.addUserToAdvertItem(id);
    }

    componentDidMount() {

        fetch('http://localhost:3002/')
        .then(res => res.json())
        .then(data => {
            console.log(data)
            this.props.addAdvertsList(data)
        })
        .catch(err => console.error(err))
    }

    componentDidUpdate() {

    }

    render() {
        const {advertsArr, types, categories} = this.props;
        console.log(advertsArr)
        return (
            <div className='adverts-list'>
                <ul className='ul'>
                    {advertsArr.map((item) => (
                    <li className='item' key={item.id}>
                        <AdvertItem {...item}
                                    type={types[item.type]}
                                    category={categories[item.category]}
                                    callBack={this.subscribeUser} />
                    </li>
                    ))}
                </ul>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        advertsArr: state.adverts,
        types: state.types,
        categories: state.categories
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addAdvertsList: (list) => dispatch(addAdvertsListToStore(list)),
        addUserToAdvertItem: (id) => dispatch(addUserToAdvertItemInStore(id))
    }
}

export default connect( mapStateToProps, mapDispatchToProps)(Adverts);
