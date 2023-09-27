import ErrorBoundary from "../errorBoundary/ErrorBoundary";

function HighlightOptions() {
    return (
      <>
        <ErrorBoundary>

        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mt-5 mb-40 relative">
          <div className="flex-1 flex flex-col items-center md:items-start shadow-sm hover:shadow-md hover:scale-105 transition-transform duration-1000 p-5">
            <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="#8a3ffc" viewBox="0 0 256 256">
            <path d="M249.8,85.49l-116-64a12,12,0,0,0-11.6,0l-116,64a12,12,0,0,0,0,21l21.8,12v47.76a19.89,19.89,0,0,0,5.09,13.32C46.63,194.7,77,220,128,220a136.88,136.88,0,0,0,40-5.75V240a12,12,0,0,0,24,0V204.12a119.53,119.53,0,0,0,30.91-24.51A19.89,19.89,0,0,0,228,166.29V118.53l21.8-12a12,12,0,0,0,0-21ZM128,45.71,219.16,96,186,114.3a1.88,1.88,0,0,1-.18-.12l-52-28.69a12,12,0,0,0-11.6,21l39,21.49L128,146.3,36.84,96ZM128,196c-40.42,0-64.65-19.07-76-31.27v-33l70.2,38.74a12,12,0,0,0,11.6,0L168,151.64v37.23A110.46,110.46,0,0,1,128,196Zm76-31.27a93.21,93.21,0,0,1-12,10.81V138.39l12-6.62Z"></path>
            </svg>
            <h1 className="text-lg font-semibold text-12222E mt-3 mb-3">Professionals</h1>
            <h6 className="text-888888 text-sm md:text-base ">Experts in their field, committed to guiding your educational journey to success.</h6>
          </div>
          <div className="flex-1 flex flex-col items-center md:items-start shadow-sm hover:shadow-md hover:scale-105 transition-transform duration-1000 p-5">
            <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="#8a3ffc" viewBox="0 0 256 256">
            <path d="M128,20A108,108,0,1,0,236,128,108.12,108.12,0,0,0,128,20Zm0,192a84,84,0,1,1,84-84A84.09,84.09,0,0,1,128,212Zm68-84a12,12,0,0,1-12,12H128a12,12,0,0,1-12-12V72a12,12,0,0,1,24,0v44h44A12,12,0,0,1,196,128Z"></path>
            </svg>
            <h1 className="text-lg font-semibold text-12222E mt-3 mb-3">Flexibility</h1>
            <h6 className="text-888888 text-sm md:text-base">Customized learning that adapts to your schedule and individual requirements.</h6>
          </div>
          <div className="flex-1 flex flex-col items-center md:items-start shadow-sm hover:shadow-md hover:scale-105 transition-transform duration-1000 p-5">
            <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="#8a3ffc" viewBox="0 0 256 256">
            <path d="M220,96A92,92,0,1,0,68,165.69V240a12,12,0,0,0,17.37,10.73L128,229.42l42.64,21.31A12,12,0,0,0,188,240V165.69A91.86,91.86,0,0,0,220,96ZM60,96a68,68,0,1,1,68,68A68.07,68.07,0,0,1,60,96ZM164,220.59l-30.64-15.32a12,12,0,0,0-10.74,0L92,220.58V180.66a92,92,0,0,0,72,0ZM128,148A52,52,0,1,0,76,96,52.06,52.06,0,0,0,128,148Zm0-80a28,28,0,1,1-28,28A28,28,0,0,1,128,68Z"></path>
            </svg>
            <h1 className="text-lg font-semibold text-12222E mt-3 mb-3">Quality</h1>
            <h6 className="text-888888 text-sm md:text-base">Excellence, precision, and dedication - our commitment to your success.</h6>
          </div>
          <div className="flex-1 flex flex-col items-center md:items-start shadow-sm hover:shadow-md hover:scale-105 transition-transform duration-1000 p-5">
            <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="#8a3ffc" viewBox="0 0 256 256">
            <path d="M204.73,51.85A108.07,108.07,0,0,0,20,128v56a28,28,0,0,0,28,28H64a28,28,0,0,0,28-28V144a28,28,0,0,0-28-28H44.84A84.05,84.05,0,0,1,128,44h.64a83.7,83.7,0,0,1,82.52,72H192a28,28,0,0,0-28,28v40a28,28,0,0,0,28,28h19.6A20,20,0,0,1,192,228H136a12,12,0,0,0,0,24h56a44.05,44.05,0,0,0,44-44V128A107.34,107.34,0,0,0,204.73,51.85ZM64,140a4,4,0,0,1,4,4v40a4,4,0,0,1-4,4H48a4,4,0,0,1-4-4V140Zm124,44V144a4,4,0,0,1,4-4h20v48H192A4,4,0,0,1,188,184Z"></path>
            </svg>
            <h1 className="text-lg font-semibold text-12222E mt-3 mb-3">Support</h1>
            <h6 className="text-888888 text-sm md:text-base">Guiding your journey with care, encouragement, and unwavering assistance always available.</h6>
          </div>
        </div>
              </ErrorBoundary>
      </>
    );
  }
  
  export default HighlightOptions;
  