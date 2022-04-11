from ast import If
from logging import exception
from operator import index
from re import S
from tkinter.tix import INTEGER
from tracemalloc import stop
from numpy import double, int32, integer
import pandas as pd
buff_df = pd.read_csv('./data/buff_data.csv')
steam_df = pd.read_csv('./data/steam-median-prices.csv')

buff_df.drop_duplicates(subset="name", keep='first', inplace=True)
print(f"Total Items: \t\t\t\t{len(buff_df.index)}")

buff_df['price'] = buff_df['price'].str.slice(2)
buff_df['price'] = buff_df['price'].astype(float)
buff_df['listings'] = buff_df['listings'].str.slice(stop=-8)
buff_df.drop(buff_df.index[buff_df['listings'] == '1000+'], inplace=True)
buff_df['listings'] = buff_df['listings'].astype(int)

steam_df['sell_price'] = steam_df['sell_price'].str.slice(1)
steam_df['sell_price'] = steam_df['sell_price'].str.replace(',', '')
steam_df['sell_price'] = steam_df['sell_price'].astype(float)

steam_listings = [None] * len(buff_df.index)
roi_value = [None] * len(buff_df.index)
for i in buff_df.index:
    if i % 1000 == 0:
        print(i)
    # if i > 5:
    #     break
    try:
        name = buff_df['name'][i]
        steam_price = steam_df[steam_df['name'] == name]['sell_price'].values[0]
        buff_price = buff_df['price'][i]
        
        # Calculate ROI
        profit = (steam_price / 1.15) - buff_price
        roi = (profit / buff_price) * 100
        roi = round(roi, 2)

        steam_listings[i] = steam_price
        roi_value[i] = roi
    except:
        continue


buff_df.insert(3, 'steam_listing', steam_listings)
buff_df.insert(4, 'return', roi_value)
print(buff_df.head())
buff_df.to_csv('./data/result.csv', index=False)