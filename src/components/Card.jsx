import '../styles/Card.css'

/* eslint-disable react/prop-types */
export default function Card({ name, sprite, onClick }) {
    return (
        <div className="pokemon-card" onClick={() => onClick(name)}>
            <div className="pokemon-sprite">
                <img src={sprite} alt={name} />
            </div>
            <div className="pokemon-name">
                <p>{name}</p>
            </div>
        </div>
    )
}