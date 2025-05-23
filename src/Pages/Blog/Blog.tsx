import {
  BookOutlined,
  CalendarOutlined,
  ReadOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Card, Empty, Input, Skeleton, Tag, Tooltip } from "antd";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image: string;
  tags: string[];
  readTime: string;
}

const Blog = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    // Mock loading posts (in a real app, this would be an API call)
    const loadPosts = async () => {
      setLoading(true);
      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock blog data
        setPosts([
          {
            id: "1",
            title: "The Importance of Reading in the Digital Age",
            excerpt:
              "How books continue to shape our understanding of the world despite the rise of digital media.",
            content: "Full content here...",
            author: "Jane Smith",
            date: "2023-05-15",
            image:
              "https://images.unsplash.com/photo-1535905557558-afc4877a26fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
            tags: ["reading", "digital age", "literature"],
            readTime: "5 min read",
          },
          {
            id: "2",
            title: "Summer Reading List: Top 10 Books for 2023",
            excerpt:
              "Our curated selection of must-read books for your summer vacation.",
            content: "Full content here...",
            author: "John Doe",
            date: "2023-06-01",
            image:
              "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
            tags: ["book list", "summer reading", "recommendations"],
            readTime: "8 min read",
          },
          {
            id: "3",
            title: "The Rise of Audiobooks: Changing How We Consume Literature",
            excerpt:
              "Exploring how audiobooks are transforming reading habits and making literature more accessible.",
            content: "Full content here...",
            author: "Emily Johnson",
            date: "2023-06-20",
            image:
              "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
            tags: ["audiobooks", "technology", "accessibility"],
            readTime: "6 min read",
          },
          {
            id: "4",
            title: "Spotlight on Independent Bookshops Around the World",
            excerpt:
              "Discover the charm and character of unique independent bookshops from different corners of the globe.",
            content: "Full content here...",
            author: "Michael Brown",
            date: "2023-07-05",
            image:
              "https://images.unsplash.com/photo-1521056787327-245c2717b7d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
            tags: ["bookshops", "independent stores", "travel"],
            readTime: "7 min read",
          },
        ]);
      } catch (error) {
        console.error("Error loading blog posts:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  // Filter posts based on search query and category
  const filteredPosts = posts.filter((post) => {
    // Filter by search query
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );

    // Filter by category
    const matchesCategory =
      activeCategory === "all" ||
      post.tags.some((tag) => tag.includes(activeCategory));

    return matchesSearch && matchesCategory;
  });

  // Get unique categories
  const allCategories = ["all", ...new Set(posts.flatMap((post) => post.tags))];

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="bg-gradient-to-b from-purple-50 to-white dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400 px-4 py-1 rounded-full text-sm font-medium mb-4">
            <BookOutlined className="mr-2" />
            Librant Blog
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Insights & Stories
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-indigo-600 mx-auto mb-6 rounded-full" />
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Thoughtful articles, reading recommendations, and literary
            explorations
          </p>
        </motion.div>

        {/* Search and Filter Section */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex flex-col md:flex-row gap-6 justify-between">
            <div className="relative max-w-md w-full">
              <Input
                placeholder="Search articles..."
                prefix={<SearchOutlined className="text-gray-400" />}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="py-2 px-4 rounded-lg dark:bg-slate-700 dark:text-white dark:border-slate-600"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {allCategories.map((category) => (
                <Tag
                  key={category}
                  color={activeCategory === category ? "purple" : undefined}
                  className={`px-3 py-1 cursor-pointer text-sm capitalize ${
                    activeCategory !== category
                      ? "hover:border-purple-400 dark:hover:border-purple-500"
                      : ""
                  }`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </Tag>
              ))}
            </div>
          </div>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, index) => (
              <Card
                key={index}
                className="mb-6 shadow-md rounded-xl overflow-hidden"
              >
                <Skeleton.Image active className="w-full h-48" />
                <Skeleton active paragraph={{ rows: 3 }} />
              </Card>
            ))}
          </div>
        ) : filteredPosts.length === 0 ? (
          <Empty
            description={
              <span className="text-gray-500 dark:text-gray-400 text-lg">
                No articles found matching your criteria
              </span>
            }
            className="my-16"
          />
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {filteredPosts.map((post) => (
              <motion.div key={post.id} variants={item}>
                <Link to={`/blog/${post.id}`} className="block h-full">
                  <Card
                    hoverable
                    className="h-full border-0 shadow-md hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden dark:bg-slate-800"
                    cover={
                      <div className="relative h-56 overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/70 to-transparent"></div>
                        <div className="absolute bottom-3 left-4 flex items-center space-x-2">
                          {post.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="bg-black/40 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="absolute top-3 right-3">
                          <Tooltip title="Estimated reading time">
                            <span className="bg-white/80 dark:bg-black/50 backdrop-blur-sm text-gray-800 dark:text-gray-200 text-xs px-2 py-1 rounded-full flex items-center">
                              <ReadOutlined className="mr-1" /> {post.readTime}
                            </span>
                          </Tooltip>
                        </div>
                      </div>
                    }
                    bodyStyle={{ padding: "20px" }}
                  >
                    <h2 className="text-xl font-bold mb-3 text-gray-800 dark:text-white line-clamp-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                      <span className="flex items-center">
                        <UserOutlined className="mr-1" /> {post.author}
                      </span>
                      <span className="flex items-center">
                        <CalendarOutlined className="mr-1" />
                        {new Date(post.date).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="mt-4">
                      <Button
                        type="default"
                        className="border-indigo-500 text-indigo-600 hover:bg-indigo-50 dark:border-indigo-400 dark:text-indigo-400 dark:hover:bg-indigo-900/30"
                      >
                        Read Article
                      </Button>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="p-8 rounded-xl bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 border border-purple-200 dark:border-purple-800/40 max-w-3xl mx-auto">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              Join Our Newsletter
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Get our latest book recommendations, author news, and literary
              insights delivered to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <Input
                placeholder="Your email address"
                className="rounded-lg dark:bg-slate-700 dark:text-white dark:border-slate-600"
              />
              <Button
                type="primary"
                className="bg-gradient-to-r from-purple-600 to-indigo-600 border-0 hover:from-purple-700 hover:to-indigo-700"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Blog;
