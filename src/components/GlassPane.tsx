import clsx from 'clsx';

const GlassPane = ({ children, className }) => {
  return (
    <div
      className={clsx(
        'bg-white bg-opacity-40 backdrop-blur-lg rounded-3xl border-solid border-2 border-gray-200',
        className,
      )}
    >
      {children}
    </div>
  );
};

export default GlassPane;
