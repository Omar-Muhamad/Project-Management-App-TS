import '@/styles/global.css';
import GlassPane from '@/components/GlassPane';

export const metadata = {
  title: 'Project Management App',
  description: 'Here you can manage your projects',
};

const AuthRootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className='h-screen w-screen rainbow-mesh p-6'>
        <GlassPane className="w-full h-full flex justify-center items-center">
          {children}
        </GlassPane>
        <p className='font-bold text-xl'>Success is just a good planning</p>
      </body>
    </html>
  );
};

export default AuthRootLayout;
