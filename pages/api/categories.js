import { connectDB } from "@/utils/mongoose";
import { Category } from "@/models/Category";

export default async function handle(req, res) {
  const { method } = req;
  await connectDB();

  if (method === "GET") {
    res.json(await Category.find().populate("parent"));
  }

  if (method === "POST") {
    const { name, parentCategory } = req.body;
    var categoryDoc;
    if (!parentCategory) {
      categoryDoc = await Category.create({
        name,
      });
    } else {
      categoryDoc = await Category.create({
        name,
        parent: parentCategory,
      });
    }
    res.json(categoryDoc);
  }
  if (method === "PUT") {
    const { name, parentCategory, _id } = req.body;
    const categoryDoc = await Category.updateOne(
      { _id },
      {
        name,
        parent: parentCategory,
      }
    );
    res.json(categoryDoc);
  }
}
