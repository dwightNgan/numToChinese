export default class numToChinese {
  constructor(){
    this.lowerChar = ['零','一','二','三','四','五','六','七','八','九'];
    this.upperChar = ['零','壹','贰','叁','肆','伍','陆','柒','捌','玖'];
    this.lowerBaseUnits = ['','十','百','千'];
    this.upperBaseUnits = ['','拾','佰','仟'];
    this.lowerQuaUnits = ['','万','亿','万亿'];
    this.upperQuaUnits = ['','萬','億','萬億'];
  }
  parseInt (number, uppercase) {
    const { lowerChar, upperChar, lowerBaseUnits, upperBaseUnits, lowerQuaUnits, upperQuaUnits } = this;
    const char = uppercase ? upperChar : lowerChar;
    const baseUnits = uppercase ? upperBaseUnits : lowerBaseUnits;
    const quaUnits = uppercase ? upperQuaUnits : lowerQuaUnits;
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
  parseFloat(number, uppercase){
    const { upperChar, lowerChar } = this;
    const char = uppercase ? upperChar : lowerChar;
    let charArr = number.toString().split('.');
    let floatStr = charArr[1].split('').map(num => char[num]).join('');
    return this.parseInt(Number(charArr[0])) + '点' + floatStr;
  }

}

console.log(new numToChinese().parseInt(1000007000000001, true));
// console.log(new numToChinese().parseFloat(10.000001));