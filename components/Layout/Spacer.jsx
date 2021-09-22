const Spacer = ({ size, axis }) => {
  const width = axis === 'vertical' ? 1 : size * 24;
  const height = axis === 'horizontal' ? 1 : size * 24;
  return (
    <span
      style={{
        display: 'block',
        width,
        minWidth: width,
        height,
        minHeight: height,
      }}
      aria-hidden="true"
    />
  );
};

export default Spacer;
