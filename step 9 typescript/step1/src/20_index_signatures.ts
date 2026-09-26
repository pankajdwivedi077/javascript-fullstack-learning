type NumberDict = {
    [k: string]: number
}

const counters: NumberDict = {
    "key": 123
}

counters['secret'] =  1234;
counters['start'] =  1236;

type Metrices = Record<'Likes' | 'Views' | 'Share', number> // much for tight

const mm: Metrices = {
    Likes: 1,
    Views: 2,
    Share: 3
}

const priceMap = new Map<string, number>();
priceMap.set('likes', 1);

type LooseMap = Record<string, number | undefined>;

const lm: LooseMap = {
    'Ace': 2
}

lm['y'] = 5