import { useForm } from "react-hook-form"
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProfilePage() {

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue
  } = useForm();

  const { user, update_user, errors: updateUserErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setValue('username', user.username);
    setValue('email', user.email);
    //console.log(user.ima);
  }, []);

  const onSubmit = handleSubmit((data) => {
    async function goTasks() {

      const userNew = {
        username: data.username,
        email: data.email,
      }
      const res = await update_user(userNew);
      if (JSON.stringify(res) === '1') navigate('/tasks')
    }
    goTasks();
  });

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        {
          updateUserErrors.map((error, i) => (
            <div className="bg-red-500 p-2 text-white text-center my-2" key={i}>
              {error}
            </div>
          ))
        }
        <h1 className="text-3xl font-bold my-4">Update Profile</h1>
        <form onSubmit={onSubmit}>
          <label htmlFor="user">User</label>
          <input type="text"
            placeholder="User"
            {...register("username", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            autoFocus
          />
          {errors.username && (<p className="text-red-500">Username is required</p>)}
          <label htmlFor="email">Email</label>
          <input type="email"
            placeholder="Email"
            {...register("email", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          />
          {errors.email && (<p className="text-red-500">Email is required</p>)}
          <button className="bg-indigo-500 px-3 py-2 rounded-md">Update</button>
        </form>
      </div>
    </div>
  )
}

export default ProfilePage;


{/* <label htmlFor="password"> Last Password</label>
          <input type="password"
            placeholder="Last Password"
            {...register("password")}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            autoFocus
          />
          <label htmlFor="newPassword">New Password</label>
          <input type="password"
            placeholder="New Password"
            {...register("newPassword")}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            autoFocus
          /> */}


