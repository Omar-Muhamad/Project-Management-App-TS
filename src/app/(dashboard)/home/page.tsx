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
    <div className="h-full w-full overflow-y-auto pr-6">
      <div className=" h-full items-stretch justify-center min-h-[content]">
        <div className="flex-1 grow flex">
          <Suspense fallback={<GreetingSkeleton />}>
            <Greetings />
          </Suspense>
        </div>
        <ul className="w-full flex flex-2 grow items-center flex-wrap mt-3 -m-3 ">
          {projects.map((project) => (
            <li key={project.id} className="w-1/3 p-3">
              <Link href={`/project/${project.id}`}>
                <ProjectCard project={project} />
              </Link>
            </li>
          ))}
          <li className="w-1/3 p-3">
            <NewProject />
          </li>
        </ul>
        <div className="mt-6 flex-2 grow w-full flex">
          <div className="w-full">
            <TaskCard tasks={tasks}/>  
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
