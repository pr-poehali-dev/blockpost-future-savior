import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { soundManager } from '@/utils/sounds';
import { useToast } from '@/hooks/use-toast';

interface ShopScreenProps {
  onBack: () => void;
}

const shopItems = [
  { id: 1, name: 'Золотой AK-47', price: 5000, icon: 'Crosshair', rarity: 'legendary' },
  { id: 2, name: 'Скин "Огонь"', price: 2500, icon: 'Flame', rarity: 'epic' },
  { id: 3, name: 'Защитная броня', price: 1500, icon: 'Shield', rarity: 'rare' },
  { id: 4, name: 'x2 Опыт (7 дней)', price: 1000, icon: 'Zap', rarity: 'common' },
  { id: 5, name: 'Элитный пропуск', price: 3500, icon: 'Crown', rarity: 'legendary' },
  { id: 6, name: 'Граната x10', price: 500, icon: 'Bomb', rarity: 'common' },
];

const rarityColors: Record<string, string> = {
  legendary: 'bg-secondary',
  epic: 'bg-purple-500',
  rare: 'bg-primary',
  common: 'bg-muted-foreground',
};

export default function ShopScreen({ onBack }: ShopScreenProps) {
  const [balance, setBalance] = useState(12450);
  const [purchasedItems, setPurchasedItems] = useState<number[]>([]);
  const { toast } = useToast();

  const handlePurchase = (item: typeof shopItems[0]) => {
    if (balance >= item.price && !purchasedItems.includes(item.id)) {
      soundManager.play('success');
      setBalance(balance - item.price);
      setPurchasedItems([...purchasedItems, item.id]);
      toast({
        title: "Покупка успешна!",
        description: `Вы купили ${item.name}`,
      });
    } else if (purchasedItems.includes(item.id)) {
      soundManager.play('error');
      toast({
        title: "Уже куплено",
        description: "У вас уже есть этот предмет",
        variant: "destructive",
      });
    } else {
      soundManager.play('error');
      toast({
        title: "Недостаточно монет",
        description: `Нужно ещё ${item.price - balance} монет`,
        variant: "destructive",
      });
    }
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
          <h2 className="text-2xl font-bold">Магазин</h2>
          <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-lg">
            <Icon name="Coins" size={20} className="text-secondary" />
            <span className="font-bold">{balance.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4">
        <div className="grid grid-cols-1 gap-4 max-w-2xl mx-auto">
          {shopItems.map((item, index) => (
            <Card
              key={item.id}
              className="p-6 bg-card/50 backdrop-blur border-primary/20 hover:border-primary/40 transition-all hover:scale-[1.02] animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-muted/50 flex items-center justify-center border-2 border-primary/20">
                  <Icon name={item.icon as any} size={32} className="text-primary" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-bold text-lg">{item.name}</h3>
                    <Badge className={rarityColors[item.rarity]} variant="secondary">
                      {item.rarity}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-secondary">
                    <Icon name="Coins" size={16} />
                    <span className="font-bold text-lg">{item.price}</span>
                  </div>
                </div>

                {purchasedItems.includes(item.id) ? (
                  <Badge variant="secondary" className="h-12 px-6">
                    <Icon name="Check" size={16} className="mr-2" />
                    Куплено
                  </Badge>
                ) : (
                  <Button 
                    size="lg" 
                    className="h-12" 
                    onClick={() => handlePurchase(item)}
                    disabled={balance < item.price}
                  >
                    Купить
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}