const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getApiCallCounts = async (req, res) => {
  try {
    const apiCallCounts = await prisma.apiCallCount.findMany();
    const totalCount = apiCallCounts.reduce((acc, currentItem) => acc + currentItem.count, 0);
    res.json({ error: false, data: {totalCount} });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        error: true,
        message: "An error occurred while fetching API call counts.",
        data: null,
      });
  }
};
