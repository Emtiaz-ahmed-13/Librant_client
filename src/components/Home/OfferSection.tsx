import { Button } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const OfferSection = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 12,
    minutes: 30,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (
          prevTime.days === 0 &&
          prevTime.hours === 0 &&
          prevTime.minutes === 0 &&
          prevTime.seconds === 0
        ) {
          clearInterval(timer);
          return prevTime;
        }

        let newSeconds = prevTime.seconds - 1;
        let newMinutes = prevTime.minutes;
        let newHours = prevTime.hours;
        let newDays = prevTime.days;

        if (newSeconds < 0) {
          newSeconds = 59;
          newMinutes -= 1;
        }

        if (newMinutes < 0) {
          newMinutes = 59;
          newHours -= 1;
        }

        if (newHours < 0) {
          newHours = 23;
          newDays -= 1;
        }

        return {
          days: newDays,
          hours: newHours,
          minutes: newMinutes,
          seconds: newSeconds,
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeDisplay = (value: number) => {
    return value < 10 ? `0${value}` : value;
  };

  return (
    <section className="relative py-16 bg-gradient-to-br from-indigo-50 via-purple-50 to-white dark:from-indigo-950 dark:via-purple-950 dark:to-slate-900 overflow-hidden">
      {/* Decorative confetti/sparkles */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(18)].map((_, i) => (
          <span
            key={i}
            className="absolute w-2 h-2 rounded-full opacity-20 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background:
                i % 3 === 0 ? "#a5b4fc" : i % 3 === 1 ? "#c4b5fd" : "#f0abfc",
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
      <div className="flex flex-col md:flex-row items-center relative z-10">
        <div className="w-full md:w-1/2 mb-10 md:mb-0 md:pr-12">
          <span className="inline-block bg-indigo-100 text-indigo-800 text-sm font-semibold px-4 py-2 rounded-full mb-4 shadow">
            Limited Time Offer
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
            30% Off on Selected Books
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">
            Discover amazing deals on bestsellers, new releases, and classic
            literature. Whether you're looking for fiction, non-fiction,
            mystery, or sci-fi, we have something for every book lover at
            unbeatable prices.
          </p>

          <div className="flex space-x-4 mb-10">
            {["Days", "Hours", "Minutes", "Seconds"].map((label, idx) => (
              <div className="text-center" key={label}>
                <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-xl shadow-lg flex items-center justify-center text-2xl font-extrabold text-indigo-700 dark:text-indigo-300">
                  {timeDisplay(
                    [
                      timeLeft.days,
                      timeLeft.hours,
                      timeLeft.minutes,
                      timeLeft.seconds,
                    ][idx]
                  )}
                </div>
                <p className="text-xs mt-2 text-gray-600 dark:text-gray-400 font-medium">
                  {label}
                </p>
              </div>
            ))}
          </div>

          <div className="flex gap-4">
            <Link to="/offers">
              <Button
                type="primary"
                size="large"
                className="h-12 text-base bg-gradient-to-r from-indigo-600 to-purple-600 border-0 shadow hover:from-indigo-700 hover:to-purple-700"
              >
                View All Offers
              </Button>
            </Link>
            <Link to="/all-books">
              <Button
                size="large"
                className="h-12 text-base bg-white dark:bg-slate-800 border border-indigo-200 dark:border-indigo-700 text-indigo-600 dark:text-indigo-300 shadow hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
              >
                Browse Books
              </Button>
            </Link>
          </div>
        </div>

        <div className="w-full md:w-1/2 relative flex justify-center">
          <div className="relative z-10 bg-white dark:bg-slate-800 p-6 md:p-10 rounded-2xl shadow-2xl w-full max-w-md mx-auto transform rotate-2 transition-transform hover:rotate-0 duration-300 border border-indigo-100 dark:border-indigo-900">
            <div className="absolute -top-5 -right-5 bg-gradient-to-r from-rose-500 to-orange-400 text-white text-lg font-extrabold py-2 px-6 rounded-full shadow-lg border-4 border-white dark:border-slate-800">
              -30%
            </div>
            <div className="flex mb-6">
              <img
                src="https://covers.openlibrary.org/b/id/240727-L.jpg"
                alt="Teaches Chess"
                className="w-24 h-36 object-cover shadow-lg rounded-xl border-2 border-indigo-100 dark:border-indigo-900"
              />
              <div className="ml-6 flex flex-col justify-center">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  Teaches Chess
                </h3>
                <div className="flex items-center mt-1 mb-2">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    ))}
                  <span className="text-xs text-gray-500 ml-2">
                    (120 reviews)
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400">
                    $15.99
                  </span>
                  <span className="text-base text-gray-400 line-through ml-3">
                    $21.99
                  </span>
                </div>
              </div>
            </div>
            <div className="border-t border-dashed border-indigo-200 dark:border-indigo-700 pt-4 mt-4">
              <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Use coupon code:
              </h4>
              <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-dashed border-indigo-300 dark:border-indigo-700 py-3 px-4 rounded-lg text-center font-mono text-xl font-bold text-indigo-700 dark:text-indigo-300 tracking-widest">
                SUMMER30
              </div>
            </div>
          </div>
          {/* Decorative background cards */}
          <div className="absolute top-10 -left-4 w-64 h-80 bg-indigo-200 dark:bg-indigo-900 rounded-2xl transform -rotate-6 opacity-40" />
          <div className="absolute -bottom-4 -right-4 w-64 h-80 bg-purple-200 dark:bg-purple-900 rounded-2xl transform rotate-12 opacity-40" />
        </div>
      </div>
    </section>
  );
};

export default OfferSection;
