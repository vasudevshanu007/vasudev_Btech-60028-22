import { useState } from "react";
import API from "../services/api";

function Profile({ setIsAuth }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const updateProfile = async () => {
        await API.put("/auth/update-profile", { name, email });
        alert("Profile updated");
    };

    const deleteAccount = async () => {
        await API.delete("/auth/delete-profile");
        localStorage.removeItem("token");
        setIsAuth(false);
    };

    return (
        <>
            <h2>Edit Profile</h2>
            <input placeholder="Name" onChange={e => setName(e.target.value)} />
            <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
            <button onClick={updateProfile}>Update</button>
            <button onClick={deleteAccount}>Delete Account</button>
        </>
    );
}

export default Profile;
