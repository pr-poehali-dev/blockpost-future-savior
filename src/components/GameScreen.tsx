import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Progress } from '@/components/ui/progress';
import { soundManager } from '@/utils/sounds';

interface GameScreenProps {
  onBack: () => void;
}

export default function GameScreen({ onBack }: GameScreenProps) {
  const [score, setScore] = useState(0);
  const [kills, setKills] = useState(0);
  const [health, setHealth] = useState(100);
  const [ammo, setAmmo] = useState(30);

  const handleShoot = () => {
    if (ammo > 0) {
      soundManager.play('shoot');
      setAmmo(ammo - 1);
      const hit = Math.random() > 0.5;
      if (hit) {
        setKills(kills + 1);
        setScore(score + 100);
        soundManager.play('success');
      }
    } else {
      soundManager.play('error');
    }
  };

  const handleReload = () => {
    soundManager.play('reload');
    setAmmo(30);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted/20">
      <div className="p-4 bg-card/80 backdrop-blur border-b border-primary/20">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <Icon name="ArrowLeft" size={24} />
          </Button>
          <div className="flex gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Icon name="Target" size={16} className="text-primary" />
              <span className="font-bold">{kills}</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Star" size={16} className="text-secondary" />
              <span className="font-bold">{score}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 relative p-4">
        <div className="absolute inset-0 bg-gradient-to-br from-muted/10 via-transparent to-primary/5">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-8 h-8 border-2 border-primary rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
            </div>
          </div>
        </div>

        <Card className="absolute bottom-4 left-4 right-4 p-6 bg-card/90 backdrop-blur border-primary/20 animate-slide-up">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <Icon name="Heart" size={16} className="text-destructive" />
                  Здоровье
                </span>
                <span className="font-bold">{health}%</span>
              </div>
              <Progress value={health} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <Icon name="Zap" size={16} className="text-secondary" />
                  Патроны
                </span>
                <span className="font-bold">{ammo}/30</span>
              </div>
              <Progress value={(ammo / 30) * 100} className="h-2" />
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <Button
                onClick={handleShoot}
                disabled={ammo === 0}
                size="lg"
                className="h-16 text-lg pulse-glow"
              >
                <Icon name="Crosshair" className="mr-2" size={24} />
                Огонь
              </Button>
              <Button
                onClick={handleReload}
                variant="outline"
                size="lg"
                className="h-16 text-lg"
              >
                <Icon name="RotateCw" className="mr-2" size={24} />
                Перезарядка
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}