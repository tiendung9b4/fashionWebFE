const Container = ({ children, className }) => {
  return (
    <div className="flex justify-center w-full ">
      <div className={`flex flex-col md:flex-row container px-5 ${className}`}>
        {children}
      </div>
    </div>
  );
};

export default Container;
