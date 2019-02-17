let currCount = 0;
let nextCount = 1;

function updateCount() {
  currCount = currCount === 0 ? 1 : nextCount;
  nextCount = currCount * 2;
}

exports.getCount = (req, res) => {
  return res.status(200).json({
    currCount,
    nextCount
  });
};

exports.incrementCount = async (req, res) => {
  await updateCount();

  return res.status(200).json({
    currCount,
    nextCount
  });
};