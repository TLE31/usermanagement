import { useEffect, useState } from "react";
import { api } from "../api";
import { Link } from "react-router-dom";

const Users = () => {
    const [users, setUsers] = useState([]);

    // Fetch users
    useEffect(() => {
        if (localStorage.getItem("id")) {
            api
                .post("/account/all")
                .then((res) => {
                    setUsers(res.data);
                })
                .catch((error) => {
                    console.error("Error fetching users:", error);
                });
        }
    }, []);

    return (
        <div className="flex justify-center items-center h-screen">
            <div
                className="bg-gray-100 p-8 rounded-lg border border-blue-100"
            >
                <h1 className="text-4xl font-bold mb-4">Users</h1>
                <div className="text-lg mb-4">
                    Here are the users in the system:
                    <div className="flex justify-between">
                        <p>Name</p>
                        <p className="capitalize">Gender</p>
                    </div>
                    {users.map((user, index) => {
                        return (
                            <div key={index} className="flex justify-between">
                                <p>{user.name}</p>
                                <p>{user.gender}</p>
                            </div>
                        );
                    })}
                </div>
                <Link
                    to="/profile"
                    type="button"
                    className="block mb-4 border-2 border-gray-600 w-full py-2 rounded text-center"
                >
                    Back to Profile
                </Link>
            </div>
        </div>
    )
}

export default Users