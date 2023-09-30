import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const searchAuthors = async (req, res) => {
  const { query } = req;
  const limit = query.limit ? +query.limit : 20;
  const q = query.q || null;
  const page = query.page ? +query.page : 1;

  console.log({ query });

  const filterQuery = !!q
    ? {
        OR: [
          { name: { contains: q, mode: "insensitive" } },
          { email: { contains: q, mode: "insensitive" } },
          { body: { contains: q, mode: "insensitive" } },
        ],
      }
    : {};

  const total = await prisma.author.count({
    orderBy: {
      id: "asc",
    },
    where: filterQuery,
  });

  if (total === 0)
    return res.status(200).send({
      status: "success",
      data: {
        total,
        authors: [],
      },
    });

  const authors = await prisma.author.findMany({
    take: limit,
    skip: (page - 1) * limit,
    orderBy: {
      id: "asc",
    },
    where: filterQuery,
  });

  if (!authors)
    return res.status(500).send({
      status: "error",
      message: "Unable to fetch authors list",
    });
  return res.status(200).send({
    status: "success",
    data: {
      total,
      authors,
    },
  });
};

export default searchAuthors;
