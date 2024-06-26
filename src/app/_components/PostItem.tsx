import Image from 'next/image';

import { PostListContent } from '@/src/apis/postList';
import { isValidImageUrl } from '@/src/app/(main)/utils';
import Icon from '@/src/components/Icon';
import timeOffset from '@/src/utils/timeOffset';

interface PostItemProps {
  post: PostListContent;
}

const PostItem = ({ post }: PostItemProps) => {
  const {
    title,
    voterCount: votedCount,
    likeCount: likedCount,
    commentCount: commentedCount,
    author,
    profileImageUrl,
    postImageUrl: imageUrl,
    createdAt,
  } = post;

  const validatedImageUrl = isValidImageUrl(imageUrl)
    ? imageUrl
    : '/placeHolder_130.png';

  const validatedProfileImageUrl = isValidImageUrl(profileImageUrl)
    ? profileImageUrl
    : '/placeHolder_20.png';

  return (
    <div className='flex w-full cursor-pointer justify-start gap-4 border-b bg-dark-accent2 p-4 pb-4 text-white'>
      <div className='flex w-full flex-col justify-between gap-1'>
        <span>{title}</span>
        <div className='flex items-center gap-1'>
          <Icon id='check' size={16} />
          <span className='text-xs text-gray-accent2'>{`총 ${votedCount}명 투표중`}</span>
        </div>
        <div className='flex gap-4'>
          <span className='flex items-center gap-2'>
            <Image
              src={validatedProfileImageUrl}
              alt='사용자 프로필'
              className='rounded-full object-cover'
              width={20}
              height={20}
            />
            <span className='text-sm text-gray-accent1'>{author}</span>
            <span className='text-xs text-gray-accent2'>
              {timeOffset(createdAt)}
            </span>
          </span>
          <span className='flex gap-2 text-gray-accent1'>
            <span className='flex items-center gap-1'>
              <Icon id='heart' aria-label='좋아요 수' />
              <span>{likedCount}</span>
            </span>
            <span className='flex items-center gap-1'>
              <Icon id='comment' aria-label='댓글 수' />
              <span>{commentedCount}</span>
            </span>
          </span>
        </div>
      </div>
      <Image
        src={validatedImageUrl}
        alt='게시글이미지'
        width={60}
        height={60}
        className='aspect-square h-fit self-center rounded-md object-cover'
      />
    </div>
  );
};

export default PostItem;
