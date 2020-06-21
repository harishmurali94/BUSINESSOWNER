export default function generateArray(responseArray){
    const createdArray = responseArray.map(data=>{
        data.isSelected = false;
        return data;
    });
    return createdArray;
}