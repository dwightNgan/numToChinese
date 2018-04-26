export default class numToChinese {
  constructor(){
    this.char = ['〇','一','二','三','四','五','六','七','八','九','十'];
    this.baseUnits = ['','十','百','千'];
    this.quaUnits = ['','万','亿','万亿'];
  }
  parseInt (number) {
    const { char, baseUnits, quaUnits } = this;
    const numArr = number.toString().split('').reverse();
    const { length } = numArr;
    
    let sliceArr = [];
    numArr.forEach((num, index) => {
      const quotient = parseInt(index / 4);
      if(!sliceArr[quotient]) {
        sliceArr[quotient] = []
      };
      sliceArr[quotient].push(num)
    });

    let genCombination = (num, index) => {
      const quotient = parseInt(index /4);
      let combine = num === "0" ? '零' : char[num] + baseUnits[index % 4 ];
      if(index % 4 === 0 && index !== 0) {
        combine += quaUnits[quotient - 1];
      }
      return combine
    }

    let result = sliceArr.map((group, index) => {
      let groupStr = group.map(genCombination).reverse().join('');
      groupStr = groupStr.replace(/零+/g,'零').replace(/零+$/,'');
      return groupStr ? groupStr + quaUnits[index] : '';
    }).reverse().join('');

    return result
  }

}

console.log(new numToChinese().parseInt(1000));