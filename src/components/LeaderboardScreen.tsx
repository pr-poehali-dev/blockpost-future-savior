import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import { soundManager } from '@/utils/sounds';

interface LeaderboardScreenProps {
  onBack: () => void;
}

const leaderboardData = [
  { rank: 1, name: 'ShadowHunter', score: 45280, kd: 3.8, avatar: 'SH', tier: 'legend' },
  { rank: 2, name: 'NightRider', score: 42150, kd: 3.5, avatar: 'NR', tier: 'legend' },
  { rank: 3, name: 'PhantomStrike', score: 39870, kd: 3.2, avatar: 'PS', tier: 'legend' },
  { rank: 4, name: 'VortexKing', score: 37440, kd: 3.0, avatar: 'VK', tier: 'master' },
  { rank: 5, name: 'ThunderBolt', score: 35920, kd: 2.9, avatar: 'TB', tier: 'master' },
  { rank: 6, name: 'CyberNinja', score: 33150, kd: 2.7, avatar: 'CN', tier: 'master' },
  { rank: 7, name: 'BlazeFury', score: 31280, kd: 2.6, avatar: 'BF', tier: 'diamond' },
  { rank: 8, name: 'IceBreaker', score: 29500, kd: 2.5, avatar: 'IB', tier: 'diamond' },
  { rank: 9, name: 'StormRaider', score: 27840, kd: 2.4, avatar: 'SR', tier: 'diamond' },
  { rank: 10, name: 'RoadBlockPro', score: 25670, kd: 2.3, avatar: 'RB', tier: 'diamond', isCurrentUser: true },
];

const tierColors: Record<string, { bg: string; text: string }> = {
  legend: { bg: 'bg-secondary/20', text: 'text-secondary' },
  master: { bg: 'bg-purple-500/20', text: 'text-purple-400' },
  diamond: { bg: 'bg-primary/20', text: 'text-primary' },
};

const getRankColor = (rank: number) => {
  if (rank === 1) return 'text-secondary';
  if (rank === 2) return 'text-gray-400';
  if (rank === 3) return 'text-amber-600';
  return 'text-muted-foreground';
};

const getRankIcon = (rank: number) => {
  if (rank === 1) return '👑';
  if (rank === 2) return '🥈';
  if (rank === 3) return '🥉';
  return null;
};

export default function LeaderboardScreen({ onBack }: LeaderboardScreenProps) {
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
          <h2 className="text-2xl font-bold">Таблица лидеров</h2>
          <div className="w-10" />
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4">
        <div className="max-w-2xl mx-auto space-y-4">
          <Card className="p-6 bg-card/50 backdrop-blur border-2 border-primary/20 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold mb-1">Сезон 5</h3>
                <p className="text-sm text-muted-foreground">Обновляется каждый час</p>
              </div>
              <Badge variant="secondary" className="text-lg px-4 py-2">
                <Icon name="Clock" size={16} className="mr-2" />
                12 дней
              </Badge>
            </div>
          </Card>

          <div className="space-y-3">
            {leaderboardData.map((player, index) => (
              <Card
                key={player.rank}
                className={`p-5 bg-card/50 backdrop-blur transition-all hover:border-primary/40 animate-scale-in ${
                  player.isCurrentUser
                    ? 'border-2 border-primary/50 bg-primary/5'
                    : 'border-primary/20'
                }`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-12">
                    {getRankIcon(player.rank) ? (
                      <span className="text-3xl">{getRankIcon(player.rank)}</span>
                    ) : (
                      <span className={`text-2xl font-bold ${getRankColor(player.rank)}`}>
                        #{player.rank}
                      </span>
                    )}
                  </div>

                  <Avatar className={`w-14 h-14 border-2 ${
                    player.isCurrentUser ? 'border-primary' : 'border-muted'
                  }`}>
                    <AvatarFallback className={`${
                      tierColors[player.tier].bg
                    } ${tierColors[player.tier].text} font-bold`}>
                      {player.avatar}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className={`font-bold text-lg ${
                        player.isCurrentUser ? 'text-primary' : ''
                      }`}>
                        {player.name}
                      </h3>
                      {player.isCurrentUser && (
                        <Badge variant="secondary" className="text-xs">
                          Вы
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Icon name="Star" size={14} className="text-secondary" />
                        <span>{player.score.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon name="TrendingUp" size={14} className="text-primary" />
                        <span>K/D {player.kd}</span>
                      </div>
                    </div>
                  </div>

                  <Badge 
                    className={`${tierColors[player.tier].bg} ${tierColors[player.tier].text} border-none`}
                    variant="outline"
                  >
                    {player.tier}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>

          <Card className="p-6 bg-gradient-to-br from-card/50 to-primary/5 backdrop-blur border-2 border-primary/30 animate-slide-up">
            <div className="text-center space-y-3">
              <Icon name="Trophy" size={48} className="text-secondary mx-auto" />
              <h3 className="text-xl font-bold">Поднимайтесь в рейтинге!</h3>
              <p className="text-sm text-muted-foreground">
                Играйте больше матчей и улучшайте свою статистику
              </p>
              <Button 
                size="lg" 
                className="w-full pulse-glow"
                onClick={() => {
                  soundManager.play('click');
                }}
              >
                <Icon name="Play" className="mr-2" size={20} />
                Играть сейчас
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
