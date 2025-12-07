import { useState } from 'react';
import MainMenu from '@/components/MainMenu';
import GameScreen from '@/components/GameScreen';
import ShopScreen from '@/components/ShopScreen';
import ProfileScreen from '@/components/ProfileScreen';
import AchievementsScreen from '@/components/AchievementsScreen';
import ChallengesScreen from '@/components/ChallengesScreen';

type Screen = 'menu' | 'game' | 'shop' | 'profile' | 'achievements' | 'challenges';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('menu');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'menu':
        return <MainMenu onNavigate={setCurrentScreen} />;
      case 'game':
        return <GameScreen onBack={() => setCurrentScreen('menu')} />;
      case 'shop':
        return <ShopScreen onBack={() => setCurrentScreen('menu')} />;
      case 'profile':
        return <ProfileScreen onBack={() => setCurrentScreen('menu')} />;
      case 'achievements':
        return <AchievementsScreen onBack={() => setCurrentScreen('menu')} />;
      case 'challenges':
        return <ChallengesScreen onBack={() => setCurrentScreen('menu')} />;
      default:
        return <MainMenu onNavigate={setCurrentScreen} />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {renderScreen()}
    </div>
  );
};

export default Index;