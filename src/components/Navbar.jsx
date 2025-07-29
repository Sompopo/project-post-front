import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useUser } from "../context/UserContext";
import { useTasks } from "../context/TasksContext";
import { useEffect, useState } from "react";

function Navbar() {

    const { isAuthenticated, logout, user, setUser } = useAuth();
    const { setUserData, userData, getUserData } = useUser();
    const { setTasks } = useTasks();
    const [imagePreview, setImagePreview] = useState("https://i.ibb.co/Y2Gtyfj/np.jpg");
    //const [count, setCount] = useState(0);

    useEffect(() => {
        getUserData();
    }, []); 

    useEffect(() => {
        if (userData) {
            //console.log("Si entra")
            setImagePreview(userData.ima);
        }
    }, [userData]); 

    return (
        <nav className="bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg">

            <Link to={
                isAuthenticated ? "/tasks" : "/"
            }>
                <h1 className="text-2xl font-bold">Task Manager</h1>
            </Link>
            <ul className="flex gap-x-2">
                {isAuthenticated ? (
                    <>
                        <li>
                            <img
                                src={imagePreview}
                                alt="Profile"
                                className="flex h-[calc(5vh-5px)] items-center justify-center rounded-full mx-auto" />
                        </li>
                        <li>
                            <Link to='/user-data'
                                className="bg-indigo-500 px-4 py-1 rounded-sm"
                            >Welcome {user.username}</Link>
                        </li>
                        <li>
                            <Link to='/other-tasks'
                                className="bg-indigo-500 px-4 py-1 rounded-sm"
                            >Other Tasks</Link>
                        </li>
                        <li>
                            <Link to='/add-tasks'
                                className="bg-indigo-500 px-4 py-1 rounded-sm"
                            >Add Task</Link>
                        </li>
                        <li>
                            <Link to='/profile'
                                className="bg-indigo-500 px-4 py-1 rounded-sm"
                            >Profile</Link>
                        </li>
                        <li>
                            <Link to='/'
                                className="bg-yellow-500 px-4 py-1 rounded-sm"
                                onClick={() => {
                                    setUser(null);
                                    setTasks([]);
                                    setUserData(null);
                                    setImagePreview("https://i.ibb.co/Y2Gtyfj/np.jpg");
                                    logout();
                                }}>Logout</Link>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to='/login'
                                className="bg-indigo-500 px-4 py-1 rounded-sm"
                            >Login</Link>
                        </li>
                        <li>
                            <Link to='/register'
                                className="bg-indigo-500 px-4 py-1 rounded-sm"
                            >Register</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    )
}

export default Navbar
