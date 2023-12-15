import React, { useEffect, useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { createStructuredSelector } from 'reselect'
import PropTypes from 'prop-types';

import { editMyMeme, generateEditMeme, getMyMemeById } from './actions'
import { selectBoxEdit, selectEditMeme, selectImageEdit } from './selector'

import classes from './style.module.scss'

function EditMeme({ editMeme, boxEdit, imageEdit }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()
    const otherId = editMeme?.Meme?.id
    const [title, setTitle] = useState(editMeme.title || '');
    const [textInputs, setTextInputs] = useState(Array(boxEdit).fill(''));

    useEffect(() => {
        dispatch(getMyMemeById(id))
    }, [id])

    const inputArray = new Array(boxEdit).fill(null);

    const handleGenerate = () => {
        const data = {
            text0: textInputs[0],
            text1: textInputs[1],
            text2: textInputs[2],
            text3: textInputs[3],
            text4: textInputs[4],
            text5: textInputs[5],
        };

        dispatch(generateEditMeme(otherId, data));
    };

    const handleEditMeme = () => {
        const data = {
            title,
            imageUrl: imageEdit
        }

        dispatch(editMyMeme(id, data, navigate))
    }


    const handleTextInputChange = (index, value) => {
        const newTextInputs = [...textInputs];
        newTextInputs[index] = value;
        setTextInputs(newTextInputs);
    };


    return (
        <div className={classes.container}>
            <h1>Edit Meme</h1>
            <div className={classes.content}>
                <div className={classes.header}>
                    <img src={imageEdit} alt="" />
                </div>
                <div className={classes.formContainer}>
                    <h3>Edit Meme</h3>
                    <form className={classes.form} action="">
                        <label htmlFor="">title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <div className={classes.formText}>
                            {inputArray.map((_, index) => (
                                <div key={index} className={classes.formText}>
                                    <label htmlFor={`text${index + 1}`}>{`text ${index + 1}`}</label>
                                    <input
                                        type="text"
                                        id={`text${index + 1}`}
                                        value={textInputs[index]}
                                        onChange={(e) => handleTextInputChange(index, e.target.value)} />
                                </div>
                            ))}
                        </div>
                    </form>
                    <div className={classes.button}>
                        <button 
                        className={classes.generate}
                        onClick={handleGenerate}
                        >Generate</button>
                        <button
                            className={classes.add}
                            onClick={handleEditMeme}
                        >
                            change
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

EditMeme.propTypes = {
    editMeme: PropTypes.object,
    boxEdit: PropTypes.number,
    imageEdit: PropTypes.string
};

const mapStateToProps = createStructuredSelector({
    editMeme: selectEditMeme,
    boxEdit: selectBoxEdit,
    imageEdit: selectImageEdit
});

export default connect(mapStateToProps)(EditMeme);