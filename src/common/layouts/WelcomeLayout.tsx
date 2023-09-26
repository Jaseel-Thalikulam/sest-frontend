

import { LayoutProps } from '../../interface/LayoutProp/Layoutprop';
import Footer from '../Components/Footer/Footer';
import Header from '../Components/Header/Header';



const WelcomeLayout = ({ children }:LayoutProps) => {
  return (
    <div className="relative " >
     <Header/>
      {children}
      <Footer/>
    </div>
  );
};

export default WelcomeLayout;
