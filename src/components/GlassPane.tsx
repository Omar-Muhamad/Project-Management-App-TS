import clsx from 'clsx';

const GlassPane = ({ children, className }) => {
  return (
    <div
      className={clsx(
        'backdrop-blur-lg bg-[rgba(255, 255, 255, 0.4)] rounded-2xl border-solid border-2 border-gray-200',
        className,
      )}
    >
      {children}
    </div>
  );
};

export default GlassPane;
