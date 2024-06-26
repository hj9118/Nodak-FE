import React, { ChangeEvent, useEffect, useState } from 'react';

import Icon from '@/src/components/Icon';
import { cn } from '@/src/utils/cn';

import TextInput from '../TextInput';

const MIN_LIMIT = 2;
const MAX_LIMIT = 6;

interface VoteFormProps {
  onChange: (channel: string[]) => void;
  error?: string | undefined;
}

const VoteForm = ({ onChange, error }: VoteFormProps) => {
  const [options, setOptions] = useState<string[]>(
    new Array(MIN_LIMIT).fill(''),
  );

  useEffect(() => {
    onChange(options);
  }, [options, onChange]);

  const handleOptionChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const newOptions = [...options];
    newOptions[index] = event.target.value;
    setOptions(newOptions);
  };

  const handleAddOption = () => {
    if (options.length === MAX_LIMIT) return;
    setOptions([...options, '']);
  };

  const handleRemoveOption = (index: number) => {
    if (options.length === 2) return;
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
  };

  const isOptionvalid = (option: string): boolean => {
    return option.length >= 1 && option.length <= 20;
  };

  return (
    <div className='flex flex-col gap-1 rounded-md bg-dark-accent1 p-2'>
      {options.map((option, index) => (
        <div key={`${index}`}>
          <div className='flex w-full items-center gap-1 bg-dark-accent1 p-2'>
            <TextInput
              value={option}
              onChange={event => handleOptionChange(index, event)}
              variant={error && !isOptionvalid(option) ? 'error' : 'default'}
              className={cn('border text-gray-accent1', {
                'mr-8': [0, 1].includes(index),
              })}
              placeholder='투표항목을 입력하세요.'
            />
            <Icon
              id='subtract-circle'
              className={cn('cursor-pointer text-red-400 hover:text-red-600', {
                'cursor-not-allowed opacity-50 hover:text-red-400':
                  options.length === 2,
                hidden: [0, 1].includes(index),
              })}
              size={24}
              onClick={() => {
                handleRemoveOption(index);
              }}
            />
          </div>
          {error && !isOptionvalid(option) && (
            <span className='mt-1 pl-2 text-sm text-red-500'>{error}</span>
          )}
        </div>
      ))}
      <button
        type='button'
        onClick={handleAddOption}
        className={cn('ml-2 mr-10 rounded-md bg-dark-accent2 p-2 text-white', {
          'cursor-not-allowed opacity-50': options.length === 6,
        })}
      >
        선택항목 추가
      </button>
    </div>
  );
};

export default VoteForm;
