import days from "dayjs";

function TaskCard({ task }) {

    return (
       <div className="bg-zinc-800 max-w-md w-full p-6 rounded-md shadow-lg">
  <header className="flex justify-between items-center mb-4">
    <div className="flex items-center gap-4">
      {/* Imagen de perfil */}
      <img
        src={task.userImage || "https://i.pravatar.cc/50"} 
        alt={`${task.username} profile`}
        className="w-12 h-12 rounded-full object-cover border-2 border-indigo-500"
      />
      <h1 className="text-xl font-semibold text-white">{task.user.username}</h1>
    </div>
    
    {/* Fecha relativa en vez del título */}
    <p className="text-sm text-gray-400">{days(task.createdAt).utc().format("DD/MM/YYYY")}</p>
  </header>

  {/* Título antes de la descripción */}
  <h3 className="text-lg font-bold text-indigo-400 mb-2">{task.title}</h3>

  <p className="text-slate-300">{task.description}</p>
</div>

    )
}

export default TaskCard
