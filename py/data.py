import pandas as pd

df = pd.read_csv("c충청남도_천안시_도서관_20210924_1632974146431_6851.csv", encoding="cp949")

df.to_json("천안시_도서관.json", orient="records")