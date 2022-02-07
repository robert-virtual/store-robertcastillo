const { request, response } = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { hash } = require("argon2");

exports.me = async (req, res) => {
  const users = await prisma.user.findUnique({
    where: { id: req.userId },
    select: { name: true, email: true, bio: true },
  });
  res.json({ users });
};

exports.create = async (req = request, res = response) => {
  let { password } = req.body;
  try {
    password = await hash(password);
    await prisma.user.create({
      data: {
        ...req.body,
        password,
      },
    });
    res.json({ msg: "usuario creado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
