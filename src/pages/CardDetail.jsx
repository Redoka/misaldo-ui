import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

function CardDetail() {
  const { id } = useParams()
  const [card, setCard] = useState(null)
  const [cards, setCards] = useState([]);
  
  useEffect(() => {
    fetch(`http://localhost:9100/debug/card/${id}`)
      .then(res => res.json())
      .then(data => {
        setCard(data.data[0]);
      });
  }, [id]);
  
  useEffect(() => {
    if (!card?.archetype) return;
	
	console.log("ARCHETYPE:", card?.archetype);

	fetch(`http://localhost:9100/debug/cards/${encodeURIComponent(card.archetype)}`)
	  .then(res => res.json())
	  .then(data => {
	    setCards(data ?? []);
	  })
	  .catch(err => console.error(err));
  }, [card?.archetype]);
  
  if (!card){
	return <p>Loading...</p>
  } 
  
   const type = card.frameType;
   const isMonster = !["spell", "trap"].includes(type);
   const isXYZ = type === "xyz";
   const isLink = type === "link";
   const isPendulum = type?.includes("pendulum");

  
  return (
	<div className="card-detail">

	  <div className="card-detail-container">

	    <img
	      className="card-detail-img"
	      src={card.card_images?.[0]?.image_url_cropped}
	      alt={card.name}
	    />

	    <div className="card-detail-info">
	      <h1>{card.name}</h1>

	      <p className="card-type">{card.type}</p>
	      <p className="card-desc">{card.desc}</p>

	      <div className="card-stats">
	        {isLink && (
	          <>
	            <span>ATK: {card.atk ?? "-"}</span>
	            <span>Link Rating: {card.linkval ?? "-"}</span>
	            <span>Attribute: {card.attribute ?? "-"}</span>
	            <span>Race: {card.race ?? "-"}</span>
	            <span>
	              Arrows:{" "}
	              {card.linkmarkers?.length
	                ? card.linkmarkers.join(", ")
	                : "-"}
	            </span>
	          </>
	        )}

	        {isXYZ && (
	          <>
	            <span>ATK: {card.atk ?? "-"}</span>
	            <span>DEF: {card.def ?? "-"}</span>
	            <span>Rank: {card.level ?? "-"}</span>
	            <span>Attribute: {card.attribute ?? "-"}</span>
	            <span>Race: {card.race ?? "-"}</span>
	          </>
	        )}

	        {isMonster && !isXYZ && !isLink && (
	          <>
	            <span>ATK: {card.atk ?? "-"}</span>
	            <span>DEF: {card.def ?? "-"}</span>
	            <span>Level: {card.level ?? "-"}</span>
	            <span>Attribute: {card.attribute ?? "-"}</span>
	            <span>Race: {card.race ?? "-"}</span>
	          </>
	        )}

	        {isPendulum && (
	          <span>Pendulum Scale: {card.scale ?? "-"}</span>
	        )}

	        {card.archetype && (
	          <span>Archetype: {card.archetype}</span>
	        )}
	      </div>

	      {card.banlist_info && (
	        <div className="ban-info">
	          <p>TCG: {card.banlist_info.ban_tcg ?? "Unlimited"}</p>
	          <p>OCG: {card.banlist_info.ban_ocg ?? "Unlimited"}</p>
	        </div>
	      )}
	    </div>

	  </div>

	  <div className="related-sidebar">
	    <h3>Related Cards</h3>

	    <div className="related-list">
	      {cards?.map(c => (
	        <div key={c.id} className="related-item">
			<Link to={`/card/${c.id}`} key={c.id} className="related-item">
			     <img
			       src={c.card_images?.[0]?.image_url_small}
			       alt={c.name}
			     />
			     <span className="related-name">{c.name}</span>
			   </Link>
	        </div>
	      ))}
	    </div>
	  </div>
	</div>
    )
  }
  export default CardDetail