import { LayoutProps } from '../../interface/LayoutProp/Layoutprop';
import NavBar from '../Components/NavBar/NavBar';


const Layout = ({ children }:LayoutProps) => {
  return (
    <div className="relative " >
      <NavBar  />
      {children}
    </div>
  );
};

export default Layout;
