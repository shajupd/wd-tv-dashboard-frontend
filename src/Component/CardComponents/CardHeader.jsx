/* eslint-disable react/prop-types */
const CardHeader = ({ children }) => {
  return (
    <div className="whitespace-nowrap font-semibold tracking-tight text-lg text-gray-300">
      {children}
    </div>
  );
};

export default CardHeader;
