import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useStore } from '@/utils/store';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/Toast';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { ShareButton, FacebookShareButton, TwitterShareButton, InstagramShareButton } from 'react-share';

interface SocialShareButtonProps {
  progressData: {
    totalDistance: number;
    caloriesBurned: number;
    totalDuration: number;
  };
}

const SocialShareButton: React.FC<SocialShareButtonProps> = ({ progressData }) => {
  const router = useRouter();
  const toast = useToast();
  const { user } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const handleShare = async (platform: string) => {
    setIsLoading(true);

    try {
      const shareUrl = `https://www.fittrack.com/user/${user?.id}/progress`;
      const shareTitle = 'Check out my fitness progress on FitTrack!';
      const shareText = `I've achieved ${progressData.totalDistance} km, burned ${progressData.caloriesBurned} calories, and logged ${progressData.totalDuration} minutes of workouts.`;

      if (platform === 'facebook') {
        await FacebookShareButton({
          url: shareUrl,
          quote: shareText,
        });
      } else if (platform === 'twitter') {
        await TwitterShareButton({
          url: shareUrl,
          text: shareText,
        });
      } else if (platform === 'instagram') {
        await InstagramShareButton({
          url: shareUrl,
          caption: shareText,
        });
      }

      toast.success('Progress shared successfully!');
    } catch (error) {
      console.error('Share error:', error);
      toast.error('Something went wrong while sharing. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex gap-2">
      <ShareButton
        url={`https://www.fittrack.com/user/${user?.id}/progress`}
        title="Check out my fitness progress on FitTrack!"
        className="flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-md py-2 px-4"
        onClick={() => handleShare('link')}
        disabled={isLoading}
      >
        <span className="text-gray-700 font-medium">Share Link</span>
      </ShareButton>

      <ShareButton
        url={`https://www.fittrack.com/user/${user?.id}/progress`}
        title="Check out my fitness progress on FitTrack!"
        className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 rounded-md py-2 px-4"
        onClick={() => handleShare('facebook')}
        disabled={isLoading}
      >
        <FaFacebook className="text-white mr-2" size={20} />
        <span className="text-white font-medium">Facebook</span>
      </ShareButton>

      <ShareButton
        url={`https://www.fittrack.com/user/${user?.id}/progress`}
        title="Check out my fitness progress on FitTrack!"
        className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 rounded-md py-2 px-4"
        onClick={() => handleShare('twitter')}
        disabled={isLoading}
      >
        <FaTwitter className="text-white mr-2" size={20} />
        <span className="text-white font-medium">Twitter</span>
      </ShareButton>

      <ShareButton
        url={`https://www.fittrack.com/user/${user?.id}/progress`}
        title="Check out my fitness progress on FitTrack!"
        className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 rounded-md py-2 px-4"
        onClick={() => handleShare('instagram')}
        disabled={isLoading}
      >
        <FaInstagram className="text-white mr-2" size={20} />
        <span className="text-white font-medium">Instagram</span>
      </ShareButton>
    </div>
  );
};

export default SocialShareButton;