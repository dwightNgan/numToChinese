export default class numToChinese {
  constructor(){
    this.char = ['〇','一','二','三','四','五','六','七','八','九','十'];
    this.units = ['','十','百','千','万'];
  }
  parse (number) {
    const { char, units } = this;
    const numArr = number.toString().split('');
    const { length } = numArr;
    const maxIndex = length - 1;
    // let getUnit = (index) => {
    //   let qua = parseInt(index / 4);
    //   let remainder = index % 4;
    //   let startIndex = 0;
    //   let unit = ''; 
    //   let loop = (idx) => {
    //     unit = units[idx] + unit;
    //     if(startIndex === qua) return;
    //     loop()
    //     startIndex++;

    //   }

    // }
    let charArr = numArr.map((num, index) => {
      if(length === 2 && num === "1" && index === 0){
        return units[maxIndex - index]
      }
      return num === "0" ? "零" : char[num] + units[maxIndex - index];
    });
    return charArr.join('').replace(/零*$/,'').replace(/零+/, "零");
  }
}

console.log(new numToChinese().parse(101));