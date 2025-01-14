
import React, { useContext } from 'react'
import { MenuItemContext } from '../context/contexts';
import '../sass/components/menu-item-card.css'

function MenuItemCard(props) {

    return (
        <div>
            <div >
                <div className="image-container"><img className="item-image" src={props.image} alt={props.image_path} /></div>
                <div className="card-body">
                    <p className="card-name">{props.name}</p>
                    <p className="card-price"></p><p> {props.price} Ft</p>
                    <button className='basket-button'>Rendelés</button>
                </div>
            </div>
        </div>
    )
}

export default MenuItemCard
