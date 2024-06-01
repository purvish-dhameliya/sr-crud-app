import PropTypes from "prop-types";

const InputBox = ({
  id,
  name,
  type,
  placeholder,
  value,
  onChange,
  className,
  ...rest
}) => {
  return (
    <input
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full px-3 py-2 mt-1 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${className}`}
      {...rest}
    />
  );
};

InputBox.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.oneOf(["text", "password", "email", "number", "search"]),
  placeholder: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string
};

export default InputBox;
