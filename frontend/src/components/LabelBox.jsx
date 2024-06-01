import PropTypes from "prop-types";

const LabelBox = ({ htmlFor, children, ...rest }) => {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-sm font-medium text-gray-700"
      {...rest}
    >
      {children}
    </label>
  );
};

LabelBox.propTypes = {
  htmlFor: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default LabelBox;
