import Greetings from '@/components/Greetings';
import GreetingSkeleton from '@/components/GreetingSkeleton';
import NewProject from '@/components/NewProject';
import ProjectCard from '@/components/ProjectCard';
import TaskCard from '@/components/TaskCard';
import { delay } from '@/lib/async';
import { getUserFromCookie } from '@/lib/auth';
import { db } from '@/lib/db';
import { TaskStatus } from '@prisma/client';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { Suspense } from 'react';

const getData = async () => {
  await delay(1000);
  const user = await getUserFromCookie(cookies());

  const projects = await db.project.findMany({
    where: {
      ownerId: user?.id,
    },
    include: {
      tasks: true,
    },
  });

  const tasks = await db.task.findMany({
    where: {
      ownerId: user?.id,
      NOT: {
        status: TaskStatus.COMPLETED,
        deleted: false,
      },
    },
    take: 5,
    orderBy: {
      due: 'asc',
    },
  });

  const data = [ projects, tasks]

  return data ;
};

const Home = async () => {
  const [projects, tasks] = await getData();
  return (
    <div className="h-full w-full overflow-y-auto py-6 pr-3">
      <div className="h-full flex flex-col gap-6 min-h-[content]">
        <div>
          <Suspense fallback={<GreetingSkeleton />}>
            <Greetings />
          </Suspense>
        </div>
        <div className="projects border-2 bg-white rounded-3xl p-4">
          <div className="mb-6 mt-2 px-2 flex justify-between">
            <h2 className='text-3xl text-gray-700'>Projects</h2>
            <NewProject />
          </div>
          <ul className="w-full grid grid-cols-3 gap-6">
            {projects.map((project) => (
              <li key={project.id}>
                <Link href={`/project/${project.id}`}>
                  <ProjectCard project={project} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full">
          <div className="w-full">
            <TaskCard tasks={tasks} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
