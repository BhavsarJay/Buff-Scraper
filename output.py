import math
import pandas as pd
df = pd.read_csv('./data/result.csv')

df = df[
    (100 < df['listings']) &
    # (-10 < df['return'])  & (df['return'] < math.inf) &
    (0.1 < df['price'])  & (df['price'] < 10)
]
df = df.sort_values('return', ascending=True)
print(df.head(50))