import React from 'react';

export default function PokemonDetails({stats}){
    console.log(stats)
    return(
        <>
            <div id="name-container">
                <p id="pokemon-name">{stats.name}</p>
                <p id="pokemon-id">{`#${stats.id}`}</p>
            </div>
            <div id="image-container">
                <div id="image">
                    <img id="sprite" src={stats.sprites.front_default} alt={stats.name} />
                </div>
                <div id="types">
                    {stats.types.map((el, index) => (
                        <div key={index + el} id={el.type.name} style={{"--type": `var(--${el.type.name})`}} >
                            <p key={index}>{el.type.name}</p>
                        </div>
                    ))}
                </div>

                <div id="w-h-container">
                    <p id="weight">
                        Weight: {stats.weight}
                    </p>
                    <p id="height">
                        Height: {stats.height}
                    </p>
                </div>
            </div>
        </>
    )
}