import React from 'react';
import './token.css';
import { useNavigate } from 'react-router-dom';
import { addUserTokenToStore } from '../../../redux/actions'
import { connect } from 'react-redux';
const password = '123';

class Registration extends React.Component {

    state = {
        name: '',
        age: '',
        phone: '',
        email: ''
    }

    formattingNumbers = ( elem ) => {
        let num = elem.replace( /\D/g, '' ).split( /(?=.)/ ), i = num.length - 1;
        if ( 0 <= i ) num.unshift( '+ ' );
        if ( 1 <= i ) num.splice( 2, 0, ' ' );
        if ( 4 <= i ) num.splice( 6, 0, ' ' );
        if ( 7 <= i ) num.splice( 10, 0, '-' );
        if ( 9 <= i ) num.splice( 13, 0, '-' );
        return elem = num.join( '' );
    }

    
    changeInput = (e, item) => {
        let itemValue = e.currentTarget.value
        if (item === 'phone') {
            itemValue = this.formattingNumbers(itemValue)
        }
        // console.log(itemValue)
        this.setState({[item]: itemValue})
    }

    submit = (e) => {
        e.preventDefault()

        const {history} = this.props

        const fd = new FormData(e.target);
        const user = {
            name: fd.get("name"),
            age: fd.get("age"),
            phone: fd.get("phone"),
            email: fd.get("email")
        }
        // console.log(user.phone.length)
        if(user.name && user.phone && user.email) {

            fetch('http://localhost:3002/registration', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(user)
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.props.addUserToken(data.newToken)
                if(data.user.name === 'admin') {
                    history('/admin')
                }
            })
            .catch(err => console.error(err))
        } 
        this.props.callBack(1)
    }

    render() {
        const {name, age, phone, email} = this.state
        const stateArr = [name, age, phone, email];
        const typesArr = ["text", "number", "tel", "email"]
        const textArr = ['??????:', '??????????????:', '????????.??????.:', 'e-mail:']
        const inputArr = ['name', 'age', 'phone', 'email']
        return (
            <div className='reg'>
                <form className='form' onSubmit={(e) => this.submit(e)}>
                    <div className='main'>
                        {inputArr.map((x, index) => (
                            <label className='label' key={index}>
                                <p>{textArr[index]}</p>
                                <input name={x}
                                    className='input'
                                    type={typesArr[index]}
                                    value={stateArr[index]} 
                                    onChange={e => this.changeInput(e, x)} 
                                />
                            </label>
                        ))}
                    </div>
                    <div className='footer'>
                        <button>??????????????????</button>
                    </div>
                </form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        hash: state.user.hash
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addUserToken: (obj) => dispatch(addUserTokenToStore(obj))
    }
}
function RegistrationPage(props) {
    const history = useNavigate()
    return <Registration {...props} history={history} />
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationPage);
