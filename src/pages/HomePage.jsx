import { useEffect } from "react";
import TaskCardTwo from "../components/TaskCardTwo";
import { useTasks } from "../context/TasksContext";
import { useUser } from "../context/UserContext";

function HomePage() {

  const { getOtherTasks, otherTasks } = useTasks();
  const { getUserData } = useUser();

  /*useEffect(() => {
        getUserData();
    }, []);*/

  useEffect(() => {
    getOtherTasks();
    
  }, []);

  if (otherTasks.length === 0) return <h1>No Tasks</h1>;
  
  return (
    <div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">

        {
          otherTasks.map(tarea => (
            <TaskCardTwo task={tarea} key={tarea._id} />
          ))
        }

      </div>
    </div>
  )
}

export default HomePage
