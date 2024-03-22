import { useEffect, useState } from "react";
import { api } from "../api";
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
  const [profile, setProfile] = useState({});
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);

  // Fetch profile
  useEffect(() => {
    if (localStorage.getItem("id")) {
      api
        .post("/account", { id: localStorage.getItem("id") })
        .then((res) => {
          setProfile(res.data);
        })
        .catch((error) => {
          console.error("Error fetching profile:", error);
        });
    }
  }, []);

  // Logout
  const onLogout = () => {
    localStorage.removeItem("id");
    navigate("/");
  };

  // Delete account
  const handleAccountDeletion = async () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      await api
        .post("/account/delete", { id: localStorage.getItem("id") })
        .then(() => {
          localStorage.removeItem("id");
          navigate("/");
        })
        .catch((error) => {
          console.error("Error deleting account:", error);
        });
    }
  };

  // Update account
  const handleAccountUpdate = (e) => {
    e.preventDefault();
    api
      .put("/account/update", { ...profile, id: localStorage.getItem("id") })
      .then((res) => {
        setProfile(res.data);
        setEditMode(false);
      })
      .catch((error) => {
        console.error("Error updating account:", error);
      });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        className="bg-gray-100 p-8 rounded-lg border border-blue-100"
        onSubmit={handleAccountUpdate}
      >
        <h1 className="text-4xl font-bold mb-4">Welcome!</h1>
        <p className="text-lg mb-4">
          Name:{" "}
          <input
            value={profile?.name}
            className="w-full"
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            disabled={!editMode}
            required
          />
        </p>
        <p className="text-lg mb-4">
          About:{" "}
          <input
            value={profile?.about}
            className="w-full"
            onChange={(e) => setProfile({ ...profile, about: e.target.value })}
            disabled={!editMode}
            required
          />
        </p>
        <p className="text-lg mb-4">
          Email:{" "}
          <input
            type="email"
            value={profile?.email}
            className="w-full"
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            disabled={!editMode}
            required
          />
        </p>
        <p className="text-lg mb-4">
          Gender:{" "}
          <input
            value={profile?.gender}
            className="w-full"
            onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
            disabled={!editMode}
            required
          />
        </p>
        <button
          type={editMode ? "button" : "submit"}
          className="block mb-4 border-2 border-gray-600 w-full py-2 rounded"
          onClick={() => setEditMode(!editMode)}
        >
          {!editMode ? "Edit Details" : "Save Details"}
        </button>
        <Link
          to="/users"
          type="button"
          className="block mb-4 border-2 border-gray-600 w-full py-2 rounded text-center"
        >
          View Users
        </Link>
        <div className="flex justify-between gap-4">
          <button
            className="text-white bg-red-500 hover:bg-red-700 border-2 border-red-500 font-bold py-2 px-4 rounded"
            onClick={onLogout}
          >
            Logout
          </button>
          <button
            className="text-red-500 hover:bg-red-500 hover:text-white border-2 border-red-500 font-bold py-2 px-4 rounded"
            onClick={handleAccountDeletion}
          >
            Delete Account
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
