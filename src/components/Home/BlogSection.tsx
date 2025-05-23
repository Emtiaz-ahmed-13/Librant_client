import { ArrowRightOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { Link } from "react-router-dom";

const BLOG_POSTS = [
  {
    id: 1,
    title: "The Rise of Independent Bookstores in the Digital Age",
    excerpt:
      "Despite the rise of e-books and online retailers, independent bookstores are making a comeback. Here's why...",
    image:
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    date: "May 15, 2023",
    author: "Emily Johnson",
    category: "Industry Trends",
  },
  {
    id: 2,
    title: "10 Must-Read Books for Summer 2023",
    excerpt:
      "Summer is here, and it's the perfect time to dive into some exciting new reads. We've curated a list of...",
    image:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    date: "June 2, 2023",
    author: "Michael Chen",
    category: "Book Lists",
  },
  {
    id: 3,
    title: "How Reading Fiction Increases Empathy",
    excerpt:
      "Recent studies show that readers of literary fiction score better on tests measuring empathy and emotional intelligence...",
    image:
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    date: "April 28, 2023",
    author: "Sarah Williams",
    category: "Reading Benefits",
  },
];

const BlogSection = () => {
  return (
    <section>
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">From Our Blog</h2>
          <p className="text-gray-600 mt-2">
            Insights, tips, and news from the world of books and reading
          </p>
        </div>
        <Link to="/blog">
          <Button type="link" className="flex items-center text-indigo-600">
            View all articles <ArrowRightOutlined className="ml-1" />
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {BLOG_POSTS.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <Link to={`/blog/${post.id}`}>
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
            </Link>
            <div className="p-6">
              <div className="flex justify-between items-center mb-3 text-sm text-gray-500">
                <span>{post.date}</span>
                <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded">
                  {post.category}
                </span>
              </div>
              <Link to={`/blog/${post.id}`}>
                <h3 className="text-xl font-bold mb-2 text-gray-800 hover:text-indigo-600">
                  {post.title}
                </h3>
              </Link>
              <p className="text-gray-600 mb-4">{post.excerpt}</p>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-indigo-200 rounded-full flex items-center justify-center text-indigo-700 font-semibold">
                  {post.author.charAt(0)}
                </div>
                <span className="ml-2 text-sm text-gray-700">
                  {post.author}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BlogSection;
