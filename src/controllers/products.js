const { request, response } = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.GetRange = async (req = request, res = response) => {
  const { start, end } = req.query;
  try {
    const products = await prisma.product.findMany({
      skip: start,
      take: end,
    });
    res.json({ products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getByCategory = async (req = request, res = response) => {
  const { category } = req.query;
  const products = await prisma.product.findMany({
    where: {
      category: {
        name: category,
      },
    },
  });
  res.json({ products });
};

exports.create = async (req = request, res = response) => {
  const { userId } = req;
  try {
    const product = await prisma.product.create({
      data: {
        sellerId: userId,
        ...req.body,
      },
    });
    res.json({ msg: "Producto creado", product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
