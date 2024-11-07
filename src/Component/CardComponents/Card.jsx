/* eslint-disable react/prop-types */

const Card = ({ children, className }) => {
  return (
    <div
      className={`rounded-lg border text-card-foreground shadow-sm h-full bg-gray-800 border-gray-700 p-2 flex flex-col items-start ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
