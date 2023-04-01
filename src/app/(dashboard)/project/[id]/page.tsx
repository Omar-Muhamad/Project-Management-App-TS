import TaskCard from '@/components/TaskCard';
import { getUserFromCookie } from '@/lib/auth';
import { db } from '@/lib/db';
import { cookies } from 'next/headers';

const getData = async (id) => {
  const user = await getUserFromCookie(cookies());

  const project = await db.project.findFirst({
    where: {
      id,
      ownerId: user?.id,
    },
    include: {
      tasks: true,
    },
  });

  return project;
};

const Project = async ({params}) => {
  const project = await getData(params.id);

  return (
    <div className='h-full w-full overflow-y-auto pr-6'>
      <TaskCard tasks={project?.tasks} title={project?.name} />
    </div>
  );
};

export default Project;
