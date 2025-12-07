import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { soundManager } from '@/utils/sounds';

interface MainMenuProps {
  onNavigate: (screen: string) => void;
}

export default function MainMenu({ onNavigate }: MainMenuProps) {
  const handleNavigate = (screen: string) => {
    soundManager.play('click');
    onNavigate(screen);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-background to-background/80">
      <div className="max-w-md w-full space-y-8 animate-fade-in">
        <div className="text-center space-y-4">
          <h1 className="text-6xl font-bold text-primary animate-scale-in">
            ROADBLOCK
          </h1>
          <p className="text-2xl text-muted-foreground">MOBILE</p>
        </div>

        <Card className="p-8 space-y-4 bg-card/50 backdrop-blur border-2 border-primary/20">
          <Button
            onClick={() => handleNavigate('game')}
            size="lg"
            className="w-full text-lg h-14 pulse-glow hover:scale-105 transition-transform"
          >
            <Icon name="Play" className="mr-2" size={24} />
            Начать игру
          </Button>

          <Button
            onClick={() => handleNavigate('profile')}
            variant="outline"
            size="lg"
            className="w-full text-lg h-14 hover:bg-primary/10 hover:scale-105 transition-transform"
          >
            <Icon name="User" className="mr-2" size={24} />
            Профиль
          </Button>

          <Button
            onClick={() => handleNavigate('shop')}
            variant="outline"
            size="lg"
            className="w-full text-lg h-14 hover:bg-secondary/10 hover:scale-105 transition-transform"
          >
            <Icon name="ShoppingCart" className="mr-2" size={24} />
            Магазин
          </Button>

          <Button
            onClick={() => handleNavigate('achievements')}
            variant="outline"
            size="lg"
            className="w-full text-lg h-14 hover:bg-accent/10 hover:scale-105 transition-transform"
          >
            <Icon name="Trophy" className="mr-2" size={24} />
            Достижения
          </Button>

          <Button
            onClick={() => handleNavigate('challenges')}
            variant="outline"
            size="lg"
            className="w-full text-lg h-14 hover:bg-muted hover:scale-105 transition-transform"
          >
            <Icon name="Target" className="mr-2" size={24} />
            Вызовы
          </Button>

          <Button
            onClick={() => soundManager.play('click')}
            variant="ghost"
            size="lg"
            className="w-full text-lg h-14 hover:bg-muted/50"
          >
            <Icon name="Settings" className="mr-2" size={24} />
            Настройки
          </Button>
        </Card>

        <div className="text-center text-sm text-muted-foreground animate-slide-up">
          <p>Сезон 5 • Осталось 12 дней</p>
        </div>
      </div>
    </div>
  );
}