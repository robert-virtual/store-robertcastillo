const { request, response } = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { hash } = require("argon2");

exports.me = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.userId },
    select: { name: true, email: true, bio: true, imageUrl },
  });
  res.json({
    user,
  });
};

exports.create = async (req = request, res = response) => {
  let { password } = req.body;
  let imageUrl;
  if (req.file) {
    imageUrl = `${process.env.SERVER_URL}/${req.file.filename}`;
  }
  try {
    password = await hash(password);
    await prisma.user.create({
      data: {
        ...req.body,
        password,
        imageUrl,
      },
    });
    res.json({ msg: "usuario creado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
