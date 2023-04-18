const PieReduce = (latestTx: any) =>
  Object.values(
    latestTx.reduce((total: any, item: any) => {
      const { description, amount } = item;
      if (!description) return total;
      if (!total[description]) {
        total[description] = {
          label: description,
          value: amount,
        };
      } else {
        total[description] = {
          ...total[description],
          value: total[description].value + amount,
        };
      }
      return total;
    }, {})
  );

export default PieReduce;
