import { useMediaQuery } from '@mui/material';
import facebook from '../../.././../public/svg/734399_facebook_media_online_social_icon.svg';
import linkedin from '../../.././../public/svg/734383_in_linked_media_online_social_icon.svg';
import twitter from '../../.././../public/svg/734377_media_online_social_twitter_icon.svg';

function Footer() {
  const isScreenLargerThan400px = useMediaQuery("(min-width: 401px)");
  const isScreenSmallerThan950px = useMediaQuery("(max-width: 949px)");

  return (
    <div className={`bg-1C1D1F h-80 text-white p-4 `}>
      <div className={`${isScreenLargerThan400px ? 'ml-48 mr-48 flex justify-between items-center pb-2' : 'flex flex-col text-center'}`}>
        <div>
          <p>About Us</p>
          <p>Privacy Policy</p>
        </div>
        <div>
          <h3 className='mb-1'>Contact Us</h3>
          <p className='text-sm'>Email: contact@example.com</p>
          <p className='text-sm'>Phone: +1 (123) 456-7890</p>
        </div>
        <div>
          {isScreenSmallerThan950px ? (
            <>
              <h3 className='mb-1'>Follow Us</h3>
              <p className="text-sm">Follow us on:</p>
              <p className="text-sm">Facebook</p>
              <p className="text-sm">Twitter</p>
              <p className="text-sm">Instagram</p>
            </>
          ) : (
            <>
              {isScreenLargerThan400px && (
                <>
                  <h3 className='mb-1'>Follow Us</h3>
                  <div className="flex gap-2">
                    <img src={facebook} className='w-12' alt="Facebook" />
                    <img src={linkedin} className='w-12' alt="LinkedIn" />
                    <img src={twitter} className='w-12' alt="Twitter" />
                  </div>
                </>
              )}
            </>
          )}
        </div>
        <p className={`text-center text-sm mt-4`}>© 2023 Questlix</p>
      </div>
    </div>
  );
}

export default Footer;
