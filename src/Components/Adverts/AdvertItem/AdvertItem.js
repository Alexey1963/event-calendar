import React from 'react';
import './AdvertItem.css';
import image from '../../../Images/advert2.png'

class AdvertItem extends React.Component {
    state = {

    }

    sendId = (id) => {
        this.props.callBack(id)
    }

    render() {
        const {id, type, category, date, descr} = this.props
        return (
            <div className='advert-item'>
                <div className='question'>Когда?</div>
                <div className='data'>{`${date}`}</div>
                <div className='question'>Что?</div>
                <div className='data'>{`${type}`}</div>
                <div className='image-block'>
                    <img className='image' src={image} />
                </div>
                <div className='question'>Для кого?</div>
                <div className='data'>{`${category}`}</div>
                <div className='footer'> 
                    <div className='button' onClick={() => this.sendId(id)}>Записаться</div>
                </div>
            </div>
        )
    }
}

export default AdvertItem;
