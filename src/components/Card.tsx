import clsx from 'clsx';

const Card = ({ className, childern }) => {
  return (
    <div
      className={clsx(
        'rounded-3xl px-10 py-4 drop-shadow-xl bg-white',
        className,
      )}
    >
      {childern}
    </div>
  );
};

export default Card;
