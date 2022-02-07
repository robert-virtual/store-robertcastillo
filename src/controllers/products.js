const { request, response } = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.GetRange = async (req = request, res = response) => {
  const { start, end } = req.query;
  try {
    const products = await prisma.product.findMany({
      skip: Number(start),
      take: Number(end),
      include: {
        category: true,
        images: true,
        seller: {
          select: {
            name: true,
            imageUrl: true,
          },
        },
      },
    });
    res.json({
      products,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getByCategory = async (req = request, res = response) => {
  const { category } = req.query;
  const products = await prisma.product.findMany({
    where: {
      category: {
        name: {
          contains: category,
        },
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
        images: {
          create: {
            url: `${process.env.SERVER_URL}/${req.file.filename}`,
          },
        },
      },
    });
    res.json({ msg: "Producto creado", product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
