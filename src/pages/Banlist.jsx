import {useEffect, useState} from "react";
import { Link } from "react-router-dom"

function Banlist() {
	const[type,setType] = useState("tcg");
	const[cards,setCards] = useState([]);
	const frameClassMap = {
	  "normal": "normal",			
	  "effect": "effect",
	  "pendulum":"pendulum",
	  "ritual":"ritual",
	  "xyz": "xyz",
	  "synchro": "synchro",
	  "fusion": "fusion",
	  "link": "link",
	  "spell": "spell",
	  "trap": "trap"
	};
	
	useEffect(() => {
	  fetch(`http://localhost:9100/debug/banlist/${type}`)
	    .then(res => res.json())
	    .then(data => {
	      console.log("DATA:", data);
	      setCards(data.data); 
	    })
	    .catch(err => console.error(err));
	}, [type]);
	
	const banned = cards.filter(
	  card => card.banlist_info?.[`ban_${type}`] === "Forbidden"
	);

	const limited = cards.filter(
	  card => card.banlist_info?.[`ban_${type}`] === "Limited"
	);

	const semiLimited = cards.filter(
	  card => card.banlist_info?.[`ban_${type}`] === "Semi-Limited"
	);

  return (
	<div>
	  <h1>Banlist</h1>

	  <div>
	    <button onClick={() => setType("tcg")} style={{ marginRight: "5px" }}>
	      TCG
	    </button>

	    <button onClick={() => setType("ocg")}>
	      OCG
	    </button>
	  </div>

	  <h2>Mostrando: {type.toUpperCase()}</h2>

	  <div>
	  <h2>Prohibidas</h2>
	    <div className="card-grid">
	      {banned.map(card => (
	        <div className={`card ${card.frameType}`} key={card.id}>
	          <Link to={`/card/${card.id}`} className="card-link">
	            <img
	              src={card.card_images?.[0]?.image_url_cropped}
	              alt={card.name}
	              className="card-img"/>
	            <div className="card-name">{card.name}</div>
	          </Link>
	        </div>
	      ))}
	    </div>

	    <h2>Limitadas</h2>
	    <div className="card-grid">
	      {limited.map(card => (
	         <div className={`card ${card.frameType}`} key={card.id}>
			<Link to={`/card/${card.id}`} className="card-link">
			  <img
			    src={card.card_images?.[0]?.image_url_cropped}
			    alt={card.name}
			    className="card-img"
			  />
			  <div className="card-name">{card.name}</div>
			</Link>
	        </div>
	      ))}
	    </div>

	    <h2>Semilimitadas</h2>
	    <div className="card-grid">
	      {semiLimited.map(card => (
			 <div className={`card ${card.frameType}`} key={card.id}>
			<Link to={`/card/${card.id}`} className="card-link">
			  <img
			    src={card.card_images?.[0]?.image_url_cropped}
			    alt={card.name}
			    className="card-img"
			  />
			  <div className="card-name">{card.name}</div>
			</Link>
	        </div>
	      ))}
	    </div>
	  </div>
	  
	</div>);
}

export default Banlist;