import { ArrowRightOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { Link } from "react-router-dom";

const AUTHORS = [
  {
    id: 0,
    name: "Emtiaz Ahmed",
    image: "https://i.postimg.cc/KvFWRGhK/emtiazP.jpg",
    books: 5,
    awards: 2,
    bio: "Full Stack Developer, book lover, and passionate about building modern web experiences. Creator of Librant.",
  },
  {
    id: 1,
    name: "Magnus",
    image: "https://i.postimg.cc/02Wh3Thb/magnus.webp",
    books: 3,
    awards: 1,
    bio: "A passionate storyteller and emerging author with a unique perspective on modern literature.",
  },
];

const AuthorsSection = () => {
  return (
    <section>
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Featured Authors</h2>
          <p className="text-gray-600 mt-2">
            Discover exceptional writers who have captivated readers worldwide
          </p>
        </div>
        <Link to="/authors">
          <Button type="link" className="flex items-center text-indigo-600">
            View all authors <ArrowRightOutlined className="ml-1" />
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {AUTHORS.map((author) => (
          <div
            key={author.id}
            className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="relative h-64 overflow-hidden">
              <img
                src={author.image}
                alt={author.name}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                <h3 className="text-white text-xl font-bold">{author.name}</h3>
              </div>
            </div>
            <div className="p-4">
              <div className="flex justify-between mb-3">
                <div className="text-center px-3 py-1 bg-indigo-50 rounded">
                  <span className="block text-lg font-bold text-indigo-600">
                    {author.books}
                  </span>
                  <span className="text-xs text-gray-600">Books</span>
                </div>
                <div className="text-center px-3 py-1 bg-purple-50 rounded">
                  <span className="block text-lg font-bold text-purple-600">
                    {author.awards}
                  </span>
                  <span className="text-xs text-gray-600">Awards</span>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-4">{author.bio}</p>
              <Link to={`/author/${author.id}`}>
                <Button type="primary" block>
                  View Profile
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AuthorsSection;
