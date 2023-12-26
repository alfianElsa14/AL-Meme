import React from 'react'
import classes from './style.module.scss'
import { useNavigate } from 'react-router-dom'

function Card({ memes, role }) {
    const navigate = useNavigate()
    const filteredMemes = role !== 'premium' ? memes.filter(el => el.status === 'basic') : memes;

    return (
        <div
            data-testid="container"
            className={classes.container}>
            <div
                data-testid="card"
                className={classes.card}
            >
                {
                    filteredMemes.map((el) => (
                        <div
                            key={el.id}
                            className={classes.cardList}
                            onClick={() => navigate(`/detail/${el.id}`)}
                            data-testid="navigate-memeDetail"
                        >
                            <img src={el.imageUrl} alt="" />
                            <div
                                data-testid="cardData"
                                className={classes.data}>
                                <p 
                                data-testid="cardTitle"
                                className={classes.title}
                                >{el.title}</p>
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