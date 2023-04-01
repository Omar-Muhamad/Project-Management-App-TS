import Button from './Button';
import Card from './Card';

const TaskCard = async ({ tasks, title = 'Recent Tasks' }) => {
  return (
    <Card className="w-full">
      <div className="flex justify-between items-center">
        <div>
          <span className="text-3xl text-gray-600">{title}</span>
        </div>
        <div>
          <Button intent="text" className="text-violet-600">
            + Create New
          </Button>
        </div>
      </div>
      <div>
        {tasks && tasks.length ? (
          <ul>
            {tasks.map((task) => (
              <li key={task.id} className="py-2 ">
                <div>
                  <span className="text-gray-800">{task.name}</span>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">
                    {task.description}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div>no tasks</div>
        )}
      </div>
    </Card>
  );
};

export default TaskCard;
