import Link from 'next/link';
import clsx from 'clsx';

type MobileItemProps = {
  href: string;
  icon: any;
  onClick: () => void;
  active?: boolean;
};

export default function MobileItem({ href, icon: Icon, onClick, active }: MobileItemProps) {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <Link
      onClick={handleClick}
      href={href}
      className={clsx(
        `
          group 
          flex 
          gap-x-3 
          text-sm 
          leading-6 
          font-semibold 
          w-full 
          justify-center 
          p-4 
          text-gray-500 
          hover:text-black 
          hover:bg-gray-100
        `,
        active && 'bg-gray-100 text-black'
      )}
    >
      <Icon className='h-6 w-6' />
    </Link>
  );
}
