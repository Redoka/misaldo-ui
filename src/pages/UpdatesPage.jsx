import { useState } from "react";
import "../style/updateStyle.css";

function UpdatesPage() {

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const runUpdate = async (url, label) => {
    try {
      setLoading(true);
      setMessage(`Updating ${label}...`);

      const res = await fetch(url, {
        method: "POST"
      });

      if (!res.ok) throw new Error("Request failed");

      const data = await res.json();

      setMessage(`✔ ${label} updated successfully`);
      console.log(data);

    } catch (error) {
      console.error(error);
      setMessage(`❌ Error updating ${label}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="updates-page">
      <h1>Updates</h1>

      {loading && <p className="loading-text">⏳ Processing update...</p>}
      {message && <p className="message">{message}</p>}

      <div className="updates-container">
        <button
          className="update-btn cards"
          onClick={() => runUpdate("http://localhost:9100/debug/update/cards/new", "Cards")}
          disabled={loading}
        >
          Update Cards
        </button>

        <button
          className="update-btn tcg"
          onClick={() => runUpdate("http://localhost:9100/debug/update/banlist/tcg", "TCG Banlist")}
          disabled={loading}
        >
          Update TCG Banlist
        </button>

        <button
          className="update-btn ocg"
          onClick={() => runUpdate("http://localhost:9100/debug/update/banlist/ocg", "OCG Banlist")}
          disabled={loading}
        >
          Update OCG Banlist
        </button>
      </div>
    </div>
  );
}

export default UpdatesPage;