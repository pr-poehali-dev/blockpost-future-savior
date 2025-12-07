import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { soundManager } from '@/utils/sounds';

interface GameScreenProps {
  onBack: () => void;
}

interface Enemy {
  id: number;
  name: string;
  health: number;
  maxHealth: number;
  x: number;
  y: number;
  isPlayer: boolean;
}

interface Player {
  id: number;
  name: string;
  kills: number;
  deaths: number;
}

export default function GameScreen({ onBack }: GameScreenProps) {
  const [score, setScore] = useState(0);
  const [kills, setKills] = useState(0);
  const [deaths, setDeaths] = useState(0);
  const [health, setHealth] = useState(100);
  const [ammo, setAmmo] = useState(30);
  const [enemies, setEnemies] = useState<Enemy[]>([]);
  const [onlinePlayers, setOnlinePlayers] = useState<Player[]>([
    { id: 1, name: 'ShadowHunter', kills: 12, deaths: 3 },
    { id: 2, name: 'NightRider', kills: 8, deaths: 5 },
    { id: 3, name: 'PhantomStrike', kills: 15, deaths: 2 },
  ]);
  const [showPlayerList, setShowPlayerList] = useState(false);

  useEffect(() => {
    const spawnEnemy = () => {
      const isPlayerEnemy = Math.random() > 0.5;
      const newEnemy: Enemy = {
        id: Date.now(),
        name: isPlayerEnemy 
          ? onlinePlayers[Math.floor(Math.random() * onlinePlayers.length)].name
          : `NPC-${Math.floor(Math.random() * 100)}`,
        health: 100,
        maxHealth: 100,
        x: Math.random() * 80 + 10,
        y: Math.random() * 60 + 20,
        isPlayer: isPlayerEnemy,
      };
      setEnemies(prev => [...prev, newEnemy]);
    };

    spawnEnemy();
    const interval = setInterval(() => {
      if (enemies.length < 3) {
        spawnEnemy();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [enemies.length, onlinePlayers]);

  useEffect(() => {
    const damageInterval = setInterval(() => {
      if (enemies.length > 0 && health > 0) {
        const damage = Math.floor(Math.random() * 15) + 5;
        setHealth(prev => {
          const newHealth = Math.max(0, prev - damage);
          if (newHealth === 0) {
            soundManager.play('error');
            setDeaths(d => d + 1);
            setTimeout(() => setHealth(100), 3000);
          }
          return newHealth;
        });
      }
    }, 4000);

    return () => clearInterval(damageInterval);
  }, [enemies.length, health]);

  const handleShoot = () => {
    if (ammo > 0 && enemies.length > 0) {
      soundManager.play('shoot');
      setAmmo(ammo - 1);
      
      const targetEnemy = enemies[Math.floor(Math.random() * enemies.length)];
      const damage = Math.floor(Math.random() * 30) + 20;
      
      setEnemies(prev => prev.map(enemy => {
        if (enemy.id === targetEnemy.id) {
          const newHealth = Math.max(0, enemy.health - damage);
          if (newHealth === 0) {
            soundManager.play('success');
            setKills(kills + 1);
            setScore(score + (enemy.isPlayer ? 200 : 100));
            setTimeout(() => {
              setEnemies(e => e.filter(en => en.id !== enemy.id));
            }, 500);
          }
          return { ...enemy, health: newHealth };
        }
        return enemy;
      }));
    } else if (ammo === 0) {
      soundManager.play('error');
    }
  };

  const handleReload = () => {
    soundManager.play('reload');
    setAmmo(30);
  };

  const handleBack = () => {
    soundManager.play('click');
    onBack();
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted/20">
      <div className="p-4 bg-card/80 backdrop-blur border-b border-primary/20">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={handleBack}>
            <Icon name="ArrowLeft" size={24} />
          </Button>
          <div className="flex gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Icon name="Target" size={16} className="text-primary" />
              <span className="font-bold">{kills}</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Skull" size={16} className="text-destructive" />
              <span className="font-bold">{deaths}</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Star" size={16} className="text-secondary" />
              <span className="font-bold">{score}</span>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => {
              soundManager.play('click');
              setShowPlayerList(!showPlayerList);
            }}
          >
            <Icon name="Users" size={24} />
          </Button>
        </div>
      </div>

      <div className="flex-1 relative p-4">
        <div className="absolute inset-0 bg-gradient-to-br from-muted/10 via-transparent to-primary/5">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-8 h-8 border-2 border-primary rounded-full flex items-center justify-center animate-pulse">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
            </div>
          </div>

          {enemies.map(enemy => (
            <div
              key={enemy.id}
              className="absolute transition-all duration-300 animate-fade-in"
              style={{
                left: `${enemy.x}%`,
                top: `${enemy.y}%`,
              }}
            >
              <div className="relative">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  enemy.isPlayer ? 'bg-secondary/30' : 'bg-destructive/30'
                } border-2 ${enemy.health === 0 ? 'opacity-0' : 'opacity-100'} transition-opacity`}>
                  <Icon 
                    name={enemy.isPlayer ? "User" : "Bot"} 
                    size={24} 
                    className={enemy.isPlayer ? 'text-secondary' : 'text-destructive'}
                  />
                </div>
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  <Badge variant={enemy.isPlayer ? "secondary" : "destructive"} className="text-xs">
                    {enemy.name}
                  </Badge>
                </div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-16">
                  <Progress value={(enemy.health / enemy.maxHealth) * 100} className="h-1" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {showPlayerList && (
          <Card className="absolute top-4 right-4 p-4 w-64 bg-card/95 backdrop-blur border-primary/20 animate-scale-in">
            <div className="space-y-3">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold">Онлайн игроки</h3>
                <Badge variant="secondary">{onlinePlayers.length + 1}</Badge>
              </div>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                <div className="flex items-center justify-between p-2 bg-primary/10 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Icon name="User" size={16} className="text-primary" />
                    <span className="text-sm font-bold">RoadBlockPro (Вы)</span>
                  </div>
                  <div className="text-xs text-muted-foreground">{kills}/{deaths}</div>
                </div>
                {onlinePlayers.map(player => (
                  <div key={player.id} className="flex items-center justify-between p-2 bg-muted/20 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Icon name="User" size={16} className="text-muted-foreground" />
                      <span className="text-sm">{player.name}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">{player.kills}/{player.deaths}</div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        )}

        <Card className="absolute bottom-4 left-4 right-4 p-6 bg-card/90 backdrop-blur border-primary/20">
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
              {health === 0 && (
                <p className="text-xs text-destructive animate-pulse">Воскрешение через 3 секунды...</p>
              )}
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
                disabled={ammo === 0 || health === 0}
                size="lg"
                className="h-16 text-lg pulse-glow"
              >
                <Icon name="Crosshair" className="mr-2" size={24} />
                Огонь
              </Button>
              <Button
                onClick={handleReload}
                disabled={health === 0}
                variant="outline"
                size="lg"
                className="h-16 text-lg"
              >
                <Icon name="RotateCw" className="mr-2" size={24} />
                Перезарядка
              </Button>
            </div>

            {enemies.length === 0 && health > 0 && (
              <p className="text-center text-sm text-muted-foreground animate-pulse">
                Ожидание противников...
              </p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
