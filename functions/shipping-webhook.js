// Endpoint URL: /.netlify/functions/shipping-webhook
function getPickupMoment(now, hour) {
    const offset = now.getUTCHours() > hour - 1 ? 1 : 0;
  
    var result = new Date(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      hour
    );
  
    return new Date(result.getTime() + offset * 1000 * 60 * 60 * 24);
  }
  
  exports.handler = (event, context, callback) => {
    const now = new Date();
  
    let pickupOptions = [
      getPickupMoment(now, 19),
      getPickupMoment(now, 20),
      getPickupMoment(now, 21),
    ];
  
    pickupOptions.sort();
  
    let dateOutput = new Intl.DateTimeFormat("en", {
      timeStyle: "short",
      dateStyle: "medium",
    });
  
    const results = {
      rates: pickupOptions.map((opt) => {
        return {
          cost: 0,
          description: `Curbside pickup (${dateOutput.format(opt)})`,
        };
      }),
    };
  
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(results),
      headers: { "Content-Type": "application/json" },
    });
  };
  