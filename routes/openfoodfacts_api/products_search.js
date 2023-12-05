// import OFF from "openfoodfacts-nodejs";
// const client = new OFF();

async function findProductOnDbOpenFoodFacts(scannedNum){
    // console.log(client)
const result = await client.getProduct(scannedNum)
return result
}

export default findProductOnDbOpenFoodFacts;
