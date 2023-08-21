import { LayoutProps } from '../../interface/LayoutProp/Layoutprop';
import NavBar from '../components/NavBar/NavBar';


const Layout = ({ children }:LayoutProps) => {
  return (
    <div>
      <NavBar />
      {children}
    </div>
  );
};

export default Layout;
