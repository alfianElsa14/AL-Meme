import React from 'react'
import classes from './style.module.scss'
import { useNavigate } from 'react-router-dom'

function Card({ memes, role }) {
    const navigate = useNavigate()
    const filteredMemes = role !== 'premium' ? memes.filter(el => el.status === 'basic') : memes;
    const isPremium = role === 'premium';

    return (
        <div className={classes.container}>
            <div className={classes.card}>
                {
                    filteredMemes.map((el) => (
                        <div key={el.id} className={classes.cardList} onClick={() => navigate(`/detail/${el.id}`)}>
                            <img src={el.imageUrl} alt="" />
                            <div className={classes.data}>
                                <p className={classes.title}>{el.title}</p>
                                <p className={classes.status}>{el.status}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Card