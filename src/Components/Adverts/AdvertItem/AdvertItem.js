import React from 'react';
import './AdvertItem.css';
import image1 from '../../../Images/advert1.png'
import image2 from '../../../Images/advert2.png'
import image3 from '../../../Images/advert3.png'
const images = [image2, image3, image1]

class AdvertItem extends React.Component {
    state = {

    }

    sendId = (id) => {
        this.props.callBack(id)
    }

    componentDidMount() {
        fetch('http://localhost:3002/gallery')
        .then(res => {
            console.log(res)
            return
            res.json()
        }) 
        .then(data => {
            console.log(data)
            // this.props.addAdvertsList(data)
        })
        .catch(err => console.error(err))
    }

    render() {
        const {id, type, category, date, descr, imageIndex, joker, activeID} = this.props
        return (
            <div className='advert-item'>
                <div className='question'>Когда?</div>
                <div className='data'>{`${date}`}</div>
                <div className='question'>Что?</div>
                <div className='data'>{`${type}`}</div>
                <div className='image-block' >
                    <div className='div'>
                        {/* <img className='image' src={images[imageIndex]} /> */}
                        <img className='image' src={'http://localhost:3002/gallery/advert1.png'} />
                    </div>
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
