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
        joker: false,
        activeID: 0
    }

    subscribeUser = (id) => {
        const {token} = this.props
        const {joker} = this.state

        this.setState({activeID: id})

        const subscribeReq = {
            advertId: id,
            token: token
        }
        
        if (!token) {
            this.setState({joker: true})
            setTimeout(() => this.setState({joker: false}), 2000);
        } else {
            fetch('http://localhost:3002/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(subscribeReq)
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.props.addUserToAdvertItem(data);
            })
            .catch(err => console.error(err))
        }
    }

    componentDidMount() {

        fetch('http://localhost:3002/')
        .then(res => res.json())
        .then(data => {
            // console.log(data)
            this.props.addAdvertsList(data)
        })
        .catch(err => console.error(err))
    }

    componentDidUpdate() {
        
    }


    render() {
        const {advertsArr, types, categories} = this.props;
        const {joker, activeID} = this.state
        // console.log(advertsArr)
        return (
            <div className='adverts-list'>
                <ul className='ul'>
                    {advertsArr.map((item) => (
                    <li className='item' key={item.id}>
                        <AdvertItem {...item}
                                    type={types[item.type]}
                                    category={categories[item.category]}
                                    imageIndex={item.category}
                                    joker={joker}
                                    activeID={activeID}
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
        token: state.token,
        advertsArr: state.adverts,
        types: state.types,
        categories: state.categories
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addAdvertsList: (list) => dispatch(addAdvertsListToStore(list)),
        addUserToAdvertItem: (obj) => dispatch(addUserToAdvertItemInStore(obj))
    }
}

export default connect( mapStateToProps, mapDispatchToProps)(Adverts);
