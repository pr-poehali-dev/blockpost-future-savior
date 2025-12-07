import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

interface ChallengesScreenProps {
  onBack: () => void;
}

const dailyChallenges = [
  { id: 1, name: 'Охотник за головами', desc: 'Совершите 10 убийств хэдшотами', progress: 7, total: 10, reward: 500, icon: 'Target' },
  { id: 2, name: 'Марафонец', desc: 'Сыграйте 5 матчей', progress: 3, total: 5, reward: 300, icon: 'Gamepad2' },
  { id: 3, name: 'Покупатель', desc: 'Купите оружие в магазине 3 раза', progress: 3, total: 3, reward: 200, icon: 'ShoppingCart' },
];

const seasonalEvents = [
  { 
    id: 1, 
    name: 'Зимний турнир', 
    desc: 'Займите топ-100 в рейтинге', 
    timeLeft: '12 дней', 
    reward: '5000 + Эксклюзивный скин',
    icon: 'Snowflake',
    participants: 4285
  },
  { 
    id: 2, 
    name: 'Режим "Выживание"', 
    desc: 'Ограниченный режим на выходные', 
    timeLeft: '2 дня', 
    reward: '1000 за победу',
    icon: 'Zap',
    participants: 1842
  },
];

export default function ChallengesScreen({ onBack }: ChallengesScreenProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted/20">
      <div className="p-4 bg-card/80 backdrop-blur border-b border-primary/20">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <Icon name="ArrowLeft" size={24} />
          </Button>
          <h2 className="text-2xl font-bold">Вызовы</h2>
          <div className="w-10" />
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4">
        <div className="max-w-2xl mx-auto space-y-6">
          <div>
            <div className="flex items-center justify-between mb-4 px-2">
              <h3 className="text-xl font-bold">Ежедневные вызовы</h3>
              <Badge variant="outline" className="text-sm">
                <Icon name="Clock" size={14} className="mr-1" />
                Обновление через 8ч
              </Badge>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {dailyChallenges.map((challenge, index) => (
                <Card
                  key={challenge.id}
                  className="p-6 bg-card/50 backdrop-blur border-primary/20 hover:border-primary/40 transition-all animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex gap-4">
                    <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center border-2 border-primary/30">
                      <Icon name={challenge.icon as any} size={28} className="text-primary" />
                    </div>

                    <div className="flex-1">
                      <h4 className="font-bold text-lg mb-1">{challenge.name}</h4>
                      <p className="text-sm text-muted-foreground mb-3">{challenge.desc}</p>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Прогресс</span>
                          <span className="font-bold">
                            {challenge.progress}/{challenge.total}
                          </span>
                        </div>
                        <Progress 
                          value={(challenge.progress / challenge.total) * 100} 
                          className="h-2" 
                        />
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-2 text-secondary">
                          <Icon name="Coins" size={16} />
                          <span className="font-bold">+{challenge.reward}</span>
                        </div>
                        {challenge.progress === challenge.total ? (
                          <Button size="sm" className="h-8">
                            Забрать
                          </Button>
                        ) : (
                          <Button size="sm" variant="outline" className="h-8">
                            В процессе
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 px-2">Сезонные события</h3>
            <div className="grid grid-cols-1 gap-4">
              {seasonalEvents.map((event, index) => (
                <Card
                  key={event.id}
                  className="p-6 bg-gradient-to-br from-card/50 to-secondary/5 backdrop-blur border-2 border-secondary/30 hover:border-secondary/50 transition-all animate-scale-in"
                  style={{ animationDelay: `${(dailyChallenges.length + index) * 0.1}s` }}
                >
                  <div className="flex gap-4 mb-4">
                    <div className="w-16 h-16 rounded-xl bg-secondary/20 flex items-center justify-center border-2 border-secondary pulse-glow">
                      <Icon name={event.icon as any} size={32} className="text-secondary" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-bold text-xl">{event.name}</h4>
                        <Badge variant="secondary" className="bg-secondary">
                          {event.timeLeft}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{event.desc}</p>
                      
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Icon name="Users" size={16} className="text-primary" />
                          <span>{event.participants} участников</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-muted/30 rounded-lg p-4 border border-border">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Награда</div>
                        <div className="font-bold text-secondary">{event.reward}</div>
                      </div>
                      <Button className="pulse-glow">
                        Участвовать
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
