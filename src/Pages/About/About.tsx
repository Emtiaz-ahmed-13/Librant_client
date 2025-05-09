import {
  BookOutlined,
  GithubOutlined,
  HeartOutlined,
  LinkedinOutlined,
  TeamOutlined,
  TrophyOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import { Button, Col, Row, Tooltip } from "antd";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const About = () => {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // Team members data
  const teamMembers = [
    {
      name: "Alex Johnson",
      role: "Founder & CEO",
      bio: "Book enthusiast with 15+ years in the publishing industry. Alex founded Librant to make quality books accessible to all.",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      social: {
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
        github: "https://github.com",
      },
    },
    {
      name: "Sophia Chen",
      role: "Head of Curation",
      bio: "Former literary critic with a keen eye for emerging talents. Sophia ensures Librant offers the most diverse collection possible.",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      social: {
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
      },
    },
    {
      name: "Marcus Williams",
      role: "Technology Director",
      bio: "Tech enthusiast who believes in using innovation to enhance the reading experience. Leads our platform development.",
      avatar: "https://randomuser.me/api/portraits/men/41.jpg",
      social: {
        linkedin: "https://linkedin.com",
        github: "https://github.com",
      },
    },
    {
      name: "Olivia Rodriguez",
      role: "Community Manager",
      bio: "Passionate reader and community builder who creates engaging experiences for the Librant community.",
      avatar: "https://randomuser.me/api/portraits/women/67.jpg",
      social: {
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
      },
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-indigo-900 to-purple-900 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg
            className="w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <pattern
                id="grid"
                width="8"
                height="8"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 8 0 L 0 0 0 8"
                  fill="none"
                  stroke="white"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Story</h1>
            <p className="text-xl text-indigo-100 mb-8">
              Bringing the joy of reading to everyone, everywhere
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Row gutter={[48, 24]} align="middle">
            <Col xs={24} md={12} className="order-2 md:order-1">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeIn}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="text-3xl font-bold text-gray-800 mb-6">
                  Our <span className="text-indigo-600">Mission</span>
                </h2>
                <p className="text-gray-600 mb-6 text-lg">
                  At Librant, we believe that books have the power to transform
                  lives, spark imagination, and foster understanding. Our
                  mission is to create a vibrant online community where book
                  lovers can discover exceptional reads, connect with
                  like-minded individuals, and nurture their passion for
                  literature.
                </p>
                <p className="text-gray-600 mb-8 text-lg">
                  We're committed to making quality literature accessible to
                  everyone, supporting authors both established and emerging,
                  and fostering a lifelong love of reading.
                </p>
                <Link to="/books">
                  <Button type="primary" size="large" className="mr-4">
                    Explore Our Books
                  </Button>
                </Link>
              </motion.div>
            </Col>
            <Col xs={24} md={12} className="order-1 md:order-2">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeIn}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="bg-indigo-100 rounded-lg w-full h-96 absolute top-6 left-6"></div>
                <img
                  src="https://images.unsplash.com/photo-1513001900722-370f803f498d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                  alt="Stack of books"
                  className="relative z-10 rounded-lg shadow-xl w-full h-96 object-cover"
                />
              </motion.div>
            </Col>
          </Row>
        </div>
      </section>

      {/* Key Stats Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Our Impact <span className="text-indigo-600">by the Numbers</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Since our founding, we've been making a difference in the world of
              literature.
            </p>
          </motion.div>

          <Row gutter={[24, 24]}>
            <Col xs={24} sm={12} md={6}>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeIn}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-center p-8 bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <BookOutlined className="text-4xl text-indigo-500 mb-4" />
                <h3 className="text-5xl font-bold text-gray-800 mb-2">50K+</h3>
                <p className="text-gray-600">Books Available</p>
              </motion.div>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeIn}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-center p-8 bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <TeamOutlined className="text-4xl text-indigo-500 mb-4" />
                <h3 className="text-5xl font-bold text-gray-800 mb-2">100K+</h3>
                <p className="text-gray-600">Happy Readers</p>
              </motion.div>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeIn}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-center p-8 bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <TrophyOutlined className="text-4xl text-indigo-500 mb-4" />
                <h3 className="text-5xl font-bold text-gray-800 mb-2">15+</h3>
                <p className="text-gray-600">Industry Awards</p>
              </motion.div>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeIn}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-center p-8 bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <HeartOutlined className="text-4xl text-indigo-500 mb-4" />
                <h3 className="text-5xl font-bold text-gray-800 mb-2">98%</h3>
                <p className="text-gray-600">Customer Satisfaction</p>
              </motion.div>
            </Col>
          </Row>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Our <span className="text-indigo-600">Values</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do at Librant.
            </p>
          </motion.div>

          <Row gutter={[24, 24]}>
            <Col xs={24} md={8}>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeIn}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white p-8 rounded-lg shadow-sm h-full"
              >
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
                  <span className="text-2xl text-indigo-600">1</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  Accessibility
                </h3>
                <p className="text-gray-600">
                  We're committed to making quality literature accessible to
                  everyone, regardless of location or background.
                </p>
              </motion.div>
            </Col>
            <Col xs={24} md={8}>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeIn}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white p-8 rounded-lg shadow-sm h-full"
              >
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
                  <span className="text-2xl text-indigo-600">2</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  Diversity
                </h3>
                <p className="text-gray-600">
                  We celebrate diverse voices, perspectives, and stories,
                  believing that literature should reflect the richness of human
                  experience.
                </p>
              </motion.div>
            </Col>
            <Col xs={24} md={8}>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeIn}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white p-8 rounded-lg shadow-sm h-full"
              >
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
                  <span className="text-2xl text-indigo-600">3</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  Innovation
                </h3>
                <p className="text-gray-600">
                  We constantly seek new ways to enhance the reading experience
                  and connect readers with the perfect books.
                </p>
              </motion.div>
            </Col>
          </Row>
        </div>
      </section>

      {/* Meet Our Team */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Meet Our <span className="text-indigo-600">Team</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The passionate people behind Librant who make it all possible.
            </p>
          </motion.div>

          <Row gutter={[24, 24]}>
            {teamMembers.map((member, index) => (
              <Col xs={24} sm={12} md={6} key={index}>
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={fadeIn}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="bg-white rounded-lg shadow-sm overflow-hidden"
                >
                  <div className="h-64 overflow-hidden">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                      {member.name}
                    </h3>
                    <p className="text-indigo-600 mb-3">{member.role}</p>
                    <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                    <div className="flex gap-3">
                      {member.social.linkedin && (
                        <Tooltip title="LinkedIn">
                          <a
                            href={member.social.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-indigo-600 transition-colors"
                          >
                            <LinkedinOutlined className="text-lg" />
                          </a>
                        </Tooltip>
                      )}
                      {member.social.twitter && (
                        <Tooltip title="Twitter">
                          <a
                            href={member.social.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-indigo-600 transition-colors"
                          >
                            <TwitterOutlined className="text-lg" />
                          </a>
                        </Tooltip>
                      )}
                      {member.social.github && (
                        <Tooltip title="GitHub">
                          <a
                            href={member.social.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-indigo-600 transition-colors"
                          >
                            <GithubOutlined className="text-lg" />
                          </a>
                        </Tooltip>
                      )}
                    </div>
                  </div>
                </motion.div>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-gradient-to-r from-indigo-900 to-purple-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-6">
              Join the Librant Community
            </h2>
            <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
              Have questions or want to learn more about how we can help you
              discover your next favorite book?
            </p>
            <Link to="/contact">
              <Button
                type="primary"
                size="large"
                className="bg-white text-indigo-700 border-white hover:bg-indigo-100 hover:text-indigo-800 hover:border-indigo-100"
              >
                Contact Us
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
