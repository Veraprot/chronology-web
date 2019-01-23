import {suffixConverter} from './suffixConverter'

const historyDates = []

// const ordinal_suffix_of = (i) => {
//   let j = i % 10,
//       k = i % 100;
//   if (j === 1 && k !== 11) {
//       return i + "st";
//   }
//   if (j === 2 && k !== 12) {
//       return i + "nd";
//   }
//   if (j === 3 && k !== 13) {
//       return i + "rd";
//   }
//   return i + "th";
// }

for(let i = 1; i <= 20; i++ ) {
  historyDates.push({
    key: `century-${i}`,
    text: `${suffixConverter(i)} Century`, 
    value: `${i*100 - 99}-01-01/${i*100}-12-31`
  });
}

export default historyDates