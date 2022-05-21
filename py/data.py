import pandas as pd

df = pd.read_csv("data_c.csv", encoding="cp949")

df.to_json("data.json", orient="records")