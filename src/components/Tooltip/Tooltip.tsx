import {
  Children,
  Fragment,
  PropsWithChildren,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from 'react';

import useHover from '@/src/hooks/useHover';

import TooltipArrow from './TooltipArrow';

export type TooltipDirection = 'top' | 'bottom' | 'left' | 'right';
export type TooltipType = 'click' | 'focus' | 'hover';

export interface TooltipProps {
  message: string;
  type?: TooltipType;
  direction: TooltipDirection;
  hasArrow: boolean;
}

const Tooltip = ({
  type,
  hasArrow,
  message,
  direction,
  children,
}: PropsWithChildren<TooltipProps>) => {
  const [ref, isHovered] = useHover();
  const [isShow, setIsShow] = useState(false);
  const tooltipRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (!type) return;

    const handleEvent = () => setIsShow(prevShow => !prevShow);
    const targetElement = ref.current;

    if (targetElement) {
      if (type === 'hover') setIsShow(isHovered);
      else targetElement.addEventListener(type, handleEvent);

      return () => targetElement.removeEventListener(type, handleEvent);
    }
  }, [type, isHovered, ref]);

  const childElement = Children.only(children) as ReactElement;

  return (
    <div className='relative w-fit cursor-pointer'>
      <span ref={ref}>{childElement}</span>
      {isShow && (
        <span
          className='absolute z-10 w-24
          max-w-xs rounded-lg bg-primary px-4
          py-2  text-center text-sm leading-6 text-black shadow-sm'
          ref={tooltipRef}
          onAnimationEnd={() => {
            if (!isShow) {
              tooltipRef.current?.remove();
              tooltipRef.current = null;
            }
          }}
        >
          {message.split(',').map((item, index) => (
            <Fragment key={index}>{item}</Fragment>
          ))}
          {hasArrow && <TooltipArrow direction={direction} />}
        </span>
      )}
    </div>
  );
};

export default Tooltip;
