import { useState } from "react";
import { Link } from "react-router-dom";

function CardSearcher() {
	const [filters, setFilters] = useState({
	  name: "",
	  archetype: "",
	  type: "",
	  frameType: "",

	  minAtk: "",
	  maxAtk: "",
	  minDef: "",
	  maxDef: "",
	  minLevel: "",
	  maxLevel: "",
	  minPendulum: "",
	  maxPendulum: "",
	  minLinkRating: "",
	  maxLinkRating: ""
	});

  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleReset = () => {
    setFilters({
      name: "",
      desc: "",
      archetype: "",
      frameType: "",
      type: "",
      race: "",
      attribute: "",
      minLevel: "",
      maxLevel: "",
      minAtk: "",
      maxAtk: "",
      minDef: "",
      maxDef: "",
	  minPenScale: "",
	  maxPenScale: "",
	  minLinkRating: "",
	  maxLinkRating: ""
    });
    setCards([]);
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const query = new URLSearchParams();

      Object.entries(filters).forEach(([key, value]) => {
        if (value !== "" && value !== null && value !== undefined) {
          query.append(key, value);
        }
      });
	  console.log("QUERY FINAL:", query.toString());
      const res = await fetch(`http://localhost:9100/debug/cards?${query.toString()}`);
      const data = await res.json();

      setCards(data.data ?? []);
    } catch (error) {
      console.error("Error searching cards:", error);
      setCards([]);
    } finally {
      setLoading(false);
    }
  };

  const getCardClass = (frameType) => {
    if (!frameType) return "card";

    const ft = frameType.toLowerCase();

    if (ft.includes("normal")) return "card normal";
    if (ft.includes("effect")) return "card effect";
    if (ft.includes("fusion")) return "card fusion";
    if (ft.includes("synchro")) return "card synchro";
    if (ft.includes("xyz")) return "card xyz";
    if (ft.includes("link")) return "card link";
    if (ft.includes("ritual")) return "card ritual";
    if (ft.includes("spell")) return "card spell";
    if (ft.includes("trap")) return "card trap";
    if (ft.includes("pendulum")) return "card pendulum";

    return "card";
  };
  
  const monsterRaces = [
    "Aqua",
    "Beast",
    "Beast-Warrior",
    "Creator God",
    "Cyberse",
    "Dinosaur",
    "Divine-Beast",
    "Dragon",
    "Fairy",
    "Fiend",
    "Fish",
    "Illusion",
    "Insect",
    "Machine",
    "Psychic",
    "Pyro",
    "Reptile",
    "Rock",
    "Sea Serpent",
    "Spellcaster",
    "Thunder",
    "Warrior",
    "Winged Beast",
    "Wyrm",
    "Zombie"
  ];

  const spellRaces = [
    "Normal",
    "Field",
    "Equip",
    "Continuous",
    "Quick-Play",
    "Ritual"
  ];

  const trapRaces = [
    "Normal",
    "Continuous",
    "Counter"
  ];
  
  const getRaceOptions = (frameType) => {
    switch (frameType) {
      case "spell":
        return spellRaces;
      case "trap":
        return trapRaces;
      default:
        return monsterRaces;
    }
  };
  
  console.log(cards)

  return (
    <div className="search-page">
      <h1 className="search-title">Card Searcher</h1>

      <form className="search-form" onSubmit={handleSearch}>
        <div className="search-grid">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={filters?.name}
            onChange={handleChange}
          />

          <input
            type="text"
            name="desc"
            placeholder="Description"
            value={filters?.desc}
            onChange={handleChange}
          />

          <input
            type="text"
            name="archetype"
            placeholder="Archetype"
            value={filters?.archetype}
            onChange={handleChange}
          />

          <select
            name="frameType"
            value={filters?.frameType}
            onChange={handleChange}
          >
            <option value="">Any Frame Type</option>
            <option value="normal">Normal</option>
            <option value="effect">Effect</option>
            <option value="ritual">Ritual</option>
            <option value="fusion">Fusion</option>
            <option value="synchro">Synchro</option>
            <option value="xyz">XYZ</option>
            <option value="link">Link</option>
            <option value="spell">Spell</option>
            <option value="trap">Trap</option>
            <option value="pendulum">Pendulum</option>
          </select>
		  		
					<select
					  name="race"
					  value={filters?.race}
					  onChange={handleChange}
					>
					  <option value="">Any Race</option>

					  {getRaceOptions(filters?.frameType).map(race => (
					    <option key={race} value={race}>
					      {race}
					    </option>
					  ))}
					</select>
					
					{ !["spell", "trap"].includes(filters.frameType) && (
					  <>
					    <select name="type" value={filters?.type} onChange={handleChange}>
					      <option value="">Any type</option>
					      <option value="Flip">Flip</option>
					      <option value="Gemini">Gemini</option>
					      <option value="Spirit">Spirit</option>
					      <option value="Toon">Toon</option>
					      <option value="Tuner">Tuner</option>
					      <option value="Union">Union</option>
					    </select>

					    <select name="attribute" value={filters?.attribute} onChange={handleChange}>
					      <option value="">Any Attribute</option>
					      <option value="Dark">Dark</option>
					      <option value="Divine">Divine</option>
					      <option value="Earth">Earth</option>
					      <option value="Fire">Fire</option>
					      <option value="Light">Light</option>
					      <option value="Water">Water</option>
					      <option value="Wind">Wind</option>
					    </select>

					    <input
					      type="number"
					      name="minLevel"
					      placeholder="Min Level"
					      value={filters?.minLevel ?? ""}
					      onChange={handleChange}
					      min={0}
					      max={filters?.maxLevel || 9999}
					    />

					    <input
					      type="number"
					      name="maxLevel"
					      placeholder="Max Level"
					      value={filters?.maxLevel ?? ""}
					      onChange={handleChange}
					      min={filters?.minLevel || -1}
					      max={13}
					    />

					    <input
					      type="number"
					      name="minAtk"
					      placeholder="Min ATK"
					      value={filters?.minAtk ?? ""}
					      onChange={handleChange}
					      min={-1}
					      max={filters?.maxAtk || 9999}
					    />

					    <input
					      type="number"
					      name="maxAtk"
					      placeholder="Max ATK"
					      value={filters?.maxAtk ?? ""}
					      onChange={handleChange}
					      min={filters?.minAtk || -1}
					      max={9999}
					    />

					    <input
					      type="number"
					      name="minDef"
					      placeholder="Min DEF"
					      value={filters?.minDef ?? ""}
					      onChange={handleChange}
					      min={-1}
					      max={filters?.maxDef || 9999}
					    />

					    <input
					      type="number"
					      name="maxDef"
					      placeholder="Max DEF"
					      value={filters?.maxDef ?? ""}
					      onChange={handleChange}
					      min={filters?.minDef || -1}
					      max={9999}
					    />

					    <input
					      type="number"
					      name="minPenScale"
					      placeholder="Min Pendulum Scale"
					      value={filters?.minPenScale ?? ""}
					      onChange={handleChange}
					      min={-1}
					      max={filters?.maxPenScale || 13}
					    />

					    <input
					      type="number"
					      name="maxPenScale"
					      placeholder="Max Pendulum Scale"
					      value={filters?.maxPenScale ?? ""}
					      onChange={handleChange}
					      min={filters?.minPenScale ?? -1}
					      max={13}
					    />

					    <input
					      type="number"
					      name="minLinkRating"
					      placeholder="Link Rating"
					      value={filters?.minLinkRating ?? ""}
					      onChange={handleChange}
					      min={-1}
					      max={filters?.maxLinkRating || 8}
					    />

					    <input
					      type="number"
					      name="maxLinkRating"
					      placeholder="Max Link Rating"
					      value={filters?.maxLinkRating ?? ""}
					      onChange={handleChange}
					      min={filters?.minLinkRating || -1}
					      max={8}
					    />
					  </>
					)}
        </div>

        <div className="search-actions">
          <button type="submit" className="search-btn">
            Buscar
          </button>

          <button
            type="button"
            className="reset-btn"
            onClick={handleReset}
          >
            Limpiar
          </button>
        </div>
      </form>

      {loading && <p className="loading-text">Buscando cartas...</p>}

	  <div className="search-results">
	    {cards.map(card => {
	      const isMonster = card.type?.toLowerCase().includes("monster");
	      return (
	        <Link
	          to={`/card/${card.id}`}
	          key={card.id}
	          className={`card-result ${getCardClass(card.frameType)}`}
	        >
	          <img
	            src={card.card_images?.[0]?.image_url_cropped}
	            alt={card.name}
	            className="card-img"
	          />

	          <div className="card-info">
	            <div className="card-name">{card.name}</div>

	            <div className="card-meta">
	              <span>{card.race}</span>
	              {card.attribute?.trim() && <span>{card.attribute}</span>}
	            </div>

	            {isMonster && (
	              <div className="card-stats-mini">
	                {card.atk != null && <span>ATK {card.atk}</span>}
	                {card.def != null && !card.frameType?.toLowerCase().includes("link") &&  <span>DEF {card.def}</span>}
	                {card.level != null && !card.frameType?.toLowerCase().includes("link") && <span>LV {card.level}</span>}
	                {card.linkval != null && card.linkval != 0 &&<span>LINK {card.linkval}</span>}
	                {card.scale != null && card.frameType?.toLowerCase().includes("pendulum") && (
	                  <span>P {card.scale}</span>
	                )}
	              </div>
	            )}
	          </div>
	        </Link>
	      );
	    })}
	  </div>
    </div>
  );
}

export default CardSearcher;
