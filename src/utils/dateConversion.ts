export const convertDate = (date: number) => {
    const d = new Date(date);
   return  d.toLocaleDateString()
}