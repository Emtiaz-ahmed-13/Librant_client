import { StarFilled } from "@ant-design/icons";
import { Carousel } from "antd";

const testimonials = [
  {
    id: 1,
    name: "Emily Johnson",
    role: "Book Enthusiast",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    content:
      "Librant has completely transformed how I discover new books. The recommendations are spot on and I love the clean, intuitive interface. Their collection is vast and I always find exactly what I am looking for.",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Brown",
    role: "Literature Professor",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    content:
      "As an academic, I appreciate the breadth of scholarly works available on Librant. The search functionality is precise and the delivery is always prompt. It has become an indispensable resource for my research.",
    rating: 5,
  },
  {
    id: 3,
    name: "Sarah Williams",
    role: "Casual Reader",
    avatar: "https://randomuser.me/api/portraits/women/67.jpg",
    content:
      "I am relatively new to reading regularly, and Librant has made it so easy to find books I actually enjoy. The personalized recommendations have introduced me to authors I now love. The customer service is exceptional too!",
    rating: 4,
  },
  {
    id: 4,
    name: "David Smith",
    role: "Fiction Writer",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    content:
      "Librant is not just a bookstore, it is a community. I have found incredible inspiration through their curated collections and author spotlights. The quality of their book selection is unmatched anywhere else.",
    rating: 5,
  },
];

const Testimonial = () => {
  return (
    <div className="mb-16 py-12 bg-gradient-to-b from-indigo-50 to-white rounded-2xl">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            What Our <span className="text-indigo-600">Readers</span> Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied readers who have discovered their next
            favorite book through Librant.
          </p>
        </div>

        <Carousel
          autoplay
          className="testimonial-carousel"
          dots={{ className: "custom-dots" }}
          autoplaySpeed={5000}
        >
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="px-4 py-6">
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md">
                <div className="flex items-center gap-1 text-yellow-500 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <StarFilled
                      key={i}
                      className={
                        i < testimonial.rating
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>

                <blockquote className="text-gray-700 italic mb-6">
                  "{testimonial.content}"
                </blockquote>

                <div className="flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-indigo-100"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">
                      {testimonial.name}
                    </p>
                    <p className="text-gray-500 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Carousel>

        {/* Trust indicators */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-indigo-600">10k+</span>
            <span className="text-gray-600">Happy Readers</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-indigo-600">50k+</span>
            <span className="text-gray-600">Books Delivered</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-indigo-600">4.8</span>
            <span className="text-gray-600">Customer Rating</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-indigo-600">99%</span>
            <span className="text-gray-600">On-time Delivery</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
