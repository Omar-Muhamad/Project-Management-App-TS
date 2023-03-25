import '@/styles/global.css';
import GlassPane from '@/components/GlassPane';

export const metadata = {
  title: 'Project Management App',
  description: 'Here you can manage your projects',
};

const AuthRootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <GlassPane className="w-full h-full flex justify-center items-center">
          {children}
        </GlassPane>
      </body>
    </html>
  );
};

export default AuthRootLayout;
