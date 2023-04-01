import Card from './Card';
import Image from 'next/image';
// import logo from '@/assets/images/logo.png';
import SideBarLink from './SideBarLink';

const links = [
  { label: 'Home', icon: 'Grid', link: '/home' },
  {
    label: 'Calendar',
    icon: 'Calendar',
    link: '/calendar',
  },
  { label: 'Profile', icon: 'User', link: '/profile' },
  {
    label: 'Settings',
    icon: 'Settings',
    link: '/settings',
  },
];

const SideBar = () => {
  return (
    <Card className="h-card w-40 flex items-center justify-between flex-wrap ml-6">
      {/* <div className="w-full flex justify-center items-center">
        <Image src={logo} alt="Able logo" priority className="w-14" />
      </div> */}
      {links.map((link, index) => (
        <SideBarLink link={link} key={index} />
      ))}
    </Card>
  );
};

export default SideBar;
