const express = require('express');
const app = express();

// app.get('/currencies', async(req,res)=>{
//     try{
//         const response = await fetch('https://openexchangerates.org/api/currencies.json?app_id=811b6de26b974ef490c1833903ed81da');

//         const currency = await response.json();
//         res.json(currency);
//     }
//     catch(error){
//         res.status(503).json({message: "Service Unavailable"});
//     }
// });

// app.get('/latest',async(req,res)=>{
//     try{
//         const response = await fetch('https://openexchangerates.org/api/latest.json?app_id=811b6de26b974ef490c1833903ed81da');
//         const data = await response.json();
//         const rates = data.rates;
//         res.json(rates);
//     }
//     catch(error){
//         res.status(503).json({message: "Service Unavailable"});
//     }
// });

app.get('/rates', async (req, res) => {
    try {
      const currency = req.query.currency;
      if (currency) {
        const symbol = currency.toUpperCase();
        const currencyResponse = await fetch('https://openexchangerates.org/api/currencies.json?app_id=811b6de26b974ef490c1833903ed81da');
        const currencyData = await currencyResponse.json();
  
        const rateResponse = await fetch('https://openexchangerates.org/api/latest.json?app_id=811b6de26b974ef490c1833903ed81da');
        const rateData = await rateResponse.json();
  
        if (!(symbol in currencyData)) {
          return res.status(404).json({ message: " Error 404 not found"});
        }
  
        return res.json({
          rates: [
            {
              symbol: symbol,
              name: currencyData[symbol],
              rate: rateData.rates[symbol],
            },
          ],
        });
      }
       else {
        const currencyResponse = await fetch('https://openexchangerates.org/api/currencies.json?app_id=811b6de26b974ef490c1833903ed81da');
        const currencyData = await currencyResponse.json();
  
        const rateResponse = await fetch('https://openexchangerates.org/api/latest.json?app_id=811b6de26b974ef490c1833903ed81da');
        const rateData = await rateResponse.json();
  
        const rates = [];
  
        for (const symbol in rateData.rates) {
          rates.push({
            symbol: symbol,
            name: currencyData[symbol],
            rate: rateData.rates[symbol],
          });
        }
        res.json({ rates });
      }
    } catch (error) {
      res.status(503).json({ message: " Error 503 Service Unavailable" });
    }
  });

  app.listen(3000,()=>{console.log("Server is up")});