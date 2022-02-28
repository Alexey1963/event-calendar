import React from 'react';
import './NewImage.css';
import obj from '../../../../config.json';
import { connect } from 'react-redux';

class NewImage extends React.Component {

    state = {
        images: [
            {
                url: null
            }
        ]
    }

    // loadImage = (index, fileName) => {
    // }
    
    submit = (e) => {
        e.preventDefault()
        
        const {images} = this.state
        const newImg = [...images]
        
        const fd = new FormData(e.target);
        const file = fd.get('upload-file')
        console.log (file)
        // newImg[index] = { url: `${obj.HOST}/images/${file.name}` }
        // this.setState({images: newImg}, () => console.log(this.state.images))

        fetch(`${obj.HOST}/gallery/2`, {
            method: 'POST',
            body: fd
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            this.props.callBack(1,'toggle')
        })
        .catch(err => console.error(err))
    }

    render() {
        const {types, categories} = this.props;
        const {date, type, category, description} = this.state
        return (
            <div className='new-image'>
            {/* {images.map((img, i) => ( */}
                <form className='form' encType="multipart/form-data" onSubmit={(e) => this.submit(e)}>
                    <div className='main'>
                            <label className='label'>
                            <p>Файл:</p>
                            <input name='upload-file'
                                className='file'
                                type='file'
                                required={true}
                                accept="image/png, image/jpeg"
                            />
                            </label>
                    </div>
                    <div className='footer'>
                        <button>Load</button>
                    </div>
                </form>
                {/* )
            )} */}
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

export default connect(mapStateToProps, null)(NewImage);

