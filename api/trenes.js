export default async function(req, res){
   const CLIENT_ID = process.env.CLIENT_ID;
   const CLIENT_SECRET = process.env.CLIENT_SECRET;
   const urlOficial = `https://apitransporte.buenosaires.gob.ar/subtes/status?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`;

   try{
        const response = await fetch(urlOficial);
        const data = await response.json();

        res.status(200).json(data);

   }catch(error){
    res.status(500).json({error: "Error al consultar la API oficial"});
   }

}