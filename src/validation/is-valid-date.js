export const isValidDate = (dateString) => {
  let regEx = /^\d{4}-\d{2}-\d{2}$/;
  if(!dateString.match(regEx)) return false; 
  let d = new Date(dateString);
  if(Number.isNaN(d.getTime())) return false; 
  return d.toISOString().slice(0,10) === dateString;
}
