import PropTypes from "prop-types";
const ButtonBox = ({
  type,
  children,
  onClick,
  disabled,
  className,
  ...rest
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`w-full px-4 py-2 font-bold text-white rounded-md focus:outline-none ${className} bg-gray-600`}
      {...rest}
    >
      {children}
    </button>
  );
};

ButtonBox.propTypes = {
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string
};

export default ButtonBox;
