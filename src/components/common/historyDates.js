const historyDates = []

const ordinal_suffix_of = (i) => {
  let j = i % 10,
      k = i % 100;
  if (j === 1 && k !== 11) {
      return i + "st";
  }
  if (j === 2 && k !== 12) {
      return i + "nd";
  }
  if (j === 3 && k !== 13) {
      return i + "rd";
  }
  return i + "th";
}

for(let i = 1; i <= 20; i++ ) {
  historyDates.push({
    key: `century-${i}`,
    text: `${ordinal_suffix_of(i)} Century`, 
    value: `${i*100 - 99}0000-${i*100}1231`
  });
}

let today = new Date();

historyDates.push({
  key: `century-21`,
  text: `21st Century`, 
  value: `${2000}-${today.getFullYear()}`
});

export default historyDates