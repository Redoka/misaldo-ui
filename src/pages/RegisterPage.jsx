
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/register.css";

function RegisterPage() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
        password: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:9100/users/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            });

            if (!res.ok) {
                throw new Error("Error al registrar");
            }

            alert("Usuario registrado correctamente");
            navigate("/login");

        } catch (error) {
            console.error(error);
            alert("No se pudo registrar el usuario");
        }
    };

    return (
            <div className="register-container">
                <form className="register-box" onSubmit={handleSubmit}>
                    <h2 className="register-title">Register</h2>
            
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={form.username}
                        onChange={(e) =>
                                setForm({...form, username: e.target.value})
                      }
                        required
                        />
            
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={(e) =>
                                setForm({...form, password: e.target.value})
                      }
                        required
                        />
            
                    <button type="submit">Register</button>
            
                    <p onClick={() => navigate("/login")}>
                        Already have an account? Login
                    </p>
                </form>
            </div>
            );
}

export default RegisterPage;
