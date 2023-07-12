type Base = {
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
};
interface Post extends Base {
  author: Author;
  body: Block[];
  categories: Category[];
  mainImage: Image;
  slug: Slug;
  title: string;
  description: string;
}
interface Author extends Base {
  name: string;
  image: Image;
  bio: string;
  slug: Slug;
}
interface Image {
  _type: string;
  asset: Reference;
}
interface Reference {
  _ref: string;
  _type: "reference";
}
interface Slug {
  _type: "slug";
  current: string;
}
interface Block {
  _key: string;
  _type: string;
  children: Span[];
  markDefs: any[];
  style: string;
}
interface Span {
  _key: string;
  _type: string;
  marks: string[];
  text: string;
}
interface Category extends Base {
  title: string;
  description: string;
  slug: Slug;
}
interface Tag extends Base {
  title: string;
  slug: Slug;
}
interface mainImage {
  _type: string;
  asset: Reference;
}
interface Title {
  _type: string;
  current: string;
}
