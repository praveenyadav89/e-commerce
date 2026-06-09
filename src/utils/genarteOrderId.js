const OrderCounter = require("../models/OrderCounter");

const getNextOrderId = async () => {
  let counter = await OrderCounter.findById("orderId");

  if (!counter) {
    counter = await OrderCounter.create({
      _id: "orderId",
      sequenceValue: 1000000,
    });
  }

  counter = await OrderCounter.findOneAndUpdate(
    { _id: "orderId" },
    { $inc: { sequenceValue: 1 } },
    {
      returnDocument: "after",
    },
  );

  return counter.sequenceValue.toString();
};

module.exports = getNextOrderId;
