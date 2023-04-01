import '@/styles/global.css';
import GlassPane from '@/components/GlassPane';
import SideBar from '@/components/SideBar';

export const metadata = {
  title: 'Dashboard',
  description: 'Here you can manage your projects',
};

const DashboardRootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className="h-screen w-screen rainbow-mesh p-6">
        <GlassPane className="w-full h-full">
          <div className="w-full h-full pr-3 flex items-center gap-6">
            <SideBar />
            {children}
          </div>
        </GlassPane>
        <div id="modal"></div>
      </body>
    </html>
  );
};

export default DashboardRootLayout;