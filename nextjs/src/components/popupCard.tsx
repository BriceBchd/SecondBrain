import { title } from 'process';

type PopupCardProps = {
  title: string;
  message: string;
  color: string;
  onClose: () => void;
};

const PopupCard = ({ title, message, color, onClose }: PopupCardProps) => {
  const colorVariants: { [key: string]: string } = {
    red: 'bg-red-300',
    green: 'bg-green-300',
    blue: 'bg-blue-300',
  };

  return (
    <div
      className={`absolute bottom-14 flex flex-col items-center justify-center space-y-2 p-4 border-2 rounded-lg ${colorVariants[color]}`}
    >
      <button className='absolute top-2 right-2' onClick={onClose}>
        <svg
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={2.2}
          stroke='currentColor'
          className='w-6 h-6'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M6 18L18 6M6 6l12 12'
          />
        </svg>
      </button>
      <h2 className='text-md font-bold'>{title}</h2>
      <p>{message}</p>
    </div>
  );
};

// export props & component
export type { PopupCardProps };
export default PopupCard;
