


const text = `Collection,Name,Design,Build,Size,Model,Base Price,Woodtone,Plain,Obscure,Tinted,Frosted,Inserts,StyleLite
Traditional,Raised Panel,Short Panel,Non-insulated,Single,2250,500,NA,200,250,NA,NA,100,NA
Traditional,Raised Panel,Short Panel,Non-insulated,Double,2250,1000,NA,400,500,NA,NA,200,NA
Contemporary,Planks,Short Panel,Insulated,Single,2327,1000,400,250,300,350,400,100,NA
Contemporary,Planks,Long Panel,Insulated,Double,2347,1500,800,500,600,700,800,200,300`;


let prices = {}
// Split into rows
const rows = text.trim().split("\n");
const headers = rows[0].split(",");

// Root object
const result = {};

// Parse each row
rows.slice(1).forEach(row => {
  const values = row.split(",");
  const entries = {}
  headers.forEach( (header,index) => {
    entries[header] = values[index]
  })
  console.log(entries)
  const {Collection,Name,Design,Size,Build,"Base Price":basePrice,Woodtone,Tinted,Plain,Obscure,Frosted,StyleLite,Inserts} = entries;/*Define what the nested price object will look like*/

  prices[Collection] ||= {}
  prices[Collection][Name] ||= {}
  prices[Collection][Name][Design] ||= {}
  prices[Collection][Name][Design][Build] ||= {}
  prices[Collection][Name][Design][Build][Size] ||= {basePrice:basePrice,options:{}}
  prices[Collection][Name][Design][Build][Size]["options"]["Accents Woodtone"] ||= Woodtone
  prices[Collection][Name][Design][Build][Size]["options"]["Plain"] ||= Plain
  prices[Collection][Name][Design][Build][Size]["options"]["Tinted"]||= Tinted
  prices[Collection][Name][Design][Build][Size]["options"]["Obscure"] ||= Obscure
  prices[Collection][Name][Design][Build][Size]["options"]["Frosted"] ||= Frosted
  prices[Collection][Name][Design][Build][Size]["options"]["StyleLite"] ||= StyleLite
  prices[Collection][Name][Design][Build][Size]["options"]["Inserts"] ||= Inserts
  // console.log(prices)
});

console.log("THE RESULT:", prices);