import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

interface ProfileScreenProps {
  onBack: () => void;
}

const stats = [
  { label: 'Убийств', value: 1247, icon: 'Target', color: 'text-primary' },
  { label: 'Смертей', value: 892, icon: 'Skull', color: 'text-destructive' },
  { label: 'K/D Ratio', value: 1.4, icon: 'TrendingUp', color: 'text-secondary' },
  { label: 'Побед', value: 328, icon: 'Trophy', color: 'text-secondary' },
  { label: 'Матчей', value: 542, icon: 'Gamepad2', color: 'text-muted-foreground' },
  { label: 'Точность', value: '67%', icon: 'Crosshair', color: 'text-primary' },
];

export default function ProfileScreen({ onBack }: ProfileScreenProps) {
  const level = 42;
  const xp = 7800;
  const xpNeeded = 10000;
  const xpProgress = (xp / xpNeeded) * 100;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted/20">
      <div className="p-4 bg-card/80 backdrop-blur border-b border-primary/20">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <Icon name="ArrowLeft" size={24} />
          </Button>
          <h2 className="text-2xl font-bold">Профиль</h2>
          <Button variant="ghost" size="icon">
            <Icon name="Settings" size={24} />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4">
        <div className="max-w-2xl mx-auto space-y-6">
          <Card className="p-6 bg-card/50 backdrop-blur border-2 border-primary/20 animate-fade-in">
            <div className="flex items-center gap-6">
              <Avatar className="w-24 h-24 border-4 border-primary">
                <AvatarFallback className="bg-primary text-primary-foreground text-3xl font-bold">
                  BP
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-1">BlockPostPro</h3>
                <p className="text-muted-foreground mb-3">ID: #BP-2847</p>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-bold">Уровень {level}</span>
                    <span className="text-muted-foreground">{xp} / {xpNeeded} XP</span>
                  </div>
                  <Progress value={xpProgress} className="h-3" />
                </div>
              </div>
            </div>
          </Card>

          <div>
            <h3 className="text-xl font-bold mb-4 px-2">Статистика</h3>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <Card
                  key={stat.label}
                  className="p-5 bg-card/50 backdrop-blur border-primary/20 hover:border-primary/40 transition-all animate-scale-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Icon name={stat.icon as any} size={20} className={stat.color} />
                    <span className="text-sm text-muted-foreground">{stat.label}</span>
                  </div>
                  <div className="text-3xl font-bold">{stat.value}</div>
                </Card>
              ))}
            </div>
          </div>

          <Card className="p-6 bg-card/50 backdrop-blur border-primary/20 animate-slide-up">
            <h3 className="text-xl font-bold mb-4">Недавние матчи</h3>
            <div className="space-y-3">
              {[
                { map: 'Dust Valley', result: 'Победа', kd: '24/12', time: '2 часа назад' },
                { map: 'Industrial Zone', result: 'Поражение', kd: '18/15', time: '5 часов назад' },
                { map: 'Night City', result: 'Победа', kd: '31/8', time: '1 день назад' },
              ].map((match, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-muted/20 rounded-lg border border-border hover:border-primary/40 transition-colors"
                >
                  <div>
                    <div className="font-bold mb-1">{match.map}</div>
                    <div className="text-sm text-muted-foreground">{match.time}</div>
                  </div>
                  <div className="text-right">
                    <div className={`font-bold mb-1 ${match.result === 'Победа' ? 'text-primary' : 'text-destructive'}`}>
                      {match.result}
                    </div>
                    <div className="text-sm text-muted-foreground">{match.kd}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
