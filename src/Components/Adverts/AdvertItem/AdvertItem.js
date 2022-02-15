import React from 'react';
import './AdvertItem.css';
import image from '../../../Images/advert2.png'

const picture = '../../Images/advert2.png'

const imageBlock = {
    width: "100%",
    marginTop: "10px",
    position: "relative",
    paddingTop: "65%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // background: `url(${picture}) no-repeat center center /contain rgba(128, 128, 128, 1)`
}


class AdvertItem extends React.Component {
    state = {

    }

    sendId = (id) => {
        this.props.callBack(id)
    }

    render() {
        const {id, type, category, date, descr, joker, activeID} = this.props
        return (
            <div className='advert-item'>
                <div className='question'>Когда?</div>
                <div className='data'>{`${date}`}</div>
                <div className='question'>Что?</div>
                <div className='data'>{`${type}`}</div>
                <div className='image-block' style={imageBlock}>
                    {/* <img className='image' src={image} /> */}
                    <div className='image'></div>
                    {joker && (id === activeID) && <div className='claim'>Необходимо зарегистрироваться</div>}
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
