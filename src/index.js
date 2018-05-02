export default class numToChinese {
  constructor(){
    this.lowerChar = ['零','一','二','三','四','五','六','七','八','九'];
    this.upperChar = ['零','壹','贰','叁','肆','伍','陆','柒','捌','玖'];
    this.lowerBaseUnits = ['','十','百','千'];
    this.upperBaseUnits = ['','拾','佰','仟'];
    this.lowerQuaUnits = ['','万','亿','万亿'];
    this.upperQuaUnits = ['','萬','億','萬億'];
  }
  parseInt (number, options = {}) {
    const { lowerChar, upperChar, lowerBaseUnits, upperBaseUnits, lowerQuaUnits, upperQuaUnits } = this;
    const { uppercase = false, alias = {} } = options;
    const {tenWithoutOne, twenty, thirty, forty} = alias;
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

    quaUnits.forEach(quaUnit => {
      if(!quaUnit) return;
      baseUnits.forEach(baseUnit => {
        if(!baseUnit) return
        let regEx = RegExp(`${baseUnit}${quaUnit}零?`);
        result = result.replace(regEx, `${baseUnit}${quaUnit}零`)
      })
    })

    result = result.replace(/零+$/,'');

    if(tenWithoutOne){
      result = result.replace(/^一十/, '十')
    }

    if(twenty && numArr.length === 2){
      result = result.replace(/^二十/, '廿')
    }

    if(thirty && numArr.length === 2){
      result = result.replace(/^三十/, '卅')
    }

    if(forty && numArr.length === 2){
      result = result.replace(/^四十/, '卌')
    }

    return result || '零'
  }
  parseFloat(number, options){
    const { upperChar, lowerChar } = this;
    const { uppercase = false } = options;    
    const char = uppercase ? upperChar : lowerChar;
    let charArr = number.toString().split('.');
    let floatStr = processString(charArr[1], num => char[num]);
    return this.parseInt(Number(charArr[0]), options) + '点' + floatStr;
  }

  parseDate(dateStr){
    const date = new Date(dateStr);
    if(date === 'Invalid Date'){
      return 'Invalid Date'
    }
    const { lowerChar } = this;
    const char = lowerChar;
    let genChar = num => this.parseInt(num, {alias: {tenWithoutOne: true}});
    let result = '';
    result += processString(date.getFullYear(), num => char[num]) + '年';
    result += genChar(date.getMonth() + 1) + '月';
    result += genChar(date.getDate()) + '日 ';
    result += genChar(date.getHours()) + '时';
    result += genChar(date.getMinutes()) + '分';
    result += genChar(date.getSeconds()) + '秒';
    return result;
  }
}

console.log(new numToChinese().parseInt(0));
console.log(new numToChinese().parseInt(1000024,{uppercase:true}));
console.log(new numToChinese().parseDate([1999,5,23]));
// console.log(new numToChinese().parseFloat(10.000001));

function processString( stringOrNumber , process ) {
  if(typeof stringOrNumber === 'number'){
    stringOrNumber = stringOrNumber.toString();
  }
  return stringOrNumber.split('').map(process).join('')
}