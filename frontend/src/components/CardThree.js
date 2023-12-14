const CardThree = () => {
    return (
      <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-activity" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M6 2a.5.5 0 0 1 .47.33L10 12.036l1.53-4.208A.5.5 0 0 1 12 7.5h3.5a.5.5 0 0 1 0 1h-3.15l-1.88 5.17a.5.5 0 0 1-.94 0L6 3.964 4.47 8.171A.5.5 0 0 1 4 8.5H.5a.5.5 0 0 1 0-1h3.15l1.88-5.17A.5.5 0 0 1 6 2"/>
  </svg>
        </div>
  
        <div className="mt-4 flex items-end justify-between">
          <div>
            <h4 className="text-title-md font-bold text-black dark:text-white">
              20
            </h4>
            <span className="text-sm font-medium">Heart Point</span>
          </div>
        </div>
      </div>
    );
  };
  
  export default CardThree;
  