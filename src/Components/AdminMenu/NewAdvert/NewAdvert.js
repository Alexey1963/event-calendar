import React from 'react';
import './NewAdvert.css';
import obj from '../../../../config.json';
import { addAdvertsListToStore } from '../../../redux/actions';
import { connect } from 'react-redux';

class NewAdvert extends React.Component {

    state = {
        date: '',
        category: '',
        type: '',
        description: '',
    }

    getAdvertsCategory = (e) => {
        e.preventDefault()
        const index = e.currentTarget.value;
        console.log(index)
        // if (index !== NaN) {
        //     this.props.addCategoryIndex(index)
        // }
    }
  
    changeInput = (e, item) => {
        let itemValue = e.currentTarget.value
        this.setState({[item]: itemValue})
    }

    submit = (e) => {
        e.preventDefault()
        const {token} = this.props;
        const fd = new FormData(e.target);
        
        const pattern = {
            date: fd.get("date"),
            type: fd.get("type"),
            category: fd.get("category"),
            description: fd.get("description"),
            // file: fd.get("file")
        }
        console.log (fd)
        const sentData = {
            token: token,
            pattern: pattern
        }
        
        fetch(`${obj.HOST}/addnewadvert`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(sentData)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            this.props.addAdvertsList(data)
            this.props.callBack(1,'toggle')
        })
        .catch(err => console.error(err))
    }

    render() {
        const {types, categories} = this.props;
        const {date, type, category, description} = this.state
        return (
            <div className='new-advert'>
                <form className='form' onSubmit={(e) => this.submit(e)}>
                    <div className='main'>
                        <label className='label'>
                            <p>Дата:</p>
                            <input name='date'
                                className='input'
                                type='date'
                                value={date} 
                                onChange={e => this.changeInput(e,'date')} 
                            />
                        </label>
                        <div className='select-type'>
                            <select className='select-list' name='type' onChange={(e) => this.getAdvertsCategory(e)}>
                                <option>Что:</option>
                                {types.map((x, index) => (
                                    <option key={index} value={index}>{`${x}`}</option>
                                ))}
                            </select>
                        </div>
                        <div className='select-category'>
                            <select className='select-list' name='category' onChange={(e) => this.getAdvertsCategory(e)}>
                                <option>Для кого:</option>
                                {categories.map((x, index) => (
                                    <option key={index} value={index}>{`${x}`}</option>
                                ))}
                            </select>
                        </div>
                        <label className='label'>
                            <p>Описание</p>
                            <textarea className='textarea' name='description'
                            value={description}
                            onChange={e => this.changeInput(e,'description')}>
                            </textarea>
                        </label>
                    </div>
                    <div className='footer'>
                        <button>СОХРАНИТЬ</button>
                    </div>
                </form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        token: state.token,
        types: state.types,
        categories: state.categories
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addAdvertsList: (list) => dispatch(addAdvertsListToStore(list)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewAdvert);

