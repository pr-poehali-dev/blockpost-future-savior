import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

interface AchievementsScreenProps {
  onBack: () => void;
}

const achievements = [
  { id: 1, name: 'Первая кровь', desc: 'Совершите первое убийство', progress: 100, total: 1, icon: 'Sword', completed: true },
  { id: 2, name: 'Снайпер', desc: 'Убийте 100 врагов из снайперской винтовки', progress: 67, total: 100, icon: 'Crosshair', completed: false },
  { id: 3, name: 'Неуязвимый', desc: 'Выиграйте матч без единой смерти', progress: 100, total: 1, icon: 'Shield', completed: true },
  { id: 4, name: 'Легенда', desc: 'Достигните 50 уровня', progress: 84, total: 50, icon: 'Crown', completed: false },
  { id: 5, name: 'Коллекционер', desc: 'Соберите 25 различных скинов', progress: 56, total: 25, icon: 'Package', completed: false },
  { id: 6, name: 'Мастер гранат', desc: 'Убейте 50 врагов гранатами', progress: 100, total: 50, icon: 'Bomb', completed: true },
];

export default function AchievementsScreen({ onBack }: AchievementsScreenProps) {
  const completedCount = achievements.filter(a => a.completed).length;
  const totalCount = achievements.length;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted/20">
      <div className="p-4 bg-card/80 backdrop-blur border-b border-primary/20">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <Icon name="ArrowLeft" size={24} />
          </Button>
          <h2 className="text-2xl font-bold">Достижения</h2>
          <div className="w-10" />
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4">
        <div className="max-w-2xl mx-auto space-y-6">
          <Card className="p-6 bg-card/50 backdrop-blur border-2 border-primary/20 animate-fade-in">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold">Прогресс достижений</h3>
              <Badge variant="secondary" className="text-lg px-4 py-1">
                {completedCount}/{totalCount}
              </Badge>
            </div>
            <Progress value={(completedCount / totalCount) * 100} className="h-3" />
          </Card>

          <div className="grid grid-cols-1 gap-4">
            {achievements.map((achievement, index) => (
              <Card
                key={achievement.id}
                className={`p-6 bg-card/50 backdrop-blur border-primary/20 hover:border-primary/40 transition-all animate-scale-in ${
                  achievement.completed ? 'border-secondary/50' : ''
                }`}
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <div className="flex gap-4">
                  <div
                    className={`w-16 h-16 rounded-xl flex items-center justify-center border-2 ${
                      achievement.completed
                        ? 'bg-secondary/20 border-secondary'
                        : 'bg-muted/20 border-primary/20'
                    }`}
                  >
                    <Icon
                      name={achievement.icon as any}
                      size={32}
                      className={achievement.completed ? 'text-secondary' : 'text-primary'}
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-lg mb-1">{achievement.name}</h3>
                        <p className="text-sm text-muted-foreground">{achievement.desc}</p>
                      </div>
                      {achievement.completed && (
                        <Icon name="CheckCircle2" size={24} className="text-secondary" />
                      )}
                    </div>

                    {!achievement.completed && (
                      <div className="space-y-2 mt-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Прогресс</span>
                          <span className="font-bold">
                            {achievement.progress}/{achievement.total}
                          </span>
                        </div>
                        <Progress value={(achievement.progress / achievement.total) * 100} className="h-2" />
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
