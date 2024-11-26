import React from 'react';

export default function PokemonStats({stats}) {
    const maxStats = [[244, "hp-bar"], [190, "attack-bar"], [194, "defense-bar"], [194, "sp-attack-bar"], [230, "sp-defense-bar"], [180, "speed-bar"]]
    return(
        <div id="right-side">
            <p id="stat-title">Stats</p>
            <div id="stat-container">
                {stats.stats.map((el, index) => (
                    <div className="stat-row-container">
                        <p>{el.stat.name}: <span id="speed">{el.base_stat}</span></p>
                        <div className="bar-container">
                            <div style={{'--bar-value':`${parseFloat(el.base_stat / maxStats[index][0]).toFixed(2) * 100}%`}} class="stat-bars" id={maxStats[index][1]}></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}