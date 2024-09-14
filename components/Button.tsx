import { useState } from 'react';
import { ButtonProps } from '@/types';
import { BsCheckCircleFill, BsExclamationCircleFill } from 'react-icons/bs';

const Button: React.FC<ButtonProps> = ({
  label,
  type = 'primary',
  isLoading = false,
  onClick,
  disabled = false,
  className = '',
  icon,
  variant,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (!disabled && !isLoading && onClick) {
      onClick();
    }
  };

  const buttonClasses = `
    ${
      type === 'primary'
        ? 'bg-blue-500 hover:bg-blue-700 text-white'
        : type === 'secondary'
        ? 'bg-gray-300 hover:bg-gray-400 text-gray-700'
        : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
    }
    ${isLoading ? 'opacity-50 cursor-wait' : ''}
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    ${variant === 'danger' ? 'bg-red-500 hover:bg-red-700 text-white' : ''}
    ${variant === 'warning' ? 'bg-yellow-500 hover:bg-yellow-700 text-white' : ''}
    ${variant === 'success' ? 'bg-green-500 hover:bg-green-700 text-white' : ''}
    px-4 py-2 rounded-md font-medium
    ${className}
  `;

  return (
    <button
      className={buttonClasses}
      onClick={handleClick}
      disabled={disabled || isLoading}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-gray-800"></span>
        </div>
      ) : (
        <>
          {icon && (
            <span className="mr-2">
              {icon === 'check' ? (
                <BsCheckCircleFill className="text-green-500" size={18} />
              ) : icon === 'error' ? (
                <BsExclamationCircleFill className="text-red-500" size={18} />
              ) : (
                icon
              )}
            </span>
          )}
          {label}
        </>
      )}
    </button>
  );
};

export default Button;